/**
 * ==========================================================
 * FINVERSE AI
 * Loan Product API
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/api/loanProductApi.js
 *
 * Responsibility:
 *
 * - Communicate with Loan Product backend APIs
 * - Use centralized Axios instance
 *
 * ==========================================================
 */

import api from "../../../services/api";

import {
    LOAN_API_PATHS
} from "../constants/loanConstants";


// ==========================================================
// Get All Loan Products
// ==========================================================

export async function getLoanProducts() {

    const response =
        await api.get(
            LOAN_API_PATHS.PRODUCTS
        );

    return response.data;

}


// ==========================================================
// Get Active Loan Products
// ==========================================================

export async function getActiveLoanProducts() {

    const response =
        await api.get(
            `${LOAN_API_PATHS.PRODUCTS}/active`
        );

    return response.data;

}


// ==========================================================
// Get Loan Product By ID
// ==========================================================

export async function getLoanProductById(
    productId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.PRODUCTS}/${productId}`
        );

    return response.data;

}


// ==========================================================
// Get Loan Product By Code
// ==========================================================

export async function getLoanProductByCode(
    productCode
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.PRODUCTS}/code/${productCode}`
        );

    return response.data;

}


// ==========================================================
// Create Loan Product
// ==========================================================

export async function createLoanProduct(
    productData
) {

    const response =
        await api.post(
            LOAN_API_PATHS.PRODUCTS,
            productData
        );

    return response.data;

}


// ==========================================================
// Update Loan Product
// ==========================================================

export async function updateLoanProduct(
    productId,
    productData
) {

    const response =
        await api.put(
            `${LOAN_API_PATHS.PRODUCTS}/${productId}`,
            productData
        );

    return response.data;

}


// ==========================================================
// Update Loan Product Status
// ==========================================================

export async function updateLoanProductStatus(
    productId,
    status
) {

    const response =
        await api.patch(
            `${LOAN_API_PATHS.PRODUCTS}/${productId}/status`,
            {
                status
            }
        );

    return response.data;

}


// ==========================================================
// Delete Loan Product
// ==========================================================

export async function deleteLoanProduct(
    productId
) {

    const response =
        await api.delete(
            `${LOAN_API_PATHS.PRODUCTS}/${productId}`
        );

    return response.data;

}

