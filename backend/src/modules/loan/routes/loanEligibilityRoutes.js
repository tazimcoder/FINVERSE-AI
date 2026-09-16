/**
 * ==========================================================
 * FINVERSE AI
 * Loan Eligibility Routes
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/routes/loanEligibilityRoutes.js
 *
 * Responsibility:
 *
 * - Define Loan Eligibility API endpoints
 * - Connect routes with eligibility controller
 *
 * Flow:
 *
 * HTTP REQUEST
 *      ↓
 * ROUTES
 *      ↓
 * CONTROLLER
 *      ↓
 * SERVICE
 *      ↓
 * MODEL
 *      ↓
 * MYSQL
 *
 * ==========================================================
 */

import express from "express";

import {
    evaluateLoanEligibility,
    getAllLoanEligibilityChecks,
    getLoanEligibilityCheckById,
    getLoanEligibilityChecksByApplication,
    getLoanEligibilityChecksByStatus,
    createLoanEligibilityCheck,
    updateLoanEligibilityCheck,
    updateLoanEligibilityStatus,
    deleteLoanEligibilityCheck
} from "../controllers/loanEligibilityController.js";


const router =
    express.Router();


// ==========================================================
// EVALUATE INSTANT LOAN ELIGIBILITY
// ==========================================================
//
// POST
// /api/v1/loan-eligibility/evaluate
//
// ==========================================================

router.post(
    "/evaluate",
    evaluateLoanEligibility
);


// ==========================================================
// GET ALL ELIGIBILITY CHECKS
// ==========================================================
//
// GET
// /api/v1/loan-eligibility
//
// ==========================================================

router.get(
    "/",
    getAllLoanEligibilityChecks
);


// ==========================================================
// GET ELIGIBILITY CHECKS BY APPLICATION
// ==========================================================
//
// GET
// /api/v1/loan-eligibility/application/:applicationId
//
// ==========================================================

router.get(
    "/application/:applicationId",
    getLoanEligibilityChecksByApplication
);


// ==========================================================
// GET ELIGIBILITY CHECKS BY STATUS
// ==========================================================
//
// GET
// /api/v1/loan-eligibility/status/:status
//
// Examples:
//
// /api/v1/loan-eligibility/status/PENDING
// /api/v1/loan-eligibility/status/ELIGIBLE
// /api/v1/loan-eligibility/status/NOT_ELIGIBLE
// /api/v1/loan-eligibility/status/MANUAL_REVIEW
//
// ==========================================================

router.get(
    "/status/:status",
    getLoanEligibilityChecksByStatus
);


// ==========================================================
// GET ELIGIBILITY CHECK BY ID
// ==========================================================
//
// GET
// /api/v1/loan-eligibility/:id
//
// ==========================================================

router.get(
    "/:id",
    getLoanEligibilityCheckById
);


// ==========================================================
// CREATE ELIGIBILITY CHECK
// ==========================================================
//
// POST
// /api/v1/loan-eligibility
//
// ==========================================================

router.post(
    "/",
    createLoanEligibilityCheck
);


// ==========================================================
// UPDATE ELIGIBILITY CHECK
// ==========================================================
//
// PUT
// /api/v1/loan-eligibility/:id
//
// ==========================================================

router.put(
    "/:id",
    updateLoanEligibilityCheck
);


// ==========================================================
// UPDATE ELIGIBILITY STATUS
// ==========================================================
//
// PATCH
// /api/v1/loan-eligibility/:id/status
//
// ==========================================================

router.patch(
    "/:id/status",
    updateLoanEligibilityStatus
);


// ==========================================================
// DELETE ELIGIBILITY CHECK
// ==========================================================
//
// DELETE
// /api/v1/loan-eligibility/:id
//
// ==========================================================

router.delete(
    "/:id",
    deleteLoanEligibilityCheck
);


// ==========================================================
// EXPORT ROUTER
// ==========================================================

export default router;

