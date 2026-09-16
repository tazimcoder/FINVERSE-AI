/**
 * ==========================================================
 * FINVERSE AI
 * Loan Repayment Schedule Routes
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/routes/loanRepaymentScheduleRoutes.js
 *
 * Responsibility:
 *
 * - Define Loan Repayment Schedule API endpoints
 * - Connect routes with repayment schedule controller
 *
 * ==========================================================
 */

import express from "express";

import {
    getAllLoanRepaymentSchedules,
    getLoanRepaymentScheduleById,
    getLoanRepaymentSchedulesByLoan,
    getLoanRepaymentSchedulesByStatus,
    getPendingLoanRepaymentSchedules,
    getOverdueLoanRepaymentSchedules,
    createLoanRepaymentSchedule,
    updateLoanRepaymentSchedule,
    updateLoanRepaymentScheduleStatus,
    deleteLoanRepaymentSchedule
} from "../controllers/loanRepaymentScheduleController.js";


const router = express.Router();


// ==========================================================
// GET ALL REPAYMENT SCHEDULES
// ==========================================================
//
// GET
// /api/v1/loan-repayment-schedules
//
// ==========================================================

router.get(
    "/",
    getAllLoanRepaymentSchedules
);


// ==========================================================
// GET PENDING REPAYMENT SCHEDULES
// ==========================================================
//
// GET
// /api/v1/loan-repayment-schedules/pending
//
// ==========================================================

router.get(
    "/pending",
    getPendingLoanRepaymentSchedules
);


// ==========================================================
// GET OVERDUE REPAYMENT SCHEDULES
// ==========================================================
//
// GET
// /api/v1/loan-repayment-schedules/overdue
//
// ==========================================================

router.get(
    "/overdue",
    getOverdueLoanRepaymentSchedules
);


// ==========================================================
// GET REPAYMENT SCHEDULES BY LOAN
// ==========================================================
//
// GET
// /api/v1/loan-repayment-schedules/loan/:loanId
//
// ==========================================================

router.get(
    "/loan/:loanId",
    getLoanRepaymentSchedulesByLoan
);


// ==========================================================
// GET REPAYMENT SCHEDULES BY STATUS
// ==========================================================
//
// GET
// /api/v1/loan-repayment-schedules/status/:status
//
// ==========================================================

router.get(
    "/status/:status",
    getLoanRepaymentSchedulesByStatus
);


// ==========================================================
// GET REPAYMENT SCHEDULE BY ID
// ==========================================================
//
// GET
// /api/v1/loan-repayment-schedules/:id
//
// ==========================================================

router.get(
    "/:id",
    getLoanRepaymentScheduleById
);


// ==========================================================
// CREATE REPAYMENT SCHEDULE
// ==========================================================
//
// POST
// /api/v1/loan-repayment-schedules
//
// ==========================================================

router.post(
    "/",
    createLoanRepaymentSchedule
);


// ==========================================================
// UPDATE REPAYMENT SCHEDULE
// ==========================================================
//
// PUT
// /api/v1/loan-repayment-schedules/:id
//
// ==========================================================

router.put(
    "/:id",
    updateLoanRepaymentSchedule
);


// ==========================================================
// UPDATE REPAYMENT STATUS
// ==========================================================
//
// PATCH
// /api/v1/loan-repayment-schedules/:id/status
//
// ==========================================================

router.patch(
    "/:id/status",
    updateLoanRepaymentScheduleStatus
);


// ==========================================================
// DELETE REPAYMENT SCHEDULE
// ==========================================================
//
// DELETE
// /api/v1/loan-repayment-schedules/:id
//
// ==========================================================

router.delete(
    "/:id",
    deleteLoanRepaymentSchedule
);


// ==========================================================
// EXPORT ROUTER
// ==========================================================

export default router;

