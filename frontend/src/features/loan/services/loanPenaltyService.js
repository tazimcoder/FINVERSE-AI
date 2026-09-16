/**
 * ==========================================================
 * FINVERSE
 * Loan Penalty Service
 * ==========================================================
 */

import {
    getLoanPenalties,
    getLoanPenaltyById as apiGetPenaltyById,
    getLoanPenaltiesByLoanId as apiGetPenaltiesByLoanId,
    createLoanPenalty as apiCreatePenalty,
    updateLoanPenalty as apiUpdatePenalty,
    deleteLoanPenalty as apiDeletePenalty
} from "../api/loanPenaltyApi";

export async function fetchLoanPenalties() {
    try {
        const response = await getLoanPenalties();
        return response?.data ?? response ?? [];
    } catch {
        return [];
    }
}

export async function fetchLoanPenaltyById(penaltyId) {
    const response = await apiGetPenaltyById(penaltyId);
    return response?.data ?? response;
}

export async function fetchLoanPenaltiesByLoanId(loanId) {
    const response = await apiGetPenaltiesByLoanId(loanId);
    return response?.data ?? response;
}

export async function addLoanPenalty(penaltyData) {
    const response = await apiCreatePenalty(penaltyData);
    return response?.data ?? response;
}

export async function editLoanPenalty(penaltyId, penaltyData) {
    const response = await apiUpdatePenalty(penaltyId, penaltyData);
    return response?.data ?? response;
}

export async function removeLoanPenalty(penaltyId) {
    const response = await apiDeletePenalty(penaltyId);
    return response?.data ?? response;
}

// Aliases for Hook Imports
export {
    fetchLoanPenalties as getAllLoanPenalties,
    fetchLoanPenaltyById as getLoanPenaltyById,
    fetchLoanPenaltiesByLoanId as getLoanPenaltiesByLoanId,
    addLoanPenalty as createLoanPenalty,
    editLoanPenalty as updateLoanPenalty,
    removeLoanPenalty as deleteLoanPenalty
};
