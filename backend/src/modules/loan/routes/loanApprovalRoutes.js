/**
 * ==========================================================
 * FINVERSE AI
 * Loan Approval Routes
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/routes/loanApprovalRoutes.js
 *
 * Responsibility:
 *
 * - Define loan approval API endpoints
 * - Convert approved loan applications into loans
 *
 * ==========================================================
 */

import express from "express";

import {
    approveLoanApplication
} from "../controllers/loanApprovalController.js";


import { authenticateToken } from "../../../middleware/auth.middleware.js";

const router =
    express.Router();

router.use(authenticateToken);



// ==========================================================
// Create Loan From Approved Application
// ==========================================================
//
// POST
// /api/v1/loan-approvals/:applicationId
//
// Example:
//
// POST
// /api/v1/loan-approvals/5
//
// ==========================================================

router.post(
    "/:applicationId",
    approveLoanApplication
);


// ==========================================================
// Export Router
// ==========================================================

export default router;

