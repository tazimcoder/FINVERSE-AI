/**
 * ==========================================================
 * FINVERSE AI
 * User Features Routes
 * ==========================================================
 */

import express from "express";
import {
    getUserKycController,
    getUserCibilController,
    getUserEmisController,
    payEmiController,
    uploadDocumentController,
    getUserDocumentsController,
    getUserNotificationsController,
    markNotificationsReadController,
    getUserVaultsController,
    createVaultController,
    getUserRewardsController,
    getUserVirtualCardsController,
    loanForeclosureController,
    loanTopUpController,
    estimatePropertyValuationController,
    getUserPropertyValuationsController
} from "../controllers/userFeatures.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticateToken);

// KYC & Profile status
router.get("/kyc", getUserKycController);

// CIBIL Credit Score
router.get("/cibil", getUserCibilController);

// EMI Repayments
router.get("/emis", getUserEmisController);
router.post("/emis/pay", payEmiController);

// Document Hub & OCR
router.get("/documents", getUserDocumentsController);
router.post("/documents/ocr", uploadDocumentController);

// Real-Time User Account Notifications
router.get("/notifications", getUserNotificationsController);
router.patch("/notifications/read", markNotificationsReadController);

// Smart Savings Vaults
router.get("/vaults", getUserVaultsController);
router.post("/vaults", createVaultController);

// FinCoins & Rewards Hub
router.get("/rewards", getUserRewardsController);

// Virtual Security Cards
router.get("/virtual-cards", getUserVirtualCardsController);

// Loan Foreclosure & Pre-Payment
router.post("/loans/foreclosure", loanForeclosureController);

// Loan Top-Up Engine
router.post("/loans/top-up", loanTopUpController);

// FinverseMap Property Valuation
router.get("/property-valuation", getUserPropertyValuationsController);
router.post("/property-valuation/estimate", estimatePropertyValuationController);

export default router;


