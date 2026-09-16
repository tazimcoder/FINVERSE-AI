/**
 * ==========================================================
 * FINVERSE AI
 * Loan Product Routes
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/routes/loanProductRoutes.js
 *
 * Responsibility:
 *
 * - Define Loan Product API endpoints
 * - Connect routes with Loan Product Controller
 *
 * ==========================================================
 */

import express from "express";

import {
    getAllProducts,
    getActiveProducts,
    getProductById,
    getProductByCode,
    createProduct,
    updateProduct,
    updateProductStatus,
    deleteProduct
} from "../controllers/loanProductController.js";


// ==========================================================
// Router
// ==========================================================

const router = express.Router();


// ==========================================================
// GET - All Loan Products
// ==========================================================

router.get(
    "/",
    getAllProducts
);


// ==========================================================
// GET - Active Loan Products
// ==========================================================

router.get(
    "/active",
    getActiveProducts
);


// ==========================================================
// GET - Loan Product By Code
// ==========================================================

router.get(
    "/code/:code",
    getProductByCode
);


// ==========================================================
// GET - Loan Product By ID
// ==========================================================

router.get(
    "/:id",
    getProductById
);


// ==========================================================
// POST - Create Loan Product
// ==========================================================

router.post(
    "/",
    createProduct
);


// ==========================================================
// PUT - Update Loan Product
// ==========================================================

router.put(
    "/:id",
    updateProduct
);


// ==========================================================
// PATCH - Update Loan Product Status
// ==========================================================

router.patch(
    "/:id/status",
    updateProductStatus
);


// ==========================================================
// DELETE - Delete Loan Product
// ==========================================================

router.delete(
    "/:id",
    deleteProduct
);


// ==========================================================
// Export Router
// ==========================================================

export default router;