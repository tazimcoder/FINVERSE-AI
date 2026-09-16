/**
 * ==========================================================
 * FINVERSE AI
 * Loan Verification Check Service
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/services/loanVerificationCheckService.js
 *
 * Database Table:
 * loan_verification_checks
 *
 * Responsibility:
 *
 * - Business logic for loan verification checks
 * - Validate verification input
 * - Validate verification type
 * - Validate verification status
 * - Validate risk level
 * - Validate verification score
 * - Fetch verification checks
 * - Fetch latest verification check
 * - Create verification check
 * - Update verification check
 * - Change verification status
 * - Delete verification check
 *
 * Flow:
 *
 * LOAN APPLICATION
 *        ↓
 * DOCUMENT / KYC / INCOME / CREDIT
 *        ↓
 * VERIFICATION CHECK
 *        ↓
 * VERIFIED / FAILED / REJECTED
 *        ↓
 * LOAN ELIGIBILITY
 *
 * ==========================================================
 */

import {
    getAllLoanVerificationChecks,
    getLoanVerificationCheckById,
    getLoanVerificationChecksByApplicationId,
    getLoanVerificationChecksByUserId,
    getLoanVerificationChecksByType,
    getLoanVerificationChecksByStatus,
    getLoanVerificationChecksByRiskLevel,
    createLoanVerificationCheck,
    updateLoanVerificationCheck,
    updateLoanVerificationStatus,
    deleteLoanVerificationCheck
} from "../models/loanVerificationCheckModel.js";


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
// Utility - Validate Required ID
// ==========================================================

function validateId(
    value,
    fieldName
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        throw new Error(
            `${fieldName} is required.`
        );

    }


    const numericValue =
        Number(value);


    if (
        !Number.isInteger(
            numericValue
        ) ||
        numericValue <= 0
    ) {

        throw new Error(
            `${fieldName} must be a valid positive integer.`
        );

    }


    return numericValue;

}


// ==========================================================
// Utility - Normalize Enum Value
// ==========================================================

function normalizeEnum(
    value,
    allowedValues,
    fieldName
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        throw new Error(
            `${fieldName} is required.`
        );

    }


    const normalizedValue =
        String(value)
            .trim()
            .toUpperCase();


    if (
        !allowedValues.includes(
            normalizedValue
        )
    ) {

        throw new Error(
            `Invalid ${fieldName}.`
        );

    }


    return normalizedValue;

}


// ==========================================================
// Utility - Validate Optional Number
// ==========================================================

function validateOptionalNumber(
    value,
    fieldName
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return null;

    }


    const numericValue =
        Number(value);


    if (
        !Number.isFinite(
            numericValue
        )
    ) {

        throw new Error(
            `${fieldName} must be a valid number.`
        );

    }


    return numericValue;

}


// ==========================================================
// Utility - Validate Verification Score
// ==========================================================
//
// Database:
// decimal(6,2)
//
// Practical range:
// 0 - 100
//
// ==========================================================

function validateVerificationScore(
    value
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return null;

    }


    const score =
        Number(value);


    if (
        !Number.isFinite(
            score
        )
    ) {

        throw new Error(
            "Verification score must be a valid number."
        );

    }


    if (
        score < 0 ||
        score > 100
    ) {

        throw new Error(
            "Verification score must be between 0 and 100."
        );

    }


    return Number(
        score.toFixed(2)
    );

}


// ==========================================================
// Fetch All Verification Checks
// ==========================================================

export async function fetchAllLoanVerificationChecks() {

    return await getAllLoanVerificationChecks();

}


// ==========================================================
// Fetch Verification Check By ID
// ==========================================================

export async function fetchLoanVerificationCheckById(
    verificationId
) {

    const id =
        validateId(
            verificationId,
            "Loan verification check ID"
        );


    return await getLoanVerificationCheckById(
        id
    );

}


// ==========================================================
// Fetch Verification Checks By Application
// ==========================================================

