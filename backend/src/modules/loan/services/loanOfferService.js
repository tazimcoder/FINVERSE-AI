/**
 * ==========================================================
 * FINVERSE AI
 * Loan Offer Service
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/services/loanOfferService.js
 *
 * Responsibility:
 *
 * - Business logic for loan offers
 * - Validate loan offer data
 * - Fetch loan offers
 * - Fetch latest loan offer
 * - Create loan offers
 * - Update loan offers
 * - Manage offer status
 * - Accept loan offers
 * - Reject loan offers
 * - Withdraw loan offers
 * - Expire loan offers
 * - Delete loan offers
 *
 * ==========================================================
 */

import {
    getAllLoanOffers,
    getLoanOfferById,
    getLoanOffersByApplicationId,
    getLoanOffersByUserId,
    getLoanOffersByStatus,
    createLoanOffer,
    updateLoanOffer,
    updateLoanOfferStatus,
    deleteLoanOffer
} from "../models/loanOfferModel.js";


// ==========================================================
// CONSTANTS
// ==========================================================

const ALLOWED_OFFER_STATUSES = [
    "GENERATED",
    "PENDING_ACCEPTANCE",
    "ACCEPTED",
    "REJECTED",
    "EXPIRED",
    "WITHDRAWN",
    "SUPERSEDED"
];


const ALLOWED_PROCESSING_FEE_TYPES = [
    "FIXED",
    "PERCENTAGE"
];


// ==========================================================
// UTILITY - VALIDATE REQUIRED ID
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


    const numericValue =
        Number(value);


    if (
        !Number.isInteger(
            numericValue
        ) ||
        numericValue <= 0
    ) {

        throw new Error(
            `${fieldName} must be a valid positive integer.`
        );

    }


    return numericValue;

}


// ==========================================================
// UTILITY - VALIDATE NUMBER
// ==========================================================

function validateNumber(
    value,
    fieldName,
    allowZero = true
) {

    const numericValue =
        Number(value);


    if (
        !Number.isFinite(
            numericValue
        )
    ) {

        throw new Error(
            `${fieldName} must be a valid number.`
        );

    }


    if (
        allowZero
            ? numericValue < 0
            : numericValue <= 0
    ) {

        throw new Error(
            `${fieldName} must be ${allowZero
                ? "greater than or equal to zero"
                : "greater than zero"
            }.`
        );

    }


    return numericValue;

}


// ==========================================================
// UTILITY - VALIDATE POSITIVE INTEGER
// ==========================================================

function validatePositiveInteger(
    value,
    fieldName
) {

    const numericValue =
        Number(value);


    if (
        !Number.isInteger(
            numericValue
        ) ||
        numericValue <= 0
    ) {

        throw new Error(
            `${fieldName} must be a valid positive integer.`
        );

    }


    return numericValue;

}


// ==========================================================
// UTILITY - NORMALIZE STATUS
// ==========================================================

function normalizeOfferStatus(
    status
) {

    if (!status) {

        throw new Error(
            "Offer status is required."
        );

    }


    const normalizedStatus =
        String(
            status
        )
            .trim()
            .toUpperCase();


    if (
        !ALLOWED_OFFER_STATUSES.includes(
            normalizedStatus
        )
    ) {

        throw new Error(
            "Invalid loan offer status."
        );

    }


    return normalizedStatus;

}


// ==========================================================
// UTILITY - NORMALIZE PROCESSING FEE TYPE
// ==========================================================

function normalizeProcessingFeeType(
    feeType
) {

    if (
        feeType === undefined ||
        feeType === null ||
        feeType === ""
    ) {

        return null;

    }


    const normalizedType =
        String(
            feeType
        )
            .trim()
            .toUpperCase();


    if (
        !ALLOWED_PROCESSING_FEE_TYPES.includes(
            normalizedType
        )
    ) {

        throw new Error(
            "Invalid processing fee type."
        );

    }


    return normalizedType;

}


// ==========================================================
// UTILITY - VALIDATE OPTIONAL DATE
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
        new Date(
            value
        );


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
// UTILITY - VALIDATE OFFER VALID UNTIL
// ==========================================================

