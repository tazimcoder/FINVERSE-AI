/**
 * ==========================================================
 * FINVERSE AI
 * Loan Applicant Profile API
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/api/loanApplicantProfileApi.js
 *
 * Responsibility:
 *
 * - Communicate with Applicant Profile backend APIs
 *
 * ==========================================================
 */

import api from "../../../services/api";

import {
    LOAN_API_PATHS
} from "../constants/loanConstants";


// ==========================================================
// Get Applicant Profiles
// ==========================================================

export async function getLoanApplicantProfiles() {

    const response =
        await api.get(
            LOAN_API_PATHS.APPLICANT_PROFILES
        );

    return response.data;

}


// ==========================================================
// Get Applicant Profile By ID
// ==========================================================

export async function getLoanApplicantProfileById(
    profileId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.APPLICANT_PROFILES}/${profileId}`
        );

    return response.data;

}


// ==========================================================
// Create Applicant Profile
// ==========================================================

export async function createLoanApplicantProfile(
    profileData
) {

    const response =
        await api.post(
            LOAN_API_PATHS.APPLICANT_PROFILES,
            profileData
        );

    return response.data;

}


// ==========================================================
// Update Applicant Profile
// ==========================================================

export async function updateLoanApplicantProfile(
    profileId,
    profileData
) {

    const response =
        await api.put(
            `${LOAN_API_PATHS.APPLICANT_PROFILES}/${profileId}`,
            profileData
        );

    return response.data;

}


// ==========================================================
// Delete Applicant Profile
// ==========================================================

export async function deleteLoanApplicantProfile(
    profileId
) {

    const response =
        await api.delete(
            `${LOAN_API_PATHS.APPLICANT_PROFILES}/${profileId}`
        );

    return response.data;

}

