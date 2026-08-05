/**
 * ==========================================================
 * FINVERSE AI
 * User Model
 * ----------------------------------------------------------
 * Responsibility:
 * - Database Queries
 * - No Business Logic
 * ==========================================================
 */

import pool from "../config/db.js";

/* ----------------------------------------
   Find User By Email
---------------------------------------- */

export async function findUserByEmail(email) {

    const [rows] = await pool.execute(
        `SELECT *
        FROM users
        WHERE email = ?
        LIMIT 1
        `,
        [email]
    );
    return rows[0];
}

/* ----------------------------------------
   Create User
---------------------------------------- */

export async function createUser({
    full_name,
    email,
    password,
    role = "USER",

}) {

    const [result] = await pool.execute(
        `INSERT INTO users
        (
            full_name,
            email,
            password,
            role
        )
        VALUES (?, ?, ?, ?)`,
        [
            full_name,
            email,
            password,
            role,
        ]
    );

    return result.insertId;

}