function validateValidUntil(
    value
) {

    const validUntil =
        validateOptionalDate(
            value,
            "Offer valid until"
        );


    if (
        !validUntil
    ) {

        return null;

    }


    const validUntilDate =
        new Date(
            validUntil
        );


    if (
        validUntilDate <= new Date()
    ) {

        throw new Error(
            "Offer valid until must be a future date."
        );

    }


    return validUntil;

}


// ==========================================================
// UTILITY - CALCULATE PROCESSING FEE
// ==========================================================

function calculateProcessingFee(
    offeredAmount,
    processingFeeType,
    processingFeeValue
) {

    if (
        processingFeeType === null ||
        processingFeeValue === null ||
        processingFeeValue === undefined
    ) {

        return 0;

    }


    const amount =
        validateNumber(
            offeredAmount,
            "Offered amount",
            false
        );


    const feeValue =
        validateNumber(
            processingFeeValue,
            "Processing fee value"
        );


    if (
        processingFeeType === "FIXED"
    ) {

        return Number(
            feeValue.toFixed(2)
        );

    }


    if (
        processingFeeType === "PERCENTAGE"
    ) {

        if (
            feeValue > 100
        ) {

            throw new Error(
                "Processing fee percentage cannot exceed 100."
            );

        }


        return Number(
            (
                amount *
                feeValue /
                100
            ).toFixed(2)
        );

    }


    return 0;

}


// ==========================================================
// UTILITY - CALCULATE NET DISBURSEMENT
// ==========================================================

function calculateNetDisbursementAmount(
    offeredAmount,
    processingFeeAmount,
    insuranceAmount,
    otherCharges
) {

    const amount =
        validateNumber(
            offeredAmount,
            "Offered amount",
            false
        );


    const processingFee =
        validateNumber(
            processingFeeAmount ?? 0,
            "Processing fee amount"
        );


    const insurance =
        validateNumber(
            insuranceAmount ?? 0,
            "Insurance amount"
        );


    const charges =
        validateNumber(
            otherCharges ?? 0,
            "Other charges"
        );


    const netAmount =
        amount -
        processingFee -
        insurance -
        charges;


    if (
        netAmount < 0
    ) {

        throw new Error(
            "Total charges cannot exceed the offered loan amount."
        );

    }


    return Number(
        netAmount.toFixed(2)
    );

}


// ==========================================================
// UTILITY - CALCULATE EMI
// ==========================================================
//
// EMI = P × r × (1+r)^n / ((1+r)^n - 1)
//
// P = Principal
// r = Monthly interest rate
// n = Tenure in months
//
// ==========================================================

function calculateEMI(
    principal,
    annualInterestRate,
    tenureMonths
) {

    const amount =
        validateNumber(
            principal,
            "Offered amount",
            false
        );


    const annualRate =
        validateNumber(
            annualInterestRate,
            "Interest rate"
        );


    const tenure =
        validatePositiveInteger(
            tenureMonths,
            "Tenure months"
        );


    if (
        annualRate === 0
    ) {

        return Number(
            (
                amount /
                tenure
            ).toFixed(2)
        );

    }


    const monthlyRate =
        annualRate /
        12 /
        100;


    const power =
        Math.pow(
            1 + monthlyRate,
            tenure
        );


    const emi =
        amount *
        monthlyRate *
        power /
        (
            power - 1
        );


    return Number(
        emi.toFixed(2)
    );

}


// ==========================================================
// FETCH ALL LOAN OFFERS
// ==========================================================

export async function fetchAllLoanOffers() {

    return await getAllLoanOffers();

}


// ==========================================================
// FETCH LOAN OFFER BY ID
// ==========================================================

export async function fetchLoanOfferById(
    offerId
) {

    const id =
        validateId(
            offerId,
            "Loan offer ID"
        );


    return await getLoanOfferById(
        id
    );

}


// ==========================================================
// FETCH OFFERS BY APPLICATION
// ==========================================================

export async function fetchLoanOffersByApplicationId(
    applicationId
) {

    const id =
        validateId(
            applicationId,
            "Loan application ID"
        );


    return await getLoanOffersByApplicationId(
        id
    );

}


// ==========================================================
// GET LATEST LOAN OFFER BY APPLICATION ID
// ==========================================================

