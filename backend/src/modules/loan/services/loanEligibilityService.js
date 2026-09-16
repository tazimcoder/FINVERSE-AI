/**
 * ==========================================================
 * FINVERSE AI
 * Loan Eligibility Service
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/services/loanEligibilityService.js
 *
 * Responsibility:
 *
 * - Business logic for loan eligibility checks
 * - Validate eligibility input
 * - Validate loan application
 * - Validate financial values
 * - Calculate Debt-to-Income Ratio
 * - Determine eligibility status
 * - Calculate eligible loan amount
 * - Calculate eligible tenure
 * - Create eligibility check
 * - Fetch eligibility checks
 * - Fetch latest eligibility check
 * - Update eligibility status
 * - Delete eligibility check
 *
 * ==========================================================
 */

import {
    getAllLoanEligibilityChecks,
    getLoanEligibilityCheckById,
    getLoanEligibilityChecksByApplicationId,
    getLoanEligibilityChecksByStatus,
    createLoanEligibilityCheck,
    updateLoanEligibilityCheck,
    updateLoanEligibilityStatus,
    deleteLoanEligibilityCheck
} from "../models/loanEligibilityModel.js";


// ==========================================================
// CONSTANTS
// ==========================================================

const ALLOWED_STATUSES = [
    "PENDING",
    "ELIGIBLE",
    "NOT_ELIGIBLE",
    "MANUAL_REVIEW"
];


const DEFAULT_MAX_DTI_RATIO = 50;

const DEFAULT_MIN_CREDIT_SCORE = 650;


// ==========================================================
// UTILITY - VALIDATE POSITIVE NUMBER
// ==========================================================

function validateNumber(
    value,
    fieldName,
    allowZero = true
) {

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
        allowZero
            ? numericValue < 0
            : numericValue <= 0
    ) {

        throw new Error(
            `${fieldName} must be ${allowZero
                ? "greater than or equal to zero"
                : "greater than zero"
            }.`
        );

    }


    return numericValue;

}


// ==========================================================
// UTILITY - CALCULATE DTI RATIO
// ==========================================================
//
// DTI = Existing Monthly Obligations
//       / Monthly Income × 100
//
// ==========================================================

function calculateDTI(
    monthlyIncome,
    existingMonthlyObligations
) {

    const income =
        validateNumber(
            monthlyIncome,
            "Monthly income",
            false
        );


    const obligations =
        validateNumber(
            existingMonthlyObligations,
            "Existing monthly obligations"
        );


    if (
        income <= 0
    ) {

        throw new Error(
            "Monthly income must be greater than zero."
        );

    }


    const dti =
        (
            obligations /
            income
        ) * 100;


    return Number(
        dti.toFixed(2)
    );

}


// ==========================================================
// UTILITY - CALCULATE ELIGIBLE AMOUNT
// ==========================================================

function calculateEligibleAmount(
    monthlyIncome,
    existingMonthlyObligations,
    maxDtiRatio,
    requestedAmount
) {

    const income =
        Number(
            monthlyIncome
        );


    const obligations =
        Number(
            existingMonthlyObligations
        );


    const maximumObligations =
        income *
        (
            Number(maxDtiRatio) /
            100
        );


    const availableMonthlyCapacity =
        Math.max(
            maximumObligations -
            obligations,
            0
        );


    if (
        requestedAmount !== undefined &&
        requestedAmount !== null
    ) {

        const requested =
            Number(
                requestedAmount
            );


        if (
            Number.isFinite(
                requested
            ) &&
            requested > 0
        ) {

            return Number(
                Math.min(
                    requested,
                    Math.max(
                        requested,
                        availableMonthlyCapacity
                    )
                ).toFixed(2)
            );

        }

    }


    return Number(
        availableMonthlyCapacity.toFixed(2)
    );

}


// ==========================================================
// UTILITY - CALCULATE ELIGIBLE TENURE
// ==========================================================

function calculateEligibleTenure(
    requestedTenureMonths,
    productMinTenureMonths = null,
    productMaxTenureMonths = null
) {

    if (
        requestedTenureMonths === undefined ||
        requestedTenureMonths === null
    ) {

        return productMaxTenureMonths !== null
            ? Number(
                productMaxTenureMonths
            )
            : null;

    }


    const requested =
        Number(
            requestedTenureMonths
        );


    if (
        !Number.isInteger(
            requested
        ) ||
        requested <= 0
    ) {

        throw new Error(
            "Requested tenure must be a valid positive integer."
        );

    }


    let eligibleTenure =
        requested;


    if (
        productMinTenureMonths !== null &&
        eligibleTenure <
        Number(
            productMinTenureMonths
        )
    ) {

        eligibleTenure =
            Number(
                productMinTenureMonths
            );

    }


    if (
        productMaxTenureMonths !== null &&
        eligibleTenure >
        Number(
            productMaxTenureMonths
        )
    ) {

        eligibleTenure =
            Number(
                productMaxTenureMonths
            );

    }


    return eligibleTenure;

}


