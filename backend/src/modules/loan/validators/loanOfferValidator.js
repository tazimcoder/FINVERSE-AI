/**
 * ==========================================================
 * FINVERSE AI
 * Loan Offer Validator
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/validators/loanOfferValidator.js
 *
 * Responsibility:
 *
 * - Validate loan offer payloads
 * - Validate loan application relationship
 * - Validate loan relationship
 * - Validate loan product relationship
 * - Validate offer amounts
 * - Validate interest rate
 * - Validate tenure
 * - Validate EMI
 * - Validate processing fee
 * - Validate other charges
 * - Validate offer validity dates
 * - Validate offer status
 * - Validate acceptance / rejection information
 * - Validate offer remarks
 *
 * FLOW:
 *
 * LOAN APPLICATION
 *        ↓
 * ELIGIBILITY
 *        ↓
 * VERIFICATION
 *        ↓
 * APPROVAL
 *        ↓
 * LOAN OFFER
 *        ↓
 * ACCEPTED
 *        ↓
 * LOAN DISBURSEMENT
 *
 * IMPORTANT:
 *
 * This validator does NOT perform database operations.
 *
 * Database validation belongs to:
 *
 * loanOfferModel.js
 *
 * Business rules belong to:
 *
 * loanOfferService.js
 *
 * ==========================================================
 */


// ==========================================================
// ALLOWED LOAN OFFER STATUSES
// ==========================================================
//
// Keep these values centralized so Controller, Service and
// future Admin workflows can reuse the same definitions.
//
// ==========================================================

export const ALLOWED_LOAN_OFFER_STATUSES = [

    "DRAFT",

    "PENDING",

    "ACTIVE",

    "ACCEPTED",

    "REJECTED",

    "EXPIRED",

    "CANCELLED"

];


// ==========================================================
// ALLOWED OFFER DECISIONS
// ==========================================================

export const ALLOWED_LOAN_OFFER_DECISIONS = [

    "ACCEPTED",

    "REJECTED",

    "CANCELLED"

];


// ==========================================================
// Utility
// Validate Positive Integer
// ==========================================================

function validatePositiveInteger(
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
// Utility
// Validate Positive Number
// ==========================================================

function validatePositiveNumber(
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
        !Number.isFinite(
            numericValue
        )
    ) {

        throw new Error(
            `${fieldName} must be a valid number.`
        );

    }


    if (
        numericValue <= 0
    ) {

        throw new Error(
            `${fieldName} must be greater than zero.`
        );

    }


    return numericValue;

}


// ==========================================================
// Utility
// Validate Non-Negative Number
// ==========================================================

function validateNonNegativeNumber(
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
        numericValue < 0
    ) {

        throw new Error(
            `${fieldName} cannot be negative.`
        );

    }


    return numericValue;

}


// ==========================================================
// Utility
// Validate Text
// ==========================================================

function validateText(
    value,
    fieldName,
    required = false,
    maxLength = null
) {

    if (
        value === undefined ||
        value === null
    ) {

        if (required) {

            throw new Error(
                `${fieldName} is required.`
            );

        }

        return null;

    }


    const text =
        String(value).trim();


    if (
        text.length === 0
    ) {

        if (required) {

            throw new Error(
                `${fieldName} is required.`
            );

        }

        return null;

    }


    if (
        maxLength !== null &&
        text.length > maxLength
    ) {

        throw new Error(
            `${fieldName} cannot exceed ${maxLength} characters.`
        );

    }


    return text;

}


// ==========================================================
// Utility
// Validate Date
// ==========================================================

