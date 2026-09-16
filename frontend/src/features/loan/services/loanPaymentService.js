/**
 * ==========================================================
 * FINVERSE
 * Loan Payment Service
 * ==========================================================
 */

import {
    getLoanPayments,
    getLoanPaymentById as apiGetPaymentById,
    getLoanPaymentsByLoanId as apiGetPaymentsByLoanId,
    createLoanPayment as apiCreatePayment,
    updateLoanPayment as apiUpdatePayment,
    deleteLoanPayment as apiDeletePayment
} from "../api/loanPaymentApi";

export async function fetchLoanPayments() {
    try {
        const response = await getLoanPayments();
        return response?.data ?? response ?? [];
    } catch {
        return [];
    }
}

export async function fetchLoanPaymentById(paymentId) {
    if (!paymentId) throw new Error("Loan payment ID is required.");
    const response = await apiGetPaymentById(paymentId);
    return response?.data ?? response;
}

export async function fetchLoanPaymentsByLoanId(loanId) {
    if (!loanId) throw new Error("Loan ID is required.");
    const response = await apiGetPaymentsByLoanId(loanId);
    return response?.data ?? response;
}

export async function fetchLoanPaymentsByUserId(userId) {
    const all = await fetchLoanPayments();
    if (!Array.isArray(all)) return [];
    return all.filter(p => String(p.user_id) === String(userId));
}

export async function addLoanPayment(paymentData) {
    const response = await apiCreatePayment(paymentData);
    return response?.data ?? response;
}

export async function editLoanPayment(paymentId, paymentData) {
    const response = await apiUpdatePayment(paymentId, paymentData);
    return response?.data ?? response;
}

export async function changeLoanPaymentStatus(paymentId, status) {
    return await editLoanPayment(paymentId, { status });
}

export async function removeLoanPayment(paymentId) {
    const response = await apiDeletePayment(paymentId);
    return response?.data ?? response;
}

// Aliases for Hook Imports
export {
    fetchLoanPayments as getAllLoanPayments,
    fetchLoanPaymentById as getLoanPaymentById,
    fetchLoanPaymentsByLoanId as getLoanPaymentsByLoanId,
    addLoanPayment as createLoanPayment,
    editLoanPayment as updateLoanPayment,
    removeLoanPayment as deleteLoanPayment,
    fetchLoanPayments as fetchAllLoanPayments,
    fetchLoanPayments as fetchLoanPaymentsByStatus,
    addLoanPayment as createNewLoanPayment,
    editLoanPayment as updateExistingLoanPayment
};
