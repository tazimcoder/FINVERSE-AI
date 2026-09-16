/**
 * ==========================================================
 * FINVERSE AI
 * Loan Disbursement Validator
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/validators/loanDisbursementValidator.js
 *
 * Responsibility:
 *
 * - Validate loan disbursement creation
 * - Validate loan disbursement update
 * - Validate disbursement status
 * - Validate disbursement method
 * - Validate disbursement type
 * - Validate monetary values
 * - Validate IDs
 * - Prevent invalid disbursement data
 *
 * Database Table:
 * loan_disbursements
 *
 * ==========================================================
 */


// ==========================================================
// CONSTANTS
// ==========================================================

const DISBURSEMENT_TYPES = [
    "FULL",
    "PARTIAL",
    "TRANCHE",
];

const DISBURSEMENT_METHODS = [
    "BANK_TRANSFER",
    "UPI",
    "NEFT",
    "RTGS",
    "IMPS",
    "OTHER",
];

const DISBURSEMENT_STATUSES = [
    "REQUESTED",
    "PENDING",
    "PROCESSING",
    "SUCCESS",
    "FAILED",
    "CANCELLED",
    "REVERSED",
];


// ==========================================================
// COMMON HELPERS
// ==========================================================

function isValidId(value) {

    return (
        value !== undefined &&
        value !== null &&
        Number.isInteger(Number(value)) &&
        Number(value) > 0
    );
}


function isValidNumber(value) {

    return (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        Number.isFinite(Number(value))
    );
}


function isValidPositiveNumber(value) {

    return (
        isValidNumber(value) &&
        Number(value) >= 0
    );
}


function isValidNonEmptyString(value) {

    return (
        typeof value === "string" &&
        value.trim().length > 0
    );
}


// ==========================================================
// VALIDATE CREATE LOAN DISBURSEMENT
// ==========================================================

