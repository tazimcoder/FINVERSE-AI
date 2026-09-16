/**
 * ==========================================================
 * FINVERSE AI
 * Loan Product Service
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/services/loanProductService.js
 *
 * Responsibility:
 *
 * - Business logic for Loan Products
 * - Connect Controller with Model
 *
 * IMPORTANT:
 *
 * Export names are kept compatible with
 * loanProductController.js
 *
 * ==========================================================
 */

import {
    getAllLoanProducts as getAllLoanProductsModel,
    getActiveLoanProducts as getActiveLoanProductsModel,
    getLoanProductById as getLoanProductByIdModel,
    getLoanProductByCode as getLoanProductByCodeModel,
    createLoanProduct as createLoanProductModel,
    updateLoanProduct as updateLoanProductModel,
    updateLoanProductStatus as updateLoanProductStatusModel,
    deleteLoanProduct as deleteLoanProductModel
} from "../models/loanProductModel.js";


// ==========================================================
// Get All Loan Products
// ==========================================================

export async function getAllLoanProducts() {

    return await getAllLoanProductsModel();

}


// ==========================================================
// Get Active Loan Products
// ==========================================================

export async function getActiveLoanProducts() {

    return await getActiveLoanProductsModel();

}


// ==========================================================
// Get Loan Product By ID
// ==========================================================

export async function getLoanProductById(
    productId
) {

    return await getLoanProductByIdModel(
        productId
    );

}


// ==========================================================
// Get Loan Product By Code
// ==========================================================

export async function getLoanProductByCode(
    productCode
) {

    return await getLoanProductByCodeModel(
        productCode
    );

}


// ==========================================================
// Create Loan Product
// ==========================================================

export async function createLoanProduct(
    productData
) {

    return await createLoanProductModel(
        productData
    );

}


// ==========================================================
// Update Loan Product
// ==========================================================

export async function updateLoanProduct(
    productId,
    productData
) {

    return await updateLoanProductModel(
        productId,
        productData
    );

}


// ==========================================================
// Update Loan Product Status
// ==========================================================

export async function updateLoanProductStatus(
    productId,
    status
) {

    return await updateLoanProductStatusModel(
        productId,
        status
    );

}


// ==========================================================
// Delete Loan Product
// ==========================================================

export async function deleteLoanProduct(
    productId
) {

    return await deleteLoanProductModel(
        productId
    );

}

