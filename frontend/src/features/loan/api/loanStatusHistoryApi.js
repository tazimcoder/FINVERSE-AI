/**
 * ==========================================================
 * FINVERSE AI
 * Loan Status History API
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/api/loanStatusHistoryApi.js
 *
 * Responsibility:
 *
 * - Communicate with Loan Status History backend APIs
 *
 * ==========================================================
 */

import api from "../../../services/api";

import {
    LOAN_API_PATHS
} from "../constants/loanConstants";


// ==========================================================
// Get All Loan Status History
// ==========================================================

export async function getLoanStatusHistory() {

    const response =
        await api.get(
            LOAN_API_PATHS.STATUS_HISTORY
        );

    return response.data;

}


// ==========================================================
// Get Status History By ID
// ==========================================================

export async function getLoanStatusHistoryById(
    historyId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.STATUS_HISTORY}/${historyId}`
        );

    return response.data;

}


// ==========================================================
// Get Status History By Loan ID
// ==========================================================

export async function getLoanStatusHistoryByLoanId(
    loanId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.STATUS_HISTORY}/loan/${loanId}`
        );

    return response.data;

}


// ==========================================================
// Create Status History
// ==========================================================

export async function createLoanStatusHistory(
    historyData
) {

    const response =
        await api.post(
            LOAN_API_PATHS.STATUS_HISTORY,
            historyData
        );

    return response.data;

}


// ==========================================================
// Delete Status History
// ==========================================================

export async function deleteLoanStatusHistory(
    historyId
) {

    const response =
        await api.delete(
            `${LOAN_API_PATHS.STATUS_HISTORY}/${historyId}`
        );

    return response.data;

}

