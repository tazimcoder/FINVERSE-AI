/**
 * ==========================================================
 * FINVERSE AI
 * Loan Service
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/services/loanService.js
 *
 * Responsibility:
 *
 * - Fetch all loans
 * - Fetch loan by ID
 * - Fetch loan by loan number
 * - Fetch loans by user
 * - Fetch loan by application
 * - Create loan
 * - Update loan
 * - Update loan status
 * - Delete loan
 * - Validate loan business rules
 * - Integrate reusable loan validator
 *
 * ==========================================================
 */

import {
    getAllLoans,
    getLoanById,
    getLoanByNumber,
    getLoansByUserId,
    getLoanByApplicationId,
    createLoan,
    updateLoan,
    updateLoanStatus,
    deleteLoan
} from "../models/loanModel.js";


import {
    validateCreateLoan,
    validateUpdateLoan,
    validateLoanStatus
} from "../validators/loanValidator.js";


// ==========================================================
// Fetch All Loans
// ==========================================================

export async function fetchAllLoans() {

    return await getAllLoans();

}


// ==========================================================
// Fetch Loan By ID
// ==========================================================

export async function fetchLoanById(
    loanId
) {

    if (!loanId) {

        throw new Error(
            "Loan ID is required."
        );

    }

    return await getLoanById(
        loanId
    );

}


// ==========================================================
// Fetch Loan By Number
// ==========================================================

export async function fetchLoanByNumber(
    loanNumber
) {

    if (!loanNumber) {

        throw new Error(
            "Loan number is required."
        );

    }

    return await getLoanByNumber(
        loanNumber
    );

}


// ==========================================================
// Fetch Loans By User
// ==========================================================

export async function fetchLoansByUserId(
    userId
) {

    if (!userId) {

        throw new Error(
            "User ID is required."
        );

    }

    return await getLoansByUserId(
        userId
    );

}


// ==========================================================
// Fetch Loan By Application
// ==========================================================

export async function fetchLoanByApplicationId(
    applicationId
) {

    if (!applicationId) {

        throw new Error(
            "Loan application ID is required."
        );

    }

    return await getLoanByApplicationId(
        applicationId
    );

}


// ==========================================================
// Create New Loan
// ==========================================================

export async function createNewLoan(
    loanData
) {

    // ======================================================
    // Basic Object Validation
    // ======================================================

    if (
        !loanData ||
        typeof loanData !== "object" ||
        Array.isArray(loanData)
    ) {

        throw new Error(
            "Loan data is required."
        );

    }


    // ======================================================
    // Reusable Validator
    // ======================================================

    const validation =
        validateCreateLoan(
            loanData
        );


    if (!validation.valid) {

        throw new Error(
            validation.errors.join(" ")
        );

    }


    // ======================================================
    // Duplicate Loan Number Check
    // ======================================================

    const existingLoan =
        await getLoanByNumber(
            loanData.loan_number
        );


    if (existingLoan) {

        throw new Error(
            "Loan number already exists."
        );

    }


    // ======================================================
    // Prepare Loan Data
    // ======================================================

    const preparedLoanData = {

        loan_number:
            loanData.loan_number.trim(),

        user_id:
            loanData.user_id,

        loan_application_id:
            loanData.loan_application_id,

        loan_product_id:
            loanData.loan_product_id,

        principal_amount:
            loanData.principal_amount,

        interest_rate:
            loanData.interest_rate,

        tenure_months:
            loanData.tenure_months,

        emi_amount:
            loanData.emi_amount,

        outstanding_principal:
            loanData.outstanding_principal ??
            loanData.principal_amount,

        outstanding_interest:
            loanData.outstanding_interest ??
            0,

        start_date:
            loanData.start_date ??
            null,

        maturity_date:
            loanData.maturity_date ??
            null,

        status:
            loanData.status ??
            "ACTIVE"

    };


    // ======================================================
    // Final Status Validation
    // ======================================================

    const statusValidation =
        validateLoanStatus(
            preparedLoanData.status
        );


    if (!statusValidation.valid) {

        throw new Error(
            statusValidation.errors.join(" ")
        );

    }


    // ======================================================
    // Create Loan
    // ======================================================

    const loanId =
        await createLoan(
            preparedLoanData
        );


    // ======================================================
    // Return Created Loan
    // ======================================================

    return {

        id: loanId,

        ...preparedLoanData

    };

}


// ==========================================================
// Update Existing Loan
// ==========================================================

export async function updateExistingLoan(
    loanId,
    loanData
) {

    // ======================================================
    // Loan ID Validation
    // ======================================================

    if (!loanId) {

        throw new Error(
            "Loan ID is required."
        );

    }


    // ======================================================
    // Data Validation
    // ======================================================

    if (
        !loanData ||
        typeof loanData !== "object" ||
        Array.isArray(loanData)
    ) {

        throw new Error(
            "Loan data is required."
        );

    }


    // ======================================================
    // Check Loan Exists
    // ======================================================

    const existingLoan =
        await getLoanById(
            loanId
        );


    if (!existingLoan) {

        throw new Error(
            "Loan not found."
        );

    }


    // ======================================================
    // Reusable Update Validator
    // ======================================================

    const validation =
        validateUpdateLoan(
            loanData
        );


    if (!validation.valid) {

        throw new Error(
            validation.errors.join(" ")
        );

    }


    // ======================================================
    // Update Loan
    // ======================================================

    return await updateLoan(
        loanId,
        loanData
    );

}


// ==========================================================
// Change Loan Status
// ==========================================================

export async function changeLoanStatus(
    loanId,
    status
) {

    // ======================================================
    // Loan ID Validation
    // ======================================================

    if (!loanId) {

        throw new Error(
            "Loan ID is required."
        );

    }


    // ======================================================
    // Status Validation
    // ======================================================

    const validation =
        validateLoanStatus(
            status
        );


    if (!validation.valid) {

        throw new Error(
            validation.errors.join(" ")
        );

    }


    // ======================================================
    // Check Loan Exists
    // ======================================================

    const existingLoan =
        await getLoanById(
            loanId
        );


    if (!existingLoan) {

        throw new Error(
            "Loan not found."
        );

    }


    // ======================================================
    // Update Status
    // ======================================================

    return await updateLoanStatus(
        loanId,
        status
    );

}


// ==========================================================
// Remove Loan
// ==========================================================

export async function removeLoan(
    loanId
) {

    if (!loanId) {

        throw new Error(
            "Loan ID is required."
        );

    }


    // ======================================================
    // Check Loan Exists
    // ======================================================

    const existingLoan =
        await getLoanById(
            loanId
        );


    if (!existingLoan) {

        throw new Error(
            "Loan not found."
        );

    }


    // ======================================================
    // Delete Loan
    // ======================================================

    return await deleteLoan(
        loanId
    );

}