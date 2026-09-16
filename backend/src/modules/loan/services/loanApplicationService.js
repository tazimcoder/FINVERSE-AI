/**
 * ==========================================================
 * FINVERSE AI
 * Loan Application Service
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/services/loanApplicationService.js
 *
 * Responsibility:
 *
 * - Business logic for loan applications
 * - Validate loan product
 * - Generate application number
 * - Create applications
 * - Fetch applications
 * - Update applications
 * - Manage application status
 * - Provide compatibility exports for lifecycle orchestration
 *
 * ==========================================================
 */

import {
    getAllLoanApplications,
    getLoanApplicationById,
    getLoanApplicationsByUserId,
    getLoanApplicationByNumber,
    createLoanApplication,
    updateLoanApplication,
    updateLoanApplicationStatus,
    deleteLoanApplication
} from "../models/loanApplicationModel.js";

import {
    getLoanProductById
} from "../models/loanProductModel.js";


// ==========================================================
// APPLICATION STATUS
// ==========================================================

const ALLOWED_APPLICATION_STATUSES = [

    "DRAFT",

    "SUBMITTED",

    "UNDER_REVIEW",

    "ELIGIBILITY_CHECK",

    "DOCUMENT_VERIFICATION",

    "VERIFICATION",

    "APPROVED",

    "OFFERED",

    "ACCEPTED",

    "DISBURSED",

    "REJECTED",

    "CANCELLED"

];


// ==========================================================
// Generate Application Number
// ==========================================================

function generateApplicationNumber() {

    const timestamp =
        Date.now().toString();

    const random =
        Math.floor(
            1000 + Math.random() * 9000
        );

    return `FIN-${timestamp}-${random}`;
}


// ==========================================================
// Get All Loan Applications
// ==========================================================

export async function fetchAllLoanApplications() {

    return await getAllLoanApplications();

}


// ==========================================================
// Get Loan Application By ID
// ==========================================================

export async function fetchLoanApplicationById(
    applicationId
) {

    if (!applicationId) {

        throw new Error(
            "Loan application ID is required."
        );

    }

    return await getLoanApplicationById(
        applicationId
    );

}


// ==========================================================
// Compatibility Export
// ==========================================================
//
// Used by:
// loanLifecycleService.js
//
// This keeps the lifecycle service independent from the
// public naming convention used by controllers.
//

export async function getLoanApplicationByIdForLifecycle(
    applicationId
) {

    return await fetchLoanApplicationById(
        applicationId
    );

}


// ==========================================================
// Get Loan Applications By User
// ==========================================================

export async function fetchLoanApplicationsByUserId(
    userId
) {

    if (!userId) {

        throw new Error(
            "User ID is required."
        );

    }

    return await getLoanApplicationsByUserId(
        userId
    );

}


// ==========================================================
// Get Loan Application By Number
// ==========================================================

export async function fetchLoanApplicationByNumber(
    applicationNumber
) {

    if (!applicationNumber) {

        throw new Error(
            "Application number is required."
        );

    }

    return await getLoanApplicationByNumber(
        applicationNumber
    );

}


// ==========================================================
// Create Loan Application
// ==========================================================

