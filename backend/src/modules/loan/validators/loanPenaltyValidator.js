/**
 * ==========================================================
 * FINVERSE AI
 * Loan Penalty Validator
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/validators/loanPenaltyValidator.js
 *
 * Database Table:
 * loan_penalties
 *
 * ==========================================================
 */

import { body, param, query } from "express-validator";


// ==========================================================
// CONSTANTS
// ==========================================================

const PENALTY_TYPES = [
    "LATE_PAYMENT",
    "MISSED_EMI",
    "BOUNCE",
    "OVERDUE",
    "OTHER",
];

const PENALTY_STATUSES = [
    "PENDING",
    "APPLIED",
    "PAID",
    "WAIVED",
    "CANCELLED",
];


// ==========================================================
// CREATE PENALTY
// ==========================================================

export const createLoanPenaltyValidator = [

    body("loan_id")
        .notEmpty()
        .withMessage("Loan ID is required.")
        .isInt({ min: 1 })
        .withMessage("Loan ID must be a valid positive integer."),

    body("repayment_schedule_id")
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage(
            "Repayment schedule ID must be a valid positive integer."
        ),

    body("user_id")
        .notEmpty()
        .withMessage("User ID is required.")
        .isInt({ min: 1 })
        .withMessage("User ID must be a valid positive integer."),

    body("penalty_type")
        .notEmpty()
        .withMessage("Penalty type is required.")
        .isIn(PENALTY_TYPES)
        .withMessage(
            `Penalty type must be one of: ${PENALTY_TYPES.join(", ")}.`
        ),

    body("penalty_reason")
        .optional({ nullable: true })
        .isString()
        .withMessage("Penalty reason must be a string.")
        .trim()
        .isLength({ max: 255 })
        .withMessage(
            "Penalty reason cannot exceed 255 characters."
        ),

    body("penalty_amount")
        .optional()
        .isDecimal({
            decimal_digits: "0,2",
        })
        .withMessage(
            "Penalty amount must be a valid decimal number."
        )
        .custom((value) => {

            if (Number(value) < 0) {
                throw new Error(
                    "Penalty amount cannot be negative."
                );
            }

            return true;
        }),

    body("waived_amount")
        .optional()
        .isDecimal({
            decimal_digits: "0,2",
        })
        .withMessage(
            "Waived amount must be a valid decimal number."
        )
        .custom((value) => {

            if (Number(value) < 0) {
                throw new Error(
                    "Waived amount cannot be negative."
                );
            }

            return true;
        }),

    body("payable_amount")
        .optional()
        .isDecimal({
            decimal_digits: "0,2",
        })
        .withMessage(
            "Payable amount must be a valid decimal number."
        )
        .custom((value) => {

            if (Number(value) < 0) {
                throw new Error(
                    "Payable amount cannot be negative."
                );
            }

            return true;
        }),

    body("penalty_status")
        .optional()
        .isIn(PENALTY_STATUSES)
        .withMessage(
            `Penalty status must be one of: ${PENALTY_STATUSES.join(", ")}.`
        ),

    body("due_date")
        .optional({ nullable: true })
        .isISO8601()
        .withMessage("Due date must be a valid date."),

    body("applied_at")
        .optional({ nullable: true })
        .isISO8601()
        .withMessage(
            "Applied at must be a valid date/time."
        ),

    body("paid_at")
        .optional({ nullable: true })
        .isISO8601()
        .withMessage(
            "Paid at must be a valid date/time."
        ),

    body("waived_by_user_id")
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage(
            "Waived by user ID must be a valid positive integer."
        ),

    body("waiver_reason")
        .optional({ nullable: true })
        .isString()
        .withMessage("Waiver reason must be a string."),

    body("notes")
        .optional({ nullable: true })
        .isString()
        .withMessage("Notes must be a string."),
];


// ==========================================================
// UPDATE PENALTY
// ==========================================================

export const updateLoanPenaltyValidator = [

    param("id")
        .notEmpty()
        .withMessage("Penalty ID is required.")
        .isInt({ min: 1 })
        .withMessage("Penalty ID must be a valid positive integer."),

    body("repayment_schedule_id")
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage(
            "Repayment schedule ID must be a valid positive integer."
        ),

    body("user_id")
        .optional()
        .isInt({ min: 1 })
        .withMessage("User ID must be a valid positive integer."),

    body("penalty_type")
        .optional()
        .isIn(PENALTY_TYPES)
        .withMessage(
            `Penalty type must be one of: ${PENALTY_TYPES.join(", ")}.`
        ),

    body("penalty_reason")
        .optional({ nullable: true })
        .isString()
        .withMessage("Penalty reason must be a string.")
        .trim()
        .isLength({ max: 255 })
        .withMessage(
            "Penalty reason cannot exceed 255 characters."
        ),

    body("penalty_amount")
        .optional()
        .isDecimal({
            decimal_digits: "0,2",
        })
        .withMessage(
            "Penalty amount must be a valid decimal number."
        )
        .custom((value) => {

            if (Number(value) < 0) {
                throw new Error(
                    "Penalty amount cannot be negative."
                );
            }

            return true;
        }),

    body("waived_amount")
        .optional()
        .isDecimal({
            decimal_digits: "0,2",
        })
        .withMessage(
            "Waived amount must be a valid decimal number."
        )
        .custom((value) => {

            if (Number(value) < 0) {
                throw new Error(
                    "Waived amount cannot be negative."
                );
            }

            return true;
        }),

    body("payable_amount")
        .optional()
        .isDecimal({
            decimal_digits: "0,2",
        })
        .withMessage(
            "Payable amount must be a valid decimal number."
        )
        .custom((value) => {

            if (Number(value) < 0) {
                throw new Error(
                    "Payable amount cannot be negative."
                );
            }

            return true;
        }),

    body("penalty_status")
        .optional()
        .isIn(PENALTY_STATUSES)
        .withMessage(
            `Penalty status must be one of: ${PENALTY_STATUSES.join(", ")}.`
        ),

    body("due_date")
        .optional({ nullable: true })
        .isISO8601()
        .withMessage("Due date must be a valid date."),

    body("applied_at")
        .optional({ nullable: true })
        .isISO8601()
        .withMessage(
            "Applied at must be a valid date/time."
        ),

    body("paid_at")
        .optional({ nullable: true })
        .isISO8601()
        .withMessage(
            "Paid at must be a valid date/time."
        ),

    body("waived_by_user_id")
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage(
            "Waived by user ID must be a valid positive integer."
        ),

    body("waiver_reason")
        .optional({ nullable: true })
        .isString()
        .withMessage("Waiver reason must be a string."),

    body("notes")
        .optional({ nullable: true })
        .isString()
        .withMessage("Notes must be a string."),
];


