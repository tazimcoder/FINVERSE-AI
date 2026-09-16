/**
 * ==========================================================
 * FINVERSE AI
 * Account Routes
 * User-Specific & Secure
 * ==========================================================
 */

import { Router } from "express";

import {
   createAccount,
   getAccounts,
   getAccountById,
   updateAccount,
   deleteAccount,
} from "../controllers/account.controller.js";

import {
   authenticateToken,
} from "../middleware/auth.middleware.js";

const router = Router();


// ==========================================================
// All Account Routes Require Authentication
// ==========================================================

router.use(
   authenticateToken
);


// ==========================================================
// Create Account
// POST /api/v1/accounts
// ==========================================================

router.post(
   "/",
   createAccount
);


// ==========================================================
// Get My Accounts
// GET /api/v1/accounts
// ==========================================================

router.get(
   "/",
   getAccounts
);


// ==========================================================
// Get My Account By ID
// GET /api/v1/accounts/:id
// ==========================================================

router.get(
   "/:id",
   getAccountById
);


// ==========================================================
// Update My Account
// PUT /api/v1/accounts/:id
// ==========================================================

router.put(
   "/:id",
   updateAccount
);


// ==========================================================
// Delete My Account
// DELETE /api/v1/accounts/:id
// ==========================================================

router.delete(
   "/:id",
   deleteAccount
);


export default router;