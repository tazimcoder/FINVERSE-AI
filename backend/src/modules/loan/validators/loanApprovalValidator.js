/**
 * ==========================================================
 * FINVERSE AI
 * Loan Approval Validator
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/validators/loanApprovalValidator.js
 *
 * Responsibility:
 *
 * - Validate loan approval request
 * - Validate loan application ID
 * - Validate approving user ID
 * - Validate approval decision
 * - Validate approved amount
 * - Validate approved tenure
 * - Validate interest rate
 * - Validate rejection reason
 * - Validate approval remarks
 * - Validate approval payload
 *
 * Flow:
 *
 * LOAN APPLICATION
 *        ↓
 * ELIGIBILITY CHECK
 *        ↓
 * DOCUMENT VERIFICATION
 *        ↓
 * LOAN APPROVAL
 *        ↓
 * APPROVED / REJECTED / MANUAL_REVIEW
 *        ↓
 * LOAN CREATION
 *
 * ==========================================================
 */


// ==========================================================
// Allowed Approval Decisions
// ==========================================================

export const ALLOWED_APPROVAL_DECISIONS = [

    "APPROVED",

    "REJECTED",

    "MANUAL_REVIEW"

];


// ==========================================================
// Utility
// Validate Positive Integer
// ==========================================================

function validatePositiveInteger(
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
// Utility
// Validate Positive Number
// ==========================================================

function validatePositiveNumber(
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
        !Number.isFinite(
            numericValue
        )
    ) {

        throw new Error(
            `${fieldName} must be a valid number.`
        );

    }


    if (
        numericValue <= 0
    ) {

        throw new Error(
            `${fieldName} must be greater than zero.`
        );

    }


    return numericValue;

}


// ==========================================================
// Utility
// Validate Non-Negative Number
// ==========================================================

function validateNonNegativeNumber(
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


    if (
        numericValue < 0
    ) {

        throw new Error(
            `${fieldName} cannot be negative.`
        );

    }


    return numericValue;

}


// ==========================================================
// Utility
// Validate Text
// ==========================================================

function validateText(
    value,
    fieldName,
    required = false,
    maxLength = null
) {

    if (
        value === undefined ||
        value === null
    ) {

        if (required) {

            throw new Error(
                `${fieldName} is required.`
            );

        }

        return null;

    }


    const text =
        String(value).trim();


    if (
        text.length === 0
    ) {

        if (required) {

            throw new Error(
                `${fieldName} is required.`
            );

        }

        return null;

    }


    if (
        maxLength !== null &&
        text.length > maxLength
    ) {

        throw new Error(
            `${fieldName} cannot exceed ${maxLength} characters.`
        );

    }


    return text;

}


// ==========================================================
// Validate Loan Application ID
// ==========================================================

export function validateLoanApprovalApplicationId(
    applicationId
) {

    return validatePositiveInteger(
        applicationId,
        "Loan application ID"
    );

}


// ==========================================================
// Validate Approving User ID
// ==========================================================

export function validateLoanApprovalUserId(
    userId
) {

    return validatePositiveInteger(
        userId,
        "Approving user ID"
    );

}


// ==========================================================
// Validate Approval Decision
// ==========================================================

export function validateApprovalDecision(
    decision
) {

    if (
        decision === undefined ||
        decision === null ||
        decision === ""
    ) {

        throw new Error(
            "Approval decision is required."
        );

    }


    const normalizedDecision =
        String(
            decision
        )
            .trim()
            .toUpperCase();


    if (
        !ALLOWED_APPROVAL_DECISIONS.includes(
            normalizedDecision
        )
    ) {

        throw new Error(
            `Invalid approval decision. Allowed decisions: ${ALLOWED_APPROVAL_DECISIONS.join(", ")}.`
        );

    }


    return normalizedDecision;

}


// ==========================================================
// Validate Approved Amount
// ==========================================================

export function validateApprovedAmount(
    approvedAmount
) {

    return validatePositiveNumber(
        approvedAmount,
        "Approved amount"
    );

}


// ==========================================================
// Validate Approved Tenure
// ==========================================================

export function validateApprovedTenureMonths(
    approvedTenureMonths
) {

    return validatePositiveInteger(
        approvedTenureMonths,
        "Approved tenure"
    );

}


// ==========================================================
// Validate Interest Rate
// ==========================================================