function validateDate(
    value,
    fieldName,
    required = false
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        if (required) {

            throw new Error(
                `${fieldName} is required.`
            );

        }

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
// Validate Application ID
// ==========================================================

export function validateLoanOfferApplicationId(
    applicationId
) {

    return validatePositiveInteger(
        applicationId,
        "Loan application ID"
    );

}


// ==========================================================
// Validate Loan ID
// ==========================================================

export function validateLoanOfferLoanId(
    loanId
) {

    return validatePositiveInteger(
        loanId,
        "Loan ID"
    );

}


// ==========================================================
// Validate Loan Product ID
// ==========================================================

export function validateLoanOfferProductId(
    loanProductId
) {

    return validatePositiveInteger(
        loanProductId,
        "Loan product ID"
    );

}


// ==========================================================
// Validate User ID
// ==========================================================

export function validateLoanOfferUserId(
    userId
) {

    return validatePositiveInteger(
        userId,
        "User ID"
    );

}


// ==========================================================
// Validate Offer Amount
// ==========================================================

export function validateLoanOfferAmount(
    offerAmount
) {

    return validatePositiveNumber(
        offerAmount,
        "Offer amount"
    );

}


// ==========================================================
// Validate Principal Amount
// ==========================================================

export function validateLoanOfferPrincipalAmount(
    principalAmount
) {

    return validatePositiveNumber(
        principalAmount,
        "Principal amount"
    );

}


// ==========================================================
// Validate Interest Rate
// ==========================================================

export function validateLoanOfferInterestRate(
    interestRate
) {

    const rate =
        validateNonNegativeNumber(
            interestRate,
            "Interest rate"
        );


    if (
        rate !== null &&
        rate > 100
    ) {

        throw new Error(
            "Interest rate cannot exceed 100%."
        );

    }


    return rate;

}


// ==========================================================
// Validate Tenure
// ==========================================================

export function validateLoanOfferTenureMonths(
    tenureMonths
) {

    return validatePositiveInteger(
        tenureMonths,
        "Offer tenure"
    );

}


// ==========================================================
// Validate EMI
// ==========================================================

export function validateLoanOfferEmi(
    emiAmount
) {

    return validatePositiveNumber(
        emiAmount,
        "EMI amount"
    );

}


// ==========================================================
// Validate Processing Fee
// ==========================================================

export function validateLoanOfferProcessingFee(
    processingFee
) {

    return validateNonNegativeNumber(
        processingFee,
        "Processing fee"
    );

}


// ==========================================================
// Validate Other Charges
// ==========================================================

export function validateLoanOfferOtherCharges(
    otherCharges
) {

    return validateNonNegativeNumber(
        otherCharges,
        "Other charges"
    );

}


// ==========================================================
// Validate Total Payable Amount
// ==========================================================

export function validateLoanOfferTotalPayable(
    totalPayable
) {

    return validatePositiveNumber(
        totalPayable,
        "Total payable amount"
    );

}


// ==========================================================
// Validate Offer Status
// ==========================================================

export function validateLoanOfferStatus(
    status
) {

    if (
        status === undefined ||
        status === null ||
        status === ""
    ) {

        throw new Error(
            "Loan offer status is required."
        );

    }


    const normalizedStatus =
        String(
            status
        )
            .trim()
            .toUpperCase();


    if (
        !ALLOWED_LOAN_OFFER_STATUSES.includes(
            normalizedStatus
        )
    ) {

        throw new Error(
            `Invalid loan offer status. Allowed statuses: ${ALLOWED_LOAN_OFFER_STATUSES.join(", ")}.`
        );

    }


    return normalizedStatus;

}


// ==========================================================
// Validate Offer Decision
// ==========================================================

export function validateLoanOfferDecision(
    decision
) {

    if (
        decision === undefined ||
        decision === null ||
        decision === ""
    ) {

        throw new Error(
            "Loan offer decision is required."
        );

    }


    const normalizedDecision =
        String(
            decision
        )
            .trim()
            .toUpperCase();


    if (
        !ALLOWED_LOAN_OFFER_DECISIONS.includes(
            normalizedDecision
        )
    ) {

        throw new Error(
            `Invalid loan offer decision. Allowed decisions: ${ALLOWED_LOAN_OFFER_DECISIONS.join(", ")}.`
        );

    }


    return normalizedDecision;

}


// ==========================================================
// Validate Offer Number
// ==========================================================

export function validateLoanOfferNumber(
    offerNumber
) {

    return validateText(
        offerNumber,
        "Offer number",
        false,
        100
    );

}


// ==========================================================
// Validate Offer Start Date
// ==========================================================

export function validateLoanOfferStartDate(
    startDate
) {

    return validateDate(
        startDate,
        "Offer start date",
        false
    );

}


// ==========================================================
// Validate Offer Expiry Date
// ==========================================================

export function validateLoanOfferExpiryDate(
    expiryDate
) {

    return validateDate(
        expiryDate,
        "Offer expiry date",
        false
    );

}


// ==========================================================
// Validate Acceptance Date
// ==========================================================

export function validateLoanOfferAcceptedAt(
    acceptedAt
) {

    return validateDate(
        acceptedAt,
        "Offer acceptance date",
        false
    );

}


// ==========================================================
// Validate Rejection Reason
// ==========================================================

export function validateLoanOfferRejectionReason(
    rejectionReason
) {

    return validateText(
        rejectionReason,
        "Rejection reason",
        false,
        2000
    );

}


// ==========================================================
// Validate Remarks
// ==========================================================

export function validateLoanOfferRemarks(
    remarks
) {

    return validateText(
        remarks,
        "Offer remarks",
        false,
        5000
    );

}


// ==========================================================
// Validate Offer Creation Request
// ==========================================================
//
// Used when creating a new loan offer.
//
// ==========================================================

export function validateLoanOfferRequest(
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

        loan_id,

        loan_product_id,

        user_id,

        offer_number,

        offer_amount,

        principal_amount,

        interest_rate,

        tenure_months,

        emi_amount,

        processing_fee,

        other_charges,

        total_payable_amount,

        offer_status,

        start_date,

        expiry_date,

        remarks

    } = offerData;


    // ------------------------------------------------------
    // Relationship IDs
    // ------------------------------------------------------

    const validatedApplicationId =
        validateLoanOfferApplicationId(
            loan_application_id
        );


    const validatedLoanId =
        loan_id !== undefined &&
            loan_id !== null &&
            loan_id !== ""
            ? validateLoanOfferLoanId(
                loan_id
            )
            : null;


    const validatedProductId =
        validateLoanOfferProductId(
            loan_product_id
        );


    const validatedUserId =
        validateLoanOfferUserId(
            user_id
        );


    // ------------------------------------------------------
    // Offer Number
    // ------------------------------------------------------

    const validatedOfferNumber =
        validateLoanOfferNumber(
            offer_number
        );


    // ------------------------------------------------------
    // Financial Details
    // ------------------------------------------------------

    const validatedOfferAmount =
        validateLoanOfferAmount(
            offer_amount
        );


    const validatedPrincipalAmount =
        principal_amount !== undefined &&
            principal_amount !== null &&
            principal_amount !== ""
            ? validateLoanOfferPrincipalAmount(
                principal_amount
            )
            : validatedOfferAmount;


    const validatedInterestRate =
        validateLoanOfferInterestRate(
            interest_rate
        );


    if (
        validatedInterestRate === null
    ) {

        throw new Error(
            "Interest rate is required for a loan offer."
        );

    }


    const validatedTenure =
        validateLoanOfferTenureMonths(
            tenure_months
        );


    const validatedEmi =
        validateLoanOfferEmi(
            emi_amount
        );


    const validatedProcessingFee =
        validateLoanOfferProcessingFee(
            processing_fee
        );


    const validatedOtherCharges =
        validateLoanOfferOtherCharges(
            other_charges
        );


    const validatedTotalPayable =
        validateLoanOfferTotalPayable(
            total_payable_amount
        );


    // ------------------------------------------------------
    // Status
    // ------------------------------------------------------

    const validatedStatus =
        offer_status !== undefined &&
            offer_status !== null &&
            offer_status !== ""
            ? validateLoanOfferStatus(
                offer_status
            )
            : "PENDING";


    // ------------------------------------------------------
    // Dates
    // ------------------------------------------------------

    const validatedStartDate =
        validateLoanOfferStartDate(
            start_date
        );


    const validatedExpiryDate =
        validateLoanOfferExpiryDate(
            expiry_date
        );


    // ------------------------------------------------------
    // Remarks
    // ------------------------------------------------------

    const validatedRemarks =
        validateLoanOfferRemarks(
            remarks
        );


    // ------------------------------------------------------
    // Date Business Rule
    // ------------------------------------------------------

    if (
        validatedStartDate &&
        validatedExpiryDate
    ) {

        const start =
            new Date(
                validatedStartDate
            );

        const expiry =
            new Date(
                validatedExpiryDate
            );


        if (
            expiry <= start
        ) {

            throw new Error(
                "Offer expiry date must be later than the offer start date."
            );

        }

    }


    // ------------------------------------------------------
    // Financial Business Rules
    // ------------------------------------------------------

    if (
        validatedPrincipalAmount >
        validatedOfferAmount
    ) {

        throw new Error(
            "Principal amount cannot exceed the offer amount."
        );

    }


    // ------------------------------------------------------
    // Return Validated Data
    // ------------------------------------------------------

    return {

        ...offerData,

        loan_application_id:
            validatedApplicationId,

        loan_id:
            validatedLoanId,

        loan_product_id:
            validatedProductId,

        user_id:
            validatedUserId,

        offer_number:
            validatedOfferNumber,

        offer_amount:
            validatedOfferAmount,

        principal_amount:
            validatedPrincipalAmount,

        interest_rate:
            validatedInterestRate,

        tenure_months:
            validatedTenure,

        emi_amount:
            validatedEmi,

        processing_fee:
            validatedProcessingFee,

        other_charges:
            validatedOtherCharges,

        total_payable_amount:
            validatedTotalPayable,

        offer_status:
            validatedStatus,

        start_date:
            validatedStartDate,

        expiry_date:
            validatedExpiryDate,

        remarks:
            validatedRemarks

    };

}


