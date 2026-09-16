/**
 * ==========================================================
 * FINVERSE AI
 * Account Model
 * User-Specific & Secure
 * ==========================================================
 */

import pool from "../config/db.js";

// ==========================================================
// Create Account
// ==========================================================

export async function createAccount(userId, account) {

    const {
        account_name,
        account_number,
        account_type,
        balance,
    } = account;

    const [result] = await pool.query(
        `
        INSERT INTO accounts
        (
            user_id,
            account_name,
            account_number,
            account_type,
            balance
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            userId,
            account_name,
            account_number,
            account_type,
            balance ?? 0,
        ]
    );

    return result.insertId;
}


// ==========================================================
// Get All Accounts — Logged-in User Only
// ==========================================================

export async function getAccounts(userId) {

    const [rows] = await pool.query(
        `
        SELECT *
        FROM accounts
        WHERE user_id = ?
        ORDER BY id DESC
        `,
        [userId]
    );

    return rows;
}


// ==========================================================
// Get Account By ID — Logged-in User Only
// ==========================================================

export async function getAccountById(id, userId) {

    const [rows] = await pool.query(
        `
        SELECT *
        FROM accounts
        WHERE id = ?
        AND user_id = ?
        `,
        [
            id,
            userId,
        ]
    );

    return rows[0];
}


// ==========================================================
// Update Account — Logged-in User Only
// ==========================================================

export async function updateAccount(
    id,
    userId,
    account
) {

    const {
        account_name,
        account_number,
        account_type,
        balance,
        status,
    } = account;

    const [result] = await pool.query(
        `
        UPDATE accounts
        SET
            account_name = ?,
            account_number = ?,
            account_type = ?,
            balance = ?,
            status = ?
        WHERE id = ?
        AND user_id = ?
        `,
        [
            account_name,
            account_number,
            account_type,
            balance,
            status,
            id,
            userId,
        ]
    );

    return result;
}


// ==========================================================
// Delete Account — Logged-in User Only
// ==========================================================

export async function deleteAccount(
    id,
    userId
) {

    const [result] = await pool.query(
        `
        DELETE FROM accounts
        WHERE id = ?
        AND user_id = ?
        `,
        [
            id,
            userId,
        ]
    );

    return result;
}