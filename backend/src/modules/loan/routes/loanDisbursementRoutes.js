/**
 * ==========================================================
 * FINVERSE AI
 * Loan Disbursement Routes
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/routes/loanDisbursementRoutes.js
 *
 * Responsibility:
 *
 * - Define HTTP routes for loan disbursements
 * - Connect routes with loan disbursement controller
 *
 * Connected Controller:
 *
 * ../controllers/loanDisbursementController.js
 *
 * ==========================================================
 */

import express from "express";


import {
    getAllLoanDisbursements,
    getLoanDisbursementById,
    getLoanDisbursementsByLoan,
    getLoanDisbursementsByApplication,
    getLoanDisbursementsByOffer,
    getLoanDisbursementByReference,
    getLoanDisbursementsByAccount,
    getLoanDisbursementsByTransaction,
    getLoanDisbursementsByStatus,

    createLoanDisbursement,

    updateLoanDisbursement,

    updateLoanDisbursementStatus,

    startDisbursementProcessing,

    markDisbursementProcessed,

    markDisbursementDisbursed,

    cancelLoanDisbursement,

    reverseLoanDisbursement,

    deleteLoanDisbursement

} from "../controllers/loanDisbursementController.js";


const router =
    express.Router();


// ==========================================================
// GET ALL LOAN DISBURSEMENTS
// ==========================================================

router.get(
    "/",
    getAllLoanDisbursements
);


// ==========================================================
// GET DISBURSEMENTS BY LOAN
// ==========================================================

router.get(
    "/loan/:loanId",
    getLoanDisbursementsByLoan
);


// ==========================================================
// GET DISBURSEMENTS BY APPLICATION
// ==========================================================

router.get(
    "/application/:applicationId",
    getLoanDisbursementsByApplication
);


// ==========================================================
// GET DISBURSEMENTS BY OFFER
// ==========================================================

router.get(
    "/offer/:offerId",
    getLoanDisbursementsByOffer
);


// ==========================================================
// GET DISBURSEMENT BY REFERENCE
// ==========================================================

router.get(
    "/reference/:disbursementReference",
    getLoanDisbursementByReference
);


// ==========================================================
// GET DISBURSEMENTS BY ACCOUNT
// ==========================================================

router.get(
    "/account/:accountId",
    getLoanDisbursementsByAccount
);


// ==========================================================
// GET DISBURSEMENTS BY TRANSACTION
// ==========================================================

router.get(
    "/transaction/:transactionId",
    getLoanDisbursementsByTransaction
);


// ==========================================================
// GET DISBURSEMENTS BY STATUS
// ==========================================================

router.get(
    "/status/:status",
    getLoanDisbursementsByStatus
);


// ==========================================================
// CREATE LOAN DISBURSEMENT
// ==========================================================

router.post(
    "/",
    createLoanDisbursement
);


// ==========================================================
// UPDATE LOAN DISBURSEMENT
// ==========================================================

router.put(
    "/:id",
    updateLoanDisbursement
);


// ==========================================================
// UPDATE DISBURSEMENT STATUS
// ==========================================================

router.patch(
    "/:id/status",
    updateLoanDisbursementStatus
);


// ==========================================================
// START DISBURSEMENT PROCESSING
// ==========================================================

router.patch(
    "/:id/process",
    startDisbursementProcessing
);


// ==========================================================
// MARK DISBURSEMENT AS PROCESSED
// ==========================================================

router.patch(
    "/:id/processed",
    markDisbursementProcessed
);


// ==========================================================
// MARK DISBURSEMENT AS DISBURSED
// ==========================================================

router.patch(
    "/:id/disbursed",
    markDisbursementDisbursed
);


// ==========================================================
// CANCEL DISBURSEMENT
// ==========================================================

router.patch(
    "/:id/cancel",
    cancelLoanDisbursement
);


// ==========================================================
// REVERSE DISBURSEMENT
// ==========================================================

router.patch(
    "/:id/reverse",
    reverseLoanDisbursement
);


// ==========================================================
// GET DISBURSEMENT BY ID
// ==========================================================
//
// Keep this after all static routes so that paths such as:
//
// /status/COMPLETED
// /loan/1
// /application/1
//
// are not interpreted as an ID route.
//
// ==========================================================

router.get(
    "/:id",
    getLoanDisbursementById
);


// ==========================================================
// DELETE LOAN DISBURSEMENT
// ==========================================================

router.delete(
    "/:id",
    deleteLoanDisbursement
);


// ==========================================================
// EXPORT ROUTER
// ==========================================================

export default router;