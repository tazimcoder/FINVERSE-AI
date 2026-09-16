/**
 * ==========================================================
 * FINVERSE AI
 * Dashboard Routes
 * ==========================================================
 *
 * Base URL:
 *
 * /api/v1/dashboard
 *
 * ==========================================================
 */

import { Router } from "express";

import {
   getDashboardSummary,
} from "../controllers/dashboard.controller.js";

import {
   authenticateToken,
} from "../middleware/auth.middleware.js";

const router = Router();

/**
 * ==========================================================
 * GET DASHBOARD
 * ==========================================================
 *
 * GET /api/v1/dashboard
 *
 * Authentication Required
 *
 * ==========================================================
 */

router.get(
   "/",
   authenticateToken,
   getDashboardSummary
);

export default router;