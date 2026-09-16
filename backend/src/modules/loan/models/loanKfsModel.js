/**
 * ==========================================================
 * FINVERSE
 * Key Facts Statement (KFS) Model
 * ==========================================================
 */

import pool from "../../../config/db.js";

export async function createKfsRecord(data) {
    const {
        application_id,
        loan_id = null,
        kfs_number,
        sanctioned_amount,
        interest_rate,
        apr,
        tenure_months,
        emi_amount,
        total_interest,
        processing_fee = 0,
        documentation_fee = 0,
        insurance_charge = 0,
        total_repayment,
        penal_charge_rules = "2% per month on overdue EMI",
        foreclosure_terms = "3% foreclosure fee on outstanding principal"
    } = data;

    const [result] = await pool.query(
        `INSERT INTO loan_kfs_records (
            application_id, loan_id, kfs_number, sanctioned_amount,
            interest_rate, apr, tenure_months, emi_amount, total_interest,
            processing_fee, documentation_fee, insurance_charge, total_repayment,
            penal_charge_rules, foreclosure_terms
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            application_id, loan_id, kfs_number, sanctioned_amount,
            interest_rate, apr, tenure_months, emi_amount, total_interest,
            processing_fee, documentation_fee, insurance_charge, total_repayment,
            penal_charge_rules, foreclosure_terms
        ]
    );

    return { id: result.insertId, ...data };
}

export async function getKfsByApplicationId(applicationId) {
    const [rows] = await pool.query(
        `SELECT * FROM loan_kfs_records WHERE application_id = ? ORDER BY id DESC LIMIT 1`,
        [applicationId]
    );
    return rows[0] || null;
}

export async function getKfsById(id) {
    const [rows] = await pool.query(
        `SELECT * FROM loan_kfs_records WHERE id = ?`,
        [id]
    );
    return rows[0] || null;
}

export async function updateKfsStatus(id, status) {
    await pool.query(
        `UPDATE loan_kfs_records SET status = ? WHERE id = ?`,
        [status, id]
    );
    return getKfsById(id);
}