export async function createNewLoanApplication(
    applicationData
) {

    if (
        !applicationData ||
        typeof applicationData !== "object"
    ) {

        throw new Error(
            "Loan application data is required."
        );

    }


    const {
        user_id,
        loan_product_id,
        requested_amount,
        requested_tenure_months
    } = applicationData;


    // ======================================================
    // Basic Validation
    // ======================================================

    if (!user_id) {

        throw new Error(
            "User ID is required."
        );

    }


    if (!loan_product_id) {

        throw new Error(
            "Loan product ID is required."
        );

    }


    if (
        requested_amount === undefined ||
        requested_amount === null ||
        Number(requested_amount) <= 0
    ) {

        throw new Error(
            "Requested loan amount must be greater than zero."
        );

    }


    if (
        !requested_tenure_months ||
        Number(requested_tenure_months) <= 0
    ) {

        throw new Error(
            "Requested tenure must be greater than zero."
        );

    }


    // ======================================================
    // Validate Loan Product
    // ======================================================

    const loanProduct =
        await getLoanProductById(
            loan_product_id
        );


    if (!loanProduct) {

        throw new Error(
            "Loan product not found."
        );

    }


    // ======================================================
    // Validate Product Status
    // ======================================================

    if (
        loanProduct.status !== "ACTIVE"
    ) {

        throw new Error(
            "Selected loan product is not active."
        );

    }


    // ======================================================
    // Validate Amount
    // ======================================================

    if (
        loanProduct.min_amount !== null &&
        Number(requested_amount) <
        Number(loanProduct.min_amount)
    ) {

        throw new Error(
            `Requested amount cannot be less than ${loanProduct.min_amount}.`
        );

    }


    if (
        loanProduct.max_amount !== null &&
        Number(requested_amount) >
        Number(loanProduct.max_amount)
    ) {

        throw new Error(
            `Requested amount cannot exceed ${loanProduct.max_amount}.`
        );

    }


    // ======================================================
    // Validate Tenure
    // ======================================================

    if (
        loanProduct.min_tenure_months !== null &&
        Number(requested_tenure_months) <
        Number(loanProduct.min_tenure_months)
    ) {

        throw new Error(
            `Requested tenure cannot be less than ${loanProduct.min_tenure_months} months.`
        );

    }


    if (
        loanProduct.max_tenure_months !== null &&
        Number(requested_tenure_months) >
        Number(loanProduct.max_tenure_months)
    ) {

        throw new Error(
            `Requested tenure cannot exceed ${loanProduct.max_tenure_months} months.`
        );

    }


    // ======================================================
    // Create Application Number
    // ======================================================

    const applicationNumber =
        generateApplicationNumber();


    // ======================================================
    // Create Application
    // ======================================================

    const applicationId =
        await createLoanApplication({

            application_number:
                applicationNumber,

            user_id,

            loan_product_id,

            requested_amount,

            requested_tenure_months,

            purpose:
                applicationData.purpose,

            employment_type:
                applicationData.employment_type,

            monthly_income:
                applicationData.monthly_income,

            existing_monthly_obligations:
                applicationData.existing_monthly_obligations,

            credit_score:
                applicationData.credit_score,

            status:
                applicationData.status ?? "DRAFT"

        });


    return {

        id:
            applicationId,

        application_number:
            applicationNumber

    };

}


// ==========================================================
// Update Loan Application
// ==========================================================