export async function fetchLoanVerificationChecksByApplicationId(
    applicationId
) {

    const id =
        validateId(
            applicationId,
            "Loan application ID"
        );


    return await getLoanVerificationChecksByApplicationId(
        id
    );

}


// ==========================================================
// GET LATEST VERIFICATION CHECK BY APPLICATION ID
// ==========================================================
//
// Required by:
//
// loanLifecycleService.js
//
// We intentionally use the existing
// getLoanVerificationChecksByApplicationId()
// model method.
//
// No new model export is required.
//
// ==========================================================

export async function getLatestLoanVerificationCheckByApplicationId(
    applicationId
) {

    const id =
        validateId(
            applicationId,
            "Loan application ID"
        );


    const verificationChecks =
        await getLoanVerificationChecksByApplicationId(
            id
        );


    if (
        !verificationChecks
    ) {

        return null;

    }


    if (
        !Array.isArray(
            verificationChecks
        )
    ) {

        return verificationChecks;

    }


    if (
        verificationChecks.length === 0
    ) {

        return null;

    }


    const sortedChecks =
        [
            ...verificationChecks
        ].sort(
            (
                firstCheck,
                secondCheck
            ) => {

                const firstCreatedAt =
                    firstCheck?.created_at
                        ? new Date(
                            firstCheck.created_at
                        ).getTime()
                        : 0;


                const secondCreatedAt =
                    secondCheck?.created_at
                        ? new Date(
                            secondCheck.created_at
                        ).getTime()
                        : 0;


                if (
                    firstCreatedAt !==
                    secondCreatedAt
                ) {

                    return (
                        secondCreatedAt -
                        firstCreatedAt
                    );

                }


                const firstUpdatedAt =
                    firstCheck?.updated_at
                        ? new Date(
                            firstCheck.updated_at
                        ).getTime()
                        : 0;


                const secondUpdatedAt =
                    secondCheck?.updated_at
                        ? new Date(
                            secondCheck.updated_at
                        ).getTime()
                        : 0;


                if (
                    firstUpdatedAt !==
                    secondUpdatedAt
                ) {

                    return (
                        secondUpdatedAt -
                        firstUpdatedAt
                    );

                }


                return (
                    Number(
                        secondCheck?.id || 0
                    ) -
                    Number(
                        firstCheck?.id || 0
                    )
                );

            }
        );


    return (
        sortedChecks[0] ||
        null
    );

}


// ==========================================================
// Fetch Verification Checks By User
// ==========================================================

export async function fetchLoanVerificationChecksByUserId(
    userId
) {

    const id =
        validateId(
            userId,
            "User ID"
        );


    return await getLoanVerificationChecksByUserId(
        id
    );

}


// ==========================================================
// Fetch Verification Checks By Type
// ==========================================================

export async function fetchLoanVerificationChecksByType(
    verificationType
) {

    const type =
        normalizeEnum(
            verificationType,
            VERIFICATION_TYPES,
            "verification type"
        );


    return await getLoanVerificationChecksByType(
        type
    );

}


// ==========================================================
// Fetch Verification Checks By Status
// ==========================================================

export async function fetchLoanVerificationChecksByStatus(
    verificationStatus
) {

    const status =
        normalizeEnum(
            verificationStatus,
            VERIFICATION_STATUSES,
            "verification status"
        );


    return await getLoanVerificationChecksByStatus(
        status
    );

}


// ==========================================================
// Fetch Verification Checks By Risk Level
// ==========================================================

export async function fetchLoanVerificationChecksByRiskLevel(
    riskLevel
) {

    const risk =
        normalizeEnum(
            riskLevel,
            RISK_LEVELS,
            "risk level"
        );


    return await getLoanVerificationChecksByRiskLevel(
        risk
    );

}


// ==========================================================
// Create Verification Check
// ==========================================================

