/**
 * ==========================================================
 * FINVERSE AI
 * Loan Service
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/services/loanService.js
 *
 * Responsibility:
 *
 * - Central business logic for Loans
 * - Connect Loan UI with Loan API layer
 * - Validate service input
 *
 * ==========================================================
 */

import {
    getLoans,
    getLoanById,
    getLoansByUserId,
    getLoansByApplicationId,
    getLoansByStatus,
    createLoan,
    updateLoan,
    updateLoanStatus as apiUpdateLoanStatus,
    deleteLoan
} from "../api/loanApi";


// ==========================================================
// Get All Loans
// ==========================================================

export async function fetchLoans() {

    const response =
        await getLoans();

    return response?.data ?? response;

}


// ==========================================================
// Get Loan By ID
// ==========================================================

export async function fetchLoanById(
    loanId
) {

    if (
        !loanId
    ) {

        throw new Error(
            "Loan ID is required."
        );

    }


    const response =
        await getLoanById(
            loanId
        );

    return response?.data ?? response;

}


// ==========================================================
// Get Loans By User ID
// ==========================================================

export async function fetchLoansByUserId(
    userId
) {

    if (
        !userId
    ) {

        throw new Error(
            "User ID is required."
        );

    }


    const response =
        await getLoansByUserId(
            userId
        );

    return response?.data ?? response;

}


// ==========================================================
// Get Loans By Application ID
// ==========================================================

export async function fetchLoansByApplicationId(
    applicationId
) {

    if (
        !applicationId
    ) {

        throw new Error(
            "Loan application ID is required."
        );

    }


    const response =
        await getLoansByApplicationId(
            applicationId
        );

    return response?.data ?? response;

}


// ==========================================================
// Get Loans By Status
// ==========================================================

export async function fetchLoansByStatus(
    status
) {

    if (
        !status
    ) {

        throw new Error(
            "Loan status is required."
        );

    }


    const response =
        await getLoansByStatus(
            status
        );

    return response?.data ?? response;

}


// ==========================================================
// Create Loan
// ==========================================================

export async function addLoan(
    loanData
) {

    if (
        !loanData ||
        typeof loanData !== "object" ||
        Array.isArray(loanData)
    ) {

        throw new Error(
            "Loan data is required."
        );

    }


    const response =
        await createLoan(
            loanData
        );

    return response?.data ?? response;

}


// ==========================================================
// Update Loan
// ==========================================================

export async function editLoan(
    loanId,
    loanData
) {

    if (
        !loanId
    ) {

        throw new Error(
            "Loan ID is required."
        );

    }


    if (
        !loanData ||
        typeof loanData !== "object" ||
        Array.isArray(loanData)
    ) {

        throw new Error(
            "Loan data is required."
        );

    }


    const response =
        await updateLoan(
            loanId,
            loanData
        );

    return response?.data ?? response;

}


// ==========================================================
// Update Loan Status
// ==========================================================

export async function changeLoanStatus(
    loanId,
    status
) {

    if (
        !loanId
    ) {

        throw new Error(
            "Loan ID is required."
        );

    }


    if (
        !status
    ) {

        throw new Error(
            "Loan status is required."
        );

    }


    const response =
        await apiUpdateLoanStatus(
            loanId,
            status
        );

    return response?.data ?? response;

}


// ==========================================================
// Delete Loan
// ==========================================================

export async function removeLoan(
    loanId
) {

    if (
        !loanId
    ) {

        throw new Error(
            "Loan ID is required."
        );

    }


    const response =
        await deleteLoan(
            loanId
        );

    return response?.data ?? response;

}


// ==========================================================
// COMPATIBILITY EXPORTS
// ==========================================================
//
// This section keeps existing Loan hooks, components,
// and older module files compatible with the current
// Loan Service naming structure.
// ==========================================================


// ==========================================================
// FETCH COMPATIBILITY
// ==========================================================

export const fetchAllLoans =
    fetchLoans;

export const fetchLoan =
    fetchLoanById;


// ==========================================================
// CREATE COMPATIBILITY
// ==========================================================

export const createNewLoan =
    addLoan;

export const createLoanRecord =
    addLoan;


// ==========================================================
// UPDATE COMPATIBILITY
// ==========================================================

export const updateExistingLoan =
    editLoan;

export const updateLoanRecord =
    editLoan;


// ==========================================================
// STATUS COMPATIBILITY
// ==========================================================

export const updateLoanStatus =
    changeLoanStatus;

export const changeStatus =
    changeLoanStatus;


// ==========================================================
// DELETE COMPATIBILITY
// ==========================================================

export const deleteExistingLoan =
    removeLoan;

export const deleteLoanRecord =
    removeLoan;