export async function updateExistingLoanApplication(
    applicationId,
    applicationData
) {

    if (!applicationId) {

        throw new Error(
            "Loan application ID is required."
        );

    }


    if (
        !applicationData ||
        typeof applicationData !== "object"
    ) {

        throw new Error(
            "Loan application data is required."
        );

    }


    const existingApplication =
        await getLoanApplicationById(
            applicationId
        );


    if (!existingApplication) {

        throw new Error(
            "Loan application not found."
        );

    }


    // ------------------------------------------------------
    // Only DRAFT applications can be edited
    // ------------------------------------------------------

    if (
        existingApplication.status !== "DRAFT"
    ) {

        throw new Error(
            "Only DRAFT loan applications can be updated."
        );

    }


    // ======================================================
    // Validate Loan Product
    // ======================================================

    const loanProduct =
        await getLoanProductById(
            applicationData.loan_product_id
        );


    if (!loanProduct) {

        throw new Error(
            "Loan product not found."
        );

    }


    if (
        loanProduct.status !== "ACTIVE"
    ) {

        throw new Error(
            "Selected loan product is not active."
        );

    }


    // ======================================================
    // Validate Amount
    // ======================================================

    if (
        Number(applicationData.requested_amount) <= 0
    ) {

        throw new Error(
            "Requested loan amount must be greater than zero."
        );

    }


    if (
        loanProduct.min_amount !== null &&
        Number(applicationData.requested_amount) <
        Number(loanProduct.min_amount)
    ) {

        throw new Error(
            `Requested amount cannot be less than ${loanProduct.min_amount}.`
        );

    }


    if (
        loanProduct.max_amount !== null &&
        Number(applicationData.requested_amount) >
        Number(loanProduct.max_amount)
    ) {

        throw new Error(
            `Requested amount cannot exceed ${loanProduct.max_amount}.`
        );

    }


    // ======================================================
    // Validate Tenure
    // ======================================================

    if (
        Number(applicationData.requested_tenure_months) <= 0
    ) {

        throw new Error(
            "Requested tenure must be greater than zero."
        );

    }


    if (
        loanProduct.min_tenure_months !== null &&
        Number(applicationData.requested_tenure_months) <
        Number(loanProduct.min_tenure_months)
    ) {

        throw new Error(
            `Requested tenure cannot be less than ${loanProduct.min_tenure_months} months.`
        );

    }


    if (
        loanProduct.max_tenure_months !== null &&
        Number(applicationData.requested_tenure_months) >
        Number(loanProduct.max_tenure_months)
    ) {

        throw new Error(
            `Requested tenure cannot exceed ${loanProduct.max_tenure_months} months.`
        );

    }


    return await updateLoanApplication(
        applicationId,
        applicationData
    );

}


// ==========================================================
// Update Loan Application Status
// ==========================================================

export async function changeLoanApplicationStatus(
    applicationId,
    status,
    rejectionReason = null
) {

    if (!applicationId) {

        throw new Error(
            "Loan application ID is required."
        );

    }


    if (!status) {

        throw new Error(
            "Loan application status is required."
        );

    }


    const existingApplication =
        await getLoanApplicationById(
            applicationId
        );


    if (!existingApplication) {

        throw new Error(
            "Loan application not found."
        );

    }


    const normalizedStatus =
        String(
            status
        )
            .trim()
            .toUpperCase();


    if (
        !ALLOWED_APPLICATION_STATUSES.includes(
            normalizedStatus
        )
    ) {

        throw new Error(
            `Invalid loan application status: ${status}`
        );

    }


    if (
        normalizedStatus === "REJECTED" &&
        (
            !rejectionReason ||
            String(
                rejectionReason
            ).trim() === ""
        )
    ) {

        throw new Error(
            "Rejection reason is required."
        );

    }


    return await updateLoanApplicationStatus(
        applicationId,
        normalizedStatus,
        rejectionReason
    );

}


// ==========================================================
// Compatibility Export For Lifecycle
// ==========================================================
//
// loanLifecycleService.js expects:
// updateLoanApplicationStatus
//
// Existing public service API uses:
// changeLoanApplicationStatus
//
// This wrapper prevents the ESM named-export crash while
// preserving the existing service API.
//

export async function updateLoanApplicationStatusForLifecycle(
    applicationId,
    status,
    rejectionReason = null
) {

    return await changeLoanApplicationStatus(
        applicationId,
        status,
        rejectionReason
    );

}


// ==========================================================
// Delete Loan Application
// ==========================================================

export async function removeLoanApplication(
    applicationId
) {

    if (!applicationId) {

        throw new Error(
            "Loan application ID is required."
        );

    }


    const existingApplication =
        await getLoanApplicationById(
            applicationId
        );


    if (!existingApplication) {

        throw new Error(
            "Loan application not found."
        );

    }


    // ------------------------------------------------------
    // Only DRAFT applications can be deleted
    // ------------------------------------------------------

    if (
        existingApplication.status !== "DRAFT"
    ) {

        throw new Error(
            "Only DRAFT loan applications can be deleted."
        );

    }


    return await deleteLoanApplication(
        applicationId
    );

}


// ==========================================================
// Export Constants
// ==========================================================

export {
    ALLOWED_APPLICATION_STATUSES
};

