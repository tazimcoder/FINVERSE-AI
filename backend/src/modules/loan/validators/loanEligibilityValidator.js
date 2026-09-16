/**
 * ==========================================================
 * FINVERSE AI
 * Loan Eligibility Validator
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/validators/loanEligibilityValidator.js
 *
 * Database Table:
 * loan_eligibility_checks
 *
 * Responsibility:
 *
 * - Validate loan eligibility check data
 * - Validate required fields
 * - Validate numeric values
 * - Validate eligibility status
 * - Validate eligibility update data
 *
 * ==========================================================
 */


// ==========================================================
// Allowed Eligibility Statuses
// ==========================================================

export const LOAN_ELIGIBILITY_STATUSES = [

    "PENDING",

    "ELIGIBLE",

    "NOT_ELIGIBLE",

    "MANUAL_REVIEW"

];


// ==========================================================
// Validate Numeric Value
// ==========================================================

function isValidNumber(
    value
) {

    return (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        Number.isFinite(
            Number(value)
        )
    );

}


// ==========================================================
// Validate Non-Negative Number
// ==========================================================

function isValidNonNegativeNumber(
    value
) {

    return (
        isValidNumber(value) &&
        Number(value) >= 0
    );

}


// ==========================================================
// Validate Positive Integer
// ==========================================================

function isValidPositiveInteger(
    value
) {

    return (
        Number.isInteger(
            Number(value)
        ) &&
        Number(value) > 0
    );

}


// ==========================================================
// Validate Loan Eligibility Create Data
// ==========================================================

export function validateLoanEligibilityData(
    eligibilityData
) {

    if (
        !eligibilityData ||
        typeof eligibilityData !== "object" ||
        Array.isArray(eligibilityData)
    ) {

        return {

            valid: false,

            message:
                "Loan eligibility data is required."

        };

    }


    const {
        loan_application_id,
        monthly_income,
        existing_monthly_obligations,
        credit_score,
        debt_to_income_ratio,
        eligible_amount,
        eligible_tenure_months,
        eligibility_status,
        reason
    } = eligibilityData;


    // ======================================================
    // Loan Application ID
    // ======================================================

    if (
        !isValidPositiveInteger(
            loan_application_id
        )
    ) {

        return {

            valid: false,

            message:
                "Valid loan application ID is required."

        };

    }


    // ======================================================
    // Monthly Income
    // ======================================================

    if (
        monthly_income !== undefined &&
        monthly_income !== null &&
        monthly_income !== ""
    ) {

        if (
            !isValidNonNegativeNumber(
                monthly_income
            )
        ) {

            return {

                valid: false,

                message:
                    "Monthly income must be a valid non-negative number."

            };

        }

    }


    // ======================================================
    // Existing Monthly Obligations
    // ======================================================

    if (
        existing_monthly_obligations !== undefined &&
        existing_monthly_obligations !== null &&
        existing_monthly_obligations !== ""
    ) {

        if (
            !isValidNonNegativeNumber(
                existing_monthly_obligations
            )
        ) {

            return {

                valid: false,

                message:
                    "Existing monthly obligations must be a valid non-negative number."

            };

        }

    }


    // ======================================================
    // Credit Score
    // ======================================================

    if (
        credit_score !== undefined &&
        credit_score !== null &&
        credit_score !== ""
    ) {

        if (
            !isValidNonNegativeNumber(
                credit_score
            )
        ) {

            return {

                valid: false,

                message:
                    "Credit score must be a valid non-negative number."

            };

        }


        if (
            Number(credit_score) > 999.99
        ) {

            return {

                valid: false,

                message:
                    "Credit score cannot exceed 999.99."

            };

        }

    }


    // ======================================================
    // Debt To Income Ratio
    // ======================================================

    if (
        debt_to_income_ratio !== undefined &&
        debt_to_income_ratio !== null &&
        debt_to_income_ratio !== ""
    ) {

        if (
            !isValidNonNegativeNumber(
                debt_to_income_ratio
            )
        ) {

            return {

                valid: false,

                message:
                    "Debt-to-income ratio must be a valid non-negative number."

            };

        }


        if (
            Number(debt_to_income_ratio) > 999.99
        ) {

            return {

                valid: false,

                message:
                    "Debt-to-income ratio cannot exceed 999.99."

            };

        }

    }


    // ======================================================
    // Eligible Amount
    // ======================================================

    if (
        eligible_amount !== undefined &&
        eligible_amount !== null &&
        eligible_amount !== ""
    ) {

        if (
            !isValidNonNegativeNumber(
                eligible_amount
            )
        ) {

            return {

                valid: false,

                message:
                    "Eligible amount must be a valid non-negative number."

            };

        }

    }


    // ======================================================
    // Eligible Tenure
    // ======================================================

    if (
        eligible_tenure_months !== undefined &&
        eligible_tenure_months !== null &&
        eligible_tenure_months !== ""
    ) {

        if (
            !isValidPositiveInteger(
                eligible_tenure_months
            )
        ) {

            return {

                valid: false,

                message:
                    "Eligible tenure must be a positive integer."

            };

        }

    }


    // ======================================================
    // Eligibility Status
    // ======================================================

    const status =
        eligibility_status ??
        "PENDING";


    if (
        !LOAN_ELIGIBILITY_STATUSES.includes(
            status
        )
    ) {

        return {

            valid: false,

            message:
                "Invalid loan eligibility status."

        };

    }


    // ======================================================
    // Reason
    // ======================================================

    if (
        reason !== undefined &&
        reason !== null &&
        typeof reason !== "string"
    ) {

        return {

            valid: false,

            message:
                "Eligibility reason must be a string."

        };

    }


    // ======================================================
    // Validation Successful
    // ======================================================

    return {

        valid: true,

        message:
            "Loan eligibility data is valid."

    };

}


