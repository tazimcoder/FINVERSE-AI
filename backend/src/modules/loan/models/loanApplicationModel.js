/**
 * ==========================================================
 * FINVERSE AI
 * Loan Application Model
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/models/loanApplicationModel.js
 *
 * Responsibility:
 *
 * - Fetch loan applications
 * - Fetch application by ID
 * - Fetch applications by user
 * - Fetch application by application number
 * - Create loan application
 * - Update loan application
 * - Update application status
 *
 * Database Table:
 * loan_applications
 *
 * ==========================================================
 */

import pool from "../../../config/db.js";


// ==========================================================
// Get All Loan Applications
// ==========================================================

export async function getAllLoanApplications() {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            application_number,
            user_id,
            loan_product_id,
            requested_amount,
            requested_tenure_months,
            purpose,
            employment_type,
            monthly_income,
            existing_monthly_obligations,
            credit_score,
            status,
            rejection_reason,
            submitted_at,
            approved_at,
            rejected_at,
            created_at,
            updated_at
        FROM loan_applications
        ORDER BY created_at DESC
        `
    );

    return rows;
}


// ==========================================================
// Get Loan Application By ID
// ==========================================================

export async function getLoanApplicationById(applicationId) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            application_number,
            user_id,
            loan_product_id,
            requested_amount,
            requested_tenure_months,
            purpose,
            employment_type,
            monthly_income,
            existing_monthly_obligations,
            credit_score,
            status,
            rejection_reason,
            submitted_at,
            approved_at,
            rejected_at,
            created_at,
            updated_at
        FROM loan_applications
        WHERE id = ?
        LIMIT 1
        `,
        [applicationId]
    );

    return rows[0] || null;
}


// ==========================================================
// Get Loan Applications By User
// ==========================================================

export async function getLoanApplicationsByUserId(userId) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            application_number,
            user_id,
            loan_product_id,
            requested_amount,
            requested_tenure_months,
            purpose,
            employment_type,
            monthly_income,
            existing_monthly_obligations,
            credit_score,
            status,
            rejection_reason,
            submitted_at,
            approved_at,
            rejected_at,
            created_at,
            updated_at
        FROM loan_applications
        WHERE user_id = ?
        ORDER BY created_at DESC
        `,
        [userId]
    );

    return rows;
}


// ==========================================================
// Get Loan Application By Application Number
// ==========================================================

export async function getLoanApplicationByNumber(
    applicationNumber
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            application_number,
            user_id,
            loan_product_id,
            requested_amount,
            requested_tenure_months,
            purpose,
            employment_type,
            monthly_income,
            existing_monthly_obligations,
            credit_score,
            status,
            rejection_reason,
            submitted_at,
            approved_at,
            rejected_at,
            created_at,
            updated_at
        FROM loan_applications
        WHERE application_number = ?
        LIMIT 1
        `,
        [applicationNumber]
    );

    return rows[0] || null;
}


// ==========================================================
// Create Loan Application
// ==========================================================

export async function createLoanApplication(
    applicationData
) {

    const {
        application_number,
        user_id,
        loan_product_id,
        requested_amount,
        requested_tenure_months,
        purpose,
        employment_type,
        monthly_income,
        existing_monthly_obligations,
        credit_score,
        status
    } = applicationData;


    const [result] = await pool.query(
        `
        INSERT INTO loan_applications
        (
            application_number,
            user_id,
            loan_product_id,
            requested_amount,
            requested_tenure_months,
            purpose,
            employment_type,
            monthly_income,
            existing_monthly_obligations,
            credit_score,
            status
        )
        VALUES
        (
            ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?
        )
        `,
        [
            application_number,
            user_id,
            loan_product_id,
            requested_amount,
            requested_tenure_months,
            purpose ?? null,
            employment_type ?? null,
            monthly_income ?? null,
            existing_monthly_obligations ?? null,
            credit_score ?? null,
            status ?? "DRAFT"
        ]
    );


    return result.insertId;
}


// ==========================================================
// Update Loan Application
// ==========================================================

export async function updateLoanApplication(
    applicationId,
    applicationData
) {

    const {
        loan_product_id,
        requested_amount,
        requested_tenure_months,
        purpose,
        employment_type,
        monthly_income,
        existing_monthly_obligations,
        credit_score
    } = applicationData;


    const [result] = await pool.query(
        `
        UPDATE loan_applications
        SET
            loan_product_id = ?,
            requested_amount = ?,
            requested_tenure_months = ?,
            purpose = ?,
            employment_type = ?,
            monthly_income = ?,
            existing_monthly_obligations = ?,
            credit_score = ?
        WHERE id = ?
        `,
        [
            loan_product_id,
            requested_amount,
            requested_tenure_months,
            purpose ?? null,
            employment_type ?? null,
            monthly_income ?? null,
            existing_monthly_obligations ?? null,
            credit_score ?? null,
            applicationId
        ]
    );


    return result;
}


// ==========================================================
// Update Loan Application Status
// ==========================================================

export async function updateLoanApplicationStatus(
    applicationId,
    status,
    rejectionReason = null
) {

    let query = `
        UPDATE loan_applications
        SET
            status = ?
    `;

    const values = [
        status
    ];


    // ======================================================
    // Submitted
    // ======================================================

    if (status === "SUBMITTED") {

        query += `,
            submitted_at = CURRENT_TIMESTAMP
        `;
    }


    // ======================================================
    // Approved
    // ======================================================

    if (status === "APPROVED") {

        query += `,
            approved_at = CURRENT_TIMESTAMP
        `;
    }


    // ======================================================
    // Rejected
    // ======================================================

    if (status === "REJECTED") {

        query += `,
            rejected_at = CURRENT_TIMESTAMP,
            rejection_reason = ?
        `;

        values.push(
            rejectionReason
        );
    }


    // ======================================================
    // Clear rejection reason for other statuses
    // ======================================================

    if (
        status !== "REJECTED" &&
        status !== "APPROVED"
    ) {

        query += `,
            rejection_reason = NULL
        `;
    }


    query += `
        WHERE id = ?
    `;

    values.push(
        applicationId
    );


    const [result] = await pool.query(
        query,
        values
    );


    return result;
}


// ==========================================================
// Delete Loan Application
// ==========================================================

export async function deleteLoanApplication(
    applicationId
) {

    const [result] = await pool.query(
        `
        DELETE FROM loan_applications
        WHERE id = ?
        `,
        [applicationId]
    );


    return result;
}

