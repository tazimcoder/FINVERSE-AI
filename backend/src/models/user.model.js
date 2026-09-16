/**
 * ==========================================================
 * FINVERSE
 * User Model
 * ----------------------------------------------------------
 * Responsibility:
 * - Database Queries
 * - No Business Logic
 * ==========================================================
 */

import pool from "../config/db.js";

/* ----------------------------------------
   Ensure Mobile Column Exists in DB
---------------------------------------- */
export async function ensureMobileColumnExists() {
    try {
        const [columns] = await pool.execute(`SHOW COLUMNS FROM users LIKE 'mobile'`);
        if (columns.length === 0) {
            await pool.execute(`ALTER TABLE users ADD COLUMN mobile VARCHAR(20) DEFAULT NULL AFTER email`);
            console.log("✅ Added 'mobile' column to users table.");
        }
    } catch (err) {
        console.warn("⚠️ Column check warning:", err.message);
    }
}

/* ----------------------------------------
   Find User By Email
---------------------------------------- */

export async function findUserByEmail(email) {
    const cleanEmail = email ? email.trim().toLowerCase() : "";
    const [rows] = await pool.execute(
        `SELECT *
        FROM users
        WHERE LOWER(email) = LOWER(?)
        LIMIT 1
        `,
        [cleanEmail]
    );
    return rows[0];
}

/* ----------------------------------------
   Find User By Mobile
---------------------------------------- */

export async function findUserByMobile(mobile) {
    const cleanMobile = mobile ? mobile.trim() : "";
    const [rows] = await pool.execute(
        `SELECT *
        FROM users
        WHERE mobile = ?
        LIMIT 1
        `,
        [cleanMobile]
    );
    return rows[0];
}

/* ----------------------------------------
   Find User By Email or Mobile
---------------------------------------- */

export async function findUserByEmailOrMobile(identifier) {
    const cleanId = identifier ? identifier.trim().toLowerCase() : "";
    const rawId = identifier ? identifier.trim() : "";
    const [rows] = await pool.execute(
        `SELECT *
        FROM users
        WHERE LOWER(email) = LOWER(?) OR mobile = ?
        LIMIT 1
        `,
        [cleanId, rawId]
    );
    return rows[0];
}

/* ----------------------------------------
   Find User By ID
---------------------------------------- */

export async function findUserById(id) {
    const [rows] = await pool.execute(
        `SELECT id, full_name, email, mobile, avatar_url, role, is_active, created_at, updated_at
        FROM users
        WHERE id = ?
        LIMIT 1
        `,
        [id]
    );
    return rows[0];
}

/* ----------------------------------------
   Create User (With Mobile Support)
---------------------------------------- */

export async function createUser({
    full_name,
    email,
    mobile = null,
    password,
    role = "USER",
}) {
    const [result] = await pool.execute(
        `INSERT INTO users
        (
            full_name,
            email,
            mobile,
            password,
            role
        )
        VALUES (?, ?, ?, ?, ?)`,
        [
            full_name,
            email,
            mobile,
            password,
            role,
        ]
    );

    return result.insertId;
}

/* ----------------------------------------
   Find User With Password By ID
---------------------------------------- */

export async function findUserWithPasswordById(id) {
    const [rows] = await pool.execute(
        `SELECT * FROM users WHERE id = ? LIMIT 1`,
        [id]
    );
    return rows[0];
}

/* ----------------------------------------
   Update User Profile In DB
---------------------------------------- */

export async function updateUserProfileInDb(id, { full_name, mobile, password }) {
    if (password) {
        const [result] = await pool.execute(
            `UPDATE users SET full_name = ?, mobile = ?, password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
            [full_name, mobile || null, password, id]
        );
        return result.affectedRows;
    } else {
        const [result] = await pool.execute(
            `UPDATE users SET full_name = ?, mobile = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
            [full_name, mobile || null, id]
        );
        return result.affectedRows;
    }
}

/* ----------------------------------------
   Update User Password By Email In DB
---------------------------------------- */

export async function updateUserPasswordByEmailInDb(email, hashedPassword) {
    const cleanEmail = email ? email.trim().toLowerCase() : "";
    const [result] = await pool.execute(
        `UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE LOWER(email) = LOWER(?)`,
        [hashedPassword, cleanEmail]
    );
    return result.affectedRows;
}