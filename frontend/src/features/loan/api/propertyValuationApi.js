/**
 * ==========================================================
 * FINVERSE AI
 * Property Valuation API
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/api/propertyValuationApi.js
 *
 * Responsibility:
 *
 * - Communicate with Property Valuation backend APIs
 *
 * ==========================================================
 */

import api from "../../../services/api";

import {
    LOAN_API_PATHS
} from "../constants/loanConstants";


// ==========================================================
// Get All Property Valuations
// ==========================================================

export async function getPropertyValuations() {

    const response =
        await api.get(
            LOAN_API_PATHS.PROPERTY_VALUATIONS
        );

    return response.data;

}


// ==========================================================
// Get Property Valuation By ID
// ==========================================================

export async function getPropertyValuationById(
    valuationId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.PROPERTY_VALUATIONS}/${valuationId}`
        );

    return response.data;

}


// ==========================================================
// Get Valuations By Property ID
// ==========================================================

export async function getPropertyValuationsByPropertyId(
    propertyId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.PROPERTY_VALUATIONS}/property/${propertyId}`
        );

    return response.data;

}


// ==========================================================
// Create Property Valuation
// ==========================================================

export async function createPropertyValuation(
    valuationData
) {

    const response =
        await api.post(
            LOAN_API_PATHS.PROPERTY_VALUATIONS,
            valuationData
        );

    return response.data;

}


// ==========================================================
// Update Property Valuation
// ==========================================================

export async function updatePropertyValuation(
    valuationId,
    valuationData
) {

    const response =
        await api.put(
            `${LOAN_API_PATHS.PROPERTY_VALUATIONS}/${valuationId}`,
            valuationData
        );

    return response.data;

}


// ==========================================================
// Delete Property Valuation
// ==========================================================

export async function deletePropertyValuation(
    valuationId
) {

    const response =
        await api.delete(
            `${LOAN_API_PATHS.PROPERTY_VALUATIONS}/${valuationId}`
        );

    return response.data;

}

