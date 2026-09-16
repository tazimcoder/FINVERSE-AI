/**
 * ==========================================================
 * FINVERSE AI
 * Loan Lifecycle Service
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/services/loanLifecycleService.js
 *
 * Responsibility:
 *
 * - Centralize loan application lifecycle workflow
 * - Coordinate existing loan services
 * - Prevent duplicate business logic
 * - Maintain consistent loan status transitions
 * - Create loan status history
 * - Prepare future Admin / USER workflow integration
 *
 * IMPORTANT:
 *
 * This service does NOT replace existing services.
 * It orchestrates them.
 *
 * ==========================================================
 */

import {
    fetchLoanApplicationById,
    changeLoanApplicationStatus,
} from "./loanApplicationService.js";


import {
    getLatestLoanEligibilityCheckByApplicationId,
} from "./loanEligibilityService.js";


import {
    getLatestLoanVerificationCheckByApplicationId,
} from "./loanVerificationCheckService.js";


import {
    getLatestLoanOfferByApplicationId,
} from "./loanOfferService.js";


import {
    getLatestPropertyValuationByApplicationId,
} from "./propertyValuationService.js";


import {
    createLoanStatusHistory,
    getLatestLoanStatusHistoryByApplicationId,
} from "./loanStatusHistoryService.js";


// ==========================================================
// ALLOWED APPLICATION STATUS
// ==========================================================

const LOAN_APPLICATION_STATUSES = [

    "DRAFT",

    "SUBMITTED",

    "UNDER_REVIEW",

    "ELIGIBILITY_CHECK",

    "VERIFICATION",

    "APPROVED",

    "OFFERED",

    "ACCEPTED",

    "DISBURSED",

    "REJECTED",

    "CANCELLED",

];


// ==========================================================
// VALIDATE ID
// ==========================================================

function validateId(
    value,
    fieldName
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        throw new Error(
            `${fieldName} is required.`
        );

    }


    const id =
        Number(value);


    if (
        !Number.isInteger(id) ||
        id <= 0
    ) {

        throw new Error(
            `${fieldName} must be a valid positive integer.`
        );

    }


    return id;

}


// ==========================================================
// NORMALIZE STATUS
// ==========================================================

function normalizeStatus(
    status
) {

    if (
        status === undefined ||
        status === null ||
        status === ""
    ) {

        return null;

    }


    const normalized =
        String(status)
            .trim()
            .toUpperCase();


    if (
        !LOAN_APPLICATION_STATUSES.includes(
            normalized
        )
    ) {

        throw new Error(
            `Invalid loan application status: ${status}`
        );

    }


    return normalized;

}


// ==========================================================
// GET CURRENT APPLICATION STATUS
// ==========================================================

export async function getCurrentLoanApplicationStatus(
    applicationId
) {

    const id =
        validateId(
            applicationId,
            "Loan application ID"
        );


    const application =
        await fetchLoanApplicationById(
            id
        );


    if (!application) {

        throw new Error(
            "Loan application not found."
        );

    }


    const history =
        await getLatestLoanStatusHistoryByApplicationId(
            id
        );


    return {

        applicationId:
            id,

        currentStatus:
            history?.new_status ||
            application.status ||
            "DRAFT",

        source:
            history
                ? "STATUS_HISTORY"
                : "APPLICATION",

        application,

    };

}


// ==========================================================
// GET COMPLETE LIFECYCLE SNAPSHOT
// ==========================================================

export async function getLoanLifecycleSnapshot(
    applicationId
) {

    const id =
        validateId(
            applicationId,
            "Loan application ID"
        );


    const application =
        await fetchLoanApplicationById(
            id
        );


    if (!application) {

        throw new Error(
            "Loan application not found."
        );

    }


    const [

        eligibility,

        verification,

        offer,

        propertyValuation,

        statusHistory,

    ] = await Promise.all([

        getLatestLoanEligibilityCheckByApplicationId(
            id
        ),

        getLatestLoanVerificationCheckByApplicationId(
            id
        ),

        getLatestLoanOfferByApplicationId(
            id
        ),

        getLatestPropertyValuationByApplicationId(
            id
        ),

        getLatestLoanStatusHistoryByApplicationId(
            id
        ),

    ]);


    // ======================================================
    // APPROVAL
    // ======================================================

    const approval = {

        applicationId:
            id,

        status:
            application.status === "APPROVED"
                ? "APPROVED"
                : null,

        available:
            application.status === "APPROVED",

    };


    return {

        application,

        status:
            statusHistory?.new_status ||
            application.status ||
            "DRAFT",

        eligibility,

        verification,

        approval,

        offer,

        propertyValuation,

        statusHistory,

    };

}


// ==========================================================
// CHANGE APPLICATION STATUS
// ==========================================================

