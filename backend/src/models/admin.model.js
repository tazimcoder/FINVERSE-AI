/**
 * ==========================================================
 * FINVERSE AI
 * Admin Model
 * ==========================================================
 *
 * Responsibility:
 *
 * - Admin database queries
 * - User management queries
 * - No business logic
 * - No authorization logic
 *
 * ==========================================================
 */

import pool from "../config/db.js";

// ==========================================================
// Get All Users
// ==========================================================

export async function getAllUsers() {

    const [rows] = await pool.execute(
        `
        SELECT
            id,
            full_name,
            email,
            role,
            is_active,
            created_at,
            updated_at
        FROM users
        ORDER BY created_at DESC
        `
    );

    return rows;
}


// ==========================================================
// Get User By ID
// ==========================================================

export async function getUserById(id) {

    const [rows] = await pool.execute(
        `
        SELECT
            id,
            full_name,
            email,
            role,
            is_active,
            created_at,
            updated_at
        FROM users
        WHERE id = ?
        LIMIT 1
        `,
        [id]
    );

    return rows[0];
}


// ==========================================================
// Update User Status
// ==========================================================

export async function updateUserStatus(
    id,
    is_active
) {

    const [result] = await pool.execute(
        `
        UPDATE users
        SET
            is_active = ?
        WHERE id = ?
        `,
        [
            is_active,
            id,
        ]
    );

    return result;
}