// ==========================================================
// FETCH ALL ELIGIBILITY CHECKS
// ==========================================================

export async function fetchAllLoanEligibilityChecks() {

    return await getAllLoanEligibilityChecks();

}


// ==========================================================
// FETCH ELIGIBILITY CHECK BY ID
// ==========================================================

export async function fetchLoanEligibilityCheckById(
    eligibilityId
) {

    if (
        !eligibilityId
    ) {

        throw new Error(
            "Loan eligibility check ID is required."
        );

    }


    return await getLoanEligibilityCheckById(
        eligibilityId
    );

}


// ==========================================================
// FETCH ELIGIBILITY CHECKS BY APPLICATION
// ==========================================================

export async function fetchLoanEligibilityChecksByApplicationId(
    applicationId
) {

    if (
        !applicationId
    ) {

        throw new Error(
            "Loan application ID is required."
        );

    }


    return await getLoanEligibilityChecksByApplicationId(
        applicationId
    );

}


// ==========================================================
// FETCH LATEST ELIGIBILITY CHECK BY APPLICATION
// ==========================================================
//
// IMPORTANT:
//
// We intentionally DO NOT import:
//
// getLatestLoanEligibilityCheckByApplicationId
//
// from loanEligibilityModel.js because that model currently
// does not export such a function.
//
// Instead, we use the existing:
//
// getLoanEligibilityChecksByApplicationId()
//
// and select the latest record here in the service layer.
//
// ==========================================================

export async function getLatestLoanEligibilityCheckByApplicationId(
    applicationId
) {

    if (
        !applicationId
    ) {

        throw new Error(
            "Loan application ID is required."
        );

    }


    const eligibilityChecks =
        await getLoanEligibilityChecksByApplicationId(
            applicationId
        );


    if (
        !eligibilityChecks
    ) {

        return null;

    }


    if (
        !Array.isArray(
            eligibilityChecks
        )
    ) {

        return eligibilityChecks;

    }


    if (
        eligibilityChecks.length === 0
    ) {

        return null;

    }


    /*
     * The model may already return records in DESC order.
     * To make the service independent of query ordering,
     * explicitly determine the latest record.
     */

    const sortedChecks =
        [...eligibilityChecks].sort(
            (
                first,
                second
            ) => {

                const firstDate =
                    new Date(
                        first.created_at ||
                        first.updated_at ||
                        0
                    ).getTime();


                const secondDate =
                    new Date(
                        second.created_at ||
                        second.updated_at ||
                        0
                    ).getTime();


                if (
                    secondDate !== firstDate
                ) {

                    return (
                        secondDate -
                        firstDate
                    );

                }


                const firstId =
                    Number(
                        first.id ||
                        first.eligibility_check_id ||
                        0
                    );


                const secondId =
                    Number(
                        second.id ||
                        second.eligibility_check_id ||
                        0
                    );


                return (
                    secondId -
                    firstId
                );

            }
        );


    return sortedChecks[0];

}


// ==========================================================
// FETCH ELIGIBILITY CHECKS BY STATUS
// ==========================================================

export async function fetchLoanEligibilityChecksByStatus(
    status
) {

    if (
        !status
    ) {

        throw new Error(
            "Eligibility status is required."
        );

    }


    const normalizedStatus =
        String(
            status
        )
            .trim()
            .toUpperCase();


    if (
        !ALLOWED_STATUSES.includes(
            normalizedStatus
        )
    ) {

        throw new Error(
            "Invalid eligibility status."
        );

    }


    return await getLoanEligibilityChecksByStatus(
        normalizedStatus
    );

}


// ==========================================================
// CREATE ELIGIBILITY CHECK
// ==========================================================

