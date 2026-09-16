/**
 * ==========================================================
 * FINVERSE AI
 * Loan Verification Check API
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/api/loanVerificationCheckApi.js
 *
 * Responsibility:
 *
 * - Communicate with Loan Verification Check APIs
 *
 * ==========================================================
 */

import api from "../../../services/api";

import {
    LOAN_API_PATHS
} from "../constants/loanConstants";


// ==========================================================
// Get All Verification Checks
// ==========================================================

export async function getLoanVerificationChecks() {

    const response =
        await api.get(
            LOAN_API_PATHS.VERIFICATION_CHECKS
        );

    return response.data;

}


// ==========================================================
// Get Verification Check By ID
// ==========================================================

export async function getLoanVerificationCheckById(
    checkId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.VERIFICATION_CHECKS}/${checkId}`
        );

    return response.data;

}


// ==========================================================
// Get Verification Checks By Application
// ==========================================================

export async function getLoanVerificationChecksByApplicationId(
    applicationId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.VERIFICATION_CHECKS}/application/${applicationId}`
        );

    return response.data;

}


// ==========================================================
// Create Verification Check
// ==========================================================

export async function createLoanVerificationCheck(
    checkData
) {

    const response =
        await api.post(
            LOAN_API_PATHS.VERIFICATION_CHECKS,
            checkData
        );

    return response.data;

}


// ==========================================================
// Update Verification Check
// ==========================================================

export async function updateLoanVerificationCheck(
    checkId,
    checkData
) {

    const response =
        await api.put(
            `${LOAN_API_PATHS.VERIFICATION_CHECKS}/${checkId}`,
            checkData
        );

    return response.data;

}


// ==========================================================
// Delete Verification Check
// ==========================================================

export async function deleteLoanVerificationCheck(
    checkId
) {

    const response =
        await api.delete(
            `${LOAN_API_PATHS.VERIFICATION_CHECKS}/${checkId}`
        );

    return response.data;

}

