/**
 * ==========================================================
 * FINVERSE
 * Loan Guarantor Service
 * ==========================================================
 */

import {
    getLoanGuarantors,
    getLoanGuarantorById as apiGetById,
    getLoanGuarantorsByApplicationId as apiGetByAppId,
    getLoanGuarantorsByUserId as apiGetByUserId,
    createLoanGuarantor as apiCreateGuarantor,
    updateLoanGuarantor as apiUpdateGuarantor,
    deleteLoanGuarantor as apiDeleteGuarantor
} from "../api/loanGuarantorApi";

export async function fetchLoanGuarantors() {
    try {
        const response = await getLoanGuarantors();
        return response?.data ?? response ?? [];
    } catch {
        return [];
    }
}

export async function fetchLoanGuarantorById(guarantorId) {
    const response = await apiGetById(guarantorId);
    return response?.data ?? response;
}

export async function fetchLoanGuarantorsByApplicationId(applicationId) {
    const response = await apiGetByAppId(applicationId);
    return response?.data ?? response;
}

export async function fetchLoanGuarantorsByUserId(userId) {
    const response = await apiGetByUserId(userId);
    return response?.data ?? response;
}

export async function fetchLoanGuarantorsByStatus(status) {
    const all = await fetchLoanGuarantors();
    if (!Array.isArray(all)) return [];
    return all.filter(g => String(g.status).toUpperCase() === String(status).toUpperCase());
}

export async function fetchLoanGuarantorsByVerificationStatus(status) {
    const all = await fetchLoanGuarantors();
    if (!Array.isArray(all)) return [];
    return all.filter(g => String(g.verification_status).toUpperCase() === String(status).toUpperCase());
}

export async function fetchLoanGuarantorsByConsentStatus(status) {
    const all = await fetchLoanGuarantors();
    if (!Array.isArray(all)) return [];
    return all.filter(g => String(g.consent_status).toUpperCase() === String(status).toUpperCase());
}

export async function addLoanGuarantor(guarantorData) {
    const response = await apiCreateGuarantor(guarantorData);
    return response?.data ?? response;
}

export async function editLoanGuarantor(guarantorId, guarantorData) {
    const response = await apiUpdateGuarantor(guarantorId, guarantorData);
    return response?.data ?? response;
}

export async function changeLoanGuarantorStatus(guarantorId, status) {
    return await editLoanGuarantor(guarantorId, { status });
}

export async function changeLoanGuarantorVerificationStatus(guarantorId, status) {
    return await editLoanGuarantor(guarantorId, { verification_status: status });
}

export async function changeLoanGuarantorConsentStatus(guarantorId, status, consentAt) {
    return await editLoanGuarantor(guarantorId, { consent_status: status, consent_at: consentAt });
}

export async function removeLoanGuarantor(guarantorId) {
    const response = await apiDeleteGuarantor(guarantorId);
    return response?.data ?? response;
}

// Aliases for Hook Imports
export {
    fetchLoanGuarantors as fetchAllLoanGuarantors,
    addLoanGuarantor as createNewLoanGuarantor,
    editLoanGuarantor as updateExistingLoanGuarantor
};