export function validateCreateLoanDisbursement(
    req,
    res,
    next
) {

    const {

        loan_id,
        loan_application_id,

        disbursement_reference,

        requested_amount,

        disbursement_type,

        disbursement_method,

        destination_account_id,

        approved_amount,
        disbursed_amount,

        processing_fee,
        insurance_amount,
        other_charges,

        net_disbursement_amount,

        transaction_id,

        disbursement_status,

        failure_reason,

        remarks,

        created_by_user_id,

    } = req.body;


    // ------------------------------------------------------
    // LOAN ID
    // ------------------------------------------------------

    if (!isValidId(loan_id)) {

        return res.status(400).json({

            success: false,

            message:
                "Valid loan_id is required.",

        });

    }


    // ------------------------------------------------------
    // LOAN APPLICATION ID
    // ------------------------------------------------------

    if (!isValidId(loan_application_id)) {

        return res.status(400).json({

            success: false,

            message:
                "Valid loan_application_id is required.",

        });

    }


    // ------------------------------------------------------
    // DISBURSEMENT REFERENCE
    // ------------------------------------------------------

    if (
        !isValidNonEmptyString(
            disbursement_reference
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "disbursement_reference is required.",

        });

    }


    // ------------------------------------------------------
    // REQUESTED AMOUNT
    // ------------------------------------------------------

    if (
        !isValidPositiveNumber(
            requested_amount
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Valid requested_amount is required.",

        });

    }


    // ------------------------------------------------------
    // APPROVED AMOUNT
    // ------------------------------------------------------

    if (
        approved_amount !== undefined &&
        approved_amount !== null &&
        !isValidPositiveNumber(
            approved_amount
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "approved_amount must be a valid non-negative number.",

        });

    }


    // ------------------------------------------------------
    // DISBURSED AMOUNT
    // ------------------------------------------------------

    if (
        disbursed_amount !== undefined &&
        disbursed_amount !== null &&
        !isValidPositiveNumber(
            disbursed_amount
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "disbursed_amount must be a valid non-negative number.",

        });

    }


    // ------------------------------------------------------
    // DISBURSEMENT TYPE
    // ------------------------------------------------------

    if (
        disbursement_type !== undefined &&
        !DISBURSEMENT_TYPES.includes(
            disbursement_type
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                `Invalid disbursement_type. Allowed values: ${DISBURSEMENT_TYPES.join(", ")}.`,

        });

    }


    // ------------------------------------------------------
    // DISBURSEMENT METHOD
    // ------------------------------------------------------

    if (
        !DISBURSEMENT_METHODS.includes(
            disbursement_method
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                `Invalid disbursement_method. Allowed values: ${DISBURSEMENT_METHODS.join(", ")}.`,

        });

    }


    // ------------------------------------------------------
    // DESTINATION ACCOUNT
    // ------------------------------------------------------

    if (
        destination_account_id !== undefined &&
        destination_account_id !== null &&
        !isValidId(destination_account_id)
    ) {

        return res.status(400).json({

            success: false,

            message:
                "destination_account_id must be a valid ID.",

        });

    }


    // ------------------------------------------------------
    // PROCESSING FEE
    // ------------------------------------------------------

    if (
        processing_fee !== undefined &&
        processing_fee !== null &&
        !isValidPositiveNumber(
            processing_fee
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "processing_fee must be a valid non-negative number.",

        });

    }


    // ------------------------------------------------------
    // INSURANCE AMOUNT
    // ------------------------------------------------------

    if (
        insurance_amount !== undefined &&
        insurance_amount !== null &&
        !isValidPositiveNumber(
            insurance_amount
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "insurance_amount must be a valid non-negative number.",

        });

    }


    // ------------------------------------------------------
    // OTHER CHARGES
    // ------------------------------------------------------

    if (
        other_charges !== undefined &&
        other_charges !== null &&
        !isValidPositiveNumber(
            other_charges
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "other_charges must be a valid non-negative number.",

        });

    }


    // ------------------------------------------------------
    // NET DISBURSEMENT AMOUNT
    // ------------------------------------------------------

    if (
        net_disbursement_amount !== undefined &&
        net_disbursement_amount !== null &&
        !isValidPositiveNumber(
            net_disbursement_amount
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "net_disbursement_amount must be a valid non-negative number.",

        });

    }


    // ------------------------------------------------------
    // TRANSACTION ID
    // ------------------------------------------------------

    if (
        transaction_id !== undefined &&
        transaction_id !== null &&
        !isValidId(transaction_id)
    ) {

        return res.status(400).json({

            success: false,

            message:
                "transaction_id must be a valid ID.",

        });

    }


    // ------------------------------------------------------
    // DISBURSEMENT STATUS
    // ------------------------------------------------------

    if (
        disbursement_status !== undefined &&
        !DISBURSEMENT_STATUSES.includes(
            disbursement_status
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                `Invalid disbursement_status. Allowed values: ${DISBURSEMENT_STATUSES.join(", ")}.`,

        });

    }


    // ------------------------------------------------------
    // CREATED BY USER
    // ------------------------------------------------------

    if (
        created_by_user_id !== undefined &&
        created_by_user_id !== null &&
        !isValidId(created_by_user_id)
    ) {

        return res.status(400).json({

            success: false,

            message:
                "created_by_user_id must be a valid ID.",

        });

    }


    // ------------------------------------------------------
    // FAILURE REASON
    // ------------------------------------------------------

    if (
        failure_reason !== undefined &&
        failure_reason !== null &&
        typeof failure_reason !== "string"
    ) {

        return res.status(400).json({

            success: false,

            message:
                "failure_reason must be a string.",

        });

    }


    // ------------------------------------------------------
    // REMARKS
    // ------------------------------------------------------

    if (
        remarks !== undefined &&
        remarks !== null &&
        typeof remarks !== "string"
    ) {

        return res.status(400).json({

            success: false,

            message:
                "remarks must be a string.",

        });

    }


    next();
}


// ==========================================================
// VALIDATE UPDATE LOAN DISBURSEMENT
// ==========================================================

