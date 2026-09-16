/**
 * ==========================================================
 * FINVERSE AI
 * Loan Document API
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/api/loanDocumentApi.js
 *
 * Responsibility:
 *
 * - Communicate with Loan Document backend APIs
 *
 * ==========================================================
 */

import api from "../../../services/api";

import {
    LOAN_API_PATHS
} from "../constants/loanConstants";


// ==========================================================
// Get All Loan Documents
// ==========================================================

export async function getLoanDocuments() {

    const response =
        await api.get(
            LOAN_API_PATHS.DOCUMENTS
        );

    return response.data;

}


// ==========================================================
// Get Document By ID
// ==========================================================

export async function getLoanDocumentById(
    documentId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.DOCUMENTS}/${documentId}`
        );

    return response.data;

}


// ==========================================================
// Get Documents By Application
// ==========================================================

export async function getLoanDocumentsByApplicationId(
    applicationId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.DOCUMENTS}/application/${applicationId}`
        );

    return response.data;

}


// ==========================================================
// Create Loan Document
// ==========================================================

export async function createLoanDocument(
    documentData
) {

    const response =
        await api.post(
            LOAN_API_PATHS.DOCUMENTS,
            documentData
        );

    return response.data;

}


// ==========================================================
// Update Loan Document
// ==========================================================

export async function updateLoanDocument(
    documentId,
    documentData
) {

    const response =
        await api.put(
            `${LOAN_API_PATHS.DOCUMENTS}/${documentId}`,
            documentData
        );

    return response.data;

}


// ==========================================================
// Delete Loan Document
// ==========================================================

export async function deleteLoanDocument(
    documentId
) {

    const response =
        await api.delete(
            `${LOAN_API_PATHS.DOCUMENTS}/${documentId}`
        );

    return response.data;

}

