/**
 * ==========================================================
 * FINVERSE AI
 * Loan Property API
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/api/loanPropertyApi.js
 *
 * Responsibility:
 *
 * - Communicate with Loan Property backend APIs
 *
 * ==========================================================
 */

import api from "../../../services/api";

import {
    LOAN_API_PATHS
} from "../constants/loanConstants";


// ==========================================================
// Get All Loan Properties
// ==========================================================

export async function getLoanProperties() {

    const response =
        await api.get(
            LOAN_API_PATHS.PROPERTIES
        );

    return response.data;

}


// ==========================================================
// Get Property By ID
// ==========================================================

export async function getLoanPropertyById(
    propertyId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.PROPERTIES}/${propertyId}`
        );

    return response.data;

}


// ==========================================================
// Get Properties By Application
// ==========================================================

export async function getLoanPropertiesByApplicationId(
    applicationId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.PROPERTIES}/application/${applicationId}`
        );

    return response.data;

}


// ==========================================================
// Create Loan Property
// ==========================================================

export async function createLoanProperty(
    propertyData
) {

    const response =
        await api.post(
            LOAN_API_PATHS.PROPERTIES,
            propertyData
        );

    return response.data;

}


// ==========================================================
// Update Loan Property
// ==========================================================

export async function updateLoanProperty(
    propertyId,
    propertyData
) {

    const response =
        await api.put(
            `${LOAN_API_PATHS.PROPERTIES}/${propertyId}`,
            propertyData
        );

    return response.data;

}


// ==========================================================
// Delete Loan Property
// ==========================================================

export async function deleteLoanProperty(
    propertyId
) {

    const response =
        await api.delete(
            `${LOAN_API_PATHS.PROPERTIES}/${propertyId}`
        );

    return response.data;

}