export async function getLatestLoanOfferByApplicationId(
    applicationId
) {

    const id =
        validateId(
            applicationId,
            "Loan application ID"
        );


    const offers =
        await getLoanOffersByApplicationId(
            id
        );


    if (
        !offers
    ) {

        return null;

    }


    if (
        !Array.isArray(
            offers
        )
    ) {

        return offers;

    }


    if (
        offers.length === 0
    ) {

        return null;

    }


    const sortedOffers =
        [...offers].sort(
            (
                firstOffer,
                secondOffer
            ) => {

                const firstDate =
                    firstOffer?.created_at
                        ? new Date(
                            firstOffer.created_at
                        ).getTime()
                        : 0;


                const secondDate =
                    secondOffer?.created_at
                        ? new Date(
                            secondOffer.created_at
                        ).getTime()
                        : 0;


                if (
                    firstDate !==
                    secondDate
                ) {

                    return (
                        secondDate -
                        firstDate
                    );

                }


                const firstUpdatedDate =
                    firstOffer?.updated_at
                        ? new Date(
                            firstOffer.updated_at
                        ).getTime()
                        : 0;


                const secondUpdatedDate =
                    secondOffer?.updated_at
                        ? new Date(
                            secondOffer.updated_at
                        ).getTime()
                        : 0;


                if (
                    firstUpdatedDate !==
                    secondUpdatedDate
                ) {

                    return (
                        secondUpdatedDate -
                        firstUpdatedDate
                    );

                }


                return (
                    Number(
                        secondOffer?.id || 0
                    ) -
                    Number(
                        firstOffer?.id || 0
                    )
                );

            }
        );


    return (
        sortedOffers[0] ||
        null
    );

}


// ==========================================================
// FETCH OFFERS BY USER
// ==========================================================

export async function fetchLoanOffersByUserId(
    userId
) {

    const id =
        validateId(
            userId,
            "User ID"
        );


    return await getLoanOffersByUserId(
        id
    );

}


// ==========================================================
// FETCH OFFERS BY STATUS
// ==========================================================

export async function fetchLoanOffersByStatus(
    status
) {

    const normalizedStatus =
        normalizeOfferStatus(
            status
        );


    return await getLoanOffersByStatus(
        normalizedStatus
    );

}


// ==========================================================
// CREATE NEW LOAN OFFER
// ==========================================================

