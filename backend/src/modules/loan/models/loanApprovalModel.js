/**
 * ==========================================================
 * FINVERSE AI
 * Loan Approval Model
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/models/loanApprovalModel.js
 *
 * Responsibility:
 *
 * - Provide database-level loan approval operations
 * - Read loan application approval information
 * - Update loan application approval status
 * - Store / retrieve approval metadata when supported
 * - Keep approval database logic separate from service layer
 *
 * IMPORTANT:
 *
 * FINVERSE AI currently determines loan approval primarily
 * through:
 *
 * loan_applications.status
 *
 * Therefore this model does NOT depend on a separate
 * loan_approvals table.
 *
 * The actual loan creation continues to be handled through:
 *
 * loanModel.js
 *
 * and the business logic remains in:
 *
 * loanApprovalService.js
 *
 * ==========================================================
 */

import pool from "../../../config/db.js";


// ==========================================================
// GET LOAN APPLICATION APPROVAL STATUS
// ==========================================================
//
// Returns the approval-related information of a loan
// application.
//
// ==========================================================

export async function getLoanApprovalByApplicationId(
    applicationId
) {

    const [rows] =
        await pool.execute(
            `
            SELECT
                id,
                user_id,
                loan_product_id,
                status,
                requested_amount,
                requested_tenure_months,
                created_at,
                updated_at
            FROM loan_applications
            WHERE id = ?
            LIMIT 1
            `,
            [
                applicationId
            ]
        );


    return rows.length > 0
        ? rows[0]
        : null;

}


// ==========================================================
// GET APPROVAL STATUS BY APPLICATION ID
// ==========================================================
//
// Lightweight query when only status is required.
//
// ==========================================================

export async function getLoanApprovalStatusByApplicationId(
    applicationId
) {

    const [rows] =
        await pool.execute(
            `
            SELECT
                id,
                status
            FROM loan_applications
            WHERE id = ?
            LIMIT 1
            `,
            [
                applicationId
            ]
        );


    return rows.length > 0
        ? rows[0]
        : null;

}


// ==========================================================
// CHECK IF APPLICATION IS APPROVED
// ==========================================================

export async function isLoanApplicationApproved(
    applicationId
) {

    const [rows] =
        await pool.execute(
            `
            SELECT
                id
            FROM loan_applications
            WHERE id = ?
            AND status = 'APPROVED'
            LIMIT 1
            `,
            [
                applicationId
            ]
        );


    return rows.length > 0;

}


// ==========================================================
// APPROVE LOAN APPLICATION
// ==========================================================
//
// Updates the application status to APPROVED.
//
// This function is intentionally kept separate from the
// higher-level approval service so future approval workflows
// can reuse it.
//
// ==========================================================

export async function approveLoanApplication(
    applicationId
) {

    const [result] =
        await pool.execute(
            `
            UPDATE loan_applications
            SET
                status = 'APPROVED',
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            `,
            [
                applicationId
            ]
        );


    return result;

}


// ==========================================================
// REJECT LOAN APPLICATION
// ==========================================================
//
// Updates the application status to REJECTED.
//
// ==========================================================

export async function rejectLoanApplication(
    applicationId
) {

    const [result] =
        await pool.execute(
            `
            UPDATE loan_applications
            SET
                status = 'REJECTED',
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            `,
            [
                applicationId
            ]
        );


    return result;

}


// ==========================================================
// MARK APPLICATION FOR MANUAL REVIEW
// ==========================================================
//
// Updates the application status to MANUAL_REVIEW.
//
// NOTE:
// This requires the loan_applications.status column to accept
// the MANUAL_REVIEW value.
//
// ==========================================================

export async function markLoanApplicationForManualReview(
    applicationId
) {

    const [result] =
        await pool.execute(
            `
            UPDATE loan_applications
            SET
                status = 'MANUAL_REVIEW',
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            `,
            [
                applicationId
            ]
        );


    return result;

}


// ==========================================================
// GET APPROVED APPLICATIONS
// ==========================================================
//
// Returns all applications that have reached APPROVED
// status.
//
// Useful for:
//
// - Admin approval dashboard
// - Loan creation queue
// - Approval monitoring
// - Reporting
//
// ==========================================================

export async function getApprovedLoanApplications() {

    const [rows] =
        await pool.execute(
            `
            SELECT
                id,
                user_id,
                loan_product_id,
                status,
                requested_amount,
                requested_tenure_months,
                created_at,
                updated_at
            FROM loan_applications
            WHERE status = 'APPROVED'
            ORDER BY updated_at DESC
            `
        );


    return rows;

}


// ==========================================================
// GET REJECTED APPLICATIONS
// ==========================================================

export async function getRejectedLoanApplications() {

    const [rows] =
        await pool.execute(
            `
            SELECT
                id,
                user_id,
                loan_product_id,
                status,
                requested_amount,
                requested_tenure_months,
                created_at,
                updated_at
            FROM loan_applications
            WHERE status = 'REJECTED'
            ORDER BY updated_at DESC
            `
        );


    return rows;

}


// ==========================================================
// GET APPLICATIONS REQUIRING MANUAL REVIEW
// ==========================================================

export async function getManualReviewLoanApplications() {

    const [rows] =
        await pool.execute(
            `
            SELECT
                id,
                user_id,
                loan_product_id,
                status,
                requested_amount,
                requested_tenure_months,
                created_at,
                updated_at
            FROM loan_applications
            WHERE status = 'MANUAL_REVIEW'
            ORDER BY updated_at DESC
            `
        );


    return rows;

}


// ==========================================================
// COUNT APPROVED APPLICATIONS
// ==========================================================
//
// Useful for admin dashboard statistics.
//
// ==========================================================

export async function countApprovedLoanApplications() {

    const [rows] =
        await pool.execute(
            `
            SELECT
                COUNT(*) AS total
            FROM loan_applications
            WHERE status = 'APPROVED'
            `
        );


    return Number(
        rows[0]?.total || 0
    );

}


// ==========================================================
// COUNT REJECTED APPLICATIONS
// ==========================================================

export async function countRejectedLoanApplications() {

    const [rows] =
        await pool.execute(
            `
            SELECT
                COUNT(*) AS total
            FROM loan_applications
            WHERE status = 'REJECTED'
            `
        );


    return Number(
        rows[0]?.total || 0
    );

}


// ==========================================================
// COUNT MANUAL REVIEW APPLICATIONS
// ==========================================================

export async function countManualReviewLoanApplications() {

    const [rows] =
        await pool.execute(
            `
            SELECT
                COUNT(*) AS total
            FROM loan_applications
            WHERE status = 'MANUAL_REVIEW'
            `
        );


    return Number(
        rows[0]?.total || 0
    );

}


// ==========================================================
// EXPORT DEFAULT
// ==========================================================

export default {

    getLoanApprovalByApplicationId,

    getLoanApprovalStatusByApplicationId,

    isLoanApplicationApproved,

    approveLoanApplication,

    rejectLoanApplication,

    markLoanApplicationForManualReview,

    getApprovedLoanApplications,

    getRejectedLoanApplications,

    getManualReviewLoanApplications,

    countApprovedLoanApplications,

    countRejectedLoanApplications,

    countManualReviewLoanApplications

};

