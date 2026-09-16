/**
 * ==========================================================
 * FINVERSE AI
 * Loan Application Validator
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/validators/loanApplicationValidator.js
 *
 * Database Table:
 * loan_applications
 *
 * Responsibility:
 *
 * - Validate loan application input
 * - Validate application ID
 * - Validate application number
 * - Validate user ID
 * - Validate loan product ID
 * - Validate requested amount
 * - Validate requested tenure
 * - Validate employment type
 * - Validate financial values
 * - Validate credit score
 * - Validate application status
 * - Validate create payload
 * - Validate update payload
 * - Validate status update payload
 *
 * ==========================================================
 */


// ==========================================================
// Allowed Loan Application Statuses
// ==========================================================

export const ALLOWED_LOAN_APPLICATION_STATUSES = [

    "DRAFT",

    "SUBMITTED",

    "UNDER_REVIEW",

    "ELIGIBILITY_CHECK",

    "DOCUMENT_VERIFICATION",

    "APPROVED",

    "REJECTED",

    "CANCELLED",

    "DISBURSED"

];


// ==========================================================
// Allowed Employment Types
// ==========================================================

export const ALLOWED_EMPLOYMENT_TYPES = [

    "SALARIED",

    "SELF_EMPLOYED",

    "BUSINESS",

    "PROFESSIONAL",

    "STUDENT",

    "RETIRED",

    "UNEMPLOYED",

    "OTHER"

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
// Validate Non-Negative Number
// ==========================================================

function validateNonNegativeNumber(
    value,
    fieldName,
    allowNull = true
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        if (allowNull) {

            return null;

        }

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
// Validate Application ID
// ==========================================================

export function validateLoanApplicationId(
    applicationId
) {

    return validatePositiveInteger(
        applicationId,
        "Loan application ID"
    );

}


// ==========================================================
// Validate User ID
// ==========================================================

export function validateLoanApplicationUserId(
    userId
) {

    return validatePositiveInteger(
        userId,
        "User ID"
    );

}


// ==========================================================
// Validate Loan Product ID
// ==========================================================

export function validateLoanProductId(
    loanProductId
) {

    return validatePositiveInteger(
        loanProductId,
        "Loan product ID"
    );

}


// ==========================================================
// Validate Application Number
// ==========================================================

export function validateApplicationNumber(
    applicationNumber
) {

    return validateText(
        applicationNumber,
        "Application number",
        true,
        100
    );

}


// ==========================================================
// Validate Requested Amount
// ==========================================================

export function validateRequestedAmount(
    requestedAmount
) {

    return validatePositiveNumber(
        requestedAmount,
        "Requested amount"
    );

}


// ==========================================================
// Validate Requested Tenure
// ==========================================================

export function validateRequestedTenureMonths(
    requestedTenureMonths
) {

    const tenure =
        validatePositiveInteger(
            requestedTenureMonths,
            "Requested tenure"
        );


    return tenure;

}


// ==========================================================
// Validate Employment Type
// ==========================================================

export function validateEmploymentType(
    employmentType
) {

    if (
        employmentType === undefined ||
        employmentType === null ||
        employmentType === ""
    ) {

        return null;

    }


    const normalizedType =
        String(
            employmentType
        )
            .trim()
            .toUpperCase();


    if (
        !ALLOWED_EMPLOYMENT_TYPES.includes(
            normalizedType
        )
    ) {

        throw new Error(
            `Invalid employment type. Allowed values: ${ALLOWED_EMPLOYMENT_TYPES.join(", ")}.`
        );

    }


    return normalizedType;

}


// ==========================================================
// Validate Monthly Income
// ==========================================================

export function validateMonthlyIncome(
    monthlyIncome
) {

    return validateNonNegativeNumber(
        monthlyIncome,
        "Monthly income"
    );

}


// ==========================================================
// Validate Existing Monthly Obligations
// ==========================================================

export function validateExistingMonthlyObligations(
    obligations
) {

    return validateNonNegativeNumber(
        obligations,
        "Existing monthly obligations"
    );

}


// ==========================================================
// Validate Credit Score
// ==========================================================

export function validateCreditScore(
    creditScore
) {

    if (
        creditScore === undefined ||
        creditScore === null ||
        creditScore === ""
    ) {

        return null;

    }


    const score =
        Number(creditScore);


    if (
        !Number.isInteger(
            score
        )
    ) {

        throw new Error(
            "Credit score must be a valid integer."
        );

    }


    if (
        score < 0
    ) {

        throw new Error(
            "Credit score cannot be negative."
        );

    }


    return score;

}


// ==========================================================
// Validate Purpose
// ==========================================================

export function validateLoanPurpose(
    purpose
) {

    return validateText(
        purpose,
        "Loan purpose",
        false,
        500
    );

}


// ==========================================================
// Validate Application Status
// ==========================================================

export function validateLoanApplicationStatus(
    status
) {

    if (
        status === undefined ||
        status === null ||
        status === ""
    ) {

        throw new Error(
            "Loan application status is required."
        );

    }


    const normalizedStatus =
        String(
            status
        )
            .trim()
            .toUpperCase();


    if (
        !ALLOWED_LOAN_APPLICATION_STATUSES.includes(
            normalizedStatus
        )
    ) {

        throw new Error(
            `Invalid loan application status. Allowed statuses: ${ALLOWED_LOAN_APPLICATION_STATUSES.join(", ")}.`
        );

    }


    return normalizedStatus;

}


// ==========================================================
// Validate Rejection Reason
// ==========================================================

export function validateRejectionReason(
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
// Validate Create Loan Application
// ==========================================================

export function validateCreateLoanApplication(
    applicationData
) {

    if (
        !applicationData ||
        typeof applicationData !== "object"
    ) {

        throw new Error(
            "Loan application data is required."
        );

    }


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

        status,

        rejection_reason

    } = applicationData;


    // ------------------------------------------------------
    // Required Relationships
    // ------------------------------------------------------

    const validatedUserId =
        validateLoanApplicationUserId(
            user_id
        );


    const validatedLoanProductId =
        validateLoanProductId(
            loan_product_id
        );


    // ------------------------------------------------------
    // Application Number
    // ------------------------------------------------------

    const validatedApplicationNumber =
        validateApplicationNumber(
            application_number
        );


    // ------------------------------------------------------
    // Requested Loan Details
    // ------------------------------------------------------

    const validatedRequestedAmount =
        validateRequestedAmount(
            requested_amount
        );


    const validatedRequestedTenure =
        validateRequestedTenureMonths(
            requested_tenure_months
        );


    // ------------------------------------------------------
    // Application Details
    // ------------------------------------------------------

    const validatedPurpose =
        validateLoanPurpose(
            purpose
        );


    const validatedEmploymentType =
        validateEmploymentType(
            employment_type
        );


    // ------------------------------------------------------
    // Financial Information
    // ------------------------------------------------------

    const validatedMonthlyIncome =
        validateMonthlyIncome(
            monthly_income
        );


    const validatedObligations =
        validateExistingMonthlyObligations(
            existing_monthly_obligations
        );


    const validatedCreditScore =
        validateCreditScore(
            credit_score
        );


    // ------------------------------------------------------
    // Status
    // ------------------------------------------------------

    let validatedStatus =
        "DRAFT";


    if (
        status !== undefined &&
        status !== null &&
        status !== ""
    ) {

        validatedStatus =
            validateLoanApplicationStatus(
                status
            );

    }


    // ------------------------------------------------------
    // Rejection Reason
    // ------------------------------------------------------

    const validatedRejectionReason =
        validateRejectionReason(
            rejection_reason
        );


    // ------------------------------------------------------
    // Return Validated Data
    // ------------------------------------------------------

    return {

        ...applicationData,

        application_number:
            validatedApplicationNumber,

        user_id:
            validatedUserId,

        loan_product_id:
            validatedLoanProductId,

        requested_amount:
            validatedRequestedAmount,

        requested_tenure_months:
            validatedRequestedTenure,

        purpose:
            validatedPurpose,

        employment_type:
            validatedEmploymentType,

        monthly_income:
            validatedMonthlyIncome,

        existing_monthly_obligations:
            validatedObligations,

        credit_score:
            validatedCreditScore,

        status:
            validatedStatus,

        rejection_reason:
            validatedRejectionReason

    };

}


// ==========================================================
// Validate Update Loan Application
// ==========================================================

export function validateUpdateLoanApplication(
    applicationId,
    applicationData
) {

    const validatedApplicationId =
        validateLoanApplicationId(
            applicationId
        );


    if (
        !applicationData ||
        typeof applicationData !== "object"
    ) {

        throw new Error(
            "Loan application data is required."
        );

    }


    const {

        requested_amount,

        requested_tenure_months,

        purpose,

        employment_type,

        monthly_income,

        existing_monthly_obligations,

        credit_score,

        rejection_reason

    } = applicationData;


    const updateData = {

        requested_amount:
            requested_amount !== undefined
                ? validateRequestedAmount(
                    requested_amount
                )
                : undefined,

        requested_tenure_months:
            requested_tenure_months !== undefined
                ? validateRequestedTenureMonths(
                    requested_tenure_months
                )
                : undefined,

        purpose:
            purpose !== undefined
                ? validateLoanPurpose(
                    purpose
                )
                : undefined,

        employment_type:
            employment_type !== undefined
                ? validateEmploymentType(
                    employment_type
                )
                : undefined,

        monthly_income:
            monthly_income !== undefined
                ? validateMonthlyIncome(
                    monthly_income
                )
                : undefined,

        existing_monthly_obligations:
            existing_monthly_obligations !== undefined
                ? validateExistingMonthlyObligations(
                    existing_monthly_obligations
                )
                : undefined,

        credit_score:
            credit_score !== undefined
                ? validateCreditScore(
                    credit_score
                )
                : undefined,

        rejection_reason:
            rejection_reason !== undefined
                ? validateRejectionReason(
                    rejection_reason
                )
                : undefined

    };


    return {

        id:
            validatedApplicationId,

        ...applicationData,

        ...updateData

    };

}


// ==========================================================
// Validate Application Status Update
// ==========================================================

export function validateLoanApplicationStatusUpdate(
    applicationId,
    status,
    rejectionReason = null
) {

    const validatedApplicationId =
        validateLoanApplicationId(
            applicationId
        );


    const validatedStatus =
        validateLoanApplicationStatus(
            status
        );


    const validatedRejectionReason =
        validateRejectionReason(
            rejectionReason
        );


    return {

        id:
            validatedApplicationId,

        status:
            validatedStatus,

        rejection_reason:
            validatedRejectionReason

    };

}


// ==========================================================
// Validate Fetch By User
// ==========================================================

export function validateLoanApplicationsByUser(
    userId
) {

    return validateLoanApplicationUserId(
        userId
    );

}


// ==========================================================
// Validate Fetch By Application Number
// ==========================================================

export function validateLoanApplicationNumber(
    applicationNumber
) {

    return validateApplicationNumber(
        applicationNumber
    );

}


// ==========================================================
// Validate Delete Loan Application
// ==========================================================

export function validateDeleteLoanApplication(
    applicationId
) {

    return validateLoanApplicationId(
        applicationId
    );

}


// ==========================================================
// Default Export
// ==========================================================

export default {

    ALLOWED_LOAN_APPLICATION_STATUSES,

    ALLOWED_EMPLOYMENT_TYPES,

    validateLoanApplicationId,

    validateLoanApplicationUserId,

    validateLoanProductId,

    validateApplicationNumber,

    validateRequestedAmount,

    validateRequestedTenureMonths,

    validateEmploymentType,

    validateMonthlyIncome,

    validateExistingMonthlyObligations,

    validateCreditScore,

    validateLoanPurpose,

    validateLoanApplicationStatus,

    validateRejectionReason,

    validateCreateLoanApplication,

    validateUpdateLoanApplication,

    validateLoanApplicationStatusUpdate,

    validateLoanApplicationsByUser,

    validateLoanApplicationNumber,

    validateDeleteLoanApplication

};