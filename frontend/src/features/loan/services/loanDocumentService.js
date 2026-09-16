/**
 * ==========================================================
 * FINVERSE
 * Loan Document Service
 * ==========================================================
 */

import {
    getLoanDocuments,
    getLoanDocumentById as apiGetById,
    getLoanDocumentsByApplicationId as apiGetByAppId,
    createLoanDocument as apiCreateDocument,
    updateLoanDocument as apiUpdateDocument,
    deleteLoanDocument as apiDeleteDocument
} from "../api/loanDocumentApi";

export async function fetchLoanDocuments() {
    try {
        const response = await getLoanDocuments();
        return response?.data ?? response ?? [];
    } catch {
        return [];
    }
}

export async function fetchLoanDocumentById(id) {
    const response = await apiGetById(id);
    return response?.data ?? response;
}

export async function fetchLoanDocumentsByLoanId(loanId) {
    const all = await fetchLoanDocuments();
    if (!Array.isArray(all)) return [];
    return all.filter(d => String(d.loan_id) === String(loanId));
}

export async function fetchLoanDocumentsByApplicationId(appId) {
    const response = await apiGetByAppId(appId);
    return response?.data ?? response;
}

export async function addLoanDocument(data) {
    const response = await apiCreateDocument(data);
    return response?.data ?? response;
}

export async function editLoanDocument(id, data) {
    const response = await apiUpdateDocument(id, data);
    return response?.data ?? response;
}

export async function changeLoanDocumentStatus(id, status) {
    return await editLoanDocument(id, { status });
}

export async function removeLoanDocument(id) {
    const response = await apiDeleteDocument(id);
    return response?.data ?? response;
}

// Aliases for Hook Imports
export {
    fetchLoanDocuments as fetchAllLoanDocuments,
    addLoanDocument as createNewLoanDocument,
    editLoanDocument as updateExistingLoanDocument
};