// ==========================================================
// UPDATE PENALTY STATUS
// ==========================================================

export const updateLoanPenaltyStatusValidator = [

    param("id")
        .notEmpty()
        .withMessage("Penalty ID is required.")
        .isInt({ min: 1 })
        .withMessage("Penalty ID must be a valid positive integer."),

    body("penalty_status")
        .notEmpty()
        .withMessage("Penalty status is required.")
        .isIn(PENALTY_STATUSES)
        .withMessage(
            `Penalty status must be one of: ${PENALTY_STATUSES.join(", ")}.`
        ),

    body("waived_amount")
        .optional()
        .isDecimal({
            decimal_digits: "0,2",
        })
        .withMessage(
            "Waived amount must be a valid decimal number."
        )
        .custom((value) => {

            if (Number(value) < 0) {
                throw new Error(
                    "Waived amount cannot be negative."
                );
            }

            return true;
        }),

    body("waiver_reason")
        .optional({ nullable: true })
        .isString()
        .withMessage("Waiver reason must be a string."),
];


// ==========================================================
// PENALTY ID
// ==========================================================

export const loanPenaltyIdValidator = [

    param("id")
        .notEmpty()
        .withMessage("Penalty ID is required.")
        .isInt({ min: 1 })
        .withMessage("Penalty ID must be a valid positive integer."),
];


// ==========================================================
// LOAN ID
// ==========================================================

export const loanPenaltyLoanIdValidator = [

    param("loanId")
        .notEmpty()
        .withMessage("Loan ID is required.")
        .isInt({ min: 1 })
        .withMessage("Loan ID must be a valid positive integer."),
];


// ==========================================================
// USER ID
// ==========================================================

export const loanPenaltyUserIdValidator = [

    param("userId")
        .notEmpty()
        .withMessage("User ID is required.")
        .isInt({ min: 1 })
        .withMessage("User ID must be a valid positive integer."),
];


// ==========================================================
// REPAYMENT SCHEDULE ID
// ==========================================================

export const loanPenaltyScheduleIdValidator = [

    param("scheduleId")
        .notEmpty()
        .withMessage("Repayment schedule ID is required.")
        .isInt({ min: 1 })
        .withMessage(
            "Repayment schedule ID must be a valid positive integer."
        ),
];


// ==========================================================
// PENALTY TYPE
// ==========================================================

export const loanPenaltyTypeValidator = [

    param("type")
        .notEmpty()
        .withMessage("Penalty type is required.")
        .isIn(PENALTY_TYPES)
        .withMessage(
            `Penalty type must be one of: ${PENALTY_TYPES.join(", ")}.`
        ),
];


// ==========================================================
// PENALTY STATUS
// ==========================================================

export const loanPenaltyStatusValidator = [

    param("status")
        .notEmpty()
        .withMessage("Penalty status is required.")
        .isIn(PENALTY_STATUSES)
        .withMessage(
            `Penalty status must be one of: ${PENALTY_STATUSES.join(", ")}.`
        ),
];


// ==========================================================
// QUERY VALIDATOR
// ==========================================================

export const loanPenaltyQueryValidator = [

    query("loan_id")
        .optional()
        .isInt({ min: 1 })
        .withMessage(
            "Loan ID must be a valid positive integer."
        ),

    query("user_id")
        .optional()
        .isInt({ min: 1 })
        .withMessage(
            "User ID must be a valid positive integer."
        ),

    query("repayment_schedule_id")
        .optional()
        .isInt({ min: 1 })
        .withMessage(
            "Repayment schedule ID must be a valid positive integer."
        ),

    query("penalty_type")
        .optional()
        .isIn(PENALTY_TYPES)
        .withMessage(
            `Penalty type must be one of: ${PENALTY_TYPES.join(", ")}.`
        ),

    query("penalty_status")
        .optional()
        .isIn(PENALTY_STATUSES)
        .withMessage(
            `Penalty status must be one of: ${PENALTY_STATUSES.join(", ")}.`
        ),

    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage(
            "Page must be a positive integer."
        ),

    query("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage(
            "Limit must be between 1 and 100."
        ),
];


// ==========================================================
// DEFAULT EXPORT
// ==========================================================

export default {
    createLoanPenaltyValidator,
    updateLoanPenaltyValidator,
    updateLoanPenaltyStatusValidator,
    loanPenaltyIdValidator,
    loanPenaltyLoanIdValidator,
    loanPenaltyUserIdValidator,
    loanPenaltyScheduleIdValidator,
    loanPenaltyTypeValidator,
    loanPenaltyStatusValidator,
    loanPenaltyQueryValidator,
};

