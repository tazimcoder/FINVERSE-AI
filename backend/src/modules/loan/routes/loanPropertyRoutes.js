/**
 * ==========================================================
 * FINVERSE AI
 * Loan Property Routes
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/routes/loanPropertyRoutes.js
 *
 * Responsibility:
 *
 * - Define Loan Property API endpoints
 * - Connect routes with Loan Property Controller
 * - Keep route layer modular
 *
 * ==========================================================
 */

import express from "express";

import {
    getAllLoanProperties,
    getLoanPropertyById,
    getLoanPropertiesByApplicationId,
    getLoanPropertiesByUserId,
    createLoanProperty,
    updateLoanProperty,
    updateLoanPropertyValuationStatus,
    updateLoanPropertyVerificationStatus,
    deleteLoanProperty
} from "../controllers/loanPropertyController.js";

import {
    validateLoanPropertyId,
    validateLoanPropertyCreate,
    validateLoanPropertyUpdate,
    validateLoanPropertyStatus
} from "../validators/loanPropertyValidator.js";


const router = express.Router();


// ==========================================================
// GET ALL LOAN PROPERTIES
// ==========================================================
//
// GET
// /api/v1/loan-properties
//
// ==========================================================

router.get(
    "/",
    getAllLoanProperties
);


// ==========================================================
// GET PROPERTIES BY APPLICATION
// ==========================================================
//
// GET
// /api/v1/loan-properties/application/:applicationId
//
// ==========================================================

router.get(
    "/application/:applicationId",
    getLoanPropertiesByApplicationId
);


// ==========================================================
// GET PROPERTIES BY USER
// ==========================================================
//
// GET
// /api/v1/loan-properties/user/:userId
//
// ==========================================================

router.get(
    "/user/:userId",
    getLoanPropertiesByUserId
);


// ==========================================================
// GET PROPERTY BY ID
// ==========================================================
//
// GET
// /api/v1/loan-properties/:id
//
// IMPORTANT:
// Specific routes must remain above this route.
//
// ==========================================================

router.get(
    "/:id",
    validateLoanPropertyId,
    getLoanPropertyById
);


// ==========================================================
// CREATE LOAN PROPERTY
// ==========================================================
//
// POST
// /api/v1/loan-properties
//
// ==========================================================

router.post(
    "/",
    validateLoanPropertyCreate,
    createLoanProperty
);


// ==========================================================
// UPDATE LOAN PROPERTY
// ==========================================================
//
// PUT
// /api/v1/loan-properties/:id
//
// ==========================================================

router.put(
    "/:id",
    validateLoanPropertyId,
    validateLoanPropertyUpdate,
    updateLoanProperty
);


// ==========================================================
// UPDATE PROPERTY VALUATION STATUS
// ==========================================================
//
// PATCH
// /api/v1/loan-properties/:id/valuation-status
//
// ==========================================================

router.patch(
    "/:id/valuation-status",
    validateLoanPropertyId,
    validateLoanPropertyStatus,
    updateLoanPropertyValuationStatus
);


// ==========================================================
// UPDATE PROPERTY VERIFICATION STATUS
// ==========================================================
//
// PATCH
// /api/v1/loan-properties/:id/verification-status
//
// ==========================================================

router.patch(
    "/:id/verification-status",
    validateLoanPropertyId,
    validateLoanPropertyStatus,
    updateLoanPropertyVerificationStatus
);


// ==========================================================
// DELETE LOAN PROPERTY
// ==========================================================
//
// DELETE
// /api/v1/loan-properties/:id
//
// ==========================================================

router.delete(
    "/:id",
    validateLoanPropertyId,
    deleteLoanProperty
);


// ==========================================================
// EXPORT ROUTER
// ==========================================================

export default router;

