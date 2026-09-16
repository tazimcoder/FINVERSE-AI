/**
 * ==========================================================
 * FINVERSE AI
 * Admin Account Model
 * ==========================================================
 *
 * Responsibility:
 *
 * - Fetch all platform accounts for Admin
 * - Fetch single account for Admin
 * - Update account status
 * - Keep database logic separate
 *
 * IMPORTANT:
 *
 * - This is ADMIN account management.
 * - It is different from src/models/account.model.js
 * - No Express logic
 * - No authentication logic
 * - No frontend logic
 *
 * ==========================================================
 */

import pool from "../../config/db.js";


// ==========================================================
// GET ALL ADMIN ACCOUNTS
// ==========================================================
//
// Returns accounts from all users.
//
// ==========================================================

export async function findAllAdminAccounts() {

    const [rows] = await pool.query(
        `
        SELECT
            a.*,
            u.full_name,
            u.email,
            u.role AS user_role
        FROM accounts a
        LEFT JOIN users u
            ON a.user_id = u.id
        ORDER BY a.id DESC
        `
    );

    return rows;

}


// ==========================================================
// GET SINGLE ADMIN ACCOUNT
// ==========================================================

export async function findAdminAccountById(id) {

    const [rows] = await pool.query(
        `
        SELECT
            a.*,
            u.full_name,
            u.email,
            u.role AS user_role
        FROM accounts a
        LEFT JOIN users u
            ON a.user_id = u.id
        WHERE a.id = ?
        LIMIT 1
        `,
        [id]
    );

    return rows[0];

}


// ==========================================================
// UPDATE ACCOUNT STATUS
// ==========================================================
//
// Frontend sends:
//
// is_active = 1
// is_active = 0
//
// Existing accounts table already uses "status"
// in the current Account Model.
//
// Therefore Admin layer converts:
//
// 1 → active
// 0 → inactive
//
// ==========================================================

export async function updateAdminAccountStatus(
    id,
    status
) {

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

    return result;

}


// ==========================================================
// EXPORT
// ==========================================================

export default {

    findAllAdminAccounts,

    findAdminAccountById,

    updateAdminAccountStatus,

};