/**
 * ==========================================================
 * FINVERSE AI
 * Loan Product Service
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/services/loanProductService.js
 *
 * Responsibility:
 *
 * - Business-level Loan Product operations
 * - Connect hooks/components with API layer
 * - Maintain compatibility with existing Loan hooks
 *
 * ==========================================================
 */

import {
    getLoanProducts,
    getActiveLoanProducts,
    getLoanProductById,
    getLoanProductByCode,
    createLoanProduct,
    updateLoanProduct,
    updateLoanProductStatus,
    deleteLoanProduct
} from "../api/loanProductApi";


// ==========================================================
// Get All Loan Products
// ==========================================================

export async function fetchLoanProducts() {

    const response =
        await getLoanProducts();

    return response?.data ?? response;

}


// ==========================================================
// Get Active Loan Products
// ==========================================================

export async function fetchActiveLoanProducts() {

    const response =
        await getActiveLoanProducts();

    return response?.data ?? response;

}


// ==========================================================
// Get Loan Product By ID
// ==========================================================

export async function fetchLoanProductById(
    productId
) {

    if (!productId) {

        throw new Error(
            "Loan product ID is required."
        );

    }

    const response =
        await getLoanProductById(
            productId
        );

    return response?.data ?? response;

}


// ==========================================================
// Get Loan Product By Code
// ==========================================================

export async function fetchLoanProductByCode(
    productCode
) {

    if (!productCode) {

        throw new Error(
            "Loan product code is required."
        );

    }

    const response =
        await getLoanProductByCode(
            productCode
        );

    return response?.data ?? response;

}


// ==========================================================
// Create Loan Product
// ==========================================================

export async function addLoanProduct(
    productData
) {

    if (
        !productData ||
        typeof productData !== "object" ||
        Array.isArray(productData)
    ) {

        throw new Error(
            "Loan product data is required."
        );

    }

    const response =
        await createLoanProduct(
            productData
        );

    return response?.data ?? response;

}


// ==========================================================
// Update Loan Product
// ==========================================================

export async function editLoanProduct(
    productId,
    productData
) {

    if (!productId) {

        throw new Error(
            "Loan product ID is required."
        );

    }

    if (
        !productData ||
        typeof productData !== "object" ||
        Array.isArray(productData)
    ) {

        throw new Error(
            "Loan product data is required."
        );

    }

    const response =
        await updateLoanProduct(
            productId,
            productData
        );

    return response?.data ?? response;

}


// ==========================================================
// Update Loan Product Status
// ==========================================================

export async function changeLoanProductStatus(
    productId,
    status
) {

    if (!productId) {

        throw new Error(
            "Loan product ID is required."
        );

    }

    if (!status) {

        throw new Error(
            "Loan product status is required."
        );

    }

    const response =
        await updateLoanProductStatus(
            productId,
            status
        );

    return response?.data ?? response;

}


// ==========================================================
// Delete Loan Product
// ==========================================================

export async function removeLoanProduct(
    productId
) {

    if (!productId) {

        throw new Error(
            "Loan product ID is required."
        );

    }

    const response =
        await deleteLoanProduct(
            productId
        );

    return response?.data ?? response;

}


// ==========================================================
// COMPATIBILITY EXPORTS
// ==========================================================
//
// Existing hooks/components can continue using
// their previous function names.
// ==========================================================


// ==========================================================
// FETCH COMPATIBILITY
// ==========================================================

export const fetchAllLoanProducts =
    fetchLoanProducts;


// ==========================================================
// CREATE COMPATIBILITY
// ==========================================================

export const createNewLoanProduct =
    addLoanProduct;

export const createLoanProductRecord =
    addLoanProduct;


// ==========================================================
// UPDATE COMPATIBILITY
// ==========================================================

export const updateExistingLoanProduct =
    editLoanProduct;

export const updateLoanProductRecord =
    editLoanProduct;


// ==========================================================
// STATUS COMPATIBILITY
// ==========================================================

export const updateProductStatus =
    changeLoanProductStatus;


// ==========================================================
// DELETE COMPATIBILITY
// ==========================================================

export const deleteExistingLoanProduct =
    removeLoanProduct;

export const deleteLoanProductRecord =
    removeLoanProduct;