// ==========================================================
// Validate Offer Decision Request
// ==========================================================
//
// Used when customer accepts / rejects / cancels an offer.
//
// ==========================================================

export function validateLoanOfferDecisionRequest(
    decisionData
) {

    if (
        !decisionData ||
        typeof decisionData !== "object"
    ) {

        throw new Error(
            "Loan offer decision data is required."
        );

    }


    const {

        loan_offer_id,

        user_id,

        decision,

        rejection_reason,

        remarks

    } = decisionData;


    const validatedOfferId =
        validatePositiveInteger(
            loan_offer_id,
            "Loan offer ID"
        );


    const validatedUserId =
        validateLoanOfferUserId(
            user_id
        );


    const validatedDecision =
        validateLoanOfferDecision(
            decision
        );


    const validatedRejectionReason =
        validateLoanOfferRejectionReason(
            rejection_reason
        );


    const validatedRemarks =
        validateLoanOfferRemarks(
            remarks
        );


    // ------------------------------------------------------
    // Rejection Rule
    // ------------------------------------------------------

    if (
        validatedDecision ===
        "REJECTED" &&
        !validatedRejectionReason
    ) {

        throw new Error(
            "Rejection reason is required when a loan offer is rejected."
        );

    }


    return {

        ...decisionData,

        loan_offer_id:
            validatedOfferId,

        user_id:
            validatedUserId,

        decision:
            validatedDecision,

        rejection_reason:
            validatedRejectionReason,

        remarks:
            validatedRemarks

    };

}