// ==========================================================
// Validate Loan Eligibility Update Data
// ==========================================================

export function validateLoanEligibilityUpdateData(
    eligibilityData
) {

    if (
        !eligibilityData ||
        typeof eligibilityData !== "object" ||
        Array.isArray(eligibilityData)
    ) {

        return {

            valid: false,

            message:
                "Loan eligibility update data is required."

        };

    }


    const {

        monthly_income,

        existing_monthly_obligations,

        credit_score,

        debt_to_income_ratio,

        eligible_amount,

        eligible_tenure_months,

        eligibility_status,

        reason

    } = eligibilityData;


    // ======================================================
    // Monthly Income
    // ======================================================

    if (
        monthly_income !== undefined &&
        monthly_income !== null &&
        monthly_income !== ""
    ) {

        if (
            !isValidNonNegativeNumber(
                monthly_income
            )
        ) {

            return {

                valid: false,

                message:
                    "Monthly income must be a valid non-negative number."

            };

        }

    }


    // ======================================================
    // Existing Monthly Obligations
    // ======================================================

    if (
        existing_monthly_obligations !== undefined &&
        existing_monthly_obligations !== null &&
        existing_monthly_obligations !== ""
    ) {

        if (
            !isValidNonNegativeNumber(
                existing_monthly_obligations
            )
        ) {

            return {

                valid: false,

                message:
                    "Existing monthly obligations must be a valid non-negative number."

            };

        }

    }


    // ======================================================
    // Credit Score
    // ======================================================

    if (
        credit_score !== undefined &&
        credit_score !== null &&
        credit_score !== ""
    ) {

        if (
            !isValidNonNegativeNumber(
                credit_score
            )
        ) {

            return {

                valid: false,

                message:
                    "Credit score must be a valid non-negative number."

            };

        }


        if (
            Number(credit_score) > 999.99
        ) {

            return {

                valid: false,

                message:
                    "Credit score cannot exceed 999.99."

            };

        }

    }


    // ======================================================
    // Debt To Income Ratio
    // ======================================================

    if (
        debt_to_income_ratio !== undefined &&
        debt_to_income_ratio !== null &&
        debt_to_income_ratio !== ""
    ) {

        if (
            !isValidNonNegativeNumber(
                debt_to_income_ratio
            )
        ) {

            return {

                valid: false,

                message:
                    "Debt-to-income ratio must be a valid non-negative number."

            };

        }


        if (
            Number(debt_to_income_ratio) > 999.99
        ) {

            return {

                valid: false,

                message:
                    "Debt-to-income ratio cannot exceed 999.99."

            };

        }

    }


    // ======================================================
    // Eligible Amount
    // ======================================================

    if (
        eligible_amount !== undefined &&
        eligible_amount !== null &&
        eligible_amount !== ""
    ) {

        if (
            !isValidNonNegativeNumber(
                eligible_amount
            )
        ) {

            return {

                valid: false,

                message:
                    "Eligible amount must be a valid non-negative number."

            };

        }

    }


    // ======================================================
    // Eligible Tenure
    // ======================================================

    if (
        eligible_tenure_months !== undefined &&
        eligible_tenure_months !== null &&
        eligible_tenure_months !== ""
    ) {

        if (
            !isValidPositiveInteger(
                eligible_tenure_months
            )
        ) {

            return {

                valid: false,

                message:
                    "Eligible tenure must be a positive integer."

            };

        }

    }


    // ======================================================
    // Eligibility Status
    // ======================================================

    if (
        eligibility_status !== undefined &&
        eligibility_status !== null &&
        eligibility_status !== ""
    ) {

        if (
            !LOAN_ELIGIBILITY_STATUSES.includes(
                eligibility_status
            )
        ) {

            return {

                valid: false,

                message:
                    "Invalid loan eligibility status."

            };

        }

    }


    // ======================================================
    // Reason
    // ======================================================

    if (
        reason !== undefined &&
        reason !== null &&
        typeof reason !== "string"
    ) {

        return {

            valid: false,

            message:
                "Eligibility reason must be a string."

        };

    }


    // ======================================================
    // Validation Successful
    // ======================================================

    return {

        valid: true,

        message:
            "Loan eligibility update data is valid."

    };

}


// ==========================================================
// Validate Eligibility Status
// ==========================================================

export function validateLoanEligibilityStatus(
    status
) {

    if (!status) {

        return {

            valid: false,

            message:
                "Eligibility status is required."

        };

    }


    if (
        !LOAN_ELIGIBILITY_STATUSES.includes(
            status
        )
    ) {

        return {

            valid: false,

            message:
                "Invalid loan eligibility status."

        };

    }


    return {

        valid: true,

        message:
            "Loan eligibility status is valid."

    };

}


// ==========================================================
// Export Default Validator Object
// ==========================================================

export default {

    LOAN_ELIGIBILITY_STATUSES,

    validateLoanEligibilityData,

    validateLoanEligibilityUpdateData,

    validateLoanEligibilityStatus

};

