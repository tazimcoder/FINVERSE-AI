/**
 * ==========================================================
 * FINVERSE
 * Loan Approval Service
 * ==========================================================
 */

import {
    getLoanApprovals,
    getLoanApprovalById as apiGetById,
    createLoanApproval as apiCreateApproval,
    updateLoanApproval as apiUpdateApproval,
    deleteLoanApproval as apiDeleteApproval
} from "../api/loanApprovalApi";

export async function fetchLoanApprovals() {
    try {
        const response = await getLoanApprovals();
        return response?.data ?? response ?? [];
    } catch {
        return [];
    }
}

export async function fetchLoanApprovalById(id) {
    const response = await apiGetById(id);
    return response?.data ?? response;
}

export async function fetchLoanApprovalsByLoanId(loanId) {
    const all = await fetchLoanApprovals();
    if (!Array.isArray(all)) return [];
    return all.filter(a => String(a.loan_id) === String(loanId));
}

export async function fetchLoanApprovalsByApplicationId(appId) {
    const all = await fetchLoanApprovals();
    if (!Array.isArray(all)) return [];
    return all.filter(a => String(a.application_id) === String(appId));
}

export async function addLoanApproval(data) {
    const response = await apiCreateApproval(data);
    return response?.data ?? response;
}

export async function editLoanApproval(id, data) {
    const response = await apiUpdateApproval(id, data);
    return response?.data ?? response;
}

export async function changeLoanApprovalStatus(id, status) {
    return await editLoanApproval(id, { status });
}

export async function removeLoanApproval(id) {
    const response = await apiDeleteApproval(id);
    return response?.data ?? response;
}

// Aliases for Hook Imports
export {
    fetchLoanApprovals as fetchAllLoanApprovals,
    addLoanApproval as createNewLoanApproval,
    editLoanApproval as updateExistingLoanApproval
};
