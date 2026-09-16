/**
 * ==========================================================
 * FINVERSE AI
 * Loan Disbursement API
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/api/loanDisbursementApi.js
 *
 * Responsibility:
 *
 * - Communicate with Loan Disbursement backend APIs
 *
 * ==========================================================
 */

import api from "../../../services/api";

import {
    LOAN_API_PATHS
} from "../constants/loanConstants";


// ==========================================================
// Get All Loan Disbursements
// ==========================================================

export async function getLoanDisbursements() {

    const response =
        await api.get(
            LOAN_API_PATHS.DISBURSEMENTS
        );

    return response.data;

}


// ==========================================================
// Get Disbursement By ID
// ==========================================================

export async function getLoanDisbursementById(
    disbursementId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.DISBURSEMENTS}/${disbursementId}`
        );

    return response.data;

}


// ==========================================================
// Get Disbursements By Loan ID
// ==========================================================

export async function getLoanDisbursementsByLoanId(
    loanId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.DISBURSEMENTS}/loan/${loanId}`
        );

    return response.data;

}


// ==========================================================
// Create Loan Disbursement
// ==========================================================

export async function createLoanDisbursement(
    disbursementData
) {

    const response =
        await api.post(
            LOAN_API_PATHS.DISBURSEMENTS,
            disbursementData
        );

    return response.data;

}


// ==========================================================
// Update Loan Disbursement
// ==========================================================

export async function updateLoanDisbursement(
    disbursementId,
    disbursementData
) {

    const response =
        await api.put(
            `${LOAN_API_PATHS.DISBURSEMENTS}/${disbursementId}`,
            disbursementData
        );

    return response.data;

}


// ==========================================================
// Delete Loan Disbursement
// ==========================================================

export async function deleteLoanDisbursement(
    disbursementId
) {

    const response =
        await api.delete(
            `${LOAN_API_PATHS.DISBURSEMENTS}/${disbursementId}`
        );

    return response.data;

}

