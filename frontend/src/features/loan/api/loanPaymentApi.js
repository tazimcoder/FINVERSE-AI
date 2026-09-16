/**
 * ==========================================================
 * FINVERSE AI
 * Loan Payment API
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/api/loanPaymentApi.js
 *
 * Responsibility:
 *
 * - Communicate with Loan Payment backend APIs
 *
 * ==========================================================
 */

import api from "../../../services/api";

import {
    LOAN_API_PATHS
} from "../constants/loanConstants";


// ==========================================================
// Get All Loan Payments
// ==========================================================

export async function getLoanPayments() {

    const response =
        await api.get(
            LOAN_API_PATHS.PAYMENTS
        );

    return response.data;

}


// ==========================================================
// Get Payment By ID
// ==========================================================

export async function getLoanPaymentById(
    paymentId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.PAYMENTS}/${paymentId}`
        );

    return response.data;

}


// ==========================================================
// Get Payments By Loan ID
// ==========================================================

export async function getLoanPaymentsByLoanId(
    loanId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.PAYMENTS}/loan/${loanId}`
        );

    return response.data;

}


// ==========================================================
// Create Loan Payment
// ==========================================================

export async function createLoanPayment(
    paymentData
) {

    const response =
        await api.post(
            LOAN_API_PATHS.PAYMENTS,
            paymentData
        );

    return response.data;

}


// ==========================================================
// Update Loan Payment
// ==========================================================

export async function updateLoanPayment(
    paymentId,
    paymentData
) {

    const response =
        await api.put(
            `${LOAN_API_PATHS.PAYMENTS}/${paymentId}`,
            paymentData
        );

    return response.data;

}


// ==========================================================
// Delete Loan Payment
// ==========================================================

export async function deleteLoanPayment(
    paymentId
) {

    const response =
        await api.delete(
            `${LOAN_API_PATHS.PAYMENTS}/${paymentId}`
        );

    return response.data;

}

