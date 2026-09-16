/**
 * ==========================================================
 * FINVERSE AI
 * Loan Lifecycle Routes
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/routes/loanLifecycleRoutes.js
 *
 * Responsibility:
 *
 * - Expose Loan Lifecycle APIs
 * - Connect routes with controller
 * - Keep lifecycle endpoints organized
 * - Remain ready for authentication / authorization
 * - Support USER / ADMIN workflow integration
 *
 * Base Route:
 *
 * /api/v1/loan-lifecycle
 *
 * ==========================================================
 */

import express from "express";


// ==========================================================
// CONTROLLER IMPORTS
// ==========================================================

import {
    getCurrentLoanApplicationStatusController,
    getLoanLifecycleSnapshotController,
    changeLoanApplicationLifecycleStatusController,
    submitLoanApplicationController,
    moveLoanApplicationToReviewController,
    startLoanEligibilityWorkflowController,
    startLoanVerificationWorkflowController,
    markLoanApplicationApprovedController,
    markLoanApplicationOfferedController,
    markLoanApplicationAcceptedController,
    markLoanApplicationDisbursedController,
    rejectLoanApplicationController,
    cancelLoanApplicationController,
} from "../controllers/loanLifecycleController.js";


// ==========================================================
// CREATE ROUTER
// ==========================================================

const router =
    express.Router();


// ==========================================================
// GET CURRENT APPLICATION STATUS
// ==========================================================
//
// GET
// /api/v1/loan-lifecycle/application/:applicationId/status
//
// Purpose:
// Fetch the current lifecycle status of a loan application.
//
// ==========================================================

router.get(
    "/application/:applicationId/status",
    getCurrentLoanApplicationStatusController
);


// ==========================================================
// GET COMPLETE LIFECYCLE SNAPSHOT
// ==========================================================
//
// GET
// /api/v1/loan-lifecycle/application/:applicationId
//
// Purpose:
// Fetch complete lifecycle information for a loan application.
//
// ==========================================================

router.get(
    "/application/:applicationId",
    getLoanLifecycleSnapshotController
);


// ==========================================================
// CHANGE APPLICATION STATUS
// ==========================================================
//
// PATCH
// /api/v1/loan-lifecycle/application/:applicationId/status
//
// Body:
//
// {
//     "status": "SUBMITTED",
//     "changedByUserId": 3,
//     "remarks": "Application submitted."
// }
//
// ==========================================================

router.patch(
    "/application/:applicationId/status",
    changeLoanApplicationLifecycleStatusController
);


// ==========================================================
// SUBMIT APPLICATION
// ==========================================================
//
// PATCH
// /api/v1/loan-lifecycle/application/:applicationId/submit
//
// ==========================================================

router.patch(
    "/application/:applicationId/submit",
    submitLoanApplicationController
);


// ==========================================================
// MOVE TO REVIEW
// ==========================================================
//
// PATCH
// /api/v1/loan-lifecycle/application/:applicationId/review
//
// ==========================================================

router.patch(
    "/application/:applicationId/review",
    moveLoanApplicationToReviewController
);


// ==========================================================
// START ELIGIBILITY
// ==========================================================
//
// PATCH
// /api/v1/loan-lifecycle/application/:applicationId/eligibility
//
// ==========================================================

router.patch(
    "/application/:applicationId/eligibility",
    startLoanEligibilityWorkflowController
);


// ==========================================================
// START VERIFICATION
// ==========================================================
//
// PATCH
// /api/v1/loan-lifecycle/application/:applicationId/verification
//
// ==========================================================

router.patch(
    "/application/:applicationId/verification",
    startLoanVerificationWorkflowController
);


// ==========================================================
// APPROVE APPLICATION
// ==========================================================
//
// PATCH
// /api/v1/loan-lifecycle/application/:applicationId/approve
//
// ==========================================================

router.patch(
    "/application/:applicationId/approve",
    markLoanApplicationApprovedController
);


// ==========================================================
// MARK OFFERED
// ==========================================================
//
// PATCH
// /api/v1/loan-lifecycle/application/:applicationId/offer
//
// ==========================================================

router.patch(
    "/application/:applicationId/offer",
    markLoanApplicationOfferedController
);


// ==========================================================
// ACCEPT OFFER
// ==========================================================
//
// PATCH
// /api/v1/loan-lifecycle/application/:applicationId/accept
//
// ==========================================================

router.patch(
    "/application/:applicationId/accept",
    markLoanApplicationAcceptedController
);


// ==========================================================
// MARK DISBURSED
// ==========================================================
//
// PATCH
// /api/v1/loan-lifecycle/application/:applicationId/disburse
//
// ==========================================================

router.patch(
    "/application/:applicationId/disburse",
    markLoanApplicationDisbursedController
);


// ==========================================================
// REJECT APPLICATION
// ==========================================================
//
// PATCH
// /api/v1/loan-lifecycle/application/:applicationId/reject
//
// ==========================================================

router.patch(
    "/application/:applicationId/reject",
    rejectLoanApplicationController
);


// ==========================================================
// CANCEL APPLICATION
// ==========================================================
//
// PATCH
// /api/v1/loan-lifecycle/application/:applicationId/cancel
//
// ==========================================================

router.patch(
    "/application/:applicationId/cancel",
    cancelLoanApplicationController
);


// ==========================================================
// DEFAULT EXPORT
// ==========================================================

export default router;

