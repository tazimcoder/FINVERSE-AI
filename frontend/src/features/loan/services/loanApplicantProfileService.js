/**
 * ==========================================================
 * FINVERSE AI
 * Loan Applicant Profile Service
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/services/loanApplicantProfileService.js
 *
 * Responsibility:
 *
 * - Business-level Applicant Profile operations
 *
 * ==========================================================
 */

import {
    getLoanApplicantProfiles,
    getLoanApplicantProfileById,
    getLoanApplicantProfileByApplicationId,
    getLoanApplicantProfilesByUserId,
    createLoanApplicantProfile,
    updateLoanApplicantProfile,
    deleteLoanApplicantProfile
} from "../api/loanApplicantProfileApi";


// ==========================================================
// Get All Applicant Profiles
// ==========================================================

export async function fetchLoanApplicantProfiles() {

    const response =
        await getLoanApplicantProfiles();

    return response?.data ?? response;

}


// ==========================================================
// Get Applicant Profile By ID
// ==========================================================

export async function fetchLoanApplicantProfileById(
    profileId
) {

    if (!profileId) {

        throw new Error(
            "Applicant profile ID is required."
        );

    }

    const response =
        await getLoanApplicantProfileById(
            profileId
        );

    return response?.data ?? response;

}


// ==========================================================
// Get Profile By Application ID
// ==========================================================

export async function fetchLoanApplicantProfileByApplicationId(
    applicationId
) {

    if (!applicationId) {

        throw new Error(
            "Loan application ID is required."
        );

    }

    const response =
        await getLoanApplicantProfileByApplicationId(
            applicationId
        );

    return response?.data ?? response;

}


// ==========================================================
// Get Profiles By User ID
// ==========================================================

export async function fetchLoanApplicantProfilesByUserId(
    userId
) {

    if (!userId) {

        throw new Error(
            "User ID is required."
        );

    }

    const response =
        await getLoanApplicantProfilesByUserId(
            userId
        );

    return response?.data ?? response;

}


// ==========================================================
// Create Applicant Profile
// ==========================================================

export async function addLoanApplicantProfile(
    profileData
) {

    if (
        !profileData ||
        typeof profileData !== "object"
    ) {

        throw new Error(
            "Applicant profile data is required."
        );

    }

    const response =
        await createLoanApplicantProfile(
            profileData
        );

    return response?.data ?? response;

}


// ==========================================================
// Update Applicant Profile
// ==========================================================

export async function editLoanApplicantProfile(
    profileId,
    profileData
) {

    if (!profileId) {

        throw new Error(
            "Applicant profile ID is required."
        );

    }

    if (
        !profileData ||
        typeof profileData !== "object"
    ) {

        throw new Error(
            "Applicant profile data is required."
        );

    }

    const response =
        await updateLoanApplicantProfile(
            profileId,
            profileData
        );

    return response?.data ?? response;

}


// ==========================================================
// Delete Applicant Profile
// ==========================================================

export async function removeLoanApplicantProfile(
    profileId
) {

    if (!profileId) {

        throw new Error(
            "Applicant profile ID is required."
        );

    }

    const response =
        await deleteLoanApplicantProfile(
            profileId
        );

    return response?.data ?? response;

}

