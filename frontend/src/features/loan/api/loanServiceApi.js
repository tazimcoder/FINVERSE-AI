/**
 * ==========================================================
 * FINVERSE AI
 * Loan Service API
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/api/loanServiceApi.js
 *
 * Responsibility:
 *
 * - Central Loan Service API helpers
 * - Provide common loan-related API operations
 *
 * ==========================================================
 */

import api from "../../../services/api";

import {
    LOAN_API_PATHS
} from "../constants/loanConstants";


// ==========================================================
// Get Loan Summary
// ==========================================================

export async function getLoanSummary(
    loanId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.LOANS}/${loanId}/summary`
        );

    return response.data;

}


// ==========================================================
// Get Complete Loan Details
// ==========================================================

export async function getCompleteLoanDetails(
    loanId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.LOANS}/${loanId}/details`
        );

    return response.data;

}


// ==========================================================
// Get Loan Dashboard Data
// ==========================================================

export async function getLoanDashboardData() {

    const response =
        await api.get(
            `${LOAN_API_PATHS.LOANS}/dashboard`
        );

    return response.data;

}


// ==========================================================
// Calculate EMI
// ==========================================================

export async function calculateLoanEMI(
    principal,
    annualInterestRate,
    tenureMonths
) {

    const response =
        await api.post(
            `${LOAN_API_PATHS.LOANS}/calculate-emi`,
            {
                principal,
                annualInterestRate,
                tenureMonths
            }
        );

    return response.data;

}


// ==========================================================
// Check Loan Eligibility
// ==========================================================

export async function checkLoanEligibility(
    eligibilityData
) {

    const response =
        await api.post(
            LOAN_API_PATHS.ELIGIBILITY,
            eligibilityData
        );

    return response.data;

}

