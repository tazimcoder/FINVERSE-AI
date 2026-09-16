/**
 * ==========================================================
 * FINVERSE AI
 * AI Routes
 * ==========================================================
 */

import { Router } from "express";

import {

    sendMessage,

} from "../controllers/ai.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

/* ==========================================================
   Send Message
========================================================== */

router.post(

    "/chat",

    authenticateToken,

    sendMessage

);


export default router;