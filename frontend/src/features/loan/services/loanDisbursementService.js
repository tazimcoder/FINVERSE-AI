/**
 * ==========================================================
 * FINVERSE
 * Loan Disbursement Service
 * ==========================================================
 */

import {
    getLoanDisbursements,
    getLoanDisbursementById as apiGetById,
    getLoanDisbursementsByLoanId as apiGetByLoanId,
    createLoanDisbursement as apiCreateDisbursement,
    updateLoanDisbursement as apiUpdateDisbursement,
    deleteLoanDisbursement as apiDeleteDisbursement
} from "../api/loanDisbursementApi";

export async function fetchLoanDisbursements() {
    try {
        const response = await getLoanDisbursements();
        return response?.data ?? response ?? [];
    } catch {
        return [];
    }
}

export async function fetchLoanDisbursementById(disbursementId) {
    const response = await apiGetById(disbursementId);
    return response?.data ?? response;
}

export async function fetchLoanDisbursementsByLoanId(loanId) {
    const response = await apiGetByLoanId(loanId);
    return response?.data ?? response;
}

export async function addLoanDisbursement(data) {
    const response = await apiCreateDisbursement(data);
    return response?.data ?? response;
}

export async function editLoanDisbursement(id, data) {
    const response = await apiUpdateDisbursement(id, data);
    return response?.data ?? response;
}

export async function changeLoanDisbursementStatus(id, status) {
    return await editLoanDisbursement(id, { status });
}

export async function removeLoanDisbursement(id) {
    const response = await apiDeleteDisbursement(id);
    return response?.data ?? response;
}

// Aliases for Hook Imports
export {
    fetchLoanDisbursements as fetchAllLoanDisbursements,
    addLoanDisbursement as createNewLoanDisbursement,
    editLoanDisbursement as updateExistingLoanDisbursement
};
