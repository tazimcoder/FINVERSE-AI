/**
 * ==========================================================
 * FINVERSE AI
 * Admin Transaction Model
 * ==========================================================
 *
 * Responsibility:
 *
 * - Fetch all platform transactions
 * - Fetch single transaction
 * - Include user information
 * - Include account information
 * - Include transaction metadata
 * - Admin-only data access
 *
 * IMPORTANT:
 *
 * This model is separate from:
 *
 * src/models/transaction.model.js
 *
 * Existing USER transaction functionality
 * will NOT be modified.
 *
 * ==========================================================
 */

import pool from "../../config/db.js";

// Helper to ensure is_deleted column exists in MySQL transactions table
export async function ensureTransactionSoftDeleteColumnExist() {
    try {
        const [cols] = await pool.query(`SHOW COLUMNS FROM transactions`);
        const colNames = cols.map((c) => c.Field);

        if (!colNames.includes("is_deleted")) {
            await pool.query(`ALTER TABLE transactions ADD COLUMN is_deleted TINYINT(1) DEFAULT 0`);
        }
    } catch (err) {
        console.warn("⚠️ Transaction column check warning:", err.message);
    }
}

// ==========================================================
// GET ALL TRANSACTIONS
// ==========================================================

export async function findAllTransactions() {
    await ensureTransactionSoftDeleteColumnExist();

    const [rows] = await pool.query(
        `
        SELECT
            t.id,
            t.user_id,
            t.account_id,

            t.type,
            t.category,
            t.amount,
            t.description,
            t.transaction_date,
            t.created_at,

            u.full_name AS user_name,
            u.email AS user_email,

            a.account_name,
            a.account_number,
            a.account_type,
            a.status AS account_status

        FROM transactions t

        LEFT JOIN users u
            ON t.user_id = u.id

        LEFT JOIN accounts a
            ON t.account_id = a.id

        WHERE (t.is_deleted IS NULL OR t.is_deleted = 0)

        ORDER BY
            t.transaction_date DESC,
            t.id DESC
        `
    );

    return rows;
}

// ==========================================================
// GET TRANSACTION BY ID
// ==========================================================

export async function findTransactionById(id) {
    await ensureTransactionSoftDeleteColumnExist();

    const [rows] = await pool.query(
        `
        SELECT
            t.id,
            t.user_id,
            t.account_id,

            t.type,
            t.category,
            t.amount,
            t.description,
            t.transaction_date,
            t.created_at,

            u.full_name AS user_name,
            u.email AS user_email,

            a.account_name,
            a.account_number,
            a.account_type,
            a.balance AS account_balance,
            a.status AS account_status

        FROM transactions t

        LEFT JOIN users u
            ON t.user_id = u.id

        LEFT JOIN accounts a
            ON t.account_id = a.id

        WHERE t.id = ?

        LIMIT 1
        `,
        [id]
    );

    return rows[0];
}

// ==========================================================
// SOFT DELETE TRANSACTION
// ==========================================================

export async function deleteTransactionById(id) {
    await ensureTransactionSoftDeleteColumnExist();

    const [result] = await pool.query(
        `
        UPDATE transactions
        SET is_deleted = 1
        WHERE id = ?
        `,
        [id]
    );

    return result.affectedRows;
}

// ==========================================================
// RESTORE TRANSACTION
// ==========================================================

export async function restoreTransactionById(id) {
    await ensureTransactionSoftDeleteColumnExist();

    const [result] = await pool.query(
        `
        UPDATE transactions
        SET is_deleted = 0
        WHERE id = ?
        `,
        [id]
    );

    return result.affectedRows;
}