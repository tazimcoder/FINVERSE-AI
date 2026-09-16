/**
 * ==========================================================
 * FINVERSE AI
 * Loan Routes
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/routes/loanRoutes.js
 *
 * Responsibility:
 *
 * - Define Loan API endpoints
 * - Connect routes with Loan Controller
 *
 * Base URL:
 *
 * /api/v1/loans
 *
 * ==========================================================
 */

import express from "express";


// ==========================================================
// Loan Controller
// ==========================================================

import {
    getAllLoans,
    getLoanById,
    getLoanByNumber,
    getLoansByUser,
    getLoanByApplication,
    createLoan,
    updateLoan,
    updateLoanStatus,
    deleteLoan
} from "../controllers/loanController.js";


const router =
    express.Router();


// ==========================================================
// GET ALL LOANS
// ==========================================================
//
// GET /api/v1/loans
//
// ==========================================================

router.get(
    "/",
    getAllLoans
);


// ==========================================================
// GET LOAN BY LOAN NUMBER
// ==========================================================
//
// IMPORTANT:
// This route must come before:
//
// /:id
//
// Otherwise "number" may be treated as an ID.
//
// GET /api/v1/loans/number/:loanNumber
//
// ==========================================================

router.get(
    "/number/:loanNumber",
    getLoanByNumber
);


// ==========================================================
// GET LOANS BY USER
// ==========================================================
//
// GET /api/v1/loans/user/:userId
//
// ==========================================================

router.get(
    "/user/:userId",
    getLoansByUser
);


// ==========================================================
// GET LOAN BY APPLICATION
// ==========================================================
//
// GET /api/v1/loans/application/:applicationId
//
// ==========================================================

router.get(
    "/application/:applicationId",
    getLoanByApplication
);


// ==========================================================
// GET LOAN BY ID
// ==========================================================
//
// GET /api/v1/loans/:id
//
// ==========================================================

router.get(
    "/:id",
    getLoanById
);


// ==========================================================
// CREATE LOAN
// ==========================================================
//
// POST /api/v1/loans
//
// ==========================================================

router.post(
    "/",
    createLoan
);


// ==========================================================
// UPDATE LOAN
// ==========================================================
//
// PUT /api/v1/loans/:id
//
// ==========================================================

router.put(
    "/:id",
    updateLoan
);


// ==========================================================
// UPDATE LOAN STATUS
// ==========================================================
//
// PATCH /api/v1/loans/:id/status
//
// Body:
//
// {
//     "status": "ACTIVE"
// }
//
// Allowed statuses:
//
// ACTIVE
// OVERDUE
// CLOSED
// DEFAULTED
// FORECLOSED
//
// ==========================================================

router.patch(
    "/:id/status",
    updateLoanStatus
);


// ==========================================================
// DELETE LOAN
// ==========================================================
//
// DELETE /api/v1/loans/:id
//
// ==========================================================

router.delete(
    "/:id",
    deleteLoan
);


// ==========================================================
// EXPORT ROUTER
// ==========================================================

export default router;