export async function changeLoanApplicationLifecycleStatus(
    applicationId,
    newStatus,
    options = {}
) {

    const id =
        validateId(
            applicationId,
            "Loan application ID"
        );


    const normalizedStatus =
        normalizeStatus(
            newStatus
        );


    if (!normalizedStatus) {

        throw new Error(
            "New loan application status is required."
        );

    }


    const application =
        await fetchLoanApplicationById(
            id
        );


    if (!application) {

        throw new Error(
            "Loan application not found."
        );

    }


    const latestHistory =
        await getLatestLoanStatusHistoryByApplicationId(
            id
        );


    const oldStatus =
        latestHistory?.new_status ||
        application.status ||
        "DRAFT";


    if (
        oldStatus === normalizedStatus
    ) {

        return {

            changed:
                false,

            applicationId:
                id,

            oldStatus,

            newStatus:
                normalizedStatus,

            message:
                "Loan application is already in this status.",

        };

    }


    // ======================================================
    // UPDATE APPLICATION STATUS
    // ======================================================
    //
    // loanApplicationService exports:
    //
    // changeLoanApplicationStatus()
    //
    // NOT:
    //
    // updateLoanApplicationStatus()
    //
    // ======================================================

    const updatedApplication =
        await changeLoanApplicationStatus(

            id,

            normalizedStatus,

            normalizedStatus === "REJECTED"
                ? options.rejectionReason || null
                : null

        );


    if (!updatedApplication) {

        throw new Error(
            "Failed to update loan application status."
        );

    }


    // ======================================================
    // CREATE STATUS HISTORY
    // ======================================================

    const statusHistory =
        await createLoanStatusHistory({

            loanApplicationId:
                id,

            oldStatus,

            newStatus:
                normalizedStatus,

            changedByUserId:
                options.changedByUserId ||
                null,

            remarks:
                options.remarks ||
                null,

        });


    return {

        changed:
            true,

        applicationId:
            id,

        oldStatus,

        newStatus:
            normalizedStatus,

        statusHistoryId:
            statusHistory,

        application:
            updatedApplication,

    };

}


// ==========================================================
// SUBMIT APPLICATION
// ==========================================================

export async function submitLoanApplication(
    applicationId,
    options = {}
) {

    return await changeLoanApplicationLifecycleStatus(

        applicationId,

        "SUBMITTED",

        options

    );

}


// ==========================================================
// MOVE TO UNDER REVIEW
// ==========================================================

export async function moveLoanApplicationToReview(
    applicationId,
    options = {}
) {

    return await changeLoanApplicationLifecycleStatus(

        applicationId,

        "UNDER_REVIEW",

        options

    );

}


// ==========================================================
// START ELIGIBILITY CHECK
// ==========================================================

export async function startLoanEligibilityWorkflow(
    applicationId,
    options = {}
) {

    return await changeLoanApplicationLifecycleStatus(

        applicationId,

        "ELIGIBILITY_CHECK",

        options

    );

}


// ==========================================================
// START VERIFICATION
// ==========================================================

export async function startLoanVerificationWorkflow(
    applicationId,
    options = {}
) {

    return await changeLoanApplicationLifecycleStatus(

        applicationId,

        "VERIFICATION",

        options

    );

}


// ==========================================================
// MARK APPLICATION APPROVED
// ==========================================================

export async function markLoanApplicationApproved(
    applicationId,
    options = {}
) {

    return await changeLoanApplicationLifecycleStatus(

        applicationId,

        "APPROVED",

        options

    );

}


// ==========================================================
// MARK OFFERED
// ==========================================================

export async function markLoanApplicationOffered(
    applicationId,
    options = {}
) {

    return await changeLoanApplicationLifecycleStatus(

        applicationId,

        "OFFERED",

        options

    );

}


// ==========================================================
// MARK OFFER ACCEPTED
// ==========================================================

export async function markLoanApplicationAccepted(
    applicationId,
    options = {}
) {

    return await changeLoanApplicationLifecycleStatus(

        applicationId,

        "ACCEPTED",

        options

    );

}


// ==========================================================
// MARK DISBURSED
// ==========================================================

export async function markLoanApplicationDisbursed(
    applicationId,
    options = {}
) {

    return await changeLoanApplicationLifecycleStatus(

        applicationId,

        "DISBURSED",

        options

    );

}


// ==========================================================
// REJECT APPLICATION
// ==========================================================

export async function rejectLoanApplication(
    applicationId,
    options = {}
) {

    return await changeLoanApplicationLifecycleStatus(

        applicationId,

        "REJECTED",

        options

    );

}


// ==========================================================
// CANCEL APPLICATION
// ==========================================================

export async function cancelLoanApplication(
    applicationId,
    options = {}
) {

    return await changeLoanApplicationLifecycleStatus(

        applicationId,

        "CANCELLED",

        options

    );

}


// ==========================================================
// EXPORT STATUS CONSTANTS
// ==========================================================

export {

    LOAN_APPLICATION_STATUSES,

};