export async function createNewLoanEligibilityCheck(
    eligibilityData
) {

    if (
        !eligibilityData ||
        typeof eligibilityData !== "object"
    ) {

        throw new Error(
            "Loan eligibility data is required."
        );

    }


    const {
        loan_application_id,
        monthly_income,
        existing_monthly_obligations,
        credit_score,
        requested_amount,
        requested_tenure_months,
        max_dti_ratio,
        min_credit_score,
        product_min_tenure_months,
        product_max_tenure_months
    } = eligibilityData;


    // ======================================================
    // VALIDATE APPLICATION
    // ======================================================

    if (
        !loan_application_id
    ) {

        throw new Error(
            "Loan application ID is required."
        );

    }


    // ======================================================
    // VALIDATE INCOME
    // ======================================================

    const income =
        validateNumber(
            monthly_income,
            "Monthly income",
            false
        );


    // ======================================================
    // VALIDATE EXISTING OBLIGATIONS
    // ======================================================

    const obligations =
        validateNumber(
            existing_monthly_obligations ?? 0,
            "Existing monthly obligations"
        );


    // ======================================================
    // VALIDATE CREDIT SCORE
    // ======================================================

    const creditScore =
        validateNumber(
            credit_score,
            "Credit score"
        );


    // ======================================================
    // VALIDATE REQUESTED AMOUNT
    // ======================================================

    let requestedAmount =
        null;


    if (
        requested_amount !== undefined &&
        requested_amount !== null
    ) {

        requestedAmount =
            validateNumber(
                requested_amount,
                "Requested amount",
                false
            );

    }


    // ======================================================
    // VALIDATE REQUESTED TENURE
    // ======================================================

    let requestedTenure =
        null;


    if (
        requested_tenure_months !== undefined &&
        requested_tenure_months !== null
    ) {

        requestedTenure =
            Number(
                requested_tenure_months
            );


        if (
            !Number.isInteger(
                requestedTenure
            ) ||
            requestedTenure <= 0
        ) {

            throw new Error(
                "Requested tenure must be a valid positive integer."
            );

        }

    }


    // ======================================================
    // DETERMINE RULES
    // ======================================================

    const maximumDti =
        max_dti_ratio !== undefined &&
            max_dti_ratio !== null
            ? validateNumber(
                max_dti_ratio,
                "Maximum DTI ratio",
                false
            )
            : DEFAULT_MAX_DTI_RATIO;


    const minimumCreditScore =
        min_credit_score !== undefined &&
            min_credit_score !== null
            ? validateNumber(
                min_credit_score,
                "Minimum credit score"
            )
            : DEFAULT_MIN_CREDIT_SCORE;


    // ======================================================
    // CALCULATE DTI
    // ======================================================

    const debtToIncomeRatio =
        calculateDTI(
            income,
            obligations
        );


    // ======================================================
    // DETERMINE ELIGIBILITY
    // ======================================================

    let eligibilityStatus =
        "ELIGIBLE";


    let reason =
        "Applicant satisfies the basic loan eligibility criteria.";


    // ======================================================
    // CREDIT SCORE CHECK
    // ======================================================

    if (
        creditScore <
        minimumCreditScore
    ) {

        eligibilityStatus =
            "NOT_ELIGIBLE";


        reason =
            `Credit score is below the minimum required score of ${minimumCreditScore}.`;

    }


    // ======================================================
    // DTI CHECK
    // ======================================================

    else if (
        debtToIncomeRatio >
        maximumDti
    ) {

        eligibilityStatus =
            "NOT_ELIGIBLE";


        reason =
            `Debt-to-income ratio exceeds the maximum allowed ratio of ${maximumDti}%.`;

    }


    // ======================================================
    // ELIGIBLE AMOUNT
    // ======================================================

    let eligibleAmount =
        null;


    if (
        eligibilityStatus ===
        "ELIGIBLE"
    ) {

        eligibleAmount =
            calculateEligibleAmount(
                income,
                obligations,
                maximumDti,
                requestedAmount
            );

    }


    // ======================================================
    // ELIGIBLE TENURE
    // ======================================================

    let eligibleTenureMonths =
        null;


    if (
        eligibilityStatus ===
        "ELIGIBLE"
    ) {

        eligibleTenureMonths =
            calculateEligibleTenure(
                requestedTenure,
                product_min_tenure_months,
                product_max_tenure_months
            );

    }


    // ======================================================
    // PREPARE DATA
    // ======================================================

    const data = {

        loan_application_id:
            loan_application_id,

        monthly_income:
            income,

        existing_monthly_obligations:
            obligations,

        credit_score:
            creditScore,

        debt_to_income_ratio:
            debtToIncomeRatio,

        eligible_amount:
            eligibleAmount,

        eligible_tenure_months:
            eligibleTenureMonths,

        eligibility_status:
            eligibilityStatus,

        reason:
            reason

    };


    // ======================================================
    // CREATE DATABASE RECORD
    // ======================================================

    return await createLoanEligibilityCheck(
        data
    );

}


// ==========================================================
// UPDATE ELIGIBILITY CHECK
// ==========================================================

