/**
 * ==========================================================
 * FINVERSE AI
 * Loan Verification Check Model
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/models/loanVerificationCheckModel.js
 *
 * Database Table:
 * loan_verification_checks
 *
 * Responsibility:
 *
 * - Fetch all verification checks
 * - Fetch verification check by ID
 * - Fetch verification checks by application
 * - Fetch verification checks by user
 * - Fetch verification checks by type
 * - Fetch verification checks by status
 * - Create verification check
 * - Update verification check
 * - Update verification status
 * - Delete verification check
 *
 * Database Status:
 *
 * PENDING
 * IN_PROGRESS
 * VERIFIED
 * FAILED
 * REJECTED
 * MANUAL_REVIEW
 * EXPIRED
 *
 * Risk Levels:
 *
 * LOW
 * MEDIUM
 * HIGH
 * CRITICAL
 * UNKNOWN
 *
 * ==========================================================
 */

import pool from "../../../config/db.js";


// ==========================================================
// Constants
// ==========================================================

const VERIFICATION_STATUSES = [
    "PENDING",
    "IN_PROGRESS",
    "VERIFIED",
    "FAILED",
    "REJECTED",
    "MANUAL_REVIEW",
    "EXPIRED"
];


const RISK_LEVELS = [
    "LOW",
    "MEDIUM",
    "HIGH",
    "CRITICAL",
    "UNKNOWN"
];


const VERIFICATION_TYPES = [
    "KYC",
    "IDENTITY",
    "ADDRESS",
    "INCOME",
    "EMPLOYMENT",
    "BANK_STATEMENT",
    "CREDIT",
    "PROPERTY",
    "COLLATERAL",
    "DOCUMENT",
    "OTHER"
];


// ==========================================================
// Get All Verification Checks
// ==========================================================

export async function getAllLoanVerificationChecks() {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            user_id,
            verification_type,
            verification_provider,
            reference_number,
            verification_status,
            risk_level,
            verification_score,
            verified_by_user_id,
            verified_at,
            failure_reason,
            remarks,
            metadata,
            created_at,
            updated_at
        FROM loan_verification_checks
        ORDER BY created_at DESC
        `
    );

    return rows;
}


// ==========================================================
// Get Verification Check By ID
// ==========================================================

export async function getLoanVerificationCheckById(
    verificationId
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            user_id,
            verification_type,
            verification_provider,
            reference_number,
            verification_status,
            risk_level,
            verification_score,
            verified_by_user_id,
            verified_at,
            failure_reason,
            remarks,
            metadata,
            created_at,
            updated_at
        FROM loan_verification_checks
        WHERE id = ?
        LIMIT 1
        `,
        [verificationId]
    );

    return rows[0] || null;
}


// ==========================================================
// Get Verification Checks By Application
// ==========================================================

export async function getLoanVerificationChecksByApplicationId(
    applicationId
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            user_id,
            verification_type,
            verification_provider,
            reference_number,
            verification_status,
            risk_level,
            verification_score,
            verified_by_user_id,
            verified_at,
            failure_reason,
            remarks,
            metadata,
            created_at,
            updated_at
        FROM loan_verification_checks
        WHERE loan_application_id = ?
        ORDER BY created_at DESC
        `,
        [applicationId]
    );

    return rows;
}


// ==========================================================
// Get Verification Checks By User
// ==========================================================

export async function getLoanVerificationChecksByUserId(
    userId
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            user_id,
            verification_type,
            verification_provider,
            reference_number,
            verification_status,
            risk_level,
            verification_score,
            verified_by_user_id,
            verified_at,
            failure_reason,
            remarks,
            metadata,
            created_at,
            updated_at
        FROM loan_verification_checks
        WHERE user_id = ?
        ORDER BY created_at DESC
        `,
        [userId]
    );

    return rows;
}


// ==========================================================
// Get Verification Checks By Type
// ==========================================================

export async function getLoanVerificationChecksByType(
    verificationType
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            user_id,
            verification_type,
            verification_provider,
            reference_number,
            verification_status,
            risk_level,
            verification_score,
            verified_by_user_id,
            verified_at,
            failure_reason,
            remarks,
            metadata,
            created_at,
            updated_at
        FROM loan_verification_checks
        WHERE verification_type = ?
        ORDER BY created_at DESC
        `,
        [verificationType]
    );

    return rows;
}


// ==========================================================
// Get Verification Checks By Status
// ==========================================================

export async function getLoanVerificationChecksByStatus(
    verificationStatus
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            user_id,
            verification_type,
            verification_provider,
            reference_number,
            verification_status,
            risk_level,
            verification_score,
            verified_by_user_id,
            verified_at,
            failure_reason,
            remarks,
            metadata,
            created_at,
            updated_at
        FROM loan_verification_checks
        WHERE verification_status = ?
        ORDER BY created_at DESC
        `,
        [verificationStatus]
    );

    return rows;
}


// ==========================================================
// Get Verification Checks By Risk Level
// ==========================================================

