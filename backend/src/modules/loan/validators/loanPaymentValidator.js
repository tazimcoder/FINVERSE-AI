/**
 * ==========================================================
 * FINVERSE AI
 * Loan Payment Validator
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/validators/loanPaymentValidator.js
 *
 * Responsibility:
 *
 * - Validate loan payment creation data
 * - Validate loan payment update data
 * - Validate payment status updates
 * - Keep validation aligned with loan_payments table
 *
 * ==========================================================
 */

import { body, param, query } from "express-validator";


// ==========================================================
// PAYMENT ENUM VALUES
// ==========================================================

const PAYMENT_METHODS = [
    "BANK_TRANSFER",
    "UPI",
    "CARD",
    "AUTO_DEBIT",
    "CASH",
    "OTHER",
];

const PAYMENT_STATUSES = [
    "PENDING",
    "SUCCESS",
    "FAILED",
    "REFUNDED",
];


// ==========================================================
// CREATE PAYMENT VALIDATOR
// ==========================================================

export const createLoanPaymentValidator = [

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

    body("payment_reference")
        .notEmpty()
        .withMessage("Payment reference is required.")
        .isString()
        .withMessage("Payment reference must be a string.")
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage(
            "Payment reference must be between 3 and 100 characters."
        ),

    body("amount")
        .notEmpty()
        .withMessage("Payment amount is required.")
        .isDecimal({
            decimal_digits: "0,2",
        })
        .withMessage(
            "Payment amount must be a valid decimal number."
        )
        .custom((value) => {
            if (Number(value) <= 0) {
                throw new Error(
                    "Payment amount must be greater than zero."
                );
            }

            return true;
        }),

    body("payment_method")
        .notEmpty()
        .withMessage("Payment method is required.")
        .isIn(PAYMENT_METHODS)
        .withMessage(
            `Payment method must be one of: ${PAYMENT_METHODS.join(", ")}.`
        ),

    body("payment_status")
        .optional()
        .isIn(PAYMENT_STATUSES)
        .withMessage(
            `Payment status must be one of: ${PAYMENT_STATUSES.join(", ")}.`
        ),

    body("transaction_id")
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage(
            "Transaction ID must be a valid positive integer."
        ),

    body("paid_at")
        .optional({ nullable: true })
        .isISO8601()
        .withMessage(
            "Paid at must be a valid ISO 8601 date/time."
        ),
];


// ==========================================================
// UPDATE PAYMENT VALIDATOR
// ==========================================================

export const updateLoanPaymentValidator = [

    param("id")
        .notEmpty()
        .withMessage("Payment ID is required.")
        .isInt({ min: 1 })
        .withMessage(
            "Payment ID must be a valid positive integer."
        ),

    body("repayment_schedule_id")
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage(
            "Repayment schedule ID must be a valid positive integer."
        ),

    body("payment_reference")
        .optional()
        .isString()
        .withMessage("Payment reference must be a string.")
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage(
            "Payment reference must be between 3 and 100 characters."
        ),

    body("amount")
        .optional()
        .isDecimal({
            decimal_digits: "0,2",
        })
        .withMessage(
            "Payment amount must be a valid decimal number."
        )
        .custom((value) => {
            if (Number(value) <= 0) {
                throw new Error(
                    "Payment amount must be greater than zero."
                );
            }

            return true;
        }),

    body("payment_method")
        .optional()
        .isIn(PAYMENT_METHODS)
        .withMessage(
            `Payment method must be one of: ${PAYMENT_METHODS.join(", ")}.`
        ),

    body("payment_status")
        .optional()
        .isIn(PAYMENT_STATUSES)
        .withMessage(
            `Payment status must be one of: ${PAYMENT_STATUSES.join(", ")}.`
        ),

    body("transaction_id")
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage(
            "Transaction ID must be a valid positive integer."
        ),

    body("paid_at")
        .optional({ nullable: true })
        .isISO8601()
        .withMessage(
            "Paid at must be a valid ISO 8601 date/time."
        ),
];


// ==========================================================
// PAYMENT STATUS VALIDATOR
// ==========================================================

