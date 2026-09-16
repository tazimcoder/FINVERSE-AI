/**
 * ==========================================================
 * FINVERSE AI
 * Loan Disbursement Service
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/services/loanDisbursementService.js
 *
 * Database Table:
 * loan_disbursements
 *
 * Responsibility:
 *
 * - Loan disbursement business logic
 * - Validate disbursement data
 * - Fetch disbursements
 * - Create disbursement
 * - Update disbursement
 * - Manage disbursement lifecycle
 * - Delete disbursement
 *
 * Connected Model:
 * ../models/loanDisbursementModel.js
 *
 * ==========================================================
 */

import {
    getAllLoanDisbursements,
    getLoanDisbursementById,
    getLoanDisbursementsByLoanId,
    getLoanDisbursementsByApplicationId,
    getLoanDisbursementsByOfferId,
    getLoanDisbursementByReference,
    getLoanDisbursementsByAccountId,
    getLoanDisbursementsByTransactionId,
    getLoanDisbursementsByStatus,
    createLoanDisbursement,
    updateLoanDisbursement,
    updateLoanDisbursementStatus,
    deleteLoanDisbursement
} from "../models/loanDisbursementModel.js";


// ==========================================================
// ALLOWED DISBURSEMENT STATUSES
// ==========================================================

const ALLOWED_DISBURSEMENT_STATUSES = [
    "REQUESTED",
    "PROCESSING",
    "COMPLETED",
    "FAILED",
    "CANCELLED"
];


// ==========================================================
// ALLOWED DISBURSEMENT TYPES
// ==========================================================

const ALLOWED_DISBURSEMENT_TYPES = [
    "FULL",
    "PARTIAL"
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

    const id =
        Number(value);

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

    return String(
        value
    ).trim();
}


// ==========================================================
// NORMALIZE OPTIONAL STRING
// ==========================================================

function normalizeOptionalString(
    value
) {

    if (
        value === undefined ||
        value === null ||
        String(value).trim() === ""
    ) {
        return null;
    }

    return String(
        value
    ).trim();
}


// ==========================================================
// VALIDATE OPTIONAL NUMBER
// ==========================================================

function validateOptionalNumber(
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

    const number =
        Number(value);

    if (
        !Number.isFinite(number)
    ) {
        throw new Error(
            `${fieldName} must be a valid number.`
        );
    }

    if (
        number < 0
    ) {
        throw new Error(
            `${fieldName} cannot be negative.`
        );
    }

    return number;
}


// ==========================================================
// VALIDATE REQUIRED POSITIVE NUMBER
// ==========================================================

function validatePositiveNumber(
    value,
    fieldName
) {

    const number =
        Number(value);

    if (
        !Number.isFinite(number) ||
        number <= 0
    ) {
        throw new Error(
            `${fieldName} must be greater than zero.`
        );
    }

    return number;
}


// ==========================================================
// NORMALIZE STATUS
// ==========================================================

function normalizeDisbursementStatus(
    status
) {

    if (
        status === undefined ||
        status === null ||
        String(status).trim() === ""
    ) {
        throw new Error(
            "Disbursement status is required."
        );
    }

    const normalized =
        String(status)
            .trim()
            .toUpperCase();

    if (
        !ALLOWED_DISBURSEMENT_STATUSES.includes(
            normalized
        )
    ) {
        throw new Error(
            "Invalid disbursement status."
        );
    }

    return normalized;
}


// ==========================================================
// NORMALIZE DISBURSEMENT TYPE
// ==========================================================

function normalizeDisbursementType(
    type
) {

    if (
        type === undefined ||
        type === null ||
        String(type).trim() === ""
    ) {
        return "FULL";
    }

    const normalized =
        String(type)
            .trim()
            .toUpperCase();

    if (
        !ALLOWED_DISBURSEMENT_TYPES.includes(
            normalized
        )
    ) {
        throw new Error(
            "Invalid disbursement type."
        );
    }

    return normalized;
}


// ==========================================================
// NORMALIZE MONEY
// ==========================================================

function normalizeMoney(
    value,
    fieldName,
    defaultValue = 0
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {
        return Number(
            Number(defaultValue).toFixed(2)
        );
    }

    const number =
        Number(value);

    if (
        !Number.isFinite(number)
    ) {
        throw new Error(
            `${fieldName} must be a valid number.`
        );
    }

    if (
        number < 0
    ) {
        throw new Error(
            `${fieldName} cannot be negative.`
        );
    }

    return Number(
        number.toFixed(2)
    );
}


