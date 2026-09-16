/**
 * ==========================================================
 * FINVERSE AI
 * Loan Validator
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/validators/loanValidator.js
 *
 * Responsibility:
 *
 * - Validate loan creation data
 * - Validate loan update data
 * - Validate loan status
 * - Prevent invalid data from reaching database layer
 * - Keep validation reusable and modular
 *
 * ==========================================================
 */


// ==========================================================
// Allowed Loan Statuses
// ==========================================================

const LOAN_STATUSES = [
    "ACTIVE",
    "OVERDUE",
    "CLOSED",
    "DEFAULTED",
    "FORECLOSED"
];


// ==========================================================
// Required Numeric Fields
// ==========================================================

function isPositiveNumber(value) {

    return (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        Number.isFinite(Number(value)) &&
        Number(value) > 0
    );

}


// ==========================================================
// Required Integer Fields
// ==========================================================

function isPositiveInteger(value) {

    return (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        Number.isInteger(Number(value)) &&
        Number(value) > 0
    );

}


// ==========================================================
// Validate Loan Creation
// ==========================================================

export function validateCreateLoan(data = {}) {

    const errors = [];


    // ------------------------------------------------------
    // Loan Number
    // ------------------------------------------------------

    if (
        !data.loan_number ||
        typeof data.loan_number !== "string" ||
        !data.loan_number.trim()
    ) {

        errors.push(
            "loan_number is required."
        );

    }


    // ------------------------------------------------------
    // User ID
    // ------------------------------------------------------

    if (
        !isPositiveInteger(
            data.user_id
        )
    ) {

        errors.push(
            "user_id must be a positive integer."
        );

    }


    // ------------------------------------------------------
    // Loan Application ID
    // ------------------------------------------------------

    if (
        !isPositiveInteger(
            data.loan_application_id
        )
    ) {

        errors.push(
            "loan_application_id must be a positive integer."
        );

    }


    // ------------------------------------------------------
    // Loan Product ID
    // ------------------------------------------------------

    if (
        !isPositiveInteger(
            data.loan_product_id
        )
    ) {

        errors.push(
            "loan_product_id must be a positive integer."
        );

    }


    // ------------------------------------------------------
    // Principal Amount
    // ------------------------------------------------------

    if (
        !isPositiveNumber(
            data.principal_amount
        )
    ) {

        errors.push(
            "principal_amount must be greater than 0."
        );

    }


    // ------------------------------------------------------
    // Interest Rate
    // ------------------------------------------------------

    if (
        !isPositiveNumber(
            data.interest_rate
        ) &&
        Number(data.interest_rate) !== 0
    ) {

        errors.push(
            "interest_rate must be 0 or greater."
        );

    }


    // ------------------------------------------------------
    // Tenure
    // ------------------------------------------------------

    if (
        !isPositiveInteger(
            data.tenure_months
        )
    ) {

        errors.push(
            "tenure_months must be a positive integer."
        );

    }


    // ------------------------------------------------------
    // EMI Amount
    // ------------------------------------------------------

    if (
        !isPositiveNumber(
            data.emi_amount
        )
    ) {

        errors.push(
            "emi_amount must be greater than 0."
        );

    }


    // ------------------------------------------------------
    // Outstanding Principal
    // ------------------------------------------------------

    if (
        data.outstanding_principal !== undefined &&
        data.outstanding_principal !== null &&
        !Number.isFinite(
            Number(data.outstanding_principal)
        )
    ) {

        errors.push(
            "outstanding_principal must be a valid number."
        );

    }


    // ------------------------------------------------------
    // Outstanding Interest
    // ------------------------------------------------------

    if (
        data.outstanding_interest !== undefined &&
        data.outstanding_interest !== null &&
        !Number.isFinite(
            Number(data.outstanding_interest)
        )
    ) {

        errors.push(
            "outstanding_interest must be a valid number."
        );

    }


    // ------------------------------------------------------
    // Status
    // ------------------------------------------------------

    if (
        data.status !== undefined &&
        data.status !== null &&
        !LOAN_STATUSES.includes(
            data.status
        )
    ) {

        errors.push(
            `status must be one of: ${LOAN_STATUSES.join(", ")}.`
        );

    }


    return {

        valid:
            errors.length === 0,

        errors

    };

}


// ==========================================================
// Validate Loan Update
// ==========================================================

export function validateUpdateLoan(data = {}) {

    const errors = [];


    // ------------------------------------------------------
    // Principal Amount
    // ------------------------------------------------------

    if (
        data.principal_amount !== undefined &&
        !isPositiveNumber(
            data.principal_amount
        )
    ) {

        errors.push(
            "principal_amount must be greater than 0."
        );

    }


    // ------------------------------------------------------
    // Interest Rate
    // ------------------------------------------------------

    if (
        data.interest_rate !== undefined &&
        (
            !Number.isFinite(
                Number(data.interest_rate)
            ) ||
            Number(data.interest_rate) < 0
        )
    ) {

        errors.push(
            "interest_rate must be 0 or greater."
        );

    }


    // ------------------------------------------------------
    // Tenure
    // ------------------------------------------------------

    if (
        data.tenure_months !== undefined &&
        !isPositiveInteger(
            data.tenure_months
        )
    ) {

        errors.push(
            "tenure_months must be a positive integer."
        );

    }


    // ------------------------------------------------------
    // EMI Amount
    // ------------------------------------------------------

    if (
        data.emi_amount !== undefined &&
        !isPositiveNumber(
            data.emi_amount
        )
    ) {

        errors.push(
            "emi_amount must be greater than 0."
        );

    }


    // ------------------------------------------------------
    // Outstanding Principal
    // ------------------------------------------------------

    if (
        data.outstanding_principal !== undefined &&
        (
            !Number.isFinite(
                Number(data.outstanding_principal)
            ) ||
            Number(data.outstanding_principal) < 0
        )
    ) {

        errors.push(
            "outstanding_principal must be 0 or greater."
        );

    }


    // ------------------------------------------------------
    // Outstanding Interest
    // ------------------------------------------------------

    if (
        data.outstanding_interest !== undefined &&
        (
            !Number.isFinite(
                Number(data.outstanding_interest)
            ) ||
            Number(data.outstanding_interest) < 0
        )
    ) {

        errors.push(
            "outstanding_interest must be 0 or greater."
        );

    }


    // ------------------------------------------------------
    // Status
    // ------------------------------------------------------

    if (
        data.status !== undefined &&
        !LOAN_STATUSES.includes(
            data.status
        )
    ) {

        errors.push(
            `status must be one of: ${LOAN_STATUSES.join(", ")}.`
        );

    }


    return {

        valid:
            errors.length === 0,

        errors

    };

}


// ==========================================================
// Validate Loan Status
// ==========================================================

export function validateLoanStatus(
    status
) {

    if (
        !status ||
        !LOAN_STATUSES.includes(
            status
        )
    ) {

        return {

            valid: false,

            errors: [
                `status must be one of: ${LOAN_STATUSES.join(", ")}.`
            ]

        };

    }


    return {

        valid: true,

        errors: []

    };

}


// ==========================================================
// Export Constants
// ==========================================================

export {
    LOAN_STATUSES
};

