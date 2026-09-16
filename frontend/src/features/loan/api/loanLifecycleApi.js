/**
 * ==========================================================
 * FINVERSE AI
 * Loan Lifecycle API
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/api/loanLifecycleApi.js
 *
 * Responsibility:
 *
 * - Communicate with Loan Lifecycle backend APIs
 * - Start and manage loan lifecycle operations
 *
 * ==========================================================
 */

import api from "../../../services/api";

import {
    LOAN_API_PATHS
} from "../constants/loanConstants";


// ==========================================================
// Get Loan Lifecycle
// ==========================================================

export async function getLoanLifecycle(
    loanId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.LIFECYCLE}/${loanId}`
        );

    return response.data;

}


// ==========================================================
// Start Loan Lifecycle
// ==========================================================

export async function startLoanLifecycle(
    loanId
) {

    const response =
        await api.post(
            `${LOAN_API_PATHS.LIFECYCLE}/${loanId}/start`
        );

    return response.data;

}


// ==========================================================
// Advance Loan Lifecycle
// ==========================================================

export async function advanceLoanLifecycle(
    loanId,
    lifecycleData = {}
) {

    const response =
        await api.post(
            `${LOAN_API_PATHS.LIFECYCLE}/${loanId}/advance`,
            lifecycleData
        );

    return response.data;

}


// ==========================================================
// Complete Loan Lifecycle
// ==========================================================

export async function completeLoanLifecycle(
    loanId,
    lifecycleData = {}
) {

    const response =
        await api.post(
            `${LOAN_API_PATHS.LIFECYCLE}/${loanId}/complete`,
            lifecycleData
        );

    return response.data;

}

