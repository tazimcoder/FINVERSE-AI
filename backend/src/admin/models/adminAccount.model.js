/**
 * ==========================================================
 * FINVERSE AI
 * Admin Account Model
 * ==========================================================
 *
 * Responsibility:
 *
 * - Database access for Admin Account Management
 * - Fetch all financial accounts
 * - Fetch single financial account
 * - Update account status
 *
 * IMPORTANT:
 *
 * - No Express logic
 * - No HTTP response handling
 * - No frontend logic
 * - No authentication logic
 *
 * ==========================================================
 */

import pool from "../../config/db.js";

// Helper to ensure is_deleted column and status column schema compatibility exist in MySQL accounts table
export async function ensureAccountSoftDeleteColumnExist() {
    try {
        const [cols] = await pool.query(`SHOW COLUMNS FROM accounts`);
        const colNames = cols.map((c) => c.Field);

        if (!colNames.includes("is_deleted")) {
            await pool.query(`ALTER TABLE accounts ADD COLUMN is_deleted TINYINT(1) DEFAULT 0`);
        }

        const statusCol = cols.find((c) => c.Field === "status");
        if (statusCol && statusCol.Type.startsWith("enum")) {
            await pool.query(`ALTER TABLE accounts MODIFY COLUMN status VARCHAR(20) DEFAULT 'ACTIVE'`);
        }
    } catch (err) {
        console.warn("⚠️ Account column check warning:", err.message);
    }
}

// ==========================================================
// GET ALL ACCOUNTS (EXCLUDES SOFT-DELETED ACCOUNTS FROM UI)
// ==========================================================

export async function findAllAccounts() {
    await ensureAccountSoftDeleteColumnExist();

    const [rows] = await pool.query(
        `
        SELECT
            a.*,
            u.full_name,
            u.email
        FROM accounts a
        LEFT JOIN users u
            ON a.user_id = u.id
        WHERE (a.is_deleted IS NULL OR a.is_deleted = 0)
          AND (a.status IS NULL OR LOWER(a.status) != 'deleted')
        ORDER BY a.id DESC
        `
    );

    return rows;
}

// ==========================================================
// GET SINGLE ACCOUNT
// ==========================================================

export async function findAccountById(id) {
    await ensureAccountSoftDeleteColumnExist();

    const [rows] = await pool.query(
        `
        SELECT
            a.*,
            u.full_name,
            u.email
        FROM accounts a
        LEFT JOIN users u
            ON a.user_id = u.id
        WHERE a.id = ?
        `,
        [id]
    );

    return rows[0];
}

// ==========================================================
// CHECK ACCOUNT EXISTS
// ==========================================================

export async function accountExists(id) {
    const [rows] = await pool.query(
        `
        SELECT id
        FROM accounts
        WHERE id = ?
        LIMIT 1
        `,
        [id]
    );

    return rows.length > 0;
}

// ==========================================================
// UPDATE ACCOUNT STATUS
// ==========================================================
//
// 1 = Active
// 0 = Inactive
//
// ==========================================================

export async function updateAccountActiveStatus(
    id,
    isActive
) {
    const status =
        Number(isActive) === 1
            ? "ACTIVE"
            : "FROZEN";

    const [result] = await pool.query(
        `
        UPDATE accounts
        SET status = ?
        WHERE id = ?
        `,
        [
            status,
            id,
        ]
    );

    return result.affectedRows;
}

// ==========================================================
// SOFT DELETE ACCOUNT (HIDES FROM UI VIEW, PRESERVES IN MYSQL DB)
// ==========================================================

export async function deleteAccountById(id) {
    await ensureAccountSoftDeleteColumnExist();

    const [result] = await pool.query(
        `
        UPDATE accounts
        SET is_deleted = 1, status = 'deleted'
        WHERE id = ?
        `,
        [id]
    );

    return result.affectedRows;
}

// ==========================================================
// RESTORE ACCOUNT (UNDO SOFT DELETE IN MYSQL DB)
// ==========================================================

export async function restoreAccountById(id) {
    await ensureAccountSoftDeleteColumnExist();

    const [result] = await pool.query(
        `
        UPDATE accounts
        SET is_deleted = 0, status = 'ACTIVE'
        WHERE id = ?
        `,
        [id]
    );

    return result.affectedRows;
}