export async function createNewLoanOffer(
    offerData
) {

    if (
        !offerData ||
        typeof offerData !== "object"
    ) {

        throw new Error(
            "Loan offer data is required."
        );

    }


    const {
        loan_application_id,
        loan_product_id,
        user_id,
        offer_reference,
        offered_amount,
        interest_rate,
        tenure_months,
        processing_fee_type,
        processing_fee_value,
        insurance_amount,
        other_charges,
        offer_status,
        valid_from,
        valid_until,
        terms_and_conditions,
        created_by_user_id
    } = offerData;


    // ======================================================
    // VALIDATE IDs
    // ======================================================

    const applicationId =
        validateId(
            loan_application_id,
            "Loan application ID"
        );


    const productId =
        validateId(
            loan_product_id,
            "Loan product ID"
        );


    const userId =
        validateId(
            user_id,
            "User ID"
        );


    // ======================================================
    // VALIDATE OFFER REFERENCE
    // ======================================================

    if (
        !offer_reference ||
        String(
            offer_reference
        ).trim() === ""
    ) {

        throw new Error(
            "Offer reference is required."
        );

    }


    // ======================================================
    // VALIDATE OFFERED AMOUNT
    // ======================================================

    const amount =
        validateNumber(
            offered_amount,
            "Offered amount",
            false
        );


    // ======================================================
    // VALIDATE INTEREST RATE
    // ======================================================

    const interestRate =
        validateNumber(
            interest_rate,
            "Interest rate"
        );


    // ======================================================
    // VALIDATE TENURE
    // ======================================================

    const tenure =
        validatePositiveInteger(
            tenure_months,
            "Tenure months"
        );


    // ======================================================
    // PROCESSING FEE
    // ======================================================

    const processingFeeType =
        normalizeProcessingFeeType(
            processing_fee_type
        );


    let processingFeeValue =
        null;


    if (
        processing_fee_value !== undefined &&
        processing_fee_value !== null
    ) {

        processingFeeValue =
            validateNumber(
                processing_fee_value,
                "Processing fee value"
            );

    }


    const processingFeeAmount =
        calculateProcessingFee(
            amount,
            processingFeeType,
            processingFeeValue
        );


    // ======================================================
    // ADDITIONAL CHARGES
    // ======================================================

    const insuranceAmount =
        validateNumber(
            insurance_amount ?? 0,
            "Insurance amount"
        );


    const otherCharges =
        validateNumber(
            other_charges ?? 0,
            "Other charges"
        );


    // ======================================================
    // CALCULATE EMI
    // ======================================================

    const emiAmount =
        calculateEMI(
            amount,
            interestRate,
            tenure
        );


    // ======================================================
    // CALCULATE NET DISBURSEMENT
    // ======================================================

    const netDisbursementAmount =
        calculateNetDisbursementAmount(
            amount,
            processingFeeAmount,
            insuranceAmount,
            otherCharges
        );


    // ======================================================
    // STATUS
    // ======================================================

    const normalizedStatus =
        offer_status
            ? normalizeOfferStatus(
                offer_status
            )
            : "GENERATED";


    // ======================================================
    // VALIDATE DATES
    // ======================================================

    const validFrom =
        validateOptionalDate(
            valid_from,
            "Offer valid from"
        );


    const validUntil =
        validateValidUntil(
            valid_until
        );


    if (
        validFrom &&
        validUntil
    ) {

        const fromDate =
            new Date(
                validFrom
            );


        const untilDate =
            new Date(
                validUntil
            );


        if (
            untilDate <= fromDate
        ) {

            throw new Error(
                "Offer valid until must be later than offer valid from."
            );

        }

    }


    // ======================================================
    // VALIDATE CREATED BY USER
    // ======================================================

    let createdByUserId =
        null;


    if (
        created_by_user_id !== undefined &&
        created_by_user_id !== null
    ) {

        createdByUserId =
            validateId(
                created_by_user_id,
                "Created by user ID"
            );

    }


    // ======================================================
    // PREPARE DATA
    // ======================================================

    const data = {

        loan_application_id:
            applicationId,

        loan_product_id:
            productId,

        user_id:
            userId,

        offer_reference:
            String(
                offer_reference
            ).trim(),

        offered_amount:
            amount,

        interest_rate:
            interestRate,

        tenure_months:
            tenure,

        emi_amount:
            emiAmount,

        processing_fee_type:
            processingFeeType,

        processing_fee_value:
            processingFeeValue,

        processing_fee_amount:
            processingFeeAmount,

        insurance_amount:
            insuranceAmount,

        other_charges:
            otherCharges,

        net_disbursement_amount:
            netDisbursementAmount,

        offer_status:
            normalizedStatus,

        valid_from:
            validFrom,

        valid_until:
            validUntil,

        terms_and_conditions:
            terms_and_conditions ??
            null,

        created_by_user_id:
            createdByUserId

    };


    return await createLoanOffer(
        data
    );

}


// ==========================================================
// UPDATE EXISTING LOAN OFFER
// ==========================================================

