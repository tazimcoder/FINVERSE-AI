/**
 * ==========================================================
 * FINVERSE AI
 * Loan Guarantor Routes
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/routes/loanGuarantorRoutes.js
 *
 * Responsibility:
 *
 * - Define Loan Guarantor API endpoints
 * - Connect routes with Loan Guarantor Controller
 * - Apply request validation middleware
 * - Keep route layer clean and modular
 *
 * Database Table:
 * loan_guarantors
 *
 * ==========================================================
 */

import express from "express";

import {
    getAllLoanGuarantors,
    getLoanGuarantorById,
    getLoanGuarantorsByApplicationId,
    getLoanGuarantorsByUserId,
    getLoanGuarantorsByStatus,
    getLoanGuarantorsByVerificationStatus,
    getLoanGuarantorsByConsentStatus,
    createLoanGuarantor,
    updateLoanGuarantor,
    updateLoanGuarantorStatus,
    updateLoanGuarantorVerificationStatus,
    updateLoanGuarantorConsentStatus,
    deleteLoanGuarantor
} from "../controllers/loanGuarantorController.js";

import {
    validateLoanGuarantorId,
    validateLoanGuarantorApplicationId,
    validateLoanGuarantorUserId,
    validateLoanGuarantorStatus,
    validateLoanGuarantorVerificationStatus,
    validateLoanGuarantorConsentStatus,
    validateLoanGuarantorCreate,
    validateLoanGuarantorUpdate
} from "../validators/loanGuarantorValidator.js";


const router = express.Router();


// ==========================================================
// GET ALL LOAN GUARANTORS
// ==========================================================
//
// GET
// /api/v1/loan-guarantors
//
// ==========================================================

router.get(
    "/",
    getAllLoanGuarantors
);


// ==========================================================
// GET GUARANTORS BY APPLICATION
// ==========================================================
//
// GET
// /api/v1/loan-guarantors/application/:applicationId
//
// ==========================================================

router.get(
    "/application/:applicationId",
    validateLoanGuarantorApplicationId,
    getLoanGuarantorsByApplicationId
);


// ==========================================================
// GET GUARANTORS BY USER
// ==========================================================
//
// GET
// /api/v1/loan-guarantors/user/:userId
//
// ==========================================================

router.get(
    "/user/:userId",
    validateLoanGuarantorUserId,
    getLoanGuarantorsByUserId
);


// ==========================================================
// GET GUARANTORS BY GUARANTOR STATUS
// ==========================================================
//
// GET
// /api/v1/loan-guarantors/status/:status
//
// ==========================================================

router.get(
    "/status/:status",
    validateLoanGuarantorStatus,
    getLoanGuarantorsByStatus
);


// ==========================================================
// GET GUARANTORS BY VERIFICATION STATUS
// ==========================================================
//
// GET
// /api/v1/loan-guarantors/verification-status/:status
//
// ==========================================================

router.get(
    "/verification-status/:status",
    validateLoanGuarantorVerificationStatus,
    getLoanGuarantorsByVerificationStatus
);


// ==========================================================
// GET GUARANTORS BY CONSENT STATUS
// ==========================================================
//
// GET
// /api/v1/loan-guarantors/consent-status/:status
//
// ==========================================================

router.get(
    "/consent-status/:status",
    validateLoanGuarantorConsentStatus,
    getLoanGuarantorsByConsentStatus
);


// ==========================================================
// GET GUARANTOR BY ID
// ==========================================================
//
// GET
// /api/v1/loan-guarantors/:id
//
// IMPORTANT:
// Specific routes must remain above this route.
// Otherwise "application", "user", "status", etc.
// could be interpreted as an ID.
//
// ==========================================================

router.get(
    "/:id",
    validateLoanGuarantorId,
    getLoanGuarantorById
);


// ==========================================================
// CREATE LOAN GUARANTOR
// ==========================================================
//
// POST
// /api/v1/loan-guarantors
//
// ==========================================================

router.post(
    "/",
    validateLoanGuarantorCreate,
    createLoanGuarantor
);


// ==========================================================
// UPDATE LOAN GUARANTOR
// ==========================================================
//
// PUT
// /api/v1/loan-guarantors/:id
//
// ==========================================================

router.put(
    "/:id",
    validateLoanGuarantorId,
    validateLoanGuarantorUpdate,
    updateLoanGuarantor
);


// ==========================================================
// UPDATE GUARANTOR STATUS
// ==========================================================
//
// PATCH
// /api/v1/loan-guarantors/:id/status
//
// ==========================================================

router.patch(
    "/:id/status",
    validateLoanGuarantorId,
    validateLoanGuarantorStatus,
    updateLoanGuarantorStatus
);


// ==========================================================
// UPDATE VERIFICATION STATUS
// ==========================================================
//
// PATCH
// /api/v1/loan-guarantors/:id/verification-status
//
// ==========================================================

router.patch(
    "/:id/verification-status",
    validateLoanGuarantorId,
    validateLoanGuarantorVerificationStatus,
    updateLoanGuarantorVerificationStatus
);


// ==========================================================
// UPDATE CONSENT STATUS
// ==========================================================
//
// PATCH
// /api/v1/loan-guarantors/:id/consent-status
//
// ==========================================================

router.patch(
    "/:id/consent-status",
    validateLoanGuarantorId,
    validateLoanGuarantorConsentStatus,
    updateLoanGuarantorConsentStatus
);


// ==========================================================
// DELETE LOAN GUARANTOR
// ==========================================================
//
// DELETE
// /api/v1/loan-guarantors/:id
//
// ==========================================================

router.delete(
    "/:id",
    validateLoanGuarantorId,
    deleteLoanGuarantor
);


// ==========================================================
// EXPORT ROUTER
// ==========================================================

export default router;

