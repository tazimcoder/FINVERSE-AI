/**
 * ==========================================================
 * FINVERSE AI
 * Authentication Routes
 * ==========================================================
 */

import express from "express";
import { login } from "../controllers/auth.controller.js";
const router = express.Router();

/* ----------------------------------------
   Login
---------------------------------------- */

router.post("/login", login);
export default router;




// $2b$10$KPhZWis/CYM2sF1HAvMSCeRCLHB9I6Y2wtiXAvmXCDKQRfX5hICZu