/**
 * ==========================================================
 * FINVERSE AI
 * Loan Collateral Routes
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/routes/loanCollateralRoutes.js
 *
 * Responsibility:
 *
 * - Define Loan Collateral API endpoints
 * - Connect routes with Loan Collateral Controller
 * - Keep route layer clean and modular
 * - Avoid controller/service export mismatches
 *
 * ==========================================================
 */

import express from "express";

import {
    getAllLoanCollaterals,
    getLoanCollateralById,
    getLoanCollateralsByApplicationId,
    getLoanCollateralsByLoanId,
    getLoanCollateralsByUserId,
    createLoanCollateral,
    updateLoanCollateral,
    updateLoanCollateralValuationStatus,
    updateLoanCollateralVerificationStatus,
    updateLoanCollateralLegalStatus,
    updateLoanCollateralLienStatus,
    updateLoanCollateralReleaseStatus,
    deleteLoanCollateral
} from "../controllers/loanCollateralController.js";


import { authenticateToken } from "../../../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticateToken);



// ==========================================================
// GET ALL LOAN COLLATERALS
// ==========================================================
//
// GET
// /api/v1/loan-collaterals
//
// ==========================================================

router.get(
    "/",
    getAllLoanCollaterals
);


// ==========================================================
// GET COLLATERALS BY APPLICATION
// ==========================================================
//
// GET
// /api/v1/loan-collaterals/application/:applicationId
//
// ==========================================================

router.get(
    "/application/:applicationId",
    getLoanCollateralsByApplicationId
);


// ==========================================================
// GET COLLATERALS BY LOAN
// ==========================================================
//
// GET
// /api/v1/loan-collaterals/loan/:loanId
//
// ==========================================================

router.get(
    "/loan/:loanId",
    getLoanCollateralsByLoanId
);


// ==========================================================
// GET COLLATERALS BY USER
// ==========================================================
//
// GET
// /api/v1/loan-collaterals/user/:userId
//
// ==========================================================

router.get(
    "/user/:userId",
    getLoanCollateralsByUserId
);


// ==========================================================
// GET COLLATERAL BY ID
// ==========================================================
//
// GET
// /api/v1/loan-collaterals/:id
//
// IMPORTANT:
// This route remains after all specific parameter routes.
//
// ==========================================================

router.get(
    "/:id",
    getLoanCollateralById
);


// ==========================================================
// CREATE LOAN COLLATERAL
// ==========================================================
//
// POST
// /api/v1/loan-collaterals
//
// ==========================================================

router.post(
    "/",
    createLoanCollateral
);


// ==========================================================
// UPDATE LOAN COLLATERAL
// ==========================================================
//
// PUT
// /api/v1/loan-collaterals/:id
//
// ==========================================================

router.put(
    "/:id",
    updateLoanCollateral
);


// ==========================================================
// UPDATE VALUATION STATUS
// ==========================================================
//
// PATCH
// /api/v1/loan-collaterals/:id/valuation-status
//
// Body:
//
// {
//     "status": "COMPLETED"
// }
//
// ==========================================================

router.patch(
    "/:id/valuation-status",
    updateLoanCollateralValuationStatus
);


// ==========================================================
// UPDATE VERIFICATION STATUS
// ==========================================================
//
// PATCH
// /api/v1/loan-collaterals/:id/verification-status
//
// Body:
//
// {
//     "status": "VERIFIED"
// }
//
// ==========================================================

router.patch(
    "/:id/verification-status",
    updateLoanCollateralVerificationStatus
);


// ==========================================================
// UPDATE LEGAL STATUS
// ==========================================================
//
// PATCH
// /api/v1/loan-collaterals/:id/legal-status
//
// Body:
//
// {
//     "status": "CLEAR"
// }
//
// ==========================================================

router.patch(
    "/:id/legal-status",
    updateLoanCollateralLegalStatus
);


// ==========================================================
// UPDATE LIEN STATUS
// ==========================================================
//
// PATCH
// /api/v1/loan-collaterals/:id/lien-status
//
// Body:
//
// {
//     "status": "CREATED"
// }
//
// ==========================================================

router.patch(
    "/:id/lien-status",
    updateLoanCollateralLienStatus
);


// ==========================================================
// UPDATE RELEASE STATUS
// ==========================================================
//
// PATCH
// /api/v1/loan-collaterals/:id/release-status
//
// Body:
//
// {
//     "status": "RELEASED"
// }
//
// ==========================================================

router.patch(
    "/:id/release-status",
    updateLoanCollateralReleaseStatus
);


// ==========================================================
// DELETE LOAN COLLATERAL
// ==========================================================
//
// DELETE
// /api/v1/loan-collaterals/:id
//
// ==========================================================

router.delete(
    "/:id",
    deleteLoanCollateral
);


// ==========================================================
// EXPORT ROUTER
// ==========================================================

export default router;

