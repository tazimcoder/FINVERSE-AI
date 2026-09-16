/**
 * ==========================================================
 * FINVERSE AI
 * Analytics Model
 * ==========================================================
 */

import pool from "../config/db.js";


/* ==========================================================
   Income vs Expense
========================================================== */

export async function getIncomeExpenseAnalytics(userId) {

    const [rows] = await pool.execute(

        `

        SELECT

            COALESCE(
                SUM(
                    CASE
                        WHEN type = 'INCOME'
                        THEN amount
                        ELSE 0
                    END
                ),
                0
            ) AS totalIncome,

            COALESCE(
                SUM(
                    CASE
                        WHEN type = 'EXPENSE'
                        THEN amount
                        ELSE 0
                    END
                ),
                0
            ) AS totalExpense

        FROM transactions

        WHERE user_id = ?

        `,

        [userId]

    );


    return rows[0];

}


/* ==========================================================
   Expense By Category
========================================================== */

export async function getExpenseByCategory(userId) {

    const [rows] = await pool.execute(

        `

        SELECT

            category,

            SUM(amount) AS amount

        FROM transactions

        WHERE

            user_id = ?

            AND type = 'EXPENSE'

        GROUP BY category

        ORDER BY amount DESC

        `,

        [userId]

    );


    return rows;

}


/* ==========================================================
   Monthly Analytics
========================================================== */

export async function getMonthlyAnalytics(userId) {

    const [rows] = await pool.execute(

        `

        SELECT

            YEAR(transaction_date) AS year,

            MONTH(transaction_date) AS monthNumber,

            DATE_FORMAT(
                MIN(transaction_date),
                '%b'
            ) AS month,

            SUM(
                CASE
                    WHEN type = 'INCOME'
                    THEN amount
                    ELSE 0
                END
            ) AS income,

            SUM(
                CASE
                    WHEN type = 'EXPENSE'
                    THEN amount
                    ELSE 0
                END
            ) AS expense

        FROM transactions

        WHERE user_id = ?

        GROUP BY

            YEAR(transaction_date),

            MONTH(transaction_date)

        ORDER BY

            YEAR(transaction_date),

            MONTH(transaction_date)

        `,

        [userId]

    );


    return rows;

}