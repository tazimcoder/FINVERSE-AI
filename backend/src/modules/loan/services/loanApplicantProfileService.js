/**
 * ==========================================================
 * FINVERSE AI
 * Loan Applicant Profile Service
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/services/loanApplicantProfileService.js
 *
 * Responsibility:
 *
 * - Business logic for loan applicant profiles
 * - Validate applicant profile data
 * - Communicate with applicant profile model
 * - Provide reusable service functions for controllers
 *
 * ==========================================================
 */

import {
    getAllLoanApplicantProfiles,
    getLoanApplicantProfileById,
    getLoanApplicantProfilesByApplicationId,
    getLoanApplicantProfilesByUserId,
    createLoanApplicantProfile,
    updateLoanApplicantProfile,
    deleteLoanApplicantProfile
} from "../models/loanApplicantProfileModel.js";


// ==========================================================
// Fetch All Applicant Profiles
// ==========================================================

export async function fetchAllLoanApplicantProfiles() {

    return await getAllLoanApplicantProfiles();

}


// ==========================================================
// Fetch Applicant Profile By ID
// ==========================================================

export async function fetchLoanApplicantProfileById(
    profileId
) {

    if (!profileId) {
        throw new Error(
            "Applicant profile ID is required."
        );
    }

    return await getLoanApplicantProfileById(
        profileId
    );

}


// ==========================================================
// Fetch Applicant Profiles By Loan Application
// ==========================================================

export async function fetchLoanApplicantProfilesByApplicationId(
    applicationId
) {

    if (!applicationId) {
        throw new Error(
            "Loan application ID is required."
        );
    }

    return await getLoanApplicantProfilesByApplicationId(
        applicationId
    );

}


// ==========================================================
// Fetch Applicant Profiles By User
// ==========================================================

export async function fetchLoanApplicantProfilesByUserId(
    userId
) {

    if (!userId) {
        throw new Error(
            "User ID is required."
        );
    }

    return await getLoanApplicantProfilesByUserId(
        userId
    );

}


// ==========================================================
// Create Applicant Profile
// ==========================================================

export async function createNewLoanApplicantProfile(
    profileData
) {

    if (!profileData) {
        throw new Error(
            "Applicant profile data is required."
        );
    }


    const {
        loan_application_id,
        user_id
    } = profileData;


    if (!loan_application_id) {
        throw new Error(
            "Loan application ID is required."
        );
    }


    if (!user_id) {
        throw new Error(
            "User ID is required."
        );
    }


    const applicantType =
        profileData.applicant_type ?? "PRIMARY";


    const allowedApplicantTypes = [
        "PRIMARY",
        "CO_APPLICANT",
        "GUARANTOR"
    ];


    if (
        !allowedApplicantTypes.includes(
            applicantType
        )
    ) {

        throw new Error(
            "Invalid applicant type."
        );

    }


    return await createLoanApplicantProfile({

        ...profileData,

        applicant_type:
            applicantType

    });

}


// ==========================================================
// Update Applicant Profile
// ==========================================================

export async function updateExistingLoanApplicantProfile(
    profileId,
    profileData
) {

    if (!profileId) {
        throw new Error(
            "Applicant profile ID is required."
        );
    }


    if (!profileData) {
        throw new Error(
            "Applicant profile data is required."
        );
    }


    return await updateLoanApplicantProfile(
        profileId,
        profileData
    );

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


    return await deleteLoanApplicantProfile(
        profileId
    );

}

