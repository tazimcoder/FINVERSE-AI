/**
 * ==========================================================
 * FINVERSE AI
 * Loan Payment Service
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/services/loanPaymentService.js
 *
 * Responsibility:
 *
 * - Loan payment business logic
 * - Validate payment data
 * - Fetch payment records
 * - Create payment
 * - Update payment
 * - Manage payment status
 * - Delete payment
 *
 * Database Table:
 * loan_payments
 *
 * ==========================================================
 */

import {
    getAllLoanPayments,
    getLoanPaymentById,
    getLoanPaymentsByLoanId,
    getLoanPaymentsByScheduleId,
    getLoanPaymentByReference,
    getLoanPaymentsByTransactionId,
    getLoanPaymentsByStatus,
    createLoanPayment,
    updateLoanPayment,
    updateLoanPaymentStatus,
    deleteLoanPayment
} from "../models/loanPaymentModel.js";


// ==========================================================
// ALLOWED ENUM VALUES
// ==========================================================

const ALLOWED_PAYMENT_METHODS = [
    "BANK_TRANSFER",
    "UPI",
    "CARD",
    "AUTO_DEBIT",
    "CASH",
    "OTHER"
];


const ALLOWED_PAYMENT_STATUSES = [
    "PENDING",
    "SUCCESS",
    "FAILED",
    "REFUNDED"
];


// ==========================================================
// VALIDATE REQUIRED ID
// ==========================================================

function validateId(
    value,
    fieldName
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        throw new Error(
            `${fieldName} is required.`
        );

    }


    const id = Number(value);


    if (
        !Number.isInteger(id) ||
        id <= 0
    ) {

        throw new Error(
            `${fieldName} must be a valid positive integer.`
        );

    }


    return id;
}


// ==========================================================
// VALIDATE OPTIONAL ID
// ==========================================================

function validateOptionalId(
    value,
    fieldName
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return null;
    }


    return validateId(
        value,
        fieldName
    );
}


// ==========================================================
// VALIDATE REQUIRED STRING
// ==========================================================

function validateRequiredString(
    value,
    fieldName
) {

    if (
        value === undefined ||
        value === null ||
        String(value).trim() === ""
    ) {

        throw new Error(
            `${fieldName} is required.`
        );

    }


    return String(value).trim();
}


// ==========================================================
// VALIDATE PAYMENT AMOUNT
// ==========================================================

function validateAmount(
    value
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        throw new Error(
            "Payment amount is required."
        );

    }


    const amount = Number(value);


    if (
        !Number.isFinite(amount)
    ) {

        throw new Error(
            "Payment amount must be a valid number."
        );

    }


    if (
        amount <= 0
    ) {

        throw new Error(
            "Payment amount must be greater than zero."
        );

    }


    return amount;
}


// ==========================================================
// NORMALIZE ENUM
// ==========================================================

function normalizeEnum(
    value,
    fieldName,
    allowedValues
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return null;
    }


    const normalized =
        String(value)
            .trim()
            .toUpperCase();


    if (
        !allowedValues.includes(normalized)
    ) {

        throw new Error(
            `Invalid ${fieldName}.`
        );

    }


    return normalized;
}


// ==========================================================
// VALIDATE OPTIONAL DATE
// ==========================================================

function validateOptionalDate(
    value,
    fieldName
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return null;
    }


    const date = new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        throw new Error(
            `${fieldName} must be a valid date.`
        );

    }


    return value;
}


// ==========================================================
// FETCH ALL PAYMENTS
// ==========================================================

export async function fetchAllLoanPayments() {

    return await getAllLoanPayments();

}


// ==========================================================
// FETCH PAYMENT BY ID
// ==========================================================

export async function fetchLoanPaymentById(
    paymentId
) {

    const id =
        validateId(
            paymentId,
            "Loan payment ID"
        );


    return await getLoanPaymentById(
        id
    );

}


// ==========================================================
// FETCH PAYMENTS BY LOAN
// ==========================================================

export async function fetchLoanPaymentsByLoanId(
    loanId
) {

    const id =
        validateId(
            loanId,
            "Loan ID"
        );


    return await getLoanPaymentsByLoanId(
        id
    );

}


// ==========================================================
// FETCH PAYMENTS BY REPAYMENT SCHEDULE
// ==========================================================

export async function fetchLoanPaymentsByScheduleId(
    repaymentScheduleId
) {

    const id =
        validateId(
            repaymentScheduleId,
            "Repayment schedule ID"
        );


    return await getLoanPaymentsByScheduleId(
        id
    );

}


