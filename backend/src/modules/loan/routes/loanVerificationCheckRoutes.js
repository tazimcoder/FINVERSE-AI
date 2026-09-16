/**
 * ==========================================================
 * FINVERSE AI
 * Loan Verification Check Routes
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/routes/loanVerificationCheckRoutes.js
 *
 * Database Table:
 * loan_verification_checks
 *
 * Responsibility:
 *
 * - Define verification check API endpoints
 * - Connect routes with controller functions
 *
 * Flow:
 *
 * REQUEST
 *   ↓
 * ROUTE
 *   ↓
 * CONTROLLER
 *   ↓
 * SERVICE
 *   ↓
 * MODEL
 *   ↓
 * MYSQL
 *
 * ==========================================================
 */

import express from "express";

import {
    getAllVerificationChecks,
    getVerificationCheckById,
    getVerificationChecksByApplicationId,
    getVerificationChecksByUserId,
    getVerificationChecksByType,
    getVerificationChecksByStatus,
    getVerificationChecksByRiskLevel,
    createVerificationCheck,
    updateVerificationCheck,
    updateVerificationStatus,
    deleteVerificationCheck
} from "../controllers/loanVerificationCheckController.js";


const router = express.Router();


// ==========================================================
// GET ALL VERIFICATION CHECKS
// ==========================================================
//
// GET
// /api/v1/loan-verification-checks
//
// ==========================================================

router.get(
    "/",
    getAllVerificationChecks
);


// ==========================================================
// GET VERIFICATION CHECK BY ID
// ==========================================================
//
// GET
// /api/v1/loan-verification-checks/:id
//
// ==========================================================

router.get(
    "/:id",
    getVerificationCheckById
);


// ==========================================================
// GET VERIFICATION CHECKS BY APPLICATION
// ==========================================================
//
// GET
// /api/v1/loan-verification-checks/application/:applicationId
//
// ==========================================================

router.get(
    "/application/:applicationId",
    getVerificationChecksByApplicationId
);


// ==========================================================
// GET VERIFICATION CHECKS BY USER
// ==========================================================
//
// GET
// /api/v1/loan-verification-checks/user/:userId
//
// ==========================================================

router.get(
    "/user/:userId",
    getVerificationChecksByUserId
);


// ==========================================================
// GET VERIFICATION CHECKS BY TYPE
// ==========================================================
//
// GET
// /api/v1/loan-verification-checks/type/:verificationType
//
// ==========================================================

router.get(
    "/type/:verificationType",
    getVerificationChecksByType
);


// ==========================================================
// GET VERIFICATION CHECKS BY STATUS
// ==========================================================
//
// GET
// /api/v1/loan-verification-checks/status/:status
//
// ==========================================================

router.get(
    "/status/:status",
    getVerificationChecksByStatus
);


// ==========================================================
// GET VERIFICATION CHECKS BY RISK LEVEL
// ==========================================================
//
// GET
// /api/v1/loan-verification-checks/risk/:riskLevel
//
// ==========================================================

router.get(
    "/risk/:riskLevel",
    getVerificationChecksByRiskLevel
);


// ==========================================================
// CREATE VERIFICATION CHECK
// ==========================================================
//
// POST
// /api/v1/loan-verification-checks
//
// ==========================================================

router.post(
    "/",
    createVerificationCheck
);


// ==========================================================
// UPDATE VERIFICATION CHECK
// ==========================================================
//
// PUT
// /api/v1/loan-verification-checks/:id
//
// ==========================================================

router.put(
    "/:id",
    updateVerificationCheck
);


// ==========================================================
// UPDATE VERIFICATION STATUS
// ==========================================================
//
// PATCH
// /api/v1/loan-verification-checks/:id/status
//
// ==========================================================

router.patch(
    "/:id/status",
    updateVerificationStatus
);


// ==========================================================
// DELETE VERIFICATION CHECK
// ==========================================================
//
// DELETE
// /api/v1/loan-verification-checks/:id
//
// ==========================================================

router.delete(
    "/:id",
    deleteVerificationCheck
);


// ==========================================================
// EXPORT ROUTER
// ==========================================================

export default router;

