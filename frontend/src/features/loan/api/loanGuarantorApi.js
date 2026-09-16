/**
 * ==========================================================
 * FINVERSE AI
 * Loan Guarantor API
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/api/loanGuarantorApi.js
 *
 * Responsibility:
 *
 * - Communicate with Loan Guarantor backend APIs
 *
 * ==========================================================
 */

import api from "../../../services/api";

import {
    LOAN_API_PATHS
} from "../constants/loanConstants";


// ==========================================================
// Get All Loan Guarantors
// ==========================================================

export async function getLoanGuarantors() {

    const response =
        await api.get(
            LOAN_API_PATHS.GUARANTORS
        );

    return response.data;

}


// ==========================================================
// Get Guarantor By ID
// ==========================================================

export async function getLoanGuarantorById(
    guarantorId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.GUARANTORS}/${guarantorId}`
        );

    return response.data;

}


// ==========================================================
// Get Guarantors By Application ID
// ==========================================================

export async function getLoanGuarantorsByApplicationId(
    applicationId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.GUARANTORS}/application/${applicationId}`
        );

    return response.data;

}


// ==========================================================
// Get Guarantors By User ID
// ==========================================================

export async function getLoanGuarantorsByUserId(
    userId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.GUARANTORS}/user/${userId}`
        );

    return response.data;

}


// ==========================================================
// Create Loan Guarantor
// ==========================================================

export async function createLoanGuarantor(
    guarantorData
) {

    const response =
        await api.post(
            LOAN_API_PATHS.GUARANTORS,
            guarantorData
        );

    return response.data;

}


// ==========================================================
// Update Loan Guarantor
// ==========================================================

export async function updateLoanGuarantor(
    guarantorId,
    guarantorData
) {

    const response =
        await api.put(
            `${LOAN_API_PATHS.GUARANTORS}/${guarantorId}`,
            guarantorData
        );

    return response.data;

}


// ==========================================================
// Update Guarantor Status
// ==========================================================

export async function updateLoanGuarantorStatus(
    guarantorId,
    status
) {

    const response =
        await api.patch(
            `${LOAN_API_PATHS.GUARANTORS}/${guarantorId}/status`,
            {
                status
            }
        );

    return response.data;

}


// ==========================================================
// Update Verification Status
// ==========================================================

export async function updateLoanGuarantorVerificationStatus(
    guarantorId,
    status
) {

    const response =
        await api.patch(
            `${LOAN_API_PATHS.GUARANTORS}/${guarantorId}/verification-status`,
            {
                status
            }
        );

    return response.data;

}


// ==========================================================
// Update Consent Status
// ==========================================================

export async function updateLoanGuarantorConsentStatus(
    guarantorId,
    status,
    consentAt = undefined
) {

    const payload = {
        status
    };

    if (consentAt !== undefined) {

        payload.consentAt =
            consentAt;

    }

    const response =
        await api.patch(
            `${LOAN_API_PATHS.GUARANTORS}/${guarantorId}/consent-status`,
            payload
        );

    return response.data;

}


// ==========================================================
// Delete Loan Guarantor
// ==========================================================

export async function deleteLoanGuarantor(
    guarantorId
) {

    const response =
        await api.delete(
            `${LOAN_API_PATHS.GUARANTORS}/${guarantorId}`
        );

    return response.data;

}