// ==========================================================
// FETCH PAYMENT BY REFERENCE
// ==========================================================

export async function fetchLoanPaymentByReference(
    paymentReference
) {

    const reference =
        validateRequiredString(
            paymentReference,
            "Payment reference"
        );


    return await getLoanPaymentByReference(
        reference
    );

}


// ==========================================================
// FETCH PAYMENTS BY TRANSACTION
// ==========================================================

export async function fetchLoanPaymentsByTransactionId(
    transactionId
) {

    const id =
        validateId(
            transactionId,
            "Transaction ID"
        );


    return await getLoanPaymentsByTransactionId(
        id
    );

}


// ==========================================================
// FETCH PAYMENTS BY STATUS
// ==========================================================

export async function fetchLoanPaymentsByStatus(
    paymentStatus
) {

    const status =
        normalizeEnum(
            paymentStatus,
            "payment status",
            ALLOWED_PAYMENT_STATUSES
        );


    if (!status) {

        throw new Error(
            "Payment status is required."
        );

    }


    return await getLoanPaymentsByStatus(
        status
    );

}


// ==========================================================
// CREATE LOAN PAYMENT
// ==========================================================

export async function createNewLoanPayment(
    paymentData
) {

    if (
        !paymentData ||
        typeof paymentData !== "object"
    ) {

        throw new Error(
            "Loan payment data is required."
        );

    }


    const {

        loan_id,
        repayment_schedule_id,
        payment_reference,
        amount,
        payment_method,
        payment_status,
        transaction_id,
        paid_at

    } = paymentData;


    const loanId =
        validateId(
            loan_id,
            "Loan ID"
        );


    const scheduleId =
        validateOptionalId(
            repayment_schedule_id,
            "Repayment schedule ID"
        );


    const reference =
        validateRequiredString(
            payment_reference,
            "Payment reference"
        );


    const paymentAmount =
        validateAmount(
            amount
        );


    const method =
        normalizeEnum(
            payment_method,
            "payment method",
            ALLOWED_PAYMENT_METHODS
        );


    if (!method) {

        throw new Error(
            "Payment method is required."
        );

    }


    const status =
        normalizeEnum(
            payment_status,
            "payment status",
            ALLOWED_PAYMENT_STATUSES
        ) || "PENDING";


    const transactionId =
        validateOptionalId(
            transaction_id,
            "Transaction ID"
        );


    const paidAt =
        validateOptionalDate(
            paid_at,
            "Paid at"
        );


    // ------------------------------------------------------
    // SUCCESS PAYMENT DATE
    // ------------------------------------------------------

    let finalPaidAt = paidAt;


    if (
        status === "SUCCESS" &&
        !finalPaidAt
    ) {

        finalPaidAt =
            new Date();

    }


    // ------------------------------------------------------
    // NON-SUCCESS PAYMENT
    // ------------------------------------------------------

    if (
        status !== "SUCCESS" &&
        paidAt !== undefined &&
        paidAt !== null &&
        paidAt !== ""
    ) {

        finalPaidAt = paidAt;

    }


    // ------------------------------------------------------
    // DUPLICATE PAYMENT REFERENCE
    // ------------------------------------------------------

    const existingPayment =
        await getLoanPaymentByReference(
            reference
        );


    if (existingPayment) {

        throw new Error(
            "Payment reference already exists."
        );

    }


    const data = {

        loan_id:
            loanId,

        repayment_schedule_id:
            scheduleId,

        payment_reference:
            reference,

        amount:
            paymentAmount,

        payment_method:
            method,

        payment_status:
            status,

        transaction_id:
            transactionId,

        paid_at:
            finalPaidAt

    };


    return await createLoanPayment(
        data
    );

}


// ==========================================================
// UPDATE LOAN PAYMENT
// ==========================================================

