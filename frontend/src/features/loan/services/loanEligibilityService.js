/**
 * ==========================================================
 * FINVERSE AI
 * Loan Eligibility Service
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/services/loanEligibilityService.js
 *
 * Responsibility:
 *
 * - Business-level Loan Eligibility operations
 * - Connect Eligibility UI with API layer
 *
 * ==========================================================
 */

import {
    getLoanEligibilities,
    getLoanEligibilityById,
    getLoanEligibilityByApplicationId,
    getLoanEligibilitiesByUserId,
    createLoanEligibility,
    updateLoanEligibility,
    deleteLoanEligibility
} from "../api/loanEligibilityApi";


// ==========================================================
// Get All Eligibility Records
// ==========================================================

export async function fetchLoanEligibilities() {

    const response =
        await getLoanEligibilities();

    return response?.data ?? response;

}


// ==========================================================
// Get Eligibility By ID
// ==========================================================

export async function fetchLoanEligibilityById(
    eligibilityId
) {

    if (!eligibilityId) {

        throw new Error(
            "Loan eligibility ID is required."
        );

    }

    const response =
        await getLoanEligibilityById(
            eligibilityId
        );

    return response?.data ?? response;

}


// ==========================================================
// Get Eligibility By Application
// ==========================================================

export async function fetchLoanEligibilityByApplicationId(
    applicationId
) {

    if (!applicationId) {

        throw new Error(
            "Loan application ID is required."
        );

    }

    const response =
        await getLoanEligibilityByApplicationId(
            applicationId
        );

    return response?.data ?? response;

}


// ==========================================================
// Get Eligibility By User
// ==========================================================

export async function fetchLoanEligibilitiesByUserId(
    userId
) {

    if (!userId) {

        throw new Error(
            "User ID is required."
        );

    }

    const response =
        await getLoanEligibilitiesByUserId(
            userId
        );

    return response?.data ?? response;

}


// ==========================================================
// Create Eligibility
// ==========================================================

export async function addLoanEligibility(
    eligibilityData
) {

    if (
        !eligibilityData ||
        typeof eligibilityData !== "object"
    ) {

        throw new Error(
            "Loan eligibility data is required."
        );

    }

    const response =
        await createLoanEligibility(
            eligibilityData
        );

    return response?.data ?? response;

}


// ==========================================================
// Update Eligibility
// ==========================================================

export async function editLoanEligibility(
    eligibilityId,
    eligibilityData
) {

    if (!eligibilityId) {

        throw new Error(
            "Loan eligibility ID is required."
        );

    }

    if (
        !eligibilityData ||
        typeof eligibilityData !== "object"
    ) {

        throw new Error(
            "Loan eligibility data is required."
        );

    }

    const response =
        await updateLoanEligibility(
            eligibilityId,
            eligibilityData
        );

    return response?.data ?? response;

}


// ==========================================================
// Delete Eligibility
// ==========================================================

export async function removeLoanEligibility(
    eligibilityId
) {

    if (!eligibilityId) {

        throw new Error(
            "Loan eligibility ID is required."
        );

    }

    const response =
        await deleteLoanEligibility(
            eligibilityId
        );

    return response?.data ?? response;

}

