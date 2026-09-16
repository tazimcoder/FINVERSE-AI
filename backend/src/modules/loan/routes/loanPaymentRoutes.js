/**
 * ==========================================================
 * FINVERSE AI
 * Loan Payment Routes
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/routes/loanPaymentRoutes.js
 *
 * Responsibility:
 *
 * - Define Loan Payment API endpoints
 * - Connect routes with controllers
 *
 * Base Route:
 * /api/v1/loan-payments
 *
 * ==========================================================
 */

import express from "express";

import {
    getAllLoanPaymentsController,
    getLoanPaymentByIdController,
    getLoanPaymentsByLoanIdController,
    getLoanPaymentsByScheduleIdController,
    getLoanPaymentByReferenceController,
    getLoanPaymentsByTransactionIdController,
    getLoanPaymentsByStatusController,
    createLoanPaymentController,
    updateLoanPaymentController,
    changeLoanPaymentStatusController,
    deleteLoanPaymentController
} from "../controllers/loanPaymentController.js";


// ==========================================================
// CREATE ROUTER
// ==========================================================

const router = express.Router();


// ==========================================================
// GET ALL PAYMENTS
// ==========================================================
//
// GET /api/v1/loan-payments
//
// ==========================================================

router.get(
    "/",
    getAllLoanPaymentsController
);


// ==========================================================
// GET PAYMENT BY ID
// ==========================================================
//
// GET /api/v1/loan-payments/:id
//
// ==========================================================

router.get(
    "/:id",
    getLoanPaymentByIdController
);


// ==========================================================
// GET PAYMENTS BY LOAN ID
// ==========================================================
//
// GET /api/v1/loan-payments/loan/:loanId
//
// ==========================================================

router.get(
    "/loan/:loanId",
    getLoanPaymentsByLoanIdController
);


// ==========================================================
// GET PAYMENTS BY REPAYMENT SCHEDULE
// ==========================================================
//
// GET /api/v1/loan-payments/schedule/:scheduleId
//
// ==========================================================

router.get(
    "/schedule/:scheduleId",
    getLoanPaymentsByScheduleIdController
);


// ==========================================================
// GET PAYMENT BY REFERENCE
// ==========================================================
//
// GET /api/v1/loan-payments/reference/:reference
//
// ==========================================================

router.get(
    "/reference/:reference",
    getLoanPaymentByReferenceController
);


// ==========================================================
// GET PAYMENTS BY TRANSACTION
// ==========================================================
//
// GET /api/v1/loan-payments/transaction/:transactionId
//
// ==========================================================

router.get(
    "/transaction/:transactionId",
    getLoanPaymentsByTransactionIdController
);


// ==========================================================
// GET PAYMENTS BY STATUS
// ==========================================================
//
// GET /api/v1/loan-payments/status/:status
//
// ==========================================================

router.get(
    "/status/:status",
    getLoanPaymentsByStatusController
);


// ==========================================================
// CREATE PAYMENT
// ==========================================================
//
// POST /api/v1/loan-payments
//
// ==========================================================

router.post(
    "/",
    createLoanPaymentController
);


// ==========================================================
// UPDATE PAYMENT
// ==========================================================
//
// PUT /api/v1/loan-payments/:id
//
// ==========================================================

router.put(
    "/:id",
    updateLoanPaymentController
);


// ==========================================================
// CHANGE PAYMENT STATUS
// ==========================================================
//
// PATCH /api/v1/loan-payments/:id/status
//
// Body:
//
// {
//     "status": "SUCCESS"
// }
//
// ==========================================================

router.patch(
    "/:id/status",
    changeLoanPaymentStatusController
);


// ==========================================================
// DELETE PAYMENT
// ==========================================================
//
// DELETE /api/v1/loan-payments/:id
//
// ==========================================================

router.delete(
    "/:id",
    deleteLoanPaymentController
);


// ==========================================================
// EXPORT ROUTER
// ==========================================================

export default router;

