/**
 * ==========================================================
 * FINVERSE AI
 * Dashboard Routes
 * ==========================================================
 */

import { Router } from "express";
import { getDashboardSummary } from "../controllers/dashboard.controller.js";

const router = Router();

/* ==========================================================
   Dashboard Summary
========================================================== */

router.get("/", getDashboardSummary);

export default router;