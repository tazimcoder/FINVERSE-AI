/**
 * ==========================================================
 * FINVERSE AI
 * Loan Document Routes
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/routes/loanDocumentRoutes.js
 *
 * Responsibility:
 *
 * - Define Loan Document API endpoints
 * - Connect routes with Loan Document Controller
 *
 * Database Table:
 * loan_documents
 *
 * ==========================================================
 */

import express from "express";

import {
    getAllLoanDocuments,
    getLoanDocumentById,
    getLoanDocumentsByApplication,
    getLoanDocumentsByLoan,
    getLoanDocumentsByUser,
    createLoanDocument,
    updateLoanDocument,
    updateLoanDocumentVerificationStatus,
    deleteLoanDocument
} from "../controllers/loanDocumentController.js";


const router =
    express.Router();


// ==========================================================
// GET ALL LOAN DOCUMENTS
// ==========================================================
//
// GET
// /api/v1/loan-documents
//
// ==========================================================

router.get(
    "/",
    getAllLoanDocuments
);


// ==========================================================
// GET DOCUMENTS BY LOAN APPLICATION
// ==========================================================
//
// GET
// /api/v1/loan-documents/application/:applicationId
//
// ==========================================================

router.get(
    "/application/:applicationId",
    getLoanDocumentsByApplication
);


// ==========================================================
// GET DOCUMENTS BY LOAN
// ==========================================================
//
// GET
// /api/v1/loan-documents/loan/:loanId
//
// ==========================================================

router.get(
    "/loan/:loanId",
    getLoanDocumentsByLoan
);


// ==========================================================
// GET DOCUMENTS BY USER
// ==========================================================
//
// GET
// /api/v1/loan-documents/user/:userId
//
// ==========================================================

router.get(
    "/user/:userId",
    getLoanDocumentsByUser
);


// ==========================================================
// GET LOAN DOCUMENT BY ID
// ==========================================================
//
// GET
// /api/v1/loan-documents/:id
//
// ==========================================================

router.get(
    "/:id",
    getLoanDocumentById
);


// ==========================================================
// CREATE LOAN DOCUMENT
// ==========================================================
//
// POST
// /api/v1/loan-documents
//
// ==========================================================

router.post(
    "/",
    createLoanDocument
);


// ==========================================================
// UPDATE LOAN DOCUMENT
// ==========================================================
//
// PUT
// /api/v1/loan-documents/:id
//
// ==========================================================

router.put(
    "/:id",
    updateLoanDocument
);


// ==========================================================
// UPDATE DOCUMENT VERIFICATION STATUS
// ==========================================================
//
// PATCH
// /api/v1/loan-documents/:id/verification-status
//
// Body:
//
// {
//     "verification_status": "VERIFIED",
//     "verified_by_user_id": 3
// }
//
// OR
//
// {
//     "verification_status": "REJECTED",
//     "rejection_reason": "Document is not valid",
//     "verified_by_user_id": 3
// }
//
// ==========================================================

router.patch(
    "/:id/verification-status",
    updateLoanDocumentVerificationStatus
);


// ==========================================================
// DELETE LOAN DOCUMENT
// ==========================================================
//
// DELETE
// /api/v1/loan-documents/:id
//
// ==========================================================

router.delete(
    "/:id",
    deleteLoanDocument
);


// ==========================================================
// EXPORT ROUTER
// ==========================================================

export default router;

