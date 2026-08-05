/**
 * ==========================================================
 * FINVERSE AI
 * Dashboard Model
 * ==========================================================
 */

import pool from "../config/db.js";

/* ==========================================================
   Total Balance
========================================================== */

export async function getTotalBalance() {

    const [rows] = await pool.query(`
        SELECT IFNULL(SUM(balance),0) AS totalBalance
        FROM accounts
        WHERE status='ACTIVE'
    `);

    return rows[0];

}

/* ==========================================================
   Total Income
========================================================== */

export async function getTotalIncome() {

    const [rows] = await pool.query(`
        SELECT IFNULL(SUM(amount),0) AS totalIncome
        FROM transactions
        WHERE type='INCOME'
    `);

    return rows[0];

}

/* ==========================================================
   Total Expense
========================================================== */

export async function getTotalExpense() {

    const [rows] = await pool.query(`
        SELECT IFNULL(SUM(amount),0) AS totalExpense
        FROM transactions
        WHERE type='EXPENSE'
    `);

    return rows[0];

}

/* ==========================================================
   Total Accounts
========================================================== */

export async function getTotalAccounts() {

    const [rows] = await pool.query(`
        SELECT COUNT(*) AS totalAccounts
        FROM accounts
    `);

    return rows[0];

}

/* ==========================================================
   Recent Transactions
========================================================== */

export async function getRecentTransactions() {

    const [rows] = await pool.query(`
        SELECT *
        FROM transactions
        ORDER BY created_at DESC
        LIMIT 5
    `);

    return rows;

}