export async function getLoanVerificationChecksByRiskLevel(
    riskLevel
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            user_id,
            verification_type,
            verification_provider,
            reference_number,
            verification_status,
            risk_level,
            verification_score,
            verified_by_user_id,
            verified_at,
            failure_reason,
            remarks,
            metadata,
            created_at,
            updated_at
        FROM loan_verification_checks
        WHERE risk_level = ?
        ORDER BY created_at DESC
        `,
        [riskLevel]
    );

    return rows;
}


// ==========================================================
// Create Verification Check
// ==========================================================

export async function createLoanVerificationCheck(
    verificationData
) {

    const {
        loan_application_id,
        user_id,
        verification_type,
        verification_provider,
        reference_number,
        verification_status,
        risk_level,
        verification_score,
        verified_by_user_id,
        verified_at,
        failure_reason,
        remarks,
        metadata
    } = verificationData;


    const [result] = await pool.query(
        `
        INSERT INTO loan_verification_checks
        (
            loan_application_id,
            user_id,
            verification_type,
            verification_provider,
            reference_number,
            verification_status,
            risk_level,
            verification_score,
            verified_by_user_id,
            verified_at,
            failure_reason,
            remarks,
            metadata
        )
        VALUES
        (
            ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?,
            ?, ?, ?
        )
        `,
        [
            loan_application_id,
            user_id,
            verification_type,
            verification_provider ?? null,
            reference_number ?? null,
            verification_status ?? "PENDING",
            risk_level ?? "UNKNOWN",
            verification_score ?? null,
            verified_by_user_id ?? null,
            verified_at ?? null,
            failure_reason ?? null,
            remarks ?? null,
            metadata ?? null
        ]
    );

    return result.insertId;
}


// ==========================================================
// Update Verification Check
// ==========================================================

export async function updateLoanVerificationCheck(
    verificationId,
    verificationData
) {

    const {
        verification_type,
        verification_provider,
        reference_number,
        risk_level,
        verification_score,
        failure_reason,
        remarks,
        metadata
    } = verificationData;


    const [result] = await pool.query(
        `
        UPDATE loan_verification_checks
        SET
            verification_type = ?,
            verification_provider = ?,
            reference_number = ?,
            risk_level = ?,
            verification_score = ?,
            failure_reason = ?,
            remarks = ?,
            metadata = ?
        WHERE id = ?
        `,
        [
            verification_type,
            verification_provider ?? null,
            reference_number ?? null,
            risk_level ?? "UNKNOWN",
            verification_score ?? null,
            failure_reason ?? null,
            remarks ?? null,
            metadata ?? null,
            verificationId
        ]
    );

    return result;
}


// ==========================================================
// Update Verification Status
// ==========================================================

export async function updateLoanVerificationStatus(
    verificationId,
    verificationStatus,
    riskLevel = null,
    verificationScore = null,
    failureReason = null,
    verifiedByUserId = null,
    remarks = null
) {

    let query = `
        UPDATE loan_verification_checks
        SET
            verification_status = ?
    `;


    const values = [
        verificationStatus
    ];


    // ======================================================
    // VERIFIED
    // ======================================================

    if (
        verificationStatus === "VERIFIED"
    ) {

        query += `,
            risk_level = ?,
            verification_score = ?,
            verified_by_user_id = ?,
            verified_at = CURRENT_TIMESTAMP,
            failure_reason = NULL,
            remarks = ?
        `;

        values.push(
            riskLevel ?? "LOW",
            verificationScore ?? null,
            verifiedByUserId ?? null,
            remarks ?? null
        );

    }


    // ======================================================
    // FAILED
    // ======================================================

    else if (
        verificationStatus === "FAILED"
    ) {

        query += `,
            risk_level = ?,
            verification_score = ?,
            verified_by_user_id = NULL,
            verified_at = NULL,
            failure_reason = ?,
            remarks = ?
        `;

        values.push(
            riskLevel ?? "HIGH",
            verificationScore ?? null,
            failureReason ?? null,
            remarks ?? null
        );

    }


    // ======================================================
    // REJECTED
    // ======================================================

    else if (
        verificationStatus === "REJECTED"
    ) {

        query += `,
            risk_level = ?,
            verification_score = ?,
            verified_by_user_id = NULL,
            verified_at = NULL,
            failure_reason = ?,
            remarks = ?
        `;

        values.push(
            riskLevel ?? "HIGH",
            verificationScore ?? null,
            failureReason ?? null,
            remarks ?? null
        );

    }


    // ======================================================
    // MANUAL REVIEW
    // ======================================================

    else if (
        verificationStatus === "MANUAL_REVIEW"
    ) {

        query += `,
            risk_level = ?,
            verification_score = ?,
            verified_by_user_id = NULL,
            verified_at = NULL,
            failure_reason = ?,
            remarks = ?
        `;

        values.push(
            riskLevel ?? "MEDIUM",
            verificationScore ?? null,
            failureReason ?? null,
            remarks ?? null
        );

    }


    // ======================================================
    // PENDING / IN_PROGRESS / EXPIRED
    // ======================================================

    else {

        query += `,
            risk_level = ?,
            verification_score = ?,
            verified_by_user_id = NULL,
            verified_at = NULL,
            failure_reason = ?,
            remarks = ?
        `;

        values.push(
            riskLevel ?? "UNKNOWN",
            verificationScore ?? null,
            failureReason ?? null,
            remarks ?? null
        );

    }


    query += `
        WHERE id = ?
    `;


    values.push(
        verificationId
    );


    const [result] = await pool.query(
        query,
        values
    );

    return result;
}


// ==========================================================
// Delete Verification Check
// ==========================================================

export async function deleteLoanVerificationCheck(
    verificationId
) {

    const [result] = await pool.query(
        `
        DELETE FROM loan_verification_checks
        WHERE id = ?
        `,
        [verificationId]
    );

    return result;
}


// ==========================================================
// Export Constants
// ==========================================================

export {
    VERIFICATION_STATUSES,
    RISK_LEVELS,
    VERIFICATION_TYPES
};