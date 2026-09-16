/**
 * ==========================================================
 * FINVERSE AI
 * Loan Disbursement Model
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/models/loanDisbursementModel.js
 *
 * Database Table:
 * loan_disbursements
 *
 * Responsibility:
 *
 * - Fetch all loan disbursements
 * - Fetch disbursement by ID
 * - Fetch by loan
 * - Fetch by loan application
 * - Fetch by loan offer
 * - Fetch by disbursement reference
 * - Fetch by destination account
 * - Fetch by transaction
 * - Fetch by status
 * - Create loan disbursement
 * - Update loan disbursement
 * - Update disbursement status
 * - Delete loan disbursement
 *
 * ==========================================================
 */

import pool from "../../../config/db.js";


// ==========================================================
// SELECT COLUMNS
// ==========================================================

const DISBURSEMENT_COLUMNS = `
    id,
    loan_id,
    loan_application_id,
    loan_offer_id,
    disbursement_reference,
    requested_amount,
    approved_amount,
    disbursed_amount,
    disbursement_type,
    disbursement_method,
    destination_account_id,
    processing_fee,
    insurance_amount,
    other_charges,
    net_disbursement_amount,
    transaction_id,
    disbursement_status,
    failure_reason,
    requested_at,
    processed_at,
    disbursed_at,
    remarks,
    created_by_user_id,
    created_at,
    updated_at
`;


// ==========================================================
// GET ALL LOAN DISBURSEMENTS
// ==========================================================

export async function getAllLoanDisbursements() {

    const [rows] = await pool.query(
        `
        SELECT
            ${DISBURSEMENT_COLUMNS}
        FROM loan_disbursements
        ORDER BY created_at DESC
        `
    );

    return rows;
}


// ==========================================================
// GET DISBURSEMENT BY ID
// ==========================================================

export async function getLoanDisbursementById(
    disbursementId
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${DISBURSEMENT_COLUMNS}
        FROM loan_disbursements
        WHERE id = ?
        LIMIT 1
        `,
        [disbursementId]
    );

    return rows[0] || null;
}


// ==========================================================
// GET DISBURSEMENTS BY LOAN
// ==========================================================

export async function getLoanDisbursementsByLoanId(
    loanId
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${DISBURSEMENT_COLUMNS}
        FROM loan_disbursements
        WHERE loan_id = ?
        ORDER BY created_at DESC
        `,
        [loanId]
    );

    return rows;
}


// ==========================================================
// GET DISBURSEMENTS BY APPLICATION
// ==========================================================

export async function getLoanDisbursementsByApplicationId(
    applicationId
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${DISBURSEMENT_COLUMNS}
        FROM loan_disbursements
        WHERE loan_application_id = ?
        ORDER BY created_at DESC
        `,
        [applicationId]
    );

    return rows;
}


// ==========================================================
// GET DISBURSEMENTS BY OFFER
// ==========================================================

export async function getLoanDisbursementsByOfferId(
    offerId
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${DISBURSEMENT_COLUMNS}
        FROM loan_disbursements
        WHERE loan_offer_id = ?
        ORDER BY created_at DESC
        `,
        [offerId]
    );

    return rows;
}


// ==========================================================
// GET DISBURSEMENT BY REFERENCE
// ==========================================================

export async function getLoanDisbursementByReference(
    disbursementReference
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${DISBURSEMENT_COLUMNS}
        FROM loan_disbursements
        WHERE disbursement_reference = ?
        LIMIT 1
        `,
        [disbursementReference]
    );

    return rows[0] || null;
}


// ==========================================================
// GET DISBURSEMENTS BY DESTINATION ACCOUNT
// ==========================================================

export async function getLoanDisbursementsByAccountId(
    accountId
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${DISBURSEMENT_COLUMNS}
        FROM loan_disbursements
        WHERE destination_account_id = ?
        ORDER BY created_at DESC
        `,
        [accountId]
    );

    return rows;
}


// ==========================================================
// GET DISBURSEMENTS BY TRANSACTION
// ==========================================================

export async function getLoanDisbursementsByTransactionId(
    transactionId
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${DISBURSEMENT_COLUMNS}
        FROM loan_disbursements
        WHERE transaction_id = ?
        ORDER BY created_at DESC
        `,
        [transactionId]
    );

    return rows;
}


// ==========================================================
// GET DISBURSEMENTS BY STATUS
// ==========================================================

export async function getLoanDisbursementsByStatus(
    disbursementStatus
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${DISBURSEMENT_COLUMNS}
        FROM loan_disbursements
        WHERE disbursement_status = ?
        ORDER BY created_at DESC
        `,
        [disbursementStatus]
    );

    return rows;
}


// ==========================================================
// CREATE LOAN DISBURSEMENT
// ==========================================================

