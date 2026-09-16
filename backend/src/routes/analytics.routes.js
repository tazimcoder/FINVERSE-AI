/**
 * ==========================================================
 * FINVERSE AI
 * Analytics Routes
 * ==========================================================
 */

import { Router } from "express";

import {
    getAnalytics,
} from "../controllers/analytics.controller.js";

import {
    authenticateToken,
} from "../middleware/auth.middleware.js";


const router = Router();


/* ==========================================================
   Get Analytics
========================================================== */

router.get(
    "/",
    authenticateToken,
    getAnalytics
);


export default router;