export async function updateExistingLoanOffer(
    offerId,
    offerData
) {

    const id =
        validateId(
            offerId,
            "Loan offer ID"
        );


    if (
        !offerData ||
        typeof offerData !== "object"
    ) {

        throw new Error(
            "Loan offer data is required."
        );

    }


    const existingOffer =
        await getLoanOfferById(
            id
        );


    if (
        !existingOffer
    ) {

        throw new Error(
            "Loan offer not found."
        );

    }


    const {
        loan_product_id,
        offered_amount,
        interest_rate,
        tenure_months,
        processing_fee_type,
        processing_fee_value,
        insurance_amount,
        other_charges,
        terms_and_conditions,
        valid_until
    } = offerData;


    // ======================================================
    // LOAN PRODUCT
    // ======================================================

    const productId =
        loan_product_id !== undefined
            ? validateId(
                loan_product_id,
                "Loan product ID"
            )
            : Number(
                existingOffer.loan_product_id
            );


    // ======================================================
    // OFFER AMOUNT
    // ======================================================

    const amount =
        offered_amount !== undefined
            ? validateNumber(
                offered_amount,
                "Offered amount",
                false
            )
            : Number(
                existingOffer.offered_amount
            );


    // ======================================================
    // INTEREST RATE
    // ======================================================

    const interestRate =
        interest_rate !== undefined
            ? validateNumber(
                interest_rate,
                "Interest rate"
            )
            : Number(
                existingOffer.interest_rate
            );


    // ======================================================
    // TENURE
    // ======================================================

    const tenure =
        tenure_months !== undefined
            ? validatePositiveInteger(
                tenure_months,
                "Tenure months"
            )
            : Number(
                existingOffer.tenure_months
            );


    // ======================================================
    // PROCESSING FEE TYPE
    // ======================================================

    const feeType =
        processing_fee_type !== undefined
            ? normalizeProcessingFeeType(
                processing_fee_type
            )
            : existingOffer.processing_fee_type;


    // ======================================================
    // PROCESSING FEE VALUE
    // ======================================================

    const feeValue =
        processing_fee_value !== undefined
            ? validateNumber(
                processing_fee_value,
                "Processing fee value"
            )
            : existingOffer.processing_fee_value;


    // ======================================================
    // INSURANCE
    // ======================================================

    const insuranceAmount =
        insurance_amount !== undefined
            ? validateNumber(
                insurance_amount,
                "Insurance amount"
            )
            : Number(
                existingOffer.insurance_amount ?? 0
            );


    // ======================================================
    // OTHER CHARGES
    // ======================================================

    const otherCharges =
        other_charges !== undefined
            ? validateNumber(
                other_charges,
                "Other charges"
            )
            : Number(
                existingOffer.other_charges ?? 0
            );


    // ======================================================
    // CALCULATE PROCESSING FEE
    // ======================================================

    const processingFeeAmount =
        calculateProcessingFee(
            amount,
            feeType,
            feeValue
        );


    // ======================================================
    // CALCULATE NET DISBURSEMENT
    // ======================================================

    const netDisbursementAmount =
        calculateNetDisbursementAmount(
            amount,
            processingFeeAmount,
            insuranceAmount,
            otherCharges
        );


    // ======================================================
    // CALCULATE EMI
    // ======================================================

    const emiAmount =
        calculateEMI(
            amount,
            interestRate,
            tenure
        );


    // ======================================================
    // VALIDATE VALID UNTIL
    // ======================================================

    const finalValidUntil =
        valid_until !== undefined
            ? validateValidUntil(
                valid_until
            )
            : existingOffer.valid_until;


    // ======================================================
    // PREPARE UPDATE DATA
    // ======================================================

    const updateData = {

        loan_product_id:
            productId,

        offered_amount:
            amount,

        interest_rate:
            interestRate,

        tenure_months:
            tenure,

        emi_amount:
            emiAmount,

        processing_fee_type:
            feeType,

        processing_fee_value:
            feeValue,

        processing_fee_amount:
            processingFeeAmount,

        insurance_amount:
            insuranceAmount,

        other_charges:
            otherCharges,

        net_disbursement_amount:
            netDisbursementAmount,

        valid_until:
            finalValidUntil,

        terms_and_conditions:
            terms_and_conditions !== undefined
                ? terms_and_conditions
                : existingOffer.terms_and_conditions

    };


    return await updateLoanOffer(
        id,
        updateData
    );

}


// ==========================================================
// CHANGE LOAN OFFER STATUS
// ==========================================================

export async function changeLoanOfferStatus(
    offerId,
    status,
    rejectionReason = null
) {

    const id =
        validateId(
            offerId,
            "Loan offer ID"
        );


    const normalizedStatus =
        normalizeOfferStatus(
            status
        );


    const existingOffer =
        await getLoanOfferById(
            id
        );


    if (
        !existingOffer
    ) {

        throw new Error(
            "Loan offer not found."
        );

    }


    if (
        normalizedStatus === "REJECTED" &&
        (
            !rejectionReason ||
            String(
                rejectionReason
            ).trim() === ""
        )
    ) {

        throw new Error(
            "Rejection reason is required when rejecting a loan offer."
        );

    }


    return await updateLoanOfferStatus(
        id,
        normalizedStatus,
        rejectionReason
    );

}


