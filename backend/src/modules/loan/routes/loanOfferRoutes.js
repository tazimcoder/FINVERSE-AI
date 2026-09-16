/**
 * ==========================================================
 * FINVERSE AI
 * Loan Offer Routes
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/routes/loanOfferRoutes.js
 *
 * Responsibility:
 *
 * - Define Loan Offer API endpoints
 * - Connect routes with Loan Offer Controller
 *
 * Flow:
 *
 * REQUEST
 *   ↓
 * ROUTES
 *   ↓
 * CONTROLLER
 *   ↓
 * SERVICE
 *   ↓
 * MODEL
 *   ↓
 * MYSQL
 *
 * Base URL:
 *
 * /api/v1/loan-offers
 *
 * ==========================================================
 */

import express from "express";

import {
    getAllLoanOffersController,
    getLoanOfferByIdController,
    getLoanOffersByApplicationIdController,
    getLoanOffersByUserIdController,
    getLoanOffersByStatusController,
    createLoanOfferController,
    updateLoanOfferController,
    changeLoanOfferStatusController,
    acceptLoanOfferController,
    rejectLoanOfferController,
    withdrawLoanOfferController,
    expireLoanOfferController,
    deleteLoanOfferController
} from "../controllers/loanOfferController.js";


const router = express.Router();


// ==========================================================
// GET ALL LOAN OFFERS
// ==========================================================
//
// GET
// /api/v1/loan-offers
//
// ==========================================================

router.get(
    "/",
    getAllLoanOffersController
);


// ==========================================================
// GET OFFERS BY APPLICATION
// ==========================================================
//
// IMPORTANT:
// This route must come BEFORE /:id
//
// GET
// /api/v1/loan-offers/application/:applicationId
//
// ==========================================================

router.get(
    "/application/:applicationId",
    getLoanOffersByApplicationIdController
);


// ==========================================================
// GET OFFERS BY USER
// ==========================================================
//
// GET
// /api/v1/loan-offers/user/:userId
//
// ==========================================================

router.get(
    "/user/:userId",
    getLoanOffersByUserIdController
);


// ==========================================================
// GET OFFERS BY STATUS
// ==========================================================
//
// GET
// /api/v1/loan-offers/status/:status
//
// ==========================================================

router.get(
    "/status/:status",
    getLoanOffersByStatusController
);


// ==========================================================
// ACCEPT LOAN OFFER
// ==========================================================
//
// PATCH
// /api/v1/loan-offers/:id/accept
//
// ==========================================================

router.patch(
    "/:id/accept",
    acceptLoanOfferController
);


// ==========================================================
// REJECT LOAN OFFER
// ==========================================================
//
// PATCH
// /api/v1/loan-offers/:id/reject
//
// Body:
//
// {
//     "rejection_reason": "Customer rejected the offer."
// }
//
// ==========================================================

router.patch(
    "/:id/reject",
    rejectLoanOfferController
);


// ==========================================================
// WITHDRAW LOAN OFFER
// ==========================================================
//
// PATCH
// /api/v1/loan-offers/:id/withdraw
//
// Body:
//
// {
//     "reason": "Offer withdrawn by lender."
// }
//
// ==========================================================

router.patch(
    "/:id/withdraw",
    withdrawLoanOfferController
);


// ==========================================================
// EXPIRE LOAN OFFER
// ==========================================================
//
// PATCH
// /api/v1/loan-offers/:id/expire
//
// ==========================================================

router.patch(
    "/:id/expire",
    expireLoanOfferController
);


// ==========================================================
// CHANGE LOAN OFFER STATUS
// ==========================================================
//
// PATCH
// /api/v1/loan-offers/:id/status
//
// Body:
//
// {
//     "status": "ACCEPTED",
//     "rejection_reason": null
// }
//
// ==========================================================

router.patch(
    "/:id/status",
    changeLoanOfferStatusController
);


// ==========================================================
// GET LOAN OFFER BY ID
// ==========================================================
//
// GET
// /api/v1/loan-offers/:id
//
// IMPORTANT:
// This route must remain AFTER
// all named parameter routes.
// 
// ==========================================================

router.get(
    "/:id",
    getLoanOfferByIdController
);


// ==========================================================
// CREATE LOAN OFFER
// ==========================================================
//
// POST
// /api/v1/loan-offers
//
// ==========================================================

router.post(
    "/",
    createLoanOfferController
);


// ==========================================================
// UPDATE LOAN OFFER
// ==========================================================
//
// PUT
// /api/v1/loan-offers/:id
//
// ==========================================================

router.put(
    "/:id",
    updateLoanOfferController
);


// ==========================================================
// DELETE LOAN OFFER
// ==========================================================
//
// DELETE
// /api/v1/loan-offers/:id
//
// ==========================================================

router.delete(
    "/:id",
    deleteLoanOfferController
);


// ==========================================================
// EXPORT ROUTER
// ==========================================================

export default router;