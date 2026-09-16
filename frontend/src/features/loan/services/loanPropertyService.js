/**
 * ==========================================================
 * FINVERSE
 * Loan Property Service
 * ==========================================================
 */

import {
    getLoanProperties,
    getLoanPropertyById as apiGetById,
    getLoanPropertiesByApplicationId as apiGetByAppId,
    createLoanProperty as apiCreateProperty,
    updateLoanProperty as apiUpdateProperty,
    deleteLoanProperty as apiDeleteProperty
} from "../api/loanPropertyApi";

export async function fetchLoanProperties() {
    try {
        const response = await getLoanProperties();
        return response?.data ?? response ?? [];
    } catch {
        return [];
    }
}

export async function fetchLoanPropertyById(propertyId) {
    const response = await apiGetById(propertyId);
    return response?.data ?? response;
}

export async function fetchLoanPropertiesByApplicationId(appId) {
    const response = await apiGetByAppId(appId);
    return response?.data ?? response;
}

export async function addLoanProperty(data) {
    const response = await apiCreateProperty(data);
    return response?.data ?? response;
}

export async function editLoanProperty(propertyId, data) {
    const response = await apiUpdateProperty(propertyId, data);
    return response?.data ?? response;
}

export async function removeLoanProperty(propertyId) {
    const response = await apiDeleteProperty(propertyId);
    return response?.data ?? response;
}

// Aliases for Hook Imports
export {
    fetchLoanProperties as getAllLoanProperties,
    fetchLoanPropertyById as getLoanPropertyById,
    fetchLoanPropertiesByApplicationId as getLoanPropertiesByApplicationId,
    addLoanProperty as createLoanProperty,
    editLoanProperty as updateLoanProperty,
    removeLoanProperty as deleteLoanProperty
};
