/**
 * ==========================================================
 * FINVERSE
 * Digital Loan Agreement Model
 * ==========================================================
 */

import pool from "../../../config/db.js";

export async function createAgreementRecord(data) {
    const {
        application_id,
        agreement_number,
        agreement_document_url = null,
        version = "v1.0"
    } = data;

    const [result] = await pool.query(
        `INSERT INTO loan_agreements (
            application_id, agreement_number, agreement_document_url, version
        ) VALUES (?, ?, ?, ?)`,
        [application_id, agreement_number, agreement_document_url, version]
    );

    return { id: result.insertId, ...data, status: "GENERATED" };
}

export async function getAgreementByApplicationId(applicationId) {
    const [rows] = await pool.query(
        `SELECT * FROM loan_agreements WHERE application_id = ? ORDER BY id DESC LIMIT 1`,
        [applicationId]
    );
    return rows[0] || null;
}

export async function acceptAgreementRecord(id, signedIp) {
    await pool.query(
        `UPDATE loan_agreements 
         SET status = 'ACCEPTED', accepted_at = CURRENT_TIMESTAMP, signed_ip = ? 
         WHERE id = ?`,
        [signedIp || "127.0.0.1", id]
    );
    const [rows] = await pool.query(`SELECT * FROM loan_agreements WHERE id = ?`, [id]);
    return rows[0];
}