export async function createNewLoanVerificationCheck(
    verificationData
) {

    if (
        !verificationData ||
        typeof verificationData !== "object"
    ) {

        throw new Error(
            "Loan verification data is required."
        );

    }


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


    // ======================================================
    // Validate Application
    // ======================================================

    const applicationId =
        validateId(
            loan_application_id,
            "Loan application ID"
        );


    // ======================================================
    // Validate User
    // ======================================================

    const userId =
        validateId(
            user_id,
            "User ID"
        );


    // ======================================================
    // Validate Verification Type
    // ======================================================

    const verificationType =
        verification_type
            ? normalizeEnum(
                verification_type,
                VERIFICATION_TYPES,
                "verification type"
            )
            : "OTHER";


    // ======================================================
    // Validate Verification Status
    // ======================================================

    const verificationStatus =
        verification_status
            ? normalizeEnum(
                verification_status,
                VERIFICATION_STATUSES,
                "verification status"
            )
            : "PENDING";


    // ======================================================
    // Validate Risk Level
    // ======================================================

    const riskLevel =
        risk_level
            ? normalizeEnum(
                risk_level,
                RISK_LEVELS,
                "risk level"
            )
            : "UNKNOWN";


    // ======================================================
    // Validate Score
    // ======================================================

    const verificationScore =
        validateVerificationScore(
            verification_score
        );


    // ======================================================
    // Validate Verified User
    // ======================================================

    let verifiedByUserId =
        null;


    if (
        verified_by_user_id !== undefined &&
        verified_by_user_id !== null &&
        verified_by_user_id !== ""
    ) {

        verifiedByUserId =
            validateId(
                verified_by_user_id,
                "Verified by user ID"
            );

    }


    // ======================================================
    // Status Consistency
    // ======================================================

    if (
        verificationStatus === "VERIFIED" &&
        !verifiedByUserId
    ) {

        /*
         * Automated verification providers may perform
         * verification without a staff user.
         */

    }


    if (
        verificationStatus === "FAILED" &&
        !failure_reason
    ) {

        throw new Error(
            "Failure reason is required for failed verification."
        );

    }


    if (
        verificationStatus === "REJECTED" &&
        !failure_reason
    ) {

        throw new Error(
            "Failure reason is required for rejected verification."
        );

    }


    // ======================================================
    // Prepare Metadata
    // ======================================================

    let normalizedMetadata =
        metadata ?? null;


    if (
        metadata !== undefined &&
        metadata !== null
    ) {

        if (
            typeof metadata !== "object"
        ) {

            throw new Error(
                "Verification metadata must be a valid object."
            );

        }


        normalizedMetadata =
            metadata;

    }


    // ======================================================
    // Prepare Data
    // ======================================================

    const data = {

        loan_application_id:
            applicationId,

        user_id:
            userId,

        verification_type:
            verificationType,

        verification_provider:
            verification_provider ?? null,

        reference_number:
            reference_number ?? null,

        verification_status:
            verificationStatus,

        risk_level:
            riskLevel,

        verification_score:
            verificationScore,

        verified_by_user_id:
            verifiedByUserId,

        verified_at:
            verified_at ?? null,

        failure_reason:
            failure_reason ?? null,

        remarks:
            remarks ?? null,

        metadata:
            normalizedMetadata

    };


    // ======================================================
    // Create Database Record
    // ======================================================

    return await createLoanVerificationCheck(
        data
    );

}


// ==========================================================
// Update Verification Check
// ==========================================================

