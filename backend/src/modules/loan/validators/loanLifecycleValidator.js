/**
 * ==========================================================
 * FINVERSE AI
 * Loan Lifecycle Validator
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/validators/loanLifecycleValidator.js
 *
 * Responsibility:
 *
 * - Validate Loan Lifecycle API requests
 * - Validate application IDs
 * - Validate loan IDs
 * - Validate user IDs
 * - Validate lifecycle status filters
 * - Validate status-history related parameters
 * - Validate lifecycle query parameters
 *
 * Design:
 *
 * - Express-validator based
 * - Database-compatible
 * - Future-ready
 * - Reusable across lifecycle routes
 *
 * ==========================================================
 */

import {
    body,
    param,
    query,
} from "express-validator";


// ==========================================================
// ALLOWED STATUS VALUES
// ==========================================================
//
// IMPORTANT:
//
// Keep this list aligned with the actual status values used
// by the FINVERSE AI loan lifecycle / loan application flow.
//
// Additional statuses can be added later without changing
// the validator structure.
// ==========================================================

const ALLOWED_LOAN_LIFECYCLE_STATUSES = [

    "DRAFT",

    "SUBMITTED",

    "UNDER_REVIEW",

    "ELIGIBILITY_CHECK",

    "DOCUMENT_VERIFICATION",

    "VERIFICATION",

    "APPROVED",

    "REJECTED",

    "OFFERED",

    "ACCEPTED",

    "DISBURSEMENT_PENDING",

    "DISBURSED",

    "ACTIVE",

    "PARTIALLY_PAID",

    "PAID",

    "CLOSED",

    "CANCELLED",

    "DEFAULTED",

];


// ==========================================================
// COMMON ID VALIDATION
// ==========================================================

const positiveIntegerParam = (fieldName, label) => {

    return param(fieldName)
        .notEmpty()
        .withMessage(
            `${label} is required.`
        )
        .isInt({
            min: 1,
        })
        .withMessage(
            `${label} must be a valid positive integer.`
        )
        .toInt();

};


// ==========================================================
// APPLICATION ID PARAMETER
// ==========================================================

export const validateApplicationIdParam = [

    positiveIntegerParam(
        "applicationId",
        "Loan application ID"
    ),

];


// ==========================================================
// LOAN ID PARAMETER
// ==========================================================

export const validateLoanIdParam = [

    positiveIntegerParam(
        "loanId",
        "Loan ID"
    ),

];


// ==========================================================
// USER ID PARAMETER
// ==========================================================

export const validateUserIdParam = [

    positiveIntegerParam(
        "userId",
        "User ID"
    ),

];


// ==========================================================
// STATUS PARAMETER
// ==========================================================

export const validateStatusParam = [

    param("status")
        .trim()
        .notEmpty()
        .withMessage(
            "Status is required."
        )
        .isLength({
            min: 1,
            max: 100,
        })
        .withMessage(
            "Status must not exceed 100 characters."
        )
        .customSanitizer(
            (value) =>
                String(value)
                    .trim()
                    .toUpperCase()
        )
        .isIn(
            ALLOWED_LOAN_LIFECYCLE_STATUSES
        )
        .withMessage(
            "Invalid loan lifecycle status."
        ),

];


// ==========================================================
// CREATE / RECORD LIFECYCLE TRANSITION
// ==========================================================
//
// This validator is intentionally compatible with the
// existing loan_status_history structure.
//
// ==========================================================

export const validateCreateLifecycleTransition = [

    body("loanApplicationId")
        .optional({
            nullable: true,
        })
        .isInt({
            min: 1,
        })
        .withMessage(
            "Loan application ID must be a valid positive integer."
        )
        .toInt(),

    body("loanId")
        .optional({
            nullable: true,
        })
        .isInt({
            min: 1,
        })
        .withMessage(
            "Loan ID must be a valid positive integer."
        )
        .toInt(),

    body("oldStatus")
        .optional({
            nullable: true,
        })
        .trim()
        .isLength({
            max: 100,
        })
        .withMessage(
            "Old status must not exceed 100 characters."
        )
        .customSanitizer(
            (value) => {

                if (
                    value === undefined ||
                    value === null ||
                    value === ""
                ) {
                    return null;
                }

                return String(value)
                    .trim()
                    .toUpperCase();

            }
        ),

    body("newStatus")
        .trim()
        .notEmpty()
        .withMessage(
            "New status is required."
        )
        .isLength({
            min: 1,
            max: 100,
        })
        .withMessage(
            "New status must not exceed 100 characters."
        )
        .customSanitizer(
            (value) =>
                String(value)
                    .trim()
                    .toUpperCase()
        )
        .isIn(
            ALLOWED_LOAN_LIFECYCLE_STATUSES
        )
        .withMessage(
            "Invalid new lifecycle status."
        ),

    body("changedByUserId")
        .optional({
            nullable: true,
        })
        .isInt({
            min: 1,
        })
        .withMessage(
            "Changed by user ID must be a valid positive integer."
        )
        .toInt(),

    body("remarks")
        .optional({
            nullable: true,
        })
        .trim()
        .isLength({
            max: 5000,
        })
        .withMessage(
            "Remarks must not exceed 5000 characters."
        ),

];


// ==========================================================
// LIFECYCLE QUERY VALIDATION
// ==========================================================
//
// Supports:
//
// ?status=APPROVED
// ?limit=20
// ?offset=0
//
// Future pagination and filtering can use the same validator.
// ==========================================================

export const validateLifecycleQuery = [

    query("status")
        .optional({
            nullable: true,
        })
        .trim()
        .customSanitizer(
            (value) => {

                if (
                    value === undefined ||
                    value === null ||
                    value === ""
                ) {
                    return null;
                }

                return String(value)
                    .trim()
                    .toUpperCase();

            }
        )
        .isIn(
            ALLOWED_LOAN_LIFECYCLE_STATUSES
        )
        .withMessage(
            "Invalid loan lifecycle status."
        ),

    query("limit")
        .optional()
        .isInt({
            min: 1,
            max: 100,
        })
        .withMessage(
            "Limit must be between 1 and 100."
        )
        .toInt(),

    query("offset")
        .optional()
        .isInt({
            min: 0,
        })
        .withMessage(
            "Offset must be a non-negative integer."
        )
        .toInt(),

];


// ==========================================================
// LIFECYCLE ID VALIDATION
// ==========================================================

export const validateLifecycleIdParam = [

    positiveIntegerParam(
        "id",
        "Lifecycle history ID"
    ),

];


// ==========================================================
// APPLICATION + STATUS VALIDATION
// ==========================================================

export const validateApplicationStatusQuery = [

    positiveIntegerParam(
        "applicationId",
        "Loan application ID"
    ),

];


// ==========================================================
// LOAN + STATUS VALIDATION
// ==========================================================

export const validateLoanStatusQuery = [

    positiveIntegerParam(
        "loanId",
        "Loan ID"
    ),

];


// ==========================================================
// EXPORT STATUS CONSTANTS
// ==========================================================

export {
    ALLOWED_LOAN_LIFECYCLE_STATUSES,
};

