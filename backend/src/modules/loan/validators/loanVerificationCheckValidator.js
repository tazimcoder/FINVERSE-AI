/**
 * ==========================================================
 * FINVERSE AI
 * Loan Verification Check Validator
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/validators/loanVerificationCheckValidator.js
 *
 * Database Table:
 * loan_verification_checks
 *
 * Responsibility:
 *
 * - Validate verification check input
 * - Validate verification type
 * - Validate verification status
 * - Validate risk level
 * - Validate numeric values
 * - Validate IDs
 * - Provide reusable validation functions
 *
 * ==========================================================
 */


// ==========================================================
// Allowed Verification Types
// ==========================================================

export const VERIFICATION_TYPES = [
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
// Allowed Verification Statuses
// ==========================================================

export const VERIFICATION_STATUSES = [
    "PENDING",
    "IN_PROGRESS",
    "VERIFIED",
    "FAILED",
    "REJECTED",
    "MANUAL_REVIEW",
    "EXPIRED"
];


// ==========================================================
// Allowed Risk Levels
// ==========================================================

export const RISK_LEVELS = [
    "LOW",
    "MEDIUM",
    "HIGH",
    "CRITICAL",
    "UNKNOWN"
];


// ==========================================================
// Validate Required ID
// ==========================================================

export function validateId(
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
// Validate Optional ID
// ==========================================================

export function validateOptionalId(
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
// Validate Verification Type
// ==========================================================

export function validateVerificationType(
    verificationType,
    required = true
) {

    if (
        verificationType === undefined ||
        verificationType === null ||
        verificationType === ""
    ) {

        if (required) {

            throw new Error(
                "Verification type is required."
            );

        }

        return null;

    }


    const normalizedType =
        String(
            verificationType
        )
            .trim()
            .toUpperCase();


    if (
        !VERIFICATION_TYPES.includes(
            normalizedType
        )
    ) {

        throw new Error(
            `Invalid verification type. Allowed values: ${VERIFICATION_TYPES.join(", ")}.`
        );

    }


    return normalizedType;

}


// ==========================================================
// Validate Verification Status
// ==========================================================

export function validateVerificationStatus(
    status,
    required = true
) {

    if (
        status === undefined ||
        status === null ||
        status === ""
    ) {

        if (required) {

            throw new Error(
                "Verification status is required."
            );

        }

        return null;

    }


    const normalizedStatus =
        String(
            status
        )
            .trim()
            .toUpperCase();


    if (
        !VERIFICATION_STATUSES.includes(
            normalizedStatus
        )
    ) {

        throw new Error(
            `Invalid verification status. Allowed values: ${VERIFICATION_STATUSES.join(", ")}.`
        );

    }


    return normalizedStatus;

}


// ==========================================================
// Validate Risk Level
// ==========================================================

export function validateRiskLevel(
    riskLevel,
    required = false
) {

    if (
        riskLevel === undefined ||
        riskLevel === null ||
        riskLevel === ""
    ) {

        if (required) {

            throw new Error(
                "Risk level is required."
            );

        }

        return null;

    }


    const normalizedRiskLevel =
        String(
            riskLevel
        )
            .trim()
            .toUpperCase();


    if (
        !RISK_LEVELS.includes(
            normalizedRiskLevel
        )
    ) {

        throw new Error(
            `Invalid risk level. Allowed values: ${RISK_LEVELS.join(", ")}.`
        );

    }


    return normalizedRiskLevel;

}


// ==========================================================
// Validate Optional Number
// ==========================================================

export function validateOptionalNumber(
    value,
    fieldName,
    minimum = 0
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


    if (
        numericValue < minimum
    ) {

        throw new Error(
            `${fieldName} must be greater than or equal to ${minimum}.`
        );

    }


    return numericValue;

}


// ==========================================================
// Validate Verification Score
// ==========================================================
//
// Database:
// decimal(6,2)
//
// Expected range:
// 0 - 100
//
// ==========================================================

export function validateVerificationScore(
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
// Validate String
// ==========================================================

export function validateOptionalString(
    value,
    fieldName,
    maxLength = null
) {

    if (
        value === undefined ||
        value === null
    ) {

        return null;

    }


    const stringValue =
        String(value).trim();


    if (
        stringValue === ""
    ) {

        return null;

    }


    if (
        maxLength !== null &&
        stringValue.length > maxLength
    ) {

        throw new Error(
            `${fieldName} cannot exceed ${maxLength} characters.`
        );

    }


    return stringValue;

}


// ==========================================================
// Validate Create Verification Check
// ==========================================================

export function validateCreateLoanVerificationCheck(
    data
) {

    if (
        !data ||
        typeof data !== "object"
    ) {

        throw new Error(
            "Loan verification check data is required."
        );

    }


    const loanApplicationId =
        validateId(
            data.loan_application_id,
            "Loan application ID"
        );


    const userId =
        validateId(
            data.user_id,
            "User ID"
        );


    const verificationType =
        validateVerificationType(
            data.verification_type,
            true
        );


    const verificationStatus =
        validateVerificationStatus(
            data.verification_status ?? "PENDING",
            true
        );


    const riskLevel =
        validateRiskLevel(
            data.risk_level ?? "UNKNOWN",
            true
        );


    const verificationScore =
        validateVerificationScore(
            data.verification_score
        );


    const verifiedByUserId =
        validateOptionalId(
            data.verified_by_user_id,
            "Verified by user ID"
        );


    const verificationProvider =
        validateOptionalString(
            data.verification_provider,
            "Verification provider",
            150
        );


    const referenceNumber =
        validateOptionalString(
            data.reference_number,
            "Reference number",
            150
        );


    const failureReason =
        validateOptionalString(
            data.failure_reason,
            "Failure reason"
        );


    const remarks =
        validateOptionalString(
            data.remarks,
            "Remarks"
        );


    return {

        ...data,

        loan_application_id:
            loanApplicationId,

        user_id:
            userId,

        verification_type:
            verificationType,

        verification_status:
            verificationStatus,

        risk_level:
            riskLevel,

        verification_score:
            verificationScore,

        verified_by_user_id:
            verifiedByUserId,

        verification_provider:
            verificationProvider,

        reference_number:
            referenceNumber,

        failure_reason:
            failureReason,

        remarks:
            remarks

    };

}


// ==========================================================
// Validate Update Verification Check
// ==========================================================

export function validateUpdateLoanVerificationCheck(
    data
) {

    if (
        !data ||
        typeof data !== "object"
    ) {

        throw new Error(
            "Loan verification update data is required."
        );

    }


    const validatedData = {
        ...data
    };


    if (
        data.verification_type !== undefined
    ) {

        validatedData.verification_type =
            validateVerificationType(
                data.verification_type,
                true
            );

    }


    if (
        data.verification_status !== undefined
    ) {

        validatedData.verification_status =
            validateVerificationStatus(
                data.verification_status,
                true
            );

    }


    if (
        data.risk_level !== undefined
    ) {

        validatedData.risk_level =
            validateRiskLevel(
                data.risk_level,
                true
            );

    }


    if (
        data.verification_score !== undefined
    ) {

        validatedData.verification_score =
            validateVerificationScore(
                data.verification_score
            );

    }


    if (
        data.verified_by_user_id !== undefined
    ) {

        validatedData.verified_by_user_id =
            validateOptionalId(
                data.verified_by_user_id,
                "Verified by user ID"
            );

    }


    if (
        data.verification_provider !== undefined
    ) {

        validatedData.verification_provider =
            validateOptionalString(
                data.verification_provider,
                "Verification provider",
                150
            );

    }


    if (
        data.reference_number !== undefined
    ) {

        validatedData.reference_number =
            validateOptionalString(
                data.reference_number,
                "Reference number",
                150
            );

    }


    if (
        data.failure_reason !== undefined
    ) {

        validatedData.failure_reason =
            validateOptionalString(
                data.failure_reason,
                "Failure reason"
            );

    }


    if (
        data.remarks !== undefined
    ) {

        validatedData.remarks =
            validateOptionalString(
                data.remarks,
                "Remarks"
            );

    }


    return validatedData;

}


// ==========================================================
// Validate Verification Status Update
// ==========================================================

export function validateLoanVerificationStatusUpdate(
    data
) {

    if (
        !data ||
        typeof data !== "object"
    ) {

        throw new Error(
            "Verification status update data is required."
        );

    }


    const verificationStatus =
        validateVerificationStatus(
            data.verification_status,
            true
        );


    const riskLevel =
        validateRiskLevel(
            data.risk_level,
            false
        );


    const verificationScore =
        validateVerificationScore(
            data.verification_score
        );


    const verifiedByUserId =
        validateOptionalId(
            data.verified_by_user_id,
            "Verified by user ID"
        );


    const failureReason =
        validateOptionalString(
            data.failure_reason,
            "Failure reason"
        );


    const remarks =
        validateOptionalString(
            data.remarks,
            "Remarks"
        );


    return {

        verification_status:
            verificationStatus,

        risk_level:
            riskLevel,

        verification_score:
            verificationScore,

        verified_by_user_id:
            verifiedByUserId,

        failure_reason:
            failureReason,

        remarks:
            remarks

    };

}


// ==========================================================
// Export Default Validation Object
// ==========================================================

export default {

    VERIFICATION_TYPES,

    VERIFICATION_STATUSES,

    RISK_LEVELS,

    validateId,

    validateOptionalId,

    validateVerificationType,

    validateVerificationStatus,

    validateRiskLevel,

    validateOptionalNumber,

    validateVerificationScore,

    validateOptionalString,

    validateCreateLoanVerificationCheck,

    validateUpdateLoanVerificationCheck,

    validateLoanVerificationStatusUpdate

};