// ==========================================================
// ACCEPT LOAN OFFER
// ==========================================================

export async function acceptLoanOffer(
    offerId
) {

    const id =
        validateId(
            offerId,
            "Loan offer ID"
        );


    const existingOffer =
        await getLoanOfferById(
            id
        );


    if (
        !existingOffer
    ) {

        throw new Error(
            "Loan offer not found."
        );

    }


    if (
        ![
            "GENERATED",
            "PENDING_ACCEPTANCE"
        ].includes(
            existingOffer.offer_status
        )
    ) {

        throw new Error(
            `Loan offer cannot be accepted from status ${existingOffer.offer_status}.`
        );

    }


    // ======================================================
    // CHECK OFFER EXPIRY
    // ======================================================

    if (
        existingOffer.valid_until
    ) {

        const validUntil =
            new Date(
                existingOffer.valid_until
            );


        if (
            Number.isNaN(
                validUntil.getTime()
            )
        ) {

            throw new Error(
                "Loan offer has an invalid expiry date."
            );

        }


        if (
            validUntil <= new Date()
        ) {

            throw new Error(
                "Loan offer has expired and cannot be accepted."
            );

        }

    }


    return await updateLoanOfferStatus(
        id,
        "ACCEPTED",
        null
    );

}


// ==========================================================
// REJECT LOAN OFFER
// ==========================================================

export async function rejectLoanOffer(
    offerId,
    rejectionReason
) {

    return await changeLoanOfferStatus(
        offerId,
        "REJECTED",
        rejectionReason
    );

}


// ==========================================================
// WITHDRAW LOAN OFFER
// ==========================================================

export async function withdrawLoanOffer(
    offerId,
    reason = null
) {

    const id =
        validateId(
            offerId,
            "Loan offer ID"
        );


    const existingOffer =
        await getLoanOfferById(
            id
        );


    if (
        !existingOffer
    ) {

        throw new Error(
            "Loan offer not found."
        );

    }


    if (
        [
            "ACCEPTED",
            "REJECTED",
            "EXPIRED",
            "SUPERSEDED"
        ].includes(
            existingOffer.offer_status
        )
    ) {

        throw new Error(
            `Loan offer cannot be withdrawn from status ${existingOffer.offer_status}.`
        );

    }


    return await updateLoanOfferStatus(
        id,
        "WITHDRAWN",
        reason
    );

}


// ==========================================================
// EXPIRE LOAN OFFER
// ==========================================================

export async function expireLoanOffer(
    offerId
) {

    const id =
        validateId(
            offerId,
            "Loan offer ID"
        );


    const existingOffer =
        await getLoanOfferById(
            id
        );


    if (
        !existingOffer
    ) {

        throw new Error(
            "Loan offer not found."
        );

    }


    if (
        [
            "ACCEPTED",
            "REJECTED",
            "WITHDRAWN",
            "SUPERSEDED"
        ].includes(
            existingOffer.offer_status
        )
    ) {

        throw new Error(
            `Loan offer cannot be expired from status ${existingOffer.offer_status}.`
        );

    }


    return await updateLoanOfferStatus(
        id,
        "EXPIRED",
        null
    );

}


// ==========================================================
// DELETE LOAN OFFER
// ==========================================================

export async function removeLoanOffer(
    offerId
) {

    const id =
        validateId(
            offerId,
            "Loan offer ID"
        );


    const existingOffer =
        await getLoanOfferById(
            id
        );


    if (
        !existingOffer
    ) {

        throw new Error(
            "Loan offer not found."
        );

    }


    if (
        existingOffer.offer_status ===
        "ACCEPTED"
    ) {

        throw new Error(
            "Accepted loan offer cannot be deleted."
        );

    }


    return await deleteLoanOffer(
        id
    );

}


// ==========================================================
// EXPORT UTILITIES
// ==========================================================

export {
    calculateEMI,
    calculateProcessingFee,
    calculateNetDisbursementAmount,
    ALLOWED_OFFER_STATUSES,
    ALLOWED_PROCESSING_FEE_TYPES
};