export const updateLoanPaymentStatusValidator = [

    param("id")
        .notEmpty()
        .withMessage("Payment ID is required.")
        .isInt({ min: 1 })
        .withMessage(
            "Payment ID must be a valid positive integer."
        ),

    body("payment_status")
        .notEmpty()
        .withMessage("Payment status is required.")
        .isIn(PAYMENT_STATUSES)
        .withMessage(
            `Payment status must be one of: ${PAYMENT_STATUSES.join(", ")}.`
        ),

    body("paid_at")
        .optional({ nullable: true })
        .isISO8601()
        .withMessage(
            "Paid at must be a valid ISO 8601 date/time."
        ),
];


// ==========================================================
// ID PARAM VALIDATOR
// ==========================================================

export const loanPaymentIdValidator = [

    param("id")
        .notEmpty()
        .withMessage("Payment ID is required.")
        .isInt({ min: 1 })
        .withMessage(
            "Payment ID must be a valid positive integer."
        ),
];


// ==========================================================
// LOAN ID PARAM VALIDATOR
// ==========================================================

export const loanPaymentLoanIdValidator = [

    param("loanId")
        .notEmpty()
        .withMessage("Loan ID is required.")
        .isInt({ min: 1 })
        .withMessage(
            "Loan ID must be a valid positive integer."
        ),
];


// ==========================================================
// REPAYMENT SCHEDULE ID PARAM VALIDATOR
// ==========================================================

export const loanPaymentScheduleIdValidator = [

    param("scheduleId")
        .notEmpty()
        .withMessage("Repayment schedule ID is required.")
        .isInt({ min: 1 })
        .withMessage(
            "Repayment schedule ID must be a valid positive integer."
        ),
];


// ==========================================================
// PAYMENT REFERENCE PARAM VALIDATOR
// ==========================================================

export const loanPaymentReferenceValidator = [

    param("reference")
        .notEmpty()
        .withMessage("Payment reference is required.")
        .isString()
        .withMessage("Payment reference must be a string.")
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage(
            "Payment reference must be between 3 and 100 characters."
        ),
];


// ==========================================================
// TRANSACTION ID PARAM VALIDATOR
// ==========================================================

export const loanPaymentTransactionIdValidator = [

    param("transactionId")
        .notEmpty()
        .withMessage("Transaction ID is required.")
        .isInt({ min: 1 })
        .withMessage(
            "Transaction ID must be a valid positive integer."
        ),
];


// ==========================================================
// STATUS QUERY VALIDATOR
// ==========================================================

export const loanPaymentStatusValidator = [

    param("status")
        .notEmpty()
        .withMessage("Payment status is required.")
        .isIn(PAYMENT_STATUSES)
        .withMessage(
            `Payment status must be one of: ${PAYMENT_STATUSES.join(", ")}.`
        ),
];


// ==========================================================
// PAGINATION / FILTER VALIDATOR
// ==========================================================

export const loanPaymentQueryValidator = [

    query("loan_id")
        .optional()
        .isInt({ min: 1 })
        .withMessage(
            "Loan ID must be a valid positive integer."
        ),

    query("repayment_schedule_id")
        .optional()
        .isInt({ min: 1 })
        .withMessage(
            "Repayment schedule ID must be a valid positive integer."
        ),

    query("payment_status")
        .optional()
        .isIn(PAYMENT_STATUSES)
        .withMessage(
            `Payment status must be one of: ${PAYMENT_STATUSES.join(", ")}.`
        ),

    query("payment_method")
        .optional()
        .isIn(PAYMENT_METHODS)
        .withMessage(
            `Payment method must be one of: ${PAYMENT_METHODS.join(", ")}.`
        ),

    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be a positive integer."),

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
    createLoanPaymentValidator,
    updateLoanPaymentValidator,
    updateLoanPaymentStatusValidator,
    loanPaymentIdValidator,
    loanPaymentLoanIdValidator,
    loanPaymentScheduleIdValidator,
    loanPaymentReferenceValidator,
    loanPaymentTransactionIdValidator,
    loanPaymentStatusValidator,
    loanPaymentQueryValidator,
};

