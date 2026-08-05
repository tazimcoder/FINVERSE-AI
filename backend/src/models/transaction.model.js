/**
 * ==========================================================
 * FINVERSE AI
 * Transaction Model
 * ==========================================================
 */

import pool from "../config/db.js";

/* ==========================================================
   Create Transaction
========================================================== */

export async function createTransaction(data) {

    const {

        user_id,

        account_id,

        type,

        category,

        amount,

        description,

        transaction_date,

    } = data;

    const [result] = await pool.query(

        `
        INSERT INTO transactions (

            user_id,
            account_id,
            type,
            category,
            amount,
            description,
            transaction_date

        )

        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,

        [

            user_id,

            account_id,

            type,

            category,

            amount,

            description,

            transaction_date,

        ]

    );

    return result.insertId;

}

/* ==========================================================
   Get All Transactions
========================================================== */

export async function getAllTransactions() {

    const [rows] = await pool.query(

        `
        SELECT *

        FROM transactions

        ORDER BY transaction_date DESC
        `
    );

    return rows;

}

/* ==========================================================
   Get Transaction By Id
========================================================== */

export async function getTransactionById(id) {

    const [rows] = await pool.query(

        `
        SELECT *

        FROM transactions

        WHERE id = ?
        `,

        [id]

    );

    return rows[0];

}

/* ==========================================================
   Update Transaction
========================================================== */

export async function updateTransaction(id, data) {

    const {

        account_id,

        type,

        category,

        amount,

        description,

        transaction_date,

    } = data;

    await pool.query(

        `
        UPDATE transactions

        SET

        account_id=?,

        type=?,

        category=?,

        amount=?,

        description=?,

        transaction_date=?

        WHERE id=?
        `,

        [

            account_id,

            type,

            category,

            amount,

            description,

            transaction_date,

            id,

        ]

    );

}

/* ==========================================================
   Delete Transaction
========================================================== */

export async function deleteTransaction(id) {

    await pool.query(

        `
        DELETE FROM transactions

        WHERE id=?
        `,

        [id]

    );

}