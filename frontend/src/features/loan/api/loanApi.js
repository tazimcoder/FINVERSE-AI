/**
 * ==========================================================
 * FINVERSE AI
 * Loan Core API
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/api/loanApi.js
 *
 * Responsibility:
 *
 * - Communicate with Loan Core backend APIs
 * - Fetch loan records
 * - Fetch loans by user
 * - Fetch loans by application
 * - Fetch loans by status
 * - Create loan records
 * - Update loan records
 * - Update loan status
 * - Delete loan records
 *
 * ==========================================================
 */

import api from "../../../services/api";

import {
    LOAN_API_PATHS
} from "../constants/loanConstants";


// ==========================================================
// Get All Loans
// ==========================================================

export async function getLoans() {

    const response =
        await api.get(
            LOAN_API_PATHS.LOANS
        );

    return response.data;

}


// ==========================================================
// Get Loan By ID
// ==========================================================

export async function getLoanById(
    loanId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.LOANS}/${loanId}`
        );

    return response.data;

}


// ==========================================================
// Get Loans By User ID
// ==========================================================

export async function getLoansByUserId(
    userId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.LOANS}/user/${userId}`
        );

    return response.data;

}


// ==========================================================
// Get Loans By Application ID
// ==========================================================

export async function getLoansByApplicationId(
    applicationId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.LOANS}/application/${applicationId}`
        );

    return response.data;

}


// ==========================================================
// Get Loans By Status
// ==========================================================

export async function getLoansByStatus(
    status
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.LOANS}/status/${status}`
        );

    return response.data;

}


// ==========================================================
// Create Loan
// ==========================================================

export async function createLoan(
    loanData
) {

    const response =
        await api.post(
            LOAN_API_PATHS.LOANS,
            loanData
        );

    return response.data;

}


// ==========================================================
// Update Loan
// ==========================================================

export async function updateLoan(
    loanId,
    loanData
) {

    const response =
        await api.put(
            `${LOAN_API_PATHS.LOANS}/${loanId}`,
            loanData
        );

    return response.data;

}


// ==========================================================
// Update Loan Status
// ==========================================================

export async function updateLoanStatus(
    loanId,
    status
) {

    const response =
        await api.patch(
            `${LOAN_API_PATHS.LOANS}/${loanId}/status`,
            {
                status
            }
        );

    return response.data;

}


// ==========================================================
// Delete Loan
// ==========================================================

export async function deleteLoan(
    loanId
) {

    const response =
        await api.delete(
            `${LOAN_API_PATHS.LOANS}/${loanId}`
        );

    return response.data;

}

