/**
 * ==========================================================
 * FINVERSE AI
 * Loan Model
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/models/loanModel.js
 *
 * Database Table:
 * loans
 *
 * Responsibility:
 *
 * - Fetch all loans
 * - Fetch loan by ID
 * - Fetch loan by loan number
 * - Fetch loans by user
 * - Fetch loan by application
 * - Create loan
 * - Update loan
 * - Update loan status
 * - Delete loan
 *
 * ==========================================================
 */

import pool from "../../../config/db.js";


// ==========================================================
// Get All Loans
// ==========================================================

export async function getAllLoans() {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_number,
            user_id,
            loan_application_id,
            loan_product_id,
            principal_amount,
            interest_rate,
            tenure_months,
            emi_amount,
            outstanding_principal,
            outstanding_interest,
            start_date,
            maturity_date,
            status,
            created_at,
            updated_at
        FROM loans
        ORDER BY created_at DESC
        `
    );

    return rows;
}


// ==========================================================
// Get Loan By ID
// ==========================================================

export async function getLoanById(
    loanId
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_number,
            user_id,
            loan_application_id,
            loan_product_id,
            principal_amount,
            interest_rate,
            tenure_months,
            emi_amount,
            outstanding_principal,
            outstanding_interest,
            start_date,
            maturity_date,
            status,
            created_at,
            updated_at
        FROM loans
        WHERE id = ?
        LIMIT 1
        `,
        [loanId]
    );

    return rows[0] || null;
}


// ==========================================================
// Get Loan By Loan Number
// ==========================================================

export async function getLoanByNumber(
    loanNumber
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_number,
            user_id,
            loan_application_id,
            loan_product_id,
            principal_amount,
            interest_rate,
            tenure_months,
            emi_amount,
            outstanding_principal,
            outstanding_interest,
            start_date,
            maturity_date,
            status,
            created_at,
            updated_at
        FROM loans
        WHERE loan_number = ?
        LIMIT 1
        `,
        [loanNumber]
    );

    return rows[0] || null;
}


// ==========================================================
// Get Loans By User
// ==========================================================

export async function getLoansByUserId(
    userId
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_number,
            user_id,
            loan_application_id,
            loan_product_id,
            principal_amount,
            interest_rate,
            tenure_months,
            emi_amount,
            outstanding_principal,
            outstanding_interest,
            start_date,
            maturity_date,
            status,
            created_at,
            updated_at
        FROM loans
        WHERE user_id = ?
        ORDER BY created_at DESC
        `,
        [userId]
    );

    return rows;
}


// ==========================================================
// Get Loan By Application
// ==========================================================

export async function getLoanByApplicationId(
    applicationId
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_number,
            user_id,
            loan_application_id,
            loan_product_id,
            principal_amount,
            interest_rate,
            tenure_months,
            emi_amount,
            outstanding_principal,
            outstanding_interest,
            start_date,
            maturity_date,
            status,
            created_at,
            updated_at
        FROM loans
        WHERE loan_application_id = ?
        LIMIT 1
        `,
        [applicationId]
    );

    return rows[0] || null;
}


// ==========================================================
// Create Loan
// ==========================================================

export async function createLoan(
    loanData
) {

    const {
        loan_number,
        user_id,
        loan_application_id,
        loan_product_id,
        principal_amount,
        interest_rate,
        tenure_months,
        emi_amount,
        outstanding_principal,
        outstanding_interest,
        start_date,
        maturity_date,
        status
    } = loanData;


    const [result] = await pool.query(
        `
        INSERT INTO loans
        (
            loan_number,
            user_id,
            loan_application_id,
            loan_product_id,
            principal_amount,
            interest_rate,
            tenure_months,
            emi_amount,
            outstanding_principal,
            outstanding_interest,
            start_date,
            maturity_date,
            status
        )
        VALUES
        (
            ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?
        )
        `,
        [
            loan_number,
            user_id,
            loan_application_id,
            loan_product_id,
            principal_amount,
            interest_rate,
            tenure_months,
            emi_amount,
            outstanding_principal ?? principal_amount,
            outstanding_interest ?? 0,
            start_date ?? null,
            maturity_date ?? null,
            status ?? "ACTIVE"
        ]
    );

    return result.insertId;
}


// ==========================================================
// Update Loan
// ==========================================================

export async function updateLoan(
    loanId,
    loanData
) {

    const {
        loan_number,
        loan_product_id,
        principal_amount,
        interest_rate,
        tenure_months,
        emi_amount,
        outstanding_principal,
        outstanding_interest,
        start_date,
        maturity_date
    } = loanData;


    const [result] = await pool.query(
        `
        UPDATE loans
        SET
            loan_number = ?,
            loan_product_id = ?,
            principal_amount = ?,
            interest_rate = ?,
            tenure_months = ?,
            emi_amount = ?,
            outstanding_principal = ?,
            outstanding_interest = ?,
            start_date = ?,
            maturity_date = ?
        WHERE id = ?
        `,
        [
            loan_number,
            loan_product_id,
            principal_amount,
            interest_rate,
            tenure_months,
            emi_amount,
            outstanding_principal,
            outstanding_interest,
            start_date ?? null,
            maturity_date ?? null,
            loanId
        ]
    );

    return result;
}


// ==========================================================
// Update Loan Status
// ==========================================================

export async function updateLoanStatus(
    loanId,
    status
) {

    const [result] = await pool.query(
        `
        UPDATE loans
        SET
            status = ?
        WHERE id = ?
        `,
        [
            status,
            loanId
        ]
    );

    return result;
}


// ==========================================================
// Delete Loan
// ==========================================================

export async function deleteLoan(
    loanId
) {

    const [result] = await pool.query(
        `
        DELETE FROM loans
        WHERE id = ?
        `,
        [loanId]
    );

    return result;
}