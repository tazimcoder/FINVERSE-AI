/**
 * ==========================================================
 * FINVERSE AI
 * Loan Eligibility API
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/api/loanEligibilityApi.js
 *
 * Responsibility:
 *
 * - Communicate with Loan Eligibility backend APIs
 *
 * ==========================================================
 */

import api from "../../../services/api";

import {
    LOAN_API_PATHS
} from "../constants/loanConstants";


// ==========================================================
// Get Loan Eligibility By ID
// ==========================================================

export async function getLoanEligibility(
    eligibilityId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.ELIGIBILITY}/${eligibilityId}`
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


// ==========================================================
// Update Loan Eligibility
// ==========================================================

export async function updateLoanEligibility(
    eligibilityId,
    eligibilityData
) {

    const response =
        await api.put(
            `${LOAN_API_PATHS.ELIGIBILITY}/${eligibilityId}`,
            eligibilityData
        );

    return response.data;

}

