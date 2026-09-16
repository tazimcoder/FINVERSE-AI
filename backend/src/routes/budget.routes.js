/**
 * ==========================================================
 * FINVERSE AI
 * Budget Routes
 * ==========================================================
 */

import express from "express";

import {
    createBudget,
    getBudgets,
    getBudgetById,
    updateBudget,
    deleteBudget,
} from "../controllers/budget.controller.js";

import {
    authenticateToken,
} from "../middleware/auth.middleware.js";


const router = express.Router();


/* ==========================================================
   Budget Routes
   All Budget routes require authentication
========================================================== */

router.post(
    "/",
    authenticateToken,
    createBudget
);

router.get(
    "/",
    authenticateToken,
    getBudgets
);

router.get(
    "/:id",
    authenticateToken,
    getBudgetById
);

router.put(
    "/:id",
    authenticateToken,
    updateBudget
);

router.delete(
    "/:id",
    authenticateToken,
    deleteBudget
);


export default router;