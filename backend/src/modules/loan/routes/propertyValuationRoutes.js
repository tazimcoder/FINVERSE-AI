/**
 * ==========================================================
 * FINVERSE AI
 * Property Valuation Routes
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/routes/propertyValuationRoutes.js
 *
 * Responsibility:
 *
 * - Define Property Valuation API endpoints
 * - Connect validators with controllers
 * - Keep dynamic ID routes at the end
 * - Maintain future-ready modular structure
 *
 * ==========================================================
 */

import express from "express";

import {
    createPropertyValuation,

    getAllPropertyValuations,

    getPropertyValuationById,

    getPropertyValuationsByApplicationId,

    getLatestPropertyValuationByApplicationId,

    getPropertyValuationsByUserId,

    getPropertyValuationsByStatus,

    getPropertyValuationsByPropertyType,

    getPropertyValuationsByLocation,

    updatePropertyValuation,

    updatePropertyValuationStatus,

    deletePropertyValuation,

} from "../controllers/propertyValuationController.js";

import {
    validateCreatePropertyValuation,

    validatePropertyValuationId,

    validatePropertyValuationApplicationId,

    validatePropertyValuationUserId,

    validatePropertyValuationStatus,

    validatePropertyValuationPropertyType,

    validatePropertyValuationLocation,

    validateUpdatePropertyValuation,

    validateUpdatePropertyValuationStatus,

} from "../validators/propertyValuationValidator.js";


// ==========================================================
// ROUTER
// ==========================================================

const router = express.Router();


// ==========================================================
// CREATE PROPERTY VALUATION
// ==========================================================
//
// POST /api/v1/property-valuations
//
// ==========================================================

router.post(
    "/",
    validateCreatePropertyValuation,
    createPropertyValuation
);


// ==========================================================
// GET ALL PROPERTY VALUATIONS
// ==========================================================
//
// GET /api/v1/property-valuations
//
// ==========================================================

router.get(
    "/",
    getAllPropertyValuations
);


// ==========================================================
// GET PROPERTY VALUATIONS BY APPLICATION
// ==========================================================
//
// GET /api/v1/property-valuations/application/:applicationId
//
// ==========================================================

router.get(
    "/application/:applicationId",
    validatePropertyValuationApplicationId,
    getPropertyValuationsByApplicationId
);


// ==========================================================
// GET LATEST PROPERTY VALUATION BY APPLICATION
// ==========================================================
//
// IMPORTANT:
// This route must be registered before any generic :id route.
//
// GET /api/v1/property-valuations/application/:applicationId/latest
//
// ==========================================================

router.get(
    "/application/:applicationId/latest",
    validatePropertyValuationApplicationId,
    getLatestPropertyValuationByApplicationId
);


// ==========================================================
// GET PROPERTY VALUATIONS BY USER
// ==========================================================
//
// GET /api/v1/property-valuations/user/:userId
//
// ==========================================================

router.get(
    "/user/:userId",
    validatePropertyValuationUserId,
    getPropertyValuationsByUserId
);


// ==========================================================
// GET PROPERTY VALUATIONS BY STATUS
// ==========================================================
//
// GET /api/v1/property-valuations/status/:status
//
// ==========================================================

router.get(
    "/status/:status",
    validatePropertyValuationStatus,
    getPropertyValuationsByStatus
);


// ==========================================================
// GET PROPERTY VALUATIONS BY PROPERTY TYPE
// ==========================================================
//
// GET /api/v1/property-valuations/property-type/:propertyType
//
// ==========================================================

router.get(
    "/property-type/:propertyType",
    validatePropertyValuationPropertyType,
    getPropertyValuationsByPropertyType
);


// ==========================================================
// GET PROPERTY VALUATIONS BY LOCATION
// ==========================================================
//
// GET /api/v1/property-valuations/location
//
// Query parameters:
//
// ?city=Delhi
// ?state=Delhi
// ?postalCode=110001
//
// ==========================================================

router.get(
    "/location",
    validatePropertyValuationLocation,
    getPropertyValuationsByLocation
);


// ==========================================================
// UPDATE PROPERTY VALUATION STATUS
// ==========================================================
//
// PATCH /api/v1/property-valuations/:id/status
//
// IMPORTANT:
// This route must remain before generic PUT/DELETE handling.
// ==========================================================

router.patch(
    "/:id/status",
    validatePropertyValuationId,
    validateUpdatePropertyValuationStatus,
    updatePropertyValuationStatus
);


// ==========================================================
// UPDATE PROPERTY VALUATION
// ==========================================================
//
// PUT /api/v1/property-valuations/:id
//
// ==========================================================

router.put(
    "/:id",
    validatePropertyValuationId,
    validateUpdatePropertyValuation,
    updatePropertyValuation
);


// ==========================================================
// GET PROPERTY VALUATION BY ID
// ==========================================================
//
// GET /api/v1/property-valuations/:id
//
// IMPORTANT:
// Generic :id route is kept near the end.
// ==========================================================

router.get(
    "/:id",
    validatePropertyValuationId,
    getPropertyValuationById
);


// ==========================================================
// DELETE PROPERTY VALUATION
// ==========================================================
//
// DELETE /api/v1/property-valuations/:id
//
// ==========================================================

router.delete(
    "/:id",
    validatePropertyValuationId,
    deletePropertyValuation
);


// ==========================================================
// EXPORT ROUTER
// ==========================================================

export default router;

