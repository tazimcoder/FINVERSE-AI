/**
 * ==========================================================
 * FINVERSE AI
 * Budget Model
 * ==========================================================
 */

import pool from "../config/db.js";


/* ==========================================================
   Create Budget
========================================================== */

export async function createBudgetModel(
    userId,
    data
) {

    const {
        month,
        year,
        budget_amount,
    } = data;


    const [result] = await pool.execute(

        `
        INSERT INTO budgets
        (
            user_id,
            month,
            year,
            budget_amount
        )
        VALUES (?, ?, ?, ?)
        `,

        [
            userId,
            month,
            year,
            budget_amount,
        ]

    );


    return result.insertId;

}


/* ==========================================================
   Get All Budgets
   Only logged-in user's budgets
========================================================== */

export async function getBudgetsModel(userId) {

    const [rows] = await pool.execute(

        `
        SELECT *
        FROM budgets
        WHERE user_id = ?
        ORDER BY year DESC, month DESC
        `,

        [userId]

    );


    return rows;

}


/* ==========================================================
   Get Budget By Id
   Only if budget belongs to logged-in user
========================================================== */

export async function getBudgetByIdModel(
    id,
    userId
) {

    const [rows] = await pool.execute(

        `
        SELECT *
        FROM budgets
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


/* ==========================================================
   Update Budget
   Only if budget belongs to logged-in user
========================================================== */

export async function updateBudgetModel(
    id,
    userId,
    data
) {

    const {
        month,
        year,
        budget_amount,
    } = data;


    await pool.execute(

        `
        UPDATE budgets
        SET
            month = ?,
            year = ?,
            budget_amount = ?
        WHERE id = ?
        AND user_id = ?
        `,

        [
            month,
            year,
            budget_amount,
            id,
            userId,
        ]

    );

}


/* ==========================================================
   Delete Budget
   Only if budget belongs to logged-in user
========================================================== */

export async function deleteBudgetModel(
    id,
    userId
) {

    await pool.execute(

        `
        DELETE FROM budgets
        WHERE id = ?
        AND user_id = ?
        `,

        [
            id,
            userId,
        ]

    );

}