export function validateUpdateLoanDisbursement(
    req,
    res,
    next
) {

    const {

        requested_amount,
        approved_amount,
        disbursed_amount,

        disbursement_type,
        disbursement_method,

        destination_account_id,

        processing_fee,
        insurance_amount,
        other_charges,

        net_disbursement_amount,

        transaction_id,

        failure_reason,
        remarks,

    } = req.body;


    // ------------------------------------------------------
    // REQUESTED AMOUNT
    // ------------------------------------------------------

    if (
        requested_amount !== undefined &&
        !isValidPositiveNumber(
            requested_amount
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "requested_amount must be a valid non-negative number.",

        });

    }


    // ------------------------------------------------------
    // APPROVED AMOUNT
    // ------------------------------------------------------

    if (
        approved_amount !== undefined &&
        !isValidPositiveNumber(
            approved_amount
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "approved_amount must be a valid non-negative number.",

        });

    }


    // ------------------------------------------------------
    // DISBURSED AMOUNT
    // ------------------------------------------------------

    if (
        disbursed_amount !== undefined &&
        !isValidPositiveNumber(
            disbursed_amount
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "disbursed_amount must be a valid non-negative number.",

        });

    }


    // ------------------------------------------------------
    // DISBURSEMENT TYPE
    // ------------------------------------------------------

    if (
        disbursement_type !== undefined &&
        !DISBURSEMENT_TYPES.includes(
            disbursement_type
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                `Invalid disbursement_type. Allowed values: ${DISBURSEMENT_TYPES.join(", ")}.`,

        });

    }


    // ------------------------------------------------------
    // DISBURSEMENT METHOD
    // ------------------------------------------------------

    if (
        disbursement_method !== undefined &&
        !DISBURSEMENT_METHODS.includes(
            disbursement_method
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                `Invalid disbursement_method. Allowed values: ${DISBURSEMENT_METHODS.join(", ")}.`,

        });

    }


    // ------------------------------------------------------
    // DESTINATION ACCOUNT
    // ------------------------------------------------------

    if (
        destination_account_id !== undefined &&
        destination_account_id !== null &&
        !isValidId(destination_account_id)
    ) {

        return res.status(400).json({

            success: false,

            message:
                "destination_account_id must be a valid ID.",

        });

    }


    // ------------------------------------------------------
    // PROCESSING FEE
    // ------------------------------------------------------

    if (
        processing_fee !== undefined &&
        !isValidPositiveNumber(
            processing_fee
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "processing_fee must be a valid non-negative number.",

        });

    }


    // ------------------------------------------------------
    // INSURANCE AMOUNT
    // ------------------------------------------------------

    if (
        insurance_amount !== undefined &&
        !isValidPositiveNumber(
            insurance_amount
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "insurance_amount must be a valid non-negative number.",

        });

    }


    // ------------------------------------------------------
    // OTHER CHARGES
    // ------------------------------------------------------

    if (
        other_charges !== undefined &&
        !isValidPositiveNumber(
            other_charges
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "other_charges must be a valid non-negative number.",

        });

    }


    // ------------------------------------------------------
    // NET DISBURSEMENT AMOUNT
    // ------------------------------------------------------

    if (
        net_disbursement_amount !== undefined &&
        !isValidPositiveNumber(
            net_disbursement_amount
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "net_disbursement_amount must be a valid non-negative number.",

        });

    }


    // ------------------------------------------------------
    // TRANSACTION ID
    // ------------------------------------------------------

    if (
        transaction_id !== undefined &&
        transaction_id !== null &&
        !isValidId(transaction_id)
    ) {

        return res.status(400).json({

            success: false,

            message:
                "transaction_id must be a valid ID.",

        });

    }


    // ------------------------------------------------------
    // FAILURE REASON
    // ------------------------------------------------------

    if (
        failure_reason !== undefined &&
        failure_reason !== null &&
        typeof failure_reason !== "string"
    ) {

        return res.status(400).json({

            success: false,

            message:
                "failure_reason must be a string.",

        });

    }


    // ------------------------------------------------------
    // REMARKS
    // ------------------------------------------------------

    if (
        remarks !== undefined &&
        remarks !== null &&
        typeof remarks !== "string"
    ) {

        return res.status(400).json({

            success: false,

            message:
                "remarks must be a string.",

        });

    }


    next();
}


// ==========================================================
// VALIDATE DISBURSEMENT STATUS
// ==========================================================

export function validateDisbursementStatus(
    req,
    res,
    next
) {

    const {
        disbursement_status,
    } = req.body;


    if (
        !DISBURSEMENT_STATUSES.includes(
            disbursement_status
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                `Invalid disbursement_status. Allowed values: ${DISBURSEMENT_STATUSES.join(", ")}.`,

        });

    }


    next();
}


// ==========================================================
// VALIDATE DISBURSEMENT ID
// ==========================================================

export function validateLoanDisbursementId(
    req,
    res,
    next
) {

    const {
        id,
    } = req.params;


    if (!isValidId(id)) {

        return res.status(400).json({

            success: false,

            message:
                "Valid disbursement ID is required.",

        });

    }


    next();
}


// ==========================================================
// EXPORT CONSTANTS
// ==========================================================

export {
    DISBURSEMENT_TYPES,
    DISBURSEMENT_METHODS,
    DISBURSEMENT_STATUSES,
};