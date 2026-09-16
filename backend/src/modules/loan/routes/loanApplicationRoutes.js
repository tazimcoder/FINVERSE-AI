/**
 * ==========================================================
 * FINVERSE AI
 * Loan Application Routes
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/routes/loanApplicationRoutes.js
 *
 * Base URL:
 * /api/v1/loan-applications
 *
 * ==========================================================
 */

import express from "express";

import {
    getAllLoanApplications,
    getLoanApplicationById,
    getLoanApplicationsByUser,
    getLoanApplicationByNumber,
    createLoanApplication,
    updateLoanApplication,
    updateLoanApplicationStatus,
    deleteLoanApplication
} from "../controllers/loanApplicationController.js";


import { authenticateToken } from "../../../middleware/auth.middleware.js";

const router =
    express.Router();

router.use(authenticateToken);



// ==========================================================
// GET ALL LOAN APPLICATIONS
// ==========================================================
//
// GET /api/v1/loan-applications
//
// ==========================================================

router.get(
    "/",
    getAllLoanApplications
);


// ==========================================================
// GET BY APPLICATION NUMBER
// IMPORTANT:
// Must come BEFORE /:id
// ==========================================================
//
// GET /api/v1/loan-applications/number/:applicationNumber
//
// ==========================================================

router.get(
    "/number/:applicationNumber",
    getLoanApplicationByNumber
);


// ==========================================================
// GET BY USER
// IMPORTANT:
// Must come BEFORE /:id
// ==========================================================
//
// GET /api/v1/loan-applications/user/:userId
//
// ==========================================================

router.get(
    "/user/:userId",
    getLoanApplicationsByUser
);


// ==========================================================
// GET BY ID
// ==========================================================
//
// GET /api/v1/loan-applications/:id
//
// ==========================================================

router.get(
    "/:id",
    getLoanApplicationById
);


// ==========================================================
// CREATE LOAN APPLICATION
// ==========================================================
//
// POST /api/v1/loan-applications
//
// ==========================================================

router.post(
    "/",
    createLoanApplication
);


// ==========================================================
// UPDATE LOAN APPLICATION
// ==========================================================
//
// PUT /api/v1/loan-applications/:id
//
// ==========================================================

router.put(
    "/:id",
    updateLoanApplication
);


// ==========================================================
// UPDATE LOAN APPLICATION STATUS
// ==========================================================
//
// PATCH /api/v1/loan-applications/:id/status
//
// ==========================================================

router.patch(
    "/:id/status",
    updateLoanApplicationStatus
);


// ==========================================================
// DELETE LOAN APPLICATION
// ==========================================================
//
// DELETE /api/v1/loan-applications/:id
//
// ==========================================================

router.delete(
    "/:id",
    deleteLoanApplication
);


// ==========================================================
// EXPORT ROUTER
// ==========================================================

export default router;

