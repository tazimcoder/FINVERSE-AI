/**
 * ==========================================================
 * FINVERSE
 * Loan Foreclosure & Prepayment Model
 * ==========================================================
 */

import pool from "../../../config/db.js";

export async function createForeclosureRecord(data) {
    const {
        loan_id,
        foreclosure_number,
        outstanding_principal,
        accrued_interest,
        pending_penalties = 0,
        foreclosure_fee = 0,
        final_settlement_amount
    } = data;

    const [result] = await pool.query(
        `INSERT INTO loan_foreclosures (
            loan_id, foreclosure_number, outstanding_principal,
            accrued_interest, pending_penalties, foreclosure_fee, final_settlement_amount
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            loan_id, foreclosure_number, outstanding_principal,
            accrued_interest, pending_penalties, foreclosure_fee, final_settlement_amount
        ]
    );

    return { id: result.insertId, ...data, status: "REQUESTED" };
}

export async function getForeclosureByLoanId(loanId) {
    const [rows] = await pool.query(
        `SELECT * FROM loan_foreclosures WHERE loan_id = ? ORDER BY id DESC LIMIT 1`,
        [loanId]
    );
    return rows[0] || null;
}

export async function updateForeclosureStatus(id, status) {
    await pool.query(
        `UPDATE loan_foreclosures SET status = ?, processed_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [status, id]
    );
    const [rows] = await pool.query(`SELECT * FROM loan_foreclosures WHERE id = ?`, [id]);
    return rows[0];
}
