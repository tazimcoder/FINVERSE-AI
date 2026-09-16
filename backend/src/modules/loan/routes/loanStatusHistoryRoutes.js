/**
 * ==========================================================
 * FINVERSE AI
 * Loan Status History Routes
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/routes/loanStatusHistoryRoutes.js
 *
 * Responsibility:
 *
 * - Define Loan Status History API endpoints
 * - Connect validators with controllers
 * - Keep route definitions clean and modular
 *
 * ==========================================================
 */

import express from "express";

import {
    createLoanStatusHistory,
    getAllLoanStatusHistory,
    getLoanStatusHistoryById,
    getLoanStatusHistoryByLoanId,
    getLoanStatusHistoryByApplicationId,
    getLoanStatusHistoryByUserId,
    getLoanStatusHistoryByStatus,
    getLatestLoanStatusByLoanId,
    getLatestLoanStatusByApplicationId,
    deleteLoanStatusHistory,
} from "../controllers/loanStatusHistoryController.js";

import {
    validateCreateLoanStatusHistory,
    validateLoanStatusHistoryId,
    validateLoanStatusHistoryLoanId,
    validateLoanStatusHistoryApplicationId,
    validateLoanStatusHistoryUserId,
    validateLoanStatusHistoryStatus,
} from "../validators/loanStatusHistoryValidator.js";


// ==========================================================
// ROUTER
// ==========================================================

const router = express.Router();


// ==========================================================
// CREATE STATUS HISTORY
// ==========================================================
//
// POST /api/v1/loan-status-history
//
// ==========================================================

router.post(
    "/",
    validateCreateLoanStatusHistory,
    createLoanStatusHistory
);


// ==========================================================
// GET ALL STATUS HISTORY
// ==========================================================
//
// GET /api/v1/loan-status-history
//
// ==========================================================

router.get(
    "/",
    getAllLoanStatusHistory
);


// ==========================================================
// GET LATEST STATUS BY LOAN
// ==========================================================
//
// IMPORTANT:
// This route must come before /:id.
//
// GET /api/v1/loan-status-history/loan/:loanId/latest
//
// ==========================================================

router.get(
    "/loan/:loanId/latest",
    validateLoanStatusHistoryLoanId,
    getLatestLoanStatusByLoanId
);


// ==========================================================
// GET HISTORY BY LOAN
// ==========================================================
//
// GET /api/v1/loan-status-history/loan/:loanId
//
// ==========================================================

router.get(
    "/loan/:loanId",
    validateLoanStatusHistoryLoanId,
    getLoanStatusHistoryByLoanId
);


// ==========================================================
// GET LATEST STATUS BY APPLICATION
// ==========================================================
//
// GET /api/v1/loan-status-history/application/:applicationId/latest
//
// ==========================================================

router.get(
    "/application/:applicationId/latest",
    validateLoanStatusHistoryApplicationId,
    getLatestLoanStatusByApplicationId
);


// ==========================================================
// GET HISTORY BY APPLICATION
// ==========================================================
//
// GET /api/v1/loan-status-history/application/:applicationId
//
// ==========================================================

router.get(
    "/application/:applicationId",
    validateLoanStatusHistoryApplicationId,
    getLoanStatusHistoryByApplicationId
);


// ==========================================================
// GET HISTORY BY USER
// ==========================================================
//
// GET /api/v1/loan-status-history/user/:userId
//
// ==========================================================

router.get(
    "/user/:userId",
    validateLoanStatusHistoryUserId,
    getLoanStatusHistoryByUserId
);


// ==========================================================
// GET HISTORY BY STATUS
// ==========================================================
//
// GET /api/v1/loan-status-history/status/:status
//
// ==========================================================

router.get(
    "/status/:status",
    validateLoanStatusHistoryStatus,
    getLoanStatusHistoryByStatus
);


// ==========================================================
// GET HISTORY BY ID
// ==========================================================
//
// GET /api/v1/loan-status-history/:id
//
// ==========================================================

router.get(
    "/:id",
    validateLoanStatusHistoryId,
    getLoanStatusHistoryById
);


// ==========================================================
// DELETE HISTORY BY ID
// ==========================================================
//
// DELETE /api/v1/loan-status-history/:id
//
// ==========================================================

router.delete(
    "/:id",
    validateLoanStatusHistoryId,
    deleteLoanStatusHistory
);


// ==========================================================
// EXPORT ROUTER
// ==========================================================

export default router;

