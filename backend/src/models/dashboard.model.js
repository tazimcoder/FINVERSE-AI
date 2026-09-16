/**
 * ==========================================================
 * FINVERSE AI
 * Dashboard Model
 * User-Specific Dashboard
 * ==========================================================
 *
 * Responsibility:
 *
 * - Total balance
 * - Total income
 * - Total expense
 * - Total accounts
 * - Recent transactions
 * - Expense by category
 * - Monthly income / expense trend
 *
 * IMPORTANT:
 * All queries are filtered using user_id.
 *
 * ==========================================================
 */

import pool from "../config/db.js";

/**
 * ==========================================================
 * TOTAL BALANCE
 * ==========================================================
 *
 * Only ACTIVE accounts are included.
 *
 * ==========================================================
 */

export async function getTotalBalance(userId) {

    const [rows] = await pool.query(
        `
        SELECT
            IFNULL(SUM(balance), 0) AS totalBalance
        FROM accounts
        WHERE user_id = ?
        AND status = 'ACTIVE'
        `,
        [userId]
    );

    return rows[0];
}


/**
 * ==========================================================
 * TOTAL INCOME
 * ==========================================================
 */

export async function getTotalIncome(userId) {

    const [rows] = await pool.query(
        `
        SELECT
            IFNULL(SUM(amount), 0) AS totalIncome
        FROM transactions
        WHERE user_id = ?
        AND type = 'INCOME'
        `,
        [userId]
    );

    return rows[0];
}


/**
 * ==========================================================
 * TOTAL EXPENSE
 * ==========================================================
 */

export async function getTotalExpense(userId) {

    const [rows] = await pool.query(
        `
        SELECT
            IFNULL(SUM(amount), 0) AS totalExpense
        FROM transactions
        WHERE user_id = ?
        AND type = 'EXPENSE'
        `,
        [userId]
    );

    return rows[0];
}


/**
 * ==========================================================
 * TOTAL ACCOUNTS
 * ==========================================================
 *
 * Currently counts all accounts belonging to the user.
 *
 * NOTE:
 * Account ID 4 currently has status NULL.
 * We are NOT deleting or modifying it here.
 *
 * If later you decide dashboard should show only ACTIVE
 * accounts, change this query to:
 *
 * AND status = 'ACTIVE'
 *
 * ==========================================================
 */

export async function getTotalAccounts(userId) {

    const [rows] = await pool.query(
        `
        SELECT
            COUNT(*) AS totalAccounts
        FROM accounts
        WHERE user_id = ?
        `,
        [userId]
    );

    return rows[0];
}


/**
 * ==========================================================
 * RECENT TRANSACTIONS
 * ==========================================================
 *
 * Latest 5 transactions.
 *
 * ==========================================================
 */

export async function getRecentTransactions(userId) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            account_id,
            user_id,
            type,
            amount,
            category,
            description,
            transaction_date,
            created_at
        FROM transactions
        WHERE user_id = ?
        ORDER BY created_at DESC
        LIMIT 5
        `,
        [userId]
    );

    return rows;
}


/**
 * ==========================================================
 * EXPENSE BY CATEGORY
 * ==========================================================
 *
 * Example:
 *
 * Food       ₹5,000
 * Shopping   ₹3,000
 * Travel     ₹2,000
 *
 * This data will be used by ExpensePieChart.
 *
 * ==========================================================
 */

export async function getExpenseByCategory(userId) {

    const [rows] = await pool.query(
        `
        SELECT
            COALESCE(category, 'Other') AS category,
            IFNULL(SUM(amount), 0) AS amount
        FROM transactions
        WHERE user_id = ?
        AND type = 'EXPENSE'
        GROUP BY category
        ORDER BY amount DESC
        `,
        [userId]
    );

    return rows.map((item) => ({
        category: item.category,
        amount: Number(item.amount || 0),
    }));
}


/**
 * ==========================================================
 * MONTHLY TREND
 * ==========================================================
 *
 * Income and expense are grouped month-wise.
 *
 * IMPORTANT:
 *
 * Monthly chart will NO LONGER depend on recentTransactions.
 *
 * ==========================================================
 */

export async function getMonthlyTrend(userId) {

    const [rows] = await pool.query(
        `
        SELECT
            DATE_FORMAT(transaction_date, '%Y-%m') AS monthKey,

            DATE_FORMAT(
                transaction_date,
                '%b %Y'
            ) AS month,

            IFNULL(
                SUM(
                    CASE
                        WHEN type = 'INCOME'
                        THEN amount
                        ELSE 0
                    END
                ),
                0
            ) AS income,

            IFNULL(
                SUM(
                    CASE
                        WHEN type = 'EXPENSE'
                        THEN amount
                        ELSE 0
                    END
                ),
                0
            ) AS expense

        FROM transactions

        WHERE user_id = ?

        GROUP BY
            DATE_FORMAT(transaction_date, '%Y-%m'),
            DATE_FORMAT(transaction_date, '%b %Y')

        ORDER BY monthKey ASC

        LIMIT 12
        `,
        [userId]
    );

    return rows.map((item) => ({
        monthKey: item.monthKey,
        month: item.month,
        income: Number(item.income || 0),
        expense: Number(item.expense || 0),
    }));
}