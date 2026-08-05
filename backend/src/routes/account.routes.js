/**
 * ==========================================================
 * FINVERSE AI
 * Account Routes
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

const router = Router();

/* ==========================================================
   Create Account
========================================================== */

router.post("/", createAccount);

/* ==========================================================
   Get All Accounts
========================================================== */

router.get("/", getAccounts);

/* ==========================================================
   Get Account By Id
========================================================== */

router.get("/:id", getAccountById);

/* ==========================================================
   Update Account
========================================================== */

router.put("/:id", updateAccount);

/* ==========================================================
   Delete Account
========================================================== */

router.delete("/:id", deleteAccount);

export default router;