/**
 * ==========================================================
 * FINVERSE AI
 * Admin Dashboard Model
 * ==========================================================
 *
 * Responsibility:
 *
 * - Database queries for Admin Dashboard
 * - Platform-level read operations
 *
 * IMPORTANT:
 *
 * - No business logic
 * - No authentication logic
 * - No HTTP logic
 *
 * ==========================================================
 */

import pool from "../../config/db.js";


// ==========================================================
// USERS
// ==========================================================

export async function getTotalUsers() {

    const [rows] = await pool.execute(`
        SELECT COUNT(*) AS total
        FROM users
    `);

    return Number(rows[0]?.total || 0);

}


export async function getActiveUsers() {

    const [rows] = await pool.execute(`
        SELECT COUNT(*) AS total
        FROM users
        WHERE is_active = 1
        AND role = 'USER'
    `);

    return Number(rows[0]?.total || 0);

}


// ==========================================================
// ACCOUNTS
// ==========================================================

export async function getTotalAccounts() {

    const [rows] = await pool.execute(`
        SELECT COUNT(*) AS total
        FROM accounts
    `);

    return Number(rows[0]?.total || 0);

}


export async function getActiveAccounts() {

    const [rows] = await pool.execute(`
        SELECT COUNT(*) AS total
        FROM accounts
        WHERE status = 'ACTIVE'
    `);

    return Number(rows[0]?.total || 0);

}


// ==========================================================
// TRANSACTIONS
// ==========================================================

export async function getTotalTransactions() {

    const [rows] = await pool.execute(`
        SELECT COUNT(*) AS total
        FROM transactions
    `);

    return Number(rows[0]?.total || 0);

}


export async function getTotalIncome() {

    const [rows] = await pool.execute(`
        SELECT COALESCE(SUM(amount), 0) AS total
        FROM transactions
        WHERE type = 'INCOME'
    `);

    return Number(rows[0]?.total || 0);

}


export async function getTotalExpense() {

    const [rows] = await pool.execute(`
        SELECT COALESCE(SUM(amount), 0) AS total
        FROM transactions
        WHERE type = 'EXPENSE'
    `);

    return Number(rows[0]?.total || 0);

}


// ==========================================================
// LOANS
// ==========================================================

export async function getTotalLoans() {
    try {
        const [rows] = await pool.execute(`
            SELECT COUNT(*) AS total
            FROM loans
        `);
        return Number(rows[0]?.total || 0);
    } catch (e) {
        try {
            const [rows] = await pool.execute(`
                SELECT COUNT(*) AS total
                FROM loan_applications
            `);
            return Number(rows[0]?.total || 0);
        } catch (err) {
            return 0;
        }
    }
}

export async function getActiveLoans() {
    try {
        const [rows] = await pool.execute(`
            SELECT COUNT(*) AS total
            FROM loans
            WHERE status IN ('ACTIVE', 'DISBURSED', 'APPROVED')
        `);
        return Number(rows[0]?.total || 0);
    } catch (e) {
        try {
            const [rows] = await pool.execute(`
                SELECT COUNT(*) AS total
                FROM loan_applications
                WHERE status = 'APPROVED'
            `);
            return Number(rows[0]?.total || 0);
        } catch (err) {
            return 0;
        }
    }
}


// ==========================================================
// INVESTMENTS
// ==========================================================

export async function getTotalInvestments() {
    try {
        const [rows] = await pool.execute(`
            SELECT COUNT(*) AS total
            FROM investments
        `);
        return Number(rows[0]?.total || 0);
    } catch (err) {
        return 0;
    }
}


export async function getTotalInvestedAmount() {
    try {
        const [rows] = await pool.execute(`
            SELECT COALESCE(SUM(invested_amount), 0) AS total
            FROM investments
        `);
        return Number(rows[0]?.total || 0);
    } catch (err) {
        return 0;
    }
}


export async function getTotalCurrentInvestmentValue() {
    try {
        const [rows] = await pool.execute(`
            SELECT COALESCE(SUM(current_value), 0) AS total
            FROM investments
        `);
        return Number(rows[0]?.total || 0);
    } catch (err) {
        return 0;
    }
}