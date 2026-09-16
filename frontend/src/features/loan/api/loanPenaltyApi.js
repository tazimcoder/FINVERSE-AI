/**
 * ==========================================================
 * FINVERSE AI
 * Loan Penalty API
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/api/loanPenaltyApi.js
 *
 * Responsibility:
 *
 * - Communicate with Loan Penalty backend APIs
 *
 * ==========================================================
 */

import api from "../../../services/api";

import {
    LOAN_API_PATHS
} from "../constants/loanConstants";


// ==========================================================
// Get All Loan Penalties
// ==========================================================

export async function getLoanPenalties() {

    const response =
        await api.get(
            LOAN_API_PATHS.PENALTIES
        );

    return response.data;

}


// ==========================================================
// Get Penalty By ID
// ==========================================================

export async function getLoanPenaltyById(
    penaltyId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.PENALTIES}/${penaltyId}`
        );

    return response.data;

}


// ==========================================================
// Get Penalties By Loan ID
// ==========================================================

export async function getLoanPenaltiesByLoanId(
    loanId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.PENALTIES}/loan/${loanId}`
        );

    return response.data;

}


// ==========================================================
// Create Loan Penalty
// ==========================================================

export async function createLoanPenalty(
    penaltyData
) {

    const response =
        await api.post(
            LOAN_API_PATHS.PENALTIES,
            penaltyData
        );

    return response.data;

}


// ==========================================================
// Update Loan Penalty
// ==========================================================

export async function updateLoanPenalty(
    penaltyId,
    penaltyData
) {

    const response =
        await api.put(
            `${LOAN_API_PATHS.PENALTIES}/${penaltyId}`,
            penaltyData
        );

    return response.data;

}


// ==========================================================
// Delete Loan Penalty
// ==========================================================

export async function deleteLoanPenalty(
    penaltyId
) {

    const response =
        await api.delete(
            `${LOAN_API_PATHS.PENALTIES}/${penaltyId}`
        );

    return response.data;

}

