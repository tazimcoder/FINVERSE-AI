/**
 * ==========================================================
 * FINVERSE AI
 * Loan Applicant Profile Routes
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/routes/loanApplicantProfileRoutes.js
 *
 * Responsibility:
 *
 * - Define Loan Applicant Profile API endpoints
 * - Connect routes with controller functions
 *
 * ==========================================================
 */

import express from "express";

import {
    getAllLoanApplicantProfiles,
    getLoanApplicantProfileById,
    getLoanApplicantProfilesByApplicationId,
    getLoanApplicantProfilesByUserId,
    createLoanApplicantProfile,
    updateLoanApplicantProfile,
    deleteLoanApplicantProfile
} from "../controllers/loanApplicantProfileController.js";


import { authenticateToken } from "../../../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticateToken);



// ==========================================================
// GET ALL APPLICANT PROFILES
// ==========================================================
//
// GET /api/v1/loan-applicant-profiles
//
// ==========================================================

router.get(
    "/",
    getAllLoanApplicantProfiles
);


// ==========================================================
// GET APPLICANT PROFILES BY LOAN APPLICATION
// ==========================================================
//
// GET /api/v1/loan-applicant-profiles/application/:applicationId
//
// IMPORTANT:
// This route must come before /:id
// to avoid "application" being treated as an ID.
//
// ==========================================================

router.get(
    "/application/:applicationId",
    getLoanApplicantProfilesByApplicationId
);


// ==========================================================
// GET APPLICANT PROFILES BY USER
// ==========================================================
//
// GET /api/v1/loan-applicant-profiles/user/:userId
//
// ==========================================================

router.get(
    "/user/:userId",
    getLoanApplicantProfilesByUserId
);


// ==========================================================
// GET APPLICANT PROFILE BY ID
// ==========================================================
//
// GET /api/v1/loan-applicant-profiles/:id
//
// ==========================================================

router.get(
    "/:id",
    getLoanApplicantProfileById
);


// ==========================================================
// CREATE APPLICANT PROFILE
// ==========================================================
//
// POST /api/v1/loan-applicant-profiles
//
// ==========================================================

router.post(
    "/",
    createLoanApplicantProfile
);


// ==========================================================
// UPDATE APPLICANT PROFILE
// ==========================================================
//
// PUT /api/v1/loan-applicant-profiles/:id
//
// ==========================================================

router.put(
    "/:id",
    updateLoanApplicantProfile
);


// ==========================================================
// DELETE APPLICANT PROFILE
// ==========================================================
//
// DELETE /api/v1/loan-applicant-profiles/:id
//
// ==========================================================

router.delete(
    "/:id",
    deleteLoanApplicantProfile
);


// ==========================================================
// EXPORT ROUTER
// ==========================================================

export default router;