export async function updateExistingLoanEligibilityCheck(
    eligibilityId,
    eligibilityData
) {

    if (
        !eligibilityId
    ) {

        throw new Error(
            "Loan eligibility check ID is required."
        );

    }


    if (
        !eligibilityData ||
        typeof eligibilityData !== "object"
    ) {

        throw new Error(
            "Loan eligibility data is required."
        );

    }


    const existingCheck =
        await getLoanEligibilityCheckById(
            eligibilityId
        );


    if (
        !existingCheck
    ) {

        throw new Error(
            "Loan eligibility check not found."
        );

    }


    const {
        monthly_income,
        existing_monthly_obligations,
        credit_score,
        eligible_amount,
        eligible_tenure_months,
        eligibility_status,
        reason
    } = eligibilityData;


    const updateData = {

        monthly_income:
            monthly_income !== undefined
                ? validateNumber(
                    monthly_income,
                    "Monthly income",
                    false
                )
                : existingCheck.monthly_income,

        existing_monthly_obligations:
            existing_monthly_obligations !== undefined
                ? validateNumber(
                    existing_monthly_obligations,
                    "Existing monthly obligations"
                )
                : existingCheck.existing_monthly_obligations,

        credit_score:
            credit_score !== undefined
                ? validateNumber(
                    credit_score,
                    "Credit score"
                )
                : existingCheck.credit_score,

        eligible_amount:
            eligible_amount !== undefined
                ? validateNumber(
                    eligible_amount,
                    "Eligible amount"
                )
                : existingCheck.eligible_amount,

        eligible_tenure_months:
            eligible_tenure_months !== undefined
                ? Number(
                    eligible_tenure_months
                )
                : existingCheck.eligible_tenure_months,

        eligibility_status:
            eligibility_status !== undefined
                ? String(
                    eligibility_status
                )
                    .trim()
                    .toUpperCase()
                : existingCheck.eligibility_status,

        reason:
            reason !== undefined
                ? reason
                : existingCheck.reason

    };


    if (
        !ALLOWED_STATUSES.includes(
            updateData.eligibility_status
        )
    ) {

        throw new Error(
            "Invalid eligibility status."
        );

    }


    if (
        updateData.eligible_tenure_months !== null &&
        (
            !Number.isInteger(
                updateData.eligible_tenure_months
            ) ||
            updateData.eligible_tenure_months <= 0
        )
    ) {

        throw new Error(
            "Eligible tenure must be a valid positive integer."
        );

    }


    // ======================================================
    // RECALCULATE DTI
    // ======================================================

    updateData.debt_to_income_ratio =
        calculateDTI(
            updateData.monthly_income,
            updateData.existing_monthly_obligations
        );


    // ======================================================
    // UPDATE DATABASE
    // ======================================================

    return await updateLoanEligibilityCheck(
        eligibilityId,
        updateData
    );

}


// ==========================================================
// UPDATE ELIGIBILITY STATUS
// ==========================================================

export async function changeLoanEligibilityStatus(
    eligibilityId,
    status,
    reason = null
) {

    if (
        !eligibilityId
    ) {

        throw new Error(
            "Loan eligibility check ID is required."
        );

    }


    if (
        !status
    ) {

        throw new Error(
            "Eligibility status is required."
        );

    }


    const normalizedStatus =
        String(
            status
        )
            .trim()
            .toUpperCase();


    if (
        !ALLOWED_STATUSES.includes(
            normalizedStatus
        )
    ) {

        throw new Error(
            "Invalid eligibility status."
        );

    }


    const existingCheck =
        await getLoanEligibilityCheckById(
            eligibilityId
        );


    if (
        !existingCheck
    ) {

        throw new Error(
            "Loan eligibility check not found."
        );

    }


    return await updateLoanEligibilityStatus(
        eligibilityId,
        normalizedStatus,
        reason
    );

}


// ==========================================================
// DELETE ELIGIBILITY CHECK
// ==========================================================

export async function removeLoanEligibilityCheck(
    eligibilityId
) {

    if (
        !eligibilityId
    ) {

        throw new Error(
            "Loan eligibility check ID is required."
        );

    }


    const existingCheck =
        await getLoanEligibilityCheckById(
            eligibilityId
        );


    if (
        !existingCheck
    ) {

        throw new Error(
            "Loan eligibility check not found."
        );

    }


    return await deleteLoanEligibilityCheck(
        eligibilityId
    );

}


// ==========================================================
// EXPORT CONSTANTS
// ==========================================================

export {
    ALLOWED_STATUSES
};