// ==========================================================
// Validate Offer Status Update
// ==========================================================

export function validateLoanOfferStatusUpdate(
    statusData
) {

    if (
        !statusData ||
        typeof statusData !== "object"
    ) {

        throw new Error(
            "Loan offer status data is required."
        );

    }


    const {

        loan_offer_id,

        status,

        remarks

    } = statusData;


    const validatedOfferId =
        validatePositiveInteger(
            loan_offer_id,
            "Loan offer ID"
        );


    const validatedStatus =
        validateLoanOfferStatus(
            status
        );


    const validatedRemarks =
        validateLoanOfferRemarks(
            remarks
        );


    return {

        ...statusData,

        loan_offer_id:
            validatedOfferId,

        status:
            validatedStatus,

        remarks:
            validatedRemarks

    };

}


// ==========================================================
// Validate Offer By ID
// ==========================================================

export function validateLoanOfferId(
    offerId
) {

    return validatePositiveInteger(
        offerId,
        "Loan offer ID"
    );

}


// ==========================================================
// Validate Offer By Application
// ==========================================================

export function validateLoanOfferByApplicationId(
    applicationId
) {

    return validateLoanOfferApplicationId(
        applicationId
    );

}


// ==========================================================
// Validate Offer By Loan
// ==========================================================

export function validateLoanOfferByLoanId(
    loanId
) {

    return validateLoanOfferLoanId(
        loanId
    );

}


// ==========================================================
// Validate Offer By Product
// ==========================================================

export function validateLoanOfferByProductId(
    loanProductId
) {

    return validateLoanOfferProductId(
        loanProductId
    );

}


// ==========================================================
// Validate Offer By User
// ==========================================================

export function validateLoanOfferByUserId(
    userId
) {

    return validateLoanOfferUserId(
        userId
    );

}


// ==========================================================
// Default Export
// ==========================================================

export default {

    ALLOWED_LOAN_OFFER_STATUSES,

    ALLOWED_LOAN_OFFER_DECISIONS,

    validateLoanOfferApplicationId,

    validateLoanOfferLoanId,

    validateLoanOfferProductId,

    validateLoanOfferUserId,

    validateLoanOfferAmount,

    validateLoanOfferPrincipalAmount,

    validateLoanOfferInterestRate,

    validateLoanOfferTenureMonths,

    validateLoanOfferEmi,

    validateLoanOfferProcessingFee,

    validateLoanOfferOtherCharges,

    validateLoanOfferTotalPayable,

    validateLoanOfferStatus,

    validateLoanOfferDecision,

    validateLoanOfferNumber,

    validateLoanOfferStartDate,

    validateLoanOfferExpiryDate,

    validateLoanOfferAcceptedAt,

    validateLoanOfferRejectionReason,

    validateLoanOfferRemarks,

    validateLoanOfferRequest,

    validateLoanOfferDecisionRequest,

    validateLoanOfferStatusUpdate,

    validateLoanOfferId,

    validateLoanOfferByApplicationId,

    validateLoanOfferByLoanId,

    validateLoanOfferByProductId,

    validateLoanOfferByUserId

};

