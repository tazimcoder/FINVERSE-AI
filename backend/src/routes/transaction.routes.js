/**
 * ==========================================================
 * FINVERSE AI
 * Transaction Routes
 * ==========================================================
 */

import { Router } from "express";

import {

    createTransaction,

    getTransactions,

    getTransactionById,

    updateTransaction,

    deleteTransaction,

} from "../controllers/transaction.controller.js";

const router = Router();

/* ==========================================================
   Create Transaction
========================================================== */

router.post("/", createTransaction);

/* ==========================================================
   Get All Transactions
========================================================== */

router.get("/", getTransactions);

/* ==========================================================
   Get Transaction By Id
========================================================== */

router.get("/:id", getTransactionById);

/* ==========================================================
   Update Transaction
========================================================== */

router.put("/:id", updateTransaction);

/* ==========================================================
   Delete Transaction
========================================================== */

router.delete("/:id", deleteTransaction);

export default router;