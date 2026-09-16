/**
 * ==========================================================
 * FINVERSE
 * Loan Verification Check Service
 * ==========================================================
 */

import {
    getLoanVerificationChecks,
    getLoanVerificationCheckById as apiGetById,
    getLoanVerificationChecksByApplicationId as apiGetByAppId,
    createLoanVerificationCheck as apiCreateCheck,
    updateLoanVerificationCheck as apiUpdateCheck,
    deleteLoanVerificationCheck as apiDeleteCheck
} from "../api/loanVerificationCheckApi";

export async function fetchLoanVerificationChecks() {
    try {
        const response = await getLoanVerificationChecks();
        return response?.data ?? response ?? [];
    } catch {
        return [];
    }
}

export async function fetchLoanVerificationCheckById(id) {
    const response = await apiGetById(id);
    return response?.data ?? response;
}

export async function fetchLoanVerificationChecksByApplicationId(appId) {
    const response = await apiGetByAppId(appId);
    return response?.data ?? response;
}

export async function addLoanVerificationCheck(data) {
    const response = await apiCreateCheck(data);
    return response?.data ?? response;
}

export async function editLoanVerificationCheck(id, data) {
    const response = await apiUpdateCheck(id, data);
    return response?.data ?? response;
}

export async function removeLoanVerificationCheck(id) {
    const response = await apiDeleteCheck(id);
    return response?.data ?? response;
}

// Aliases for Hook Imports
export {
    fetchLoanVerificationChecks as getAllLoanVerificationChecks,
    fetchLoanVerificationCheckById as getLoanVerificationCheckById,
    fetchLoanVerificationChecksByApplicationId as getLoanVerificationChecksByApplicationId,
    addLoanVerificationCheck as createLoanVerificationCheck,
    editLoanVerificationCheck as updateLoanVerificationCheck,
    removeLoanVerificationCheck as deleteLoanVerificationCheck
};
