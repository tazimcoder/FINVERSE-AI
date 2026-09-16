/**
 * ==========================================================
 * FINVERSE
 * No Objection Certificate (NOC) Model
 * ==========================================================
 */

import pool from "../../../config/db.js";

export async function createNocRecord(loanId, nocNumber, docUrl = null) {
    const [result] = await pool.query(
        `INSERT INTO loan_nocs (loan_id, noc_number, noc_document_url)
         VALUES (?, ?, ?)`,
        [loanId, nocNumber, docUrl]
    );
    return { id: result.insertId, loan_id: loanId, noc_number: nocNumber, noc_document_url: docUrl, status: "ISSUED" };
}

export async function getNocByLoanId(loanId) {
    const [rows] = await pool.query(
        `SELECT * FROM loan_nocs WHERE loan_id = ? ORDER BY id DESC LIMIT 1`,
        [loanId]
    );
    return rows[0] || null;
}