export async function updateExistingLoanPayment(
    paymentId,
    paymentData
) {

    const id =
        validateId(
            paymentId,
            "Loan payment ID"
        );


    if (
        !paymentData ||
        typeof paymentData !== "object"
    ) {

        throw new Error(
            "Loan payment data is required."
        );

    }


    const existingPayment =
        await getLoanPaymentById(
            id
        );


    if (!existingPayment) {

        throw new Error(
            "Loan payment not found."
        );

    }


    const {

        repayment_schedule_id,
        payment_reference,
        amount,
        payment_method,
        payment_status,
        transaction_id,
        paid_at

    } = paymentData;


    const scheduleId =
        repayment_schedule_id !== undefined
            ? validateOptionalId(
                repayment_schedule_id,
                "Repayment schedule ID"
            )
            : existingPayment.repayment_schedule_id;


    const reference =
        payment_reference !== undefined
            ? validateRequiredString(
                payment_reference,
                "Payment reference"
            )
            : existingPayment.payment_reference;


    const paymentAmount =
        amount !== undefined
            ? validateAmount(
                amount
            )
            : Number(existingPayment.amount);


    const method =
        payment_method !== undefined
            ? normalizeEnum(
                payment_method,
                "payment method",
                ALLOWED_PAYMENT_METHODS
            )
            : existingPayment.payment_method;


    if (!method) {

        throw new Error(
            "Payment method is required."
        );

    }


    const status =
        payment_status !== undefined
            ? normalizeEnum(
                payment_status,
                "payment status",
                ALLOWED_PAYMENT_STATUSES
            )
            : existingPayment.payment_status;


    if (!status) {

        throw new Error(
            "Payment status is required."
        );

    }


    const transactionId =
        transaction_id !== undefined
            ? validateOptionalId(
                transaction_id,
                "Transaction ID"
            )
            : existingPayment.transaction_id;


    const paidAt =
        paid_at !== undefined
            ? validateOptionalDate(
                paid_at,
                "Paid at"
            )
            : existingPayment.paid_at;


    // ------------------------------------------------------
    // CHECK PAYMENT REFERENCE CHANGE
    // ------------------------------------------------------

    if (
        reference !== existingPayment.payment_reference
    ) {

        const duplicatePayment =
            await getLoanPaymentByReference(
                reference
            );


        if (
            duplicatePayment &&
            Number(duplicatePayment.id) !== id
        ) {

            throw new Error(
                "Payment reference already exists."
            );

        }

    }


    return await updateLoanPayment(
        id,
        {

            repayment_schedule_id:
                scheduleId,

            payment_reference:
                reference,

            amount:
                paymentAmount,

            payment_method:
                method,

            payment_status:
                status,

            transaction_id:
                transactionId,

            paid_at:
                paidAt

        }
    );

}


// ==========================================================
// CHANGE PAYMENT STATUS
// ==========================================================

export async function changeLoanPaymentStatus(
    paymentId,
    paymentStatus
) {

    const id =
        validateId(
            paymentId,
            "Loan payment ID"
        );


    const status =
        normalizeEnum(
            paymentStatus,
            "payment status",
            ALLOWED_PAYMENT_STATUSES
        );


    if (!status) {

        throw new Error(
            "Payment status is required."
        );

    }


    const existingPayment =
        await getLoanPaymentById(
            id
        );


    if (!existingPayment) {

        throw new Error(
            "Loan payment not found."
        );

    }


    // ------------------------------------------------------
    // PREVENT REFUNDED -> SUCCESS
    // ------------------------------------------------------

    if (
        existingPayment.payment_status === "REFUNDED" &&
        status === "SUCCESS"
    ) {

        throw new Error(
            "A refunded payment cannot be marked as successful again."
        );

    }


    // ------------------------------------------------------
    // PREVENT REFUNDED -> PENDING
    // ------------------------------------------------------

    if (
        existingPayment.payment_status === "REFUNDED" &&
        status === "PENDING"
    ) {

        throw new Error(
            "A refunded payment cannot be moved back to pending."
        );

    }


    // ------------------------------------------------------
    // PREVENT REFUNDED -> FAILED
    // ------------------------------------------------------

    if (
        existingPayment.payment_status === "REFUNDED" &&
        status === "FAILED"
    ) {

        throw new Error(
            "A refunded payment cannot be moved back to failed."
        );

    }


    return await updateLoanPaymentStatus(
        id,
        status
    );

}


// ==========================================================
// DELETE LOAN PAYMENT
// ==========================================================

export async function removeLoanPayment(
    paymentId
) {

    const id =
        validateId(
            paymentId,
            "Loan payment ID"
        );


    const existingPayment =
        await getLoanPaymentById(
            id
        );


    if (!existingPayment) {

        throw new Error(
            "Loan payment not found."
        );

    }


    // ------------------------------------------------------
    // PROTECT SUCCESSFUL PAYMENTS
    // ------------------------------------------------------

    if (
        existingPayment.payment_status === "SUCCESS"
    ) {

        throw new Error(
            "Successful loan payments cannot be deleted."
        );

    }


    return await deleteLoanPayment(
        id
    );

}


// ==========================================================
// EXPORT ENUM CONSTANTS
// ==========================================================

export {
    ALLOWED_PAYMENT_METHODS,
    ALLOWED_PAYMENT_STATUSES
};

