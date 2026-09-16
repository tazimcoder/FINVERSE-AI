/**
 * ==========================================================
 * FINVERSE AI
 * Investment Model
 * ==========================================================
 */

import pool from "../config/db.js";

/* ==========================================================
Get All Investments
========================================================== */

export async function getInvestments(userId) {

    const [rows] = await pool.execute(
        `
        SELECT

            i.id,
            i.user_id,
            i.investment_type_id,

            t.name AS type,

            i.name,
            i.invested_amount,
            i.current_value,
            i.quantity,
            i.purchase_price,
            i.purchase_date,
            i.notes,
            i.created_at

        FROM investments i

        INNER JOIN investment_types t

            ON t.id = i.investment_type_id

        WHERE i.user_id = ?

        ORDER BY i.created_at DESC
        `,
        [userId]
    );

    return rows;

}

/* ==========================================================
Get Investment By Id
========================================================== */

export async function getInvestmentById(id, userId) {

    const [rows] = await pool.execute(
        `
        SELECT *

        FROM investments

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
Create Investment
========================================================== */

export async function createInvestment(data) {

    const [result] = await pool.execute(
        `
        INSERT INTO investments
        (
            user_id,
            investment_type_id,
            name,
            invested_amount,
            current_value,
            quantity,
            purchase_price,
            purchase_date,
            notes
        )

        VALUES
        (
            ?,?,?,?,?,?,?,?,?
        )
        `,
        [
            data.user_id,
            data.investment_type_id,
            data.name,
            data.invested_amount,
            data.current_value,
            data.quantity,
            data.purchase_price,
            data.purchase_date,
            data.notes ?? null,
        ]
    );

    return result.insertId;

}

/* ==========================================================
Update Investment
========================================================== */

export async function updateInvestment(id, userId, data) {

    await pool.execute(
        `
        UPDATE investments

        SET

            investment_type_id = ?,
            name = ?,
            invested_amount = ?,
            current_value = ?,
            quantity = ?,
            purchase_price = ?,
            purchase_date = ?,
            notes = ?

        WHERE

            id = ?
            AND user_id = ?
        `,
        [
            data.investment_type_id,
            data.name,
            data.invested_amount,
            data.current_value,
            data.quantity,
            data.purchase_price,
            data.purchase_date,
            data.notes ?? null,
            id,
            userId,
        ]
    );

}

/* ==========================================================
Delete Investment
========================================================== */

export async function deleteInvestment(id, userId) {

    await pool.execute(
        `
        DELETE FROM investments

        WHERE id = ?
        AND user_id = ?
        `,
        [
            id,
            userId,
        ]
    );

}

/* ==========================================================
Portfolio Summary
========================================================== */

export async function getPortfolioSummary(userId) {

    const [rows] = await pool.execute(

        `
        SELECT

            COUNT(*) AS totalAssets,

            IFNULL(
                SUM(invested_amount),
                0
            ) AS totalInvestment,

            IFNULL(
                SUM(current_value),
                0
            ) AS currentValue,

            IFNULL(
                SUM(current_value - invested_amount),
                0
            ) AS profit

        FROM investments

        WHERE user_id = ?
        `,

        [userId]

    );

    const summary = rows[0];

    const totalInvestment = Number(summary.totalInvestment);

    const currentValue = Number(summary.currentValue);

    const profit = Number(summary.profit);

    const roi =

        totalInvestment === 0

            ? 0

            : Number(

                (

                    (profit / totalInvestment) * 100

                ).toFixed(2)

            );

    /* ================= Best Investment ================= */

    const [bestRows] = await pool.execute(

        `
        SELECT

            id,

            name,

            invested_amount,

            current_value,

            (current_value - invested_amount) AS profit

        FROM investments

        WHERE user_id = ?

        ORDER BY profit DESC

        LIMIT 1
        `,

        [userId]

    );

    /* ================= Worst Investment ================= */

    const [worstRows] = await pool.execute(

        `
        SELECT

            id,

            name,

            invested_amount,

            current_value,

            (current_value - invested_amount) AS profit

        FROM investments

        WHERE user_id = ?

        ORDER BY profit ASC

        LIMIT 1
        `,

        [userId]

    );

    return {

        totalAssets: Number(summary.totalAssets),

        totalInvestment,

        currentValue,

        profit,

        roi,

        bestInvestment:

            bestRows.length

                ? bestRows[0]

                : null,

        worstInvestment:

            worstRows.length

                ? worstRows[0]

                : null,

    };

}

/* ==========================================================
Portfolio Allocation
========================================================== */

export async function getPortfolioAllocation(userId) {

    const [rows] = await pool.execute(

        `
        SELECT

            t.name AS type,

            SUM(i.invested_amount) AS amount,

            COUNT(i.id) AS totalInvestments

        FROM investments i

        INNER JOIN investment_types t

            ON i.investment_type_id = t.id

        WHERE i.user_id = ?

        GROUP BY

            t.id,
            t.name

        ORDER BY amount DESC
        `,

        [userId]

    );

    return rows;

}

/* ==========================================================
Investment Types
========================================================== */

export async function getInvestmentTypes() {

    const [rows] = await pool.execute(
        `
        SELECT *

        FROM investment_types

        ORDER BY name
        `
    );

    return rows;

}

/* ==========================================================
Portfolio Growth
========================================================== */

export async function getPortfolioGrowth(userId) {

    const [rows] = await pool.execute(

        `
        SELECT

            DATE_FORMAT(
                MIN(purchase_date),
                '%b %Y'
            ) AS month,

            SUM(invested_amount) AS investment,

            SUM(current_value) AS currentValue,

            SUM(current_value - invested_amount) AS profit

        FROM investments

        WHERE user_id = ?

        GROUP BY

            YEAR(purchase_date),
            MONTH(purchase_date)

        ORDER BY

            YEAR(purchase_date),
            MONTH(purchase_date)
        `,

        [
            userId,
        ]

    );

    return rows;

}