/**
 * ==========================================================
 * FINVERSE AI
 * Loan Penalty Routes
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/routes/loanPenaltyRoutes.js
 *
 * Responsibility:
 *
 * - Define Loan Penalty API endpoints
 * - Connect routes with controllers
 *
 * Base URL:
 *
 * /api/v1/loan-penalties
 *
 * ==========================================================
 */

import express from "express";

import {
    getAllPenalties,
    getPenaltyById,
    getPenaltiesByLoanId,
    getPenaltiesByScheduleId,
    getPenaltiesByUserId,
    getPenaltiesByType,
    getPenaltiesByStatus,
    createPenalty,
    updatePenalty,
    changePenaltyStatus,
    waivePenalty,
    markPenaltyAsPaid,
    deletePenalty
} from "../controllers/loanPenaltyController.js";


// ==========================================================
// CREATE ROUTER
// ==========================================================

const router = express.Router();


// ==========================================================
// GET ALL PENALTIES
// ==========================================================
//
// GET /api/v1/loan-penalties
//
// ==========================================================

router.get(
    "/",
    getAllPenalties
);


// ==========================================================
// GET PENALTIES BY LOAN
// ==========================================================
//
// GET /api/v1/loan-penalties/loan/:loanId
//
// ==========================================================

router.get(
    "/loan/:loanId",
    getPenaltiesByLoanId
);


// ==========================================================
// GET PENALTIES BY REPAYMENT SCHEDULE
// ==========================================================
//
// GET /api/v1/loan-penalties/schedule/:scheduleId
//
// ==========================================================

router.get(
    "/schedule/:scheduleId",
    getPenaltiesByScheduleId
);


// ==========================================================
// GET PENALTIES BY USER
// ==========================================================
//
// GET /api/v1/loan-penalties/user/:userId
//
// ==========================================================

router.get(
    "/user/:userId",
    getPenaltiesByUserId
);


// ==========================================================
// GET PENALTIES BY TYPE
// ==========================================================
//
// GET /api/v1/loan-penalties/type/:type
//
// ==========================================================

router.get(
    "/type/:type",
    getPenaltiesByType
);


// ==========================================================
// GET PENALTIES BY STATUS
// ==========================================================
//
// GET /api/v1/loan-penalties/status/:status
//
// ==========================================================

router.get(
    "/status/:status",
    getPenaltiesByStatus
);


// ==========================================================
// GET PENALTY BY ID
// ==========================================================
//
// GET /api/v1/loan-penalties/:id
//
// IMPORTANT:
// Keep this after the specific routes above so values such as
// /loan/:loanId and /status/:status are matched correctly.
//
// ==========================================================

router.get(
    "/:id",
    getPenaltyById
);


// ==========================================================
// CREATE PENALTY
// ==========================================================
//
// POST /api/v1/loan-penalties
//
// ==========================================================

router.post(
    "/",
    createPenalty
);


// ==========================================================
// UPDATE PENALTY
// ==========================================================
//
// PUT /api/v1/loan-penalties/:id
//
// ==========================================================

router.put(
    "/:id",
    updatePenalty
);


// ==========================================================
// CHANGE PENALTY STATUS
// ==========================================================
//
// PATCH /api/v1/loan-penalties/:id/status
//
// Body:
//
// {
//     "penalty_status": "APPLIED"
// }
//
// ==========================================================

router.patch(
    "/:id/status",
    changePenaltyStatus
);


// ==========================================================
// WAIVE PENALTY
// ==========================================================
//
// PATCH /api/v1/loan-penalties/:id/waive
//
// Body:
//
// {
//     "waived_amount": 500,
//     "waived_by_user_id": 1,
//     "waiver_reason": "Approved by admin"
// }
//
// ==========================================================

router.patch(
    "/:id/waive",
    waivePenalty
);


// ==========================================================
// MARK PENALTY AS PAID
// ==========================================================
//
// PATCH /api/v1/loan-penalties/:id/paid
//
// ==========================================================

router.patch(
    "/:id/paid",
    markPenaltyAsPaid
);


// ==========================================================
// DELETE PENALTY
// ==========================================================
//
// DELETE /api/v1/loan-penalties/:id
//
// ==========================================================

router.delete(
    "/:id",
    deletePenalty
);


// ==========================================================
// EXPORT ROUTER
// ==========================================================

export default router;