export async function updateExistingLoanVerificationCheck(
    verificationId,
    verificationData
) {

    const id =
        validateId(
            verificationId,
            "Loan verification check ID"
        );


    if (
        !verificationData ||
        typeof verificationData !== "object"
    ) {

        throw new Error(
            "Loan verification data is required."
        );

    }


    const existingCheck =
        await getLoanVerificationCheckById(
            id
        );


    if (!existingCheck) {

        throw new Error(
            "Loan verification check not found."
        );

    }


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


    // ======================================================
    // Prepare Update Data
    // ======================================================

    const updateData = {

        verification_type:
            verification_type !== undefined
                ? normalizeEnum(
                    verification_type,
                    VERIFICATION_TYPES,
                    "verification type"
                )
                : existingCheck.verification_type,

        verification_provider:
            verification_provider !== undefined
                ? verification_provider
                : existingCheck.verification_provider,

        reference_number:
            reference_number !== undefined
                ? reference_number
                : existingCheck.reference_number,

        risk_level:
            risk_level !== undefined
                ? normalizeEnum(
                    risk_level,
                    RISK_LEVELS,
                    "risk level"
                )
                : existingCheck.risk_level,

        verification_score:
            verification_score !== undefined
                ? validateVerificationScore(
                    verification_score
                )
                : existingCheck.verification_score,

        failure_reason:
            failure_reason !== undefined
                ? failure_reason
                : existingCheck.failure_reason,

        remarks:
            remarks !== undefined
                ? remarks
                : existingCheck.remarks,

        metadata:
            metadata !== undefined
                ? metadata
                : existingCheck.metadata

    };


    // ======================================================
    // Failure / Rejection Validation
    // ======================================================

    if (
        (
            existingCheck.verification_status ===
            "FAILED" ||
            existingCheck.verification_status ===
            "REJECTED"
        ) &&
        !updateData.failure_reason
    ) {

        throw new Error(
            "Failure reason is required for failed or rejected verification."
        );

    }


    return await updateLoanVerificationCheck(
        id,
        updateData
    );

}


// ==========================================================
// Change Verification Status
// ==========================================================

export async function changeLoanVerificationStatus(
    verificationId,
    verificationStatus,
    options = {}
) {

    const id =
        validateId(
            verificationId,
            "Loan verification check ID"
        );


    const status =
        normalizeEnum(
            verificationStatus,
            VERIFICATION_STATUSES,
            "verification status"
        );


    const existingCheck =
        await getLoanVerificationCheckById(
            id
        );


    if (!existingCheck) {

        throw new Error(
            "Loan verification check not found."
        );

    }


    const {
        risk_level,
        verification_score,
        failure_reason,
        verified_by_user_id,
        remarks
    } = options;


    // ======================================================
    // Validate Risk
    // ======================================================

    const riskLevel =
        risk_level !== undefined &&
            risk_level !== null
            ? normalizeEnum(
                risk_level,
                RISK_LEVELS,
                "risk level"
            )
            : null;


    // ======================================================
    // Validate Score
    // ======================================================

    const verificationScore =
        validateVerificationScore(
            verification_score
        );


    // ======================================================
    // Validate Verified User
    // ======================================================

    let verifiedByUserId =
        null;


    if (
        verified_by_user_id !== undefined &&
        verified_by_user_id !== null &&
        verified_by_user_id !== ""
    ) {

        verifiedByUserId =
            validateId(
                verified_by_user_id,
                "Verified by user ID"
            );

    }


    // ======================================================
    // Validate Failure Reason
    // ======================================================

    if (
        (
            status === "FAILED" ||
            status === "REJECTED"
        ) &&
        !failure_reason
    ) {

        throw new Error(
            "Failure reason is required for failed or rejected verification."
        );

    }


    // ======================================================
    // Verified State
    // ======================================================

    if (
        status === "VERIFIED" &&
        verificationScore !== null &&
        verificationScore < 50
    ) {

        throw new Error(
            "A verification marked as VERIFIED should have a score of at least 50."
        );

    }


    // ======================================================
    // Update Database
    // ======================================================

    return await updateLoanVerificationStatus(
        id,
        status,
        riskLevel,
        verificationScore,
        failure_reason ?? null,
        verifiedByUserId,
        remarks ?? null
    );

}


// ==========================================================
// Delete Verification Check
// ==========================================================

export async function removeLoanVerificationCheck(
    verificationId
) {

    const id =
        validateId(
            verificationId,
            "Loan verification check ID"
        );


    const existingCheck =
        await getLoanVerificationCheckById(
            id
        );


    if (!existingCheck) {

        throw new Error(
            "Loan verification check not found."
        );

    }


    return await deleteLoanVerificationCheck(
        id
    );

}


// ==========================================================
// Export Constants
// ==========================================================

export {
    VERIFICATION_STATUSES,
    RISK_LEVELS,
    VERIFICATION_TYPES
};