export async function createLoanDisbursement(
    disbursementData
) {

    const {

        loan_id,
        loan_application_id,
        loan_offer_id,

        disbursement_reference,

        requested_amount,
        approved_amount,
        disbursed_amount,

        disbursement_type,
        disbursement_method,

        destination_account_id,

        processing_fee,
        insurance_amount,
        other_charges,

        net_disbursement_amount,

        transaction_id,

        disbursement_status,

        failure_reason,

        requested_at,
        processed_at,
        disbursed_at,

        remarks,

        created_by_user_id

    } = disbursementData;


    const [result] = await pool.query(
        `
        INSERT INTO loan_disbursements
        (
            loan_id,
            loan_application_id,
            loan_offer_id,

            disbursement_reference,

            requested_amount,
            approved_amount,
            disbursed_amount,

            disbursement_type,
            disbursement_method,

            destination_account_id,

            processing_fee,
            insurance_amount,
            other_charges,

            net_disbursement_amount,

            transaction_id,

            disbursement_status,

            failure_reason,

            requested_at,
            processed_at,
            disbursed_at,

            remarks,

            created_by_user_id
        )
        VALUES
        (
            ?, ?, ?,
            ?,
            ?, ?, ?,
            ?, ?,
            ?,
            ?, ?, ?,
            ?,
            ?,
            ?,
            ?,
            ?, ?, ?,
            ?,
            ?
        )
        `,
        [

            loan_id,
            loan_application_id,
            loan_offer_id ?? null,

            disbursement_reference,

            requested_amount,
            approved_amount ?? null,
            disbursed_amount ?? null,

            disbursement_type ?? "FULL",
            disbursement_method,

            destination_account_id ?? null,

            processing_fee ?? 0,
            insurance_amount ?? 0,
            other_charges ?? 0,

            net_disbursement_amount ?? null,

            transaction_id ?? null,

            disbursement_status ?? "REQUESTED",

            failure_reason ?? null,

            requested_at ?? null,
            processed_at ?? null,
            disbursed_at ?? null,

            remarks ?? null,

            created_by_user_id ?? null

        ]
    );

    return result.insertId;
}


// ==========================================================
// UPDATE LOAN DISBURSEMENT
// ==========================================================

export async function updateLoanDisbursement(
    disbursementId,
    disbursementData
) {

    const {

        loan_offer_id,

        disbursement_reference,

        requested_amount,
        approved_amount,
        disbursed_amount,

        disbursement_type,
        disbursement_method,

        destination_account_id,

        processing_fee,
        insurance_amount,
        other_charges,

        net_disbursement_amount,

        transaction_id,

        failure_reason,

        requested_at,
        processed_at,
        disbursed_at,

        remarks

    } = disbursementData;


    const [result] = await pool.query(
        `
        UPDATE loan_disbursements
        SET

            loan_offer_id = ?,

            disbursement_reference = ?,

            requested_amount = ?,
            approved_amount = ?,
            disbursed_amount = ?,

            disbursement_type = ?,
            disbursement_method = ?,

            destination_account_id = ?,

            processing_fee = ?,
            insurance_amount = ?,
            other_charges = ?,

            net_disbursement_amount = ?,

            transaction_id = ?,

            failure_reason = ?,

            requested_at = ?,
            processed_at = ?,
            disbursed_at = ?,

            remarks = ?

        WHERE id = ?
        `,
        [

            loan_offer_id ?? null,

            disbursement_reference,

            requested_amount,
            approved_amount ?? null,
            disbursed_amount ?? null,

            disbursement_type,
            disbursement_method,

            destination_account_id ?? null,

            processing_fee ?? 0,
            insurance_amount ?? 0,
            other_charges ?? 0,

            net_disbursement_amount ?? null,

            transaction_id ?? null,

            failure_reason ?? null,

            requested_at ?? null,
            processed_at ?? null,
            disbursed_at ?? null,

            remarks ?? null,

            disbursementId

        ]
    );

    return result;
}


// ==========================================================
// UPDATE DISBURSEMENT STATUS
// ==========================================================

export async function updateLoanDisbursementStatus(
    disbursementId,
    disbursementStatus
) {

    const [result] = await pool.query(
        `
        UPDATE loan_disbursements
        SET
            disbursement_status = ?
        WHERE id = ?
        `,
        [
            disbursementStatus,
            disbursementId
        ]
    );

    return result;
}


// ==========================================================
// DELETE LOAN DISBURSEMENT
// ==========================================================

export async function deleteLoanDisbursement(
    disbursementId
) {

    const [result] = await pool.query(
        `
        DELETE FROM loan_disbursements
        WHERE id = ?
        `,
        [disbursementId]
    );

    return result;
}