// ==========================================================
// CALCULATE NET DISBURSEMENT
// ==========================================================

function calculateNetDisbursementAmount(
    disbursedAmount,
    processingFee = 0,
    insuranceAmount = 0,
    otherCharges = 0
) {

    const amount =
        normalizeMoney(
            disbursedAmount,
            "Disbursed amount"
        );

    const fee =
        normalizeMoney(
            processingFee,
            "Processing fee"
        );

    const insurance =
        normalizeMoney(
            insuranceAmount,
            "Insurance amount"
        );

    const charges =
        normalizeMoney(
            otherCharges,
            "Other charges"
        );

    const netAmount =
        amount -
        fee -
        insurance -
        charges;

    if (
        netAmount < 0
    ) {
        throw new Error(
            "Total charges cannot exceed the disbursed amount."
        );
    }

    return Number(
        netAmount.toFixed(2)
    );
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

    const date =
        new Date(value);

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
// FETCH ALL
// ==========================================================

export async function fetchAllLoanDisbursements() {

    return await getAllLoanDisbursements();

}


// ==========================================================
// FETCH BY ID
// ==========================================================

export async function fetchLoanDisbursementById(
    disbursementId
) {

    const id =
        validateId(
            disbursementId,
            "Loan disbursement ID"
        );

    return await getLoanDisbursementById(
        id
    );
}


// ==========================================================
// FETCH BY LOAN
// ==========================================================

export async function fetchLoanDisbursementsByLoanId(
    loanId
) {

    const id =
        validateId(
            loanId,
            "Loan ID"
        );

    return await getLoanDisbursementsByLoanId(
        id
    );
}


// ==========================================================
// FETCH BY APPLICATION
// ==========================================================

export async function fetchLoanDisbursementsByApplicationId(
    applicationId
) {

    const id =
        validateId(
            applicationId,
            "Loan application ID"
        );

    return await getLoanDisbursementsByApplicationId(
        id
    );
}


// ==========================================================
// FETCH BY OFFER
// ==========================================================

export async function fetchLoanDisbursementsByOfferId(
    offerId
) {

    const id =
        validateId(
            offerId,
            "Loan offer ID"
        );

    return await getLoanDisbursementsByOfferId(
        id
    );
}


// ==========================================================
// FETCH BY REFERENCE
// ==========================================================

export async function fetchLoanDisbursementByReference(
    disbursementReference
) {

    const reference =
        validateRequiredString(
            disbursementReference,
            "Disbursement reference"
        );

    return await getLoanDisbursementByReference(
        reference
    );
}


// ==========================================================
// FETCH BY DESTINATION ACCOUNT
// ==========================================================

export async function fetchLoanDisbursementsByAccountId(
    accountId
) {

    const id =
        validateId(
            accountId,
            "Destination account ID"
        );

    return await getLoanDisbursementsByAccountId(
        id
    );
}


// ==========================================================
// FETCH BY TRANSACTION
// ==========================================================

export async function fetchLoanDisbursementsByTransactionId(
    transactionId
) {

    const id =
        validateId(
            transactionId,
            "Transaction ID"
        );

    return await getLoanDisbursementsByTransactionId(
        id
    );
}


// ==========================================================
// FETCH BY STATUS
// ==========================================================

export async function fetchLoanDisbursementsByStatus(
    status
) {

    const normalizedStatus =
        normalizeDisbursementStatus(
            status
        );

    return await getLoanDisbursementsByStatus(
        normalizedStatus
    );
}


// ==========================================================
// CREATE LOAN DISBURSEMENT
// ==========================================================

export async function createNewLoanDisbursement(
    disbursementData
) {

    if (
        !disbursementData ||
        typeof disbursementData !== "object"
    ) {
        throw new Error(
            "Loan disbursement data is required."
        );
    }

    const {

        loan_id,
        loan_application_id,
        loan_offer_id,

        disbursement_reference,

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

        disbursement_status,

        failure_reason,

        requested_at,
        processed_at,
        disbursed_at,

        remarks,

        created_by_user_id

    } = disbursementData;


    const loanId =
        validateId(
            loan_id,
            "Loan ID"
        );


    const applicationId =
        validateId(
            loan_application_id,
            "Loan application ID"
        );


    const offerId =
        validateOptionalId(
            loan_offer_id,
            "Loan offer ID"
        );


    const destinationAccountId =
        validateOptionalId(
            destination_account_id,
            "Destination account ID"
        );


    const createdByUserId =
        validateOptionalId(
            created_by_user_id,
            "Created by user ID"
        );


    const reference =
        validateRequiredString(
            disbursement_reference,
            "Disbursement reference"
        );


    const existingReference =
        await getLoanDisbursementByReference(
            reference
        );


    if (
        existingReference
    ) {
        throw new Error(
            "Disbursement reference already exists."
        );
    }


    const requestedAmount =
        validatePositiveNumber(
            requested_amount,
            "Requested amount"
        );


    const approvedAmount =
        validateOptionalNumber(
            approved_amount,
            "Approved amount"
        );


    const disbursedAmount =
        validateOptionalNumber(
            disbursed_amount,
            "Disbursed amount"
        );


    if (
        approvedAmount !== null &&
        approvedAmount > requestedAmount
    ) {
        throw new Error(
            "Approved amount cannot exceed requested amount."
        );
    }


    if (
        disbursedAmount !== null &&
        approvedAmount !== null &&
        disbursedAmount > approvedAmount
    ) {
        throw new Error(
            "Disbursed amount cannot exceed approved amount."
        );
    }


    const normalizedType =
        normalizeDisbursementType(
            disbursement_type
        );


    if (
        normalizedType === "FULL" &&
        disbursedAmount !== null &&
        approvedAmount !== null &&
        disbursedAmount !== approvedAmount
    ) {
        throw new Error(
            "Full disbursement amount must match the approved amount."
        );
    }


    const processingFee =
        normalizeMoney(
            processing_fee,
            "Processing fee"
        );


    const insuranceAmount =
        normalizeMoney(
            insurance_amount,
            "Insurance amount"
        );


    const otherCharges =
        normalizeMoney(
            other_charges,
            "Other charges"
        );


    let netDisbursementAmount =
        null;


    if (
        disbursedAmount !== null
    ) {

        netDisbursementAmount =
            calculateNetDisbursementAmount(
                disbursedAmount,
                processingFee,
                insuranceAmount,
                otherCharges
            );

    }
    else if (
        net_disbursement_amount !== undefined &&
        net_disbursement_amount !== null
    ) {

        netDisbursementAmount =
            normalizeMoney(
                net_disbursement_amount,
                "Net disbursement amount"
            );

    }


    const normalizedStatus =
        disbursement_status
            ? normalizeDisbursementStatus(
                disbursement_status
            )
            : "REQUESTED";


    const failureReason =
        normalizeOptionalString(
            failure_reason
        );


    if (
        normalizedStatus === "FAILED" &&
        !failureReason
    ) {
        throw new Error(
            "Failure reason is required when disbursement status is FAILED."
        );
    }


    if (
        normalizedStatus === "COMPLETED" &&
        disbursedAmount === null
    ) {
        throw new Error(
            "Disbursed amount is required when disbursement is completed."
        );
    }


    const requestedAt =
        validateOptionalDate(
            requested_at,
            "Requested date"
        );


    const processedAt =
        validateOptionalDate(
            processed_at,
            "Processed date"
        );


    let disbursedAt =
        validateOptionalDate(
            disbursed_at,
            "Disbursed date"
        );


    if (
        normalizedStatus === "COMPLETED" &&
        !disbursedAt
    ) {
        disbursedAt =
            new Date();
    }


    const data = {

        loan_id:
            loanId,

        loan_application_id:
            applicationId,

        loan_offer_id:
            offerId,

        disbursement_reference:
            reference,

        requested_amount:
            requestedAmount,

        approved_amount:
            approvedAmount,

        disbursed_amount:
            disbursedAmount,

        disbursement_type:
            normalizedType,

        disbursement_method:
            normalizeOptionalString(
                disbursement_method
            ),

        destination_account_id:
            destinationAccountId,

        processing_fee:
            processingFee,

        insurance_amount:
            insuranceAmount,

        other_charges:
            otherCharges,

        net_disbursement_amount:
            netDisbursementAmount,

        transaction_id:
            validateOptionalId(
                transaction_id,
                "Transaction ID"
            ),

        disbursement_status:
            normalizedStatus,

        failure_reason:
            failureReason,

        requested_at:
            requestedAt,

        processed_at:
            processedAt,

        disbursed_at:
            disbursedAt,

        remarks:
            normalizeOptionalString(
                remarks
            ),

        created_by_user_id:
            createdByUserId

    };


    return await createLoanDisbursement(
        data
    );
}


// ==========================================================
// UPDATE EXISTING LOAN DISBURSEMENT
// ==========================================================

export async function updateExistingLoanDisbursement(
    disbursementId,
    disbursementData
) {

    const id =
        validateId(
            disbursementId,
            "Loan disbursement ID"
        );


    if (
        !disbursementData ||
        typeof disbursementData !== "object"
    ) {
        throw new Error(
            "Loan disbursement data is required."
        );
    }


    const existingDisbursement =
        await getLoanDisbursementById(
            id
        );


    if (
        !existingDisbursement
    ) {
        throw new Error(
            "Loan disbursement not found."
        );
    }


    if (
        [
            "COMPLETED",
            "CANCELLED"
        ].includes(
            existingDisbursement.disbursement_status
        )
    ) {
        throw new Error(
            `Loan disbursement cannot be updated from status ${existingDisbursement.disbursement_status}.`
        );
    }


    const {

        loan_offer_id,
        disbursement_reference,

        requested_amount,
        approved_amount,
        disbursed_amount,

        disbursement_type,
        disbursement_method,

        destination_account_id,

        processing_fee,
        insurance_amount,
        other_charges,

        transaction_id,

        failure_reason,

        requested_at,
        processed_at,
        disbursed_at,

        remarks

    } = disbursementData;


    const offerId =
        loan_offer_id !== undefined
            ? validateOptionalId(
                loan_offer_id,
                "Loan offer ID"
            )
            : existingDisbursement.loan_offer_id;


    const destinationAccountId =
        destination_account_id !== undefined
            ? validateOptionalId(
                destination_account_id,
                "Destination account ID"
            )
            : existingDisbursement.destination_account_id;


    const transactionId =
        transaction_id !== undefined
            ? validateOptionalId(
                transaction_id,
                "Transaction ID"
            )
            : existingDisbursement.transaction_id;


    let reference =
        existingDisbursement.disbursement_reference;


    if (
        disbursement_reference !== undefined
    ) {

        reference =
            validateRequiredString(
                disbursement_reference,
                "Disbursement reference"
            );


        if (
            reference !==
            existingDisbursement.disbursement_reference
        ) {

            const duplicateReference =
                await getLoanDisbursementByReference(
                    reference
                );


            if (
                duplicateReference &&
                Number(
                    duplicateReference.id
                ) !== id
            ) {
                throw new Error(
                    "Disbursement reference already exists."
                );
            }
        }
    }


    const requestedAmount =
        requested_amount !== undefined
            ? validatePositiveNumber(
                requested_amount,
                "Requested amount"
            )
            : Number(
                existingDisbursement.requested_amount
            );


    const approvedAmount =
        approved_amount !== undefined
            ? validateOptionalNumber(
                approved_amount,
                "Approved amount"
            )
            : existingDisbursement.approved_amount !== null
                ? Number(
                    existingDisbursement.approved_amount
                )
                : null;


    const disbursedAmount =
        disbursed_amount !== undefined
            ? validateOptionalNumber(
                disbursed_amount,
                "Disbursed amount"
            )
            : existingDisbursement.disbursed_amount !== null
                ? Number(
                    existingDisbursement.disbursed_amount
                )
                : null;


    if (
        approvedAmount !== null &&
        approvedAmount > requestedAmount
    ) {
        throw new Error(
            "Approved amount cannot exceed requested amount."
        );
    }


    if (
        disbursedAmount !== null &&
        approvedAmount !== null &&
        disbursedAmount > approvedAmount
    ) {
        throw new Error(
            "Disbursed amount cannot exceed approved amount."
        );
    }


    const normalizedType =
        disbursement_type !== undefined
            ? normalizeDisbursementType(
                disbursement_type
            )
            : normalizeDisbursementType(
                existingDisbursement.disbursement_type
            );


    const processingFee =
        processing_fee !== undefined
            ? normalizeMoney(
                processing_fee,
                "Processing fee"
            )
            : Number(
                existingDisbursement.processing_fee ?? 0
            );


    const insuranceAmount =
        insurance_amount !== undefined
            ? normalizeMoney(
                insurance_amount,
                "Insurance amount"
            )
            : Number(
                existingDisbursement.insurance_amount ?? 0
            );


    const otherCharges =
        other_charges !== undefined
            ? normalizeMoney(
                other_charges,
                "Other charges"
            )
            : Number(
                existingDisbursement.other_charges ?? 0
            );


    let netDisbursementAmount =
        existingDisbursement.net_disbursement_amount;


    if (
        disbursedAmount !== null
    ) {

        netDisbursementAmount =
            calculateNetDisbursementAmount(
                disbursedAmount,
                processingFee,
                insuranceAmount,
                otherCharges
            );
    }


    const failureReason =
        failure_reason !== undefined
            ? normalizeOptionalString(
                failure_reason
            )
            : existingDisbursement.failure_reason;


    const requestedAt =
        requested_at !== undefined
            ? validateOptionalDate(
                requested_at,
                "Requested date"
            )
            : existingDisbursement.requested_at;


    const processedAt =
        processed_at !== undefined
            ? validateOptionalDate(
                processed_at,
                "Processed date"
            )
            : existingDisbursement.processed_at;


    const disbursedAt =
        disbursed_at !== undefined
            ? validateOptionalDate(
                disbursed_at,
                "Disbursed date"
            )
            : existingDisbursement.disbursed_at;


    const updateData = {

        loan_offer_id:
            offerId,

        disbursement_reference:
            reference,

        requested_amount:
            requestedAmount,

        approved_amount:
            approvedAmount,

        disbursed_amount:
            disbursedAmount,

        disbursement_type:
            normalizedType,

        disbursement_method:
            disbursement_method !== undefined
                ? normalizeOptionalString(
                    disbursement_method
                )
                : existingDisbursement.disbursement_method,

        destination_account_id:
            destinationAccountId,

        processing_fee:
            processingFee,

        insurance_amount:
            insuranceAmount,

        other_charges:
            otherCharges,

        net_disbursement_amount:
            netDisbursementAmount,

        transaction_id:
            transactionId,

        failure_reason:
            failureReason,

        requested_at:
            requestedAt,

        processed_at:
            processedAt,

        disbursed_at:
            disbursedAt,

        remarks:
            remarks !== undefined
                ? normalizeOptionalString(
                    remarks
                )
                : existingDisbursement.remarks

    };


    return await updateLoanDisbursement(
        id,
        updateData
    );
}


// ==========================================================
// CHANGE DISBURSEMENT STATUS
// ==========================================================

export async function changeLoanDisbursementStatus(
    disbursementId,
    status
) {

    const id =
        validateId(
            disbursementId,
            "Loan disbursement ID"
        );


    const normalizedStatus =
        normalizeDisbursementStatus(
            status
        );


    const existingDisbursement =
        await getLoanDisbursementById(
            id
        );


    if (
        !existingDisbursement
    ) {
        throw new Error(
            "Loan disbursement not found."
        );
    }


    const currentStatus =
        existingDisbursement.disbursement_status;


    if (
        [
            "COMPLETED",
            "CANCELLED"
        ].includes(
            currentStatus
        )
    ) {
        throw new Error(
            `Loan disbursement cannot change from status ${currentStatus}.`
        );
    }


    const allowedTransitions = {

        REQUESTED: [
            "PROCESSING",
            "CANCELLED"
        ],

        PROCESSING: [
            "COMPLETED",
            "FAILED",
            "CANCELLED"
        ],

        FAILED: [
            "PROCESSING",
            "CANCELLED"
        ]

    };


    const allowedNextStatuses =
        allowedTransitions[
        currentStatus
        ] || [];


    if (
        !allowedNextStatuses.includes(
            normalizedStatus
        )
    ) {
        throw new Error(
            `Loan disbursement cannot change from ${currentStatus} to ${normalizedStatus}.`
        );
    }


    return await updateLoanDisbursementStatus(
        id,
        normalizedStatus
    );
}


// ==========================================================
// START PROCESSING
// ==========================================================

export async function startLoanDisbursementProcessing(
    disbursementId
) {

    return await changeLoanDisbursementStatus(
        disbursementId,
        "PROCESSING"
    );
}


// ==========================================================
// MARK DISBURSEMENT AS PROCESSED
// ==========================================================
//
// Processed means the disbursement has successfully completed
// internal processing and is ready for final disbursement.
//
// Existing model has no dedicated status called PROCESSED.
// Therefore this function keeps the lifecycle compatible by
// moving REQUESTED -> PROCESSING and updating processed_at.
//
// ==========================================================

export async function markLoanDisbursementProcessed(
    disbursementId
) {

    const id =
        validateId(
            disbursementId,
            "Loan disbursement ID"
        );


    const existingDisbursement =
        await getLoanDisbursementById(
            id
        );


    if (
        !existingDisbursement
    ) {
        throw new Error(
            "Loan disbursement not found."
        );
    }


    if (
        [
            "COMPLETED",
            "CANCELLED"
        ].includes(
            existingDisbursement.disbursement_status
        )
    ) {
        throw new Error(
            `Loan disbursement cannot be processed from status ${existingDisbursement.disbursement_status}.`
        );
    }


    const result =
        await updateLoanDisbursement(
            id,
            {

                loan_offer_id:
                    existingDisbursement.loan_offer_id,

                disbursement_reference:
                    existingDisbursement.disbursement_reference,

                requested_amount:
                    existingDisbursement.requested_amount,

                approved_amount:
                    existingDisbursement.approved_amount,

                disbursed_amount:
                    existingDisbursement.disbursed_amount,

                disbursement_type:
                    existingDisbursement.disbursement_type,

                disbursement_method:
                    existingDisbursement.disbursement_method,

                destination_account_id:
                    existingDisbursement.destination_account_id,

                processing_fee:
                    existingDisbursement.processing_fee ?? 0,

                insurance_amount:
                    existingDisbursement.insurance_amount ?? 0,

                other_charges:
                    existingDisbursement.other_charges ?? 0,

                net_disbursement_amount:
                    existingDisbursement.net_disbursement_amount,

                transaction_id:
                    existingDisbursement.transaction_id,

                failure_reason:
                    existingDisbursement.failure_reason,

                requested_at:
                    existingDisbursement.requested_at,

                processed_at:
                    new Date(),

                disbursed_at:
                    existingDisbursement.disbursed_at,

                remarks:
                    existingDisbursement.remarks

            }
        );


    return result;
}


// ==========================================================
// MARK DISBURSEMENT AS DISBURSED
// ==========================================================

export async function markLoanDisbursed(
    disbursementId
) {

    const id =
        validateId(
            disbursementId,
            "Loan disbursement ID"
        );


    const existingDisbursement =
        await getLoanDisbursementById(
            id
        );


    if (
        !existingDisbursement
    ) {
        throw new Error(
            "Loan disbursement not found."
        );
    }


    if (
        existingDisbursement.disbursed_amount === null ||
        existingDisbursement.disbursed_amount === undefined
    ) {
        throw new Error(
            "Disbursed amount is required before marking the loan as disbursed."
        );
    }


    const result =
        await updateLoanDisbursement(
            id,
            {

                loan_offer_id:
                    existingDisbursement.loan_offer_id,

                disbursement_reference:
                    existingDisbursement.disbursement_reference,

                requested_amount:
                    existingDisbursement.requested_amount,

                approved_amount:
                    existingDisbursement.approved_amount,

                disbursed_amount:
                    existingDisbursement.disbursed_amount,

                disbursement_type:
                    existingDisbursement.disbursement_type,

                disbursement_method:
                    existingDisbursement.disbursement_method,

                destination_account_id:
                    existingDisbursement.destination_account_id,

                processing_fee:
                    existingDisbursement.processing_fee ?? 0,

                insurance_amount:
                    existingDisbursement.insurance_amount ?? 0,

                other_charges:
                    existingDisbursement.other_charges ?? 0,

                net_disbursement_amount:
                    existingDisbursement.net_disbursement_amount,

                transaction_id:
                    existingDisbursement.transaction_id,

                failure_reason:
                    null,

                requested_at:
                    existingDisbursement.requested_at,

                processed_at:
                    existingDisbursement.processed_at ??
                    new Date(),

                disbursed_at:
                    new Date(),

                remarks:
                    existingDisbursement.remarks

            }
        );


    const statusResult =
        await updateLoanDisbursementStatus(
            id,
            "COMPLETED"
        );


    return {
        ...result,
        affectedRows:
            statusResult.affectedRows
    };
}


// ==========================================================
// FAIL DISBURSEMENT
// ==========================================================

export async function failLoanDisbursement(
    disbursementId,
    failureReason
) {

    const id =
        validateId(
            disbursementId,
            "Loan disbursement ID"
        );


    const reason =
        validateRequiredString(
            failureReason,
            "Failure reason"
        );


    const existingDisbursement =
        await getLoanDisbursementById(
            id
        );


    if (
        !existingDisbursement
    ) {
        throw new Error(
            "Loan disbursement not found."
        );
    }


    if (
        [
            "COMPLETED",
            "CANCELLED"
        ].includes(
            existingDisbursement.disbursement_status
        )
    ) {
        throw new Error(
            `Loan disbursement cannot be failed from status ${existingDisbursement.disbursement_status}.`
        );
    }


    await updateLoanDisbursement(
        id,
        {

            loan_offer_id:
                existingDisbursement.loan_offer_id,

            disbursement_reference:
                existingDisbursement.disbursement_reference,

            requested_amount:
                existingDisbursement.requested_amount,

            approved_amount:
                existingDisbursement.approved_amount,

            disbursed_amount:
                existingDisbursement.disbursed_amount,

            disbursement_type:
                existingDisbursement.disbursement_type,

            disbursement_method:
                existingDisbursement.disbursement_method,

            destination_account_id:
                existingDisbursement.destination_account_id,

            processing_fee:
                existingDisbursement.processing_fee ?? 0,

            insurance_amount:
                existingDisbursement.insurance_amount ?? 0,

            other_charges:
                existingDisbursement.other_charges ?? 0,

            net_disbursement_amount:
                existingDisbursement.net_disbursement_amount,

            transaction_id:
                existingDisbursement.transaction_id,

            failure_reason:
                reason,

            requested_at:
                existingDisbursement.requested_at,

            processed_at:
                existingDisbursement.processed_at,

            disbursed_at:
                existingDisbursement.disbursed_at,

            remarks:
                existingDisbursement.remarks

        }
    );


    return await updateLoanDisbursementStatus(
        id,
        "FAILED"
    );
}


// ==========================================================
// CANCEL DISBURSEMENT
// ==========================================================

export async function cancelLoanDisbursement(
    disbursementId
) {

    return await changeLoanDisbursementStatus(
        disbursementId,
        "CANCELLED"
    );
}


// ==========================================================
// REVERSE DISBURSEMENT
// ==========================================================
//
// IMPORTANT:
// Current database/model does not define a REVERSED status.
// Therefore we do NOT invent a new database status.
//
// A completed disbursement cannot be moved backward.
// This function intentionally rejects reversal until a proper
// reversal workflow/table/status is introduced.
//
// ==========================================================

export async function reverseLoanDisbursement(
    disbursementId
) {

    const id =
        validateId(
            disbursementId,
            "Loan disbursement ID"
        );


    const existingDisbursement =
        await getLoanDisbursementById(
            id
        );


    if (
        !existingDisbursement
    ) {
        throw new Error(
            "Loan disbursement not found."
        );
    }


    throw new Error(
        "Loan disbursement reversal is not supported by the current disbursement lifecycle."
    );
}


// ==========================================================
// DELETE LOAN DISBURSEMENT
// ==========================================================

export async function removeLoanDisbursement(
    disbursementId
) {

    const id =
        validateId(
            disbursementId,
            "Loan disbursement ID"
        );


    const existingDisbursement =
        await getLoanDisbursementById(
            id
        );


    if (
        !existingDisbursement
    ) {
        throw new Error(
            "Loan disbursement not found."
        );
    }


    if (
        [
            "PROCESSING",
            "COMPLETED"
        ].includes(
            existingDisbursement.disbursement_status
        )
    ) {
        throw new Error(
            `Loan disbursement cannot be deleted from status ${existingDisbursement.disbursement_status}.`
        );
    }


    return await deleteLoanDisbursement(
        id
    );
}


// ==========================================================
// EXPORT CONSTANTS
// ==========================================================

export {
    ALLOWED_DISBURSEMENT_STATUSES,
    ALLOWED_DISBURSEMENT_TYPES,
    calculateNetDisbursementAmount
};