export function validateInterestRate(
    interestRate
) {

    const rate =
        validateNonNegativeNumber(
            interestRate,
            "Interest rate"
        );


    if (
        rate !== null &&
        rate > 100
    ) {

        throw new Error(
            "Interest rate cannot exceed 100%."
        );

    }


    return rate;

}


// ==========================================================
// Validate Rejection Reason
// ==========================================================

export function validateApprovalRejectionReason(
    rejectionReason
) {

    return validateText(
        rejectionReason,
        "Rejection reason",
        false,
        2000
    );

}


// ==========================================================
// Validate Approval Remarks
// ==========================================================

export function validateApprovalRemarks(
    remarks
) {

    return validateText(
        remarks,
        "Approval remarks",
        false,
        5000
    );

}


// ==========================================================
// Validate Approval Request
// ==========================================================

export function validateLoanApprovalRequest(
    approvalData
) {

    if (
        !approvalData ||
        typeof approvalData !== "object"
    ) {

        throw new Error(
            "Loan approval data is required."
        );

    }


    const {

        loan_application_id,

        approved_by_user_id,

        decision,

        approved_amount,

        approved_tenure_months,

        interest_rate,

        rejection_reason,

        remarks

    } = approvalData;


    // ------------------------------------------------------
    // Relationship IDs
    // ------------------------------------------------------

    const validatedApplicationId =
        validateLoanApprovalApplicationId(
            loan_application_id
        );


    const validatedApproverId =
        validateLoanApprovalUserId(
            approved_by_user_id
        );


    // ------------------------------------------------------
    // Decision
    // ------------------------------------------------------

    const validatedDecision =
        validateApprovalDecision(
            decision
        );


    // ------------------------------------------------------
    // Approval Financial Details
    // ------------------------------------------------------

    let validatedApprovedAmount =
        null;


    let validatedApprovedTenure =
        null;


    let validatedInterestRate =
        null;


    if (
        validatedDecision ===
        "APPROVED"
    ) {

        validatedApprovedAmount =
            validateApprovedAmount(
                approved_amount
            );


        validatedApprovedTenure =
            validateApprovedTenureMonths(
                approved_tenure_months
            );


        validatedInterestRate =
            validateInterestRate(
                interest_rate
            );

    }


    // ------------------------------------------------------
    // Rejection Reason
    // ------------------------------------------------------

    const validatedRejectionReason =
        validateApprovalRejectionReason(
            rejection_reason
        );


    // ------------------------------------------------------
    // Remarks
    // ------------------------------------------------------

    const validatedRemarks =
        validateApprovalRemarks(
            remarks
        );


    // ------------------------------------------------------
    // Business Rule
    // ------------------------------------------------------

    if (
        validatedDecision ===
        "REJECTED" &&
        !validatedRejectionReason
    ) {

        throw new Error(
            "Rejection reason is required when loan application is rejected."
        );

    }


    // ------------------------------------------------------
    // Return Validated Data
    // ------------------------------------------------------

    return {

        ...approvalData,

        loan_application_id:
            validatedApplicationId,

        approved_by_user_id:
            validatedApproverId,

        decision:
            validatedDecision,

        approved_amount:
            validatedApprovedAmount,

        approved_tenure_months:
            validatedApprovedTenure,

        interest_rate:
            validatedInterestRate,

        rejection_reason:
            validatedRejectionReason,

        remarks:
            validatedRemarks

    };

}


// ==========================================================
// Validate Approval By Application
// ==========================================================

export function validateLoanApprovalByApplicationId(
    applicationId
) {

    return validateLoanApprovalApplicationId(
        applicationId
    );

}


// ==========================================================
// Validate Approval Status
// ==========================================================

export function validateLoanApprovalStatus(
    status
) {

    return validateApprovalDecision(
        status
    );

}


// ==========================================================
// Default Export
// ==========================================================

export default {

    ALLOWED_APPROVAL_DECISIONS,

    validateLoanApprovalApplicationId,

    validateLoanApprovalUserId,

    validateApprovalDecision,

    validateApprovedAmount,

    validateApprovedTenureMonths,

    validateInterestRate,

    validateApprovalRejectionReason,

    validateApprovalRemarks,

    validateLoanApprovalRequest,

    validateLoanApprovalByApplicationId,

    validateLoanApprovalStatus

};