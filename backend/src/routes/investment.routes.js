/**
 * ==========================================================
 * FINVERSE AI
 * Investment Routes
 * ==========================================================
 */

import express from "express";

import {
    createInvestment,
    getInvestments,
    getInvestment,
    updateInvestment,
    deleteInvestment,
    getInvestmentTypes,
    getPortfolioSummary,
    getPortfolioAllocation,
    getPortfolioGrowth,
} from "../controllers/investment.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Apply Authentication Middleware to All Investment Routes
router.use(authenticateToken);


/* ==========================================================
Investment Types
========================================================== */

router.get(
    "/types",
    getInvestmentTypes
);

/* ==========================================================
Portfolio Summary
========================================================== */

router.get(
    "/summary",
    getPortfolioSummary
);

/* ==========================================================
Portfolio Allocation
========================================================== */

router.get(
    "/allocation",
    getPortfolioAllocation
);

/* ==========================================================
Portfolio Growth
========================================================== */

router.get(
    "/growth",
    getPortfolioGrowth
);

/* ==========================================================
Investments
========================================================== */

router.get(
    "/",
    getInvestments
);

router.get(
    "/:id",
    getInvestment
);

router.post(
    "/",
    createInvestment
);

router.put(
    "/:id",
    updateInvestment
);

router.delete(
    "/:id",
    deleteInvestment
);

export default router;