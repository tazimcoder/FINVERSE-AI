/**
 * ==========================================================
 * FINVERSE AI
 * Account Model
 * ==========================================================
 */

import db from "../config/db.js";

/* ==========================================================
   Create Account
========================================================== */

export async function createAccount(account) {

    const {

        user_id,

        account_name,

        account_number,

        account_type,

        balance,

    } = account;

    const [result] = await db.query(

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

            user_id,

            account_name,

            account_number,

            account_type,

            balance,

        ]

    );

    return result.insertId;

}

/* ==========================================================
   Get All Accounts
========================================================== */

export async function getAccounts() {

    const [rows] = await db.query(

        `
        SELECT *
        FROM accounts
        ORDER BY id DESC
        `
    );

    return rows;

}

/* ==========================================================
   Get Account By Id
========================================================== */

export async function getAccountById(id) {

    const [rows] = await db.query(

        `
        SELECT *
        FROM accounts
        WHERE id = ?
        `,

        [id]

    );

    return rows[0];

}

/* ==========================================================
   Delete Account
========================================================== */

export async function deleteAccount(id) {

    const [result] = await db.query(

        `
        DELETE
        FROM accounts
        WHERE id=?
        `,

        [id]

    );

    return result;

}

/* ==========================================================
   Update Account
========================================================== */

export async function updateAccount(id, account) {

    const {

        account_name,

        account_number,

        account_type,

        balance,

        status,

    } = account;

    const [result] = await db.query(

        `
        UPDATE accounts
        SET
            account_name = ?,
            account_number = ?,
            account_type = ?,
            balance = ?,
            status = ?
        WHERE id = ?
        `,

        [

            account_name,

            account_number,

            account_type,

            balance,

            status,

            id,

        ]

    );

    return result;

}