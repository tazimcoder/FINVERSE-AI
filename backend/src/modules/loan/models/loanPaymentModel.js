/**
 * ==========================================================
 * FINVERSE AI
 * Loan Payment Model
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/models/loanPaymentModel.js
 *
 * Database Table:
 * loan_payments
 *
 * Responsibility:
 *
 * - Fetch all loan payments
 * - Fetch payment by ID
 * - Fetch payments by loan
 * - Fetch payments by repayment schedule
 * - Fetch payment by reference
 * - Fetch payments by transaction
 * - Fetch payments by payment status
 * - Create payment
 * - Update payment
 * - Update payment status
 * - Delete payment
 *
 * ==========================================================
 */

import pool from "../../../config/db.js";


// ==========================================================
// SELECT COLUMNS
// ==========================================================

const PAYMENT_COLUMNS = `
    id,
    loan_id,
    repayment_schedule_id,
    payment_reference,
    amount,
    payment_method,
    payment_status,
    transaction_id,
    paid_at,
    created_at
`;


// ==========================================================
// GET ALL LOAN PAYMENTS
// ==========================================================

export async function getAllLoanPayments() {

    const [rows] = await pool.query(
        `
        SELECT
            ${PAYMENT_COLUMNS}
        FROM loan_payments
        ORDER BY created_at DESC
        `
    );

    return rows;
}


// ==========================================================
// GET PAYMENT BY ID
// ==========================================================

export async function getLoanPaymentById(
    paymentId
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${PAYMENT_COLUMNS}
        FROM loan_payments
        WHERE id = ?
        LIMIT 1
        `,
        [paymentId]
    );

    return rows[0] || null;
}


// ==========================================================
// GET PAYMENTS BY LOAN ID
// ==========================================================

export async function getLoanPaymentsByLoanId(
    loanId
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${PAYMENT_COLUMNS}
        FROM loan_payments
        WHERE loan_id = ?
        ORDER BY created_at DESC
        `,
        [loanId]
    );

    return rows;
}


// ==========================================================
// GET PAYMENTS BY REPAYMENT SCHEDULE ID
// ==========================================================

export async function getLoanPaymentsByScheduleId(
    repaymentScheduleId
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${PAYMENT_COLUMNS}
        FROM loan_payments
        WHERE repayment_schedule_id = ?
        ORDER BY created_at DESC
        `,
        [repaymentScheduleId]
    );

    return rows;
}


// ==========================================================
// GET PAYMENT BY REFERENCE
// ==========================================================

export async function getLoanPaymentByReference(
    paymentReference
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${PAYMENT_COLUMNS}
        FROM loan_payments
        WHERE payment_reference = ?
        LIMIT 1
        `,
        [paymentReference]
    );

    return rows[0] || null;
}


// ==========================================================
// GET PAYMENTS BY TRANSACTION ID
// ==========================================================

export async function getLoanPaymentsByTransactionId(
    transactionId
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${PAYMENT_COLUMNS}
        FROM loan_payments
        WHERE transaction_id = ?
        ORDER BY created_at DESC
        `,
        [transactionId]
    );

    return rows;
}


// ==========================================================
// GET PAYMENTS BY STATUS
// ==========================================================

export async function getLoanPaymentsByStatus(
    paymentStatus
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${PAYMENT_COLUMNS}
        FROM loan_payments
        WHERE payment_status = ?
        ORDER BY created_at DESC
        `,
        [paymentStatus]
    );

    return rows;
}


// ==========================================================
// CREATE LOAN PAYMENT
// ==========================================================

export async function createLoanPayment(
    paymentData
) {

    const {

        loan_id,
        repayment_schedule_id,
        payment_reference,
        amount,
        payment_method,
        payment_status,
        transaction_id,
        paid_at

    } = paymentData;


    const [result] = await pool.query(
        `
        INSERT INTO loan_payments
        (
            loan_id,
            repayment_schedule_id,
            payment_reference,
            amount,
            payment_method,
            payment_status,
            transaction_id,
            paid_at
        )
        VALUES
        (
            ?, ?, ?, ?, ?, ?, ?, ?
        )
        `,
        [

            loan_id,

            repayment_schedule_id ?? null,

            payment_reference,

            amount,

            payment_method,

            payment_status ?? "PENDING",

            transaction_id ?? null,

            paid_at ?? null

        ]
    );

    return result.insertId;
}


// ==========================================================
// UPDATE LOAN PAYMENT
// ==========================================================

export async function updateLoanPayment(
    paymentId,
    paymentData
) {

    const {

        repayment_schedule_id,
        payment_reference,
        amount,
        payment_method,
        payment_status,
        transaction_id,
        paid_at

    } = paymentData;


    const [result] = await pool.query(
        `
        UPDATE loan_payments
        SET

            repayment_schedule_id = ?,
            payment_reference = ?,
            amount = ?,
            payment_method = ?,
            payment_status = ?,
            transaction_id = ?,
            paid_at = ?

        WHERE id = ?
        `,
        [

            repayment_schedule_id ?? null,

            payment_reference,

            amount,

            payment_method,

            payment_status,

            transaction_id ?? null,

            paid_at ?? null,

            paymentId

        ]
    );

    return result;
}


// ==========================================================
// UPDATE PAYMENT STATUS
// ==========================================================

export async function updateLoanPaymentStatus(
    paymentId,
    paymentStatus
) {

    const [result] = await pool.query(
        `
        UPDATE loan_payments
        SET
            payment_status = ?
        WHERE id = ?
        `,
        [
            paymentStatus,
            paymentId
        ]
    );

    return result;
}


// ==========================================================
// DELETE LOAN PAYMENT
// ==========================================================

export async function deleteLoanPayment(
    paymentId
) {

    const [result] = await pool.query(
        `
        DELETE FROM loan_payments
        WHERE id = ?
        `,
        [paymentId]
    );

    return result;
}


// ==========================================================
// EXPORT SELECT COLUMNS
// ==========================================================

export {
    PAYMENT_COLUMNS
};

