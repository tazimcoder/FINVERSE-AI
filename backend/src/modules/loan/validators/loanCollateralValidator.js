/**
 * ==========================================================
 * FINVERSE AI
 * Loan Collateral Validator
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/validators/loanCollateralValidator.js
 *
 * Database Table:
 * loan_collaterals
 *
 * Responsibility:
 *
 * - Validate loan collateral input
 * - Validate collateral type
 * - Validate ownership type
 * - Validate monetary values
 * - Validate valuation data
 * - Validate collateral status values
 * - Validate LTV percentage
 * - Validate create/update payloads
 *
 * ==========================================================
 */


// ==========================================================
// Allowed Values
// ==========================================================

const COLLATERAL_TYPES = [
    "PROPERTY",
    "LAND",
    "PLOT",
    "RESIDENTIAL",
    "COMMERCIAL",
    "VEHICLE",
    "GOLD",
    "BUSINESS_ASSET",
    "OTHER"
];


const OWNERSHIP_TYPES = [
    "SELF_OWNED",
    "JOINTLY_OWNED",
    "FAMILY_OWNED",
    "THIRD_PARTY",
    "OTHER"
];


const VALUATION_STATUSES = [
    "NOT_REQUESTED",
    "PENDING",
    "PROCESSING",
    "COMPLETED",
    "FAILED",
    "MANUAL_REVIEW"
];


const VERIFICATION_STATUSES = [
    "PENDING",
    "VERIFIED",
    "REJECTED",
    "REQUIRES_REVIEW"
];


const LEGAL_STATUSES = [
    "CLEAR",
    "ENCUMBERED",
    "DISPUTED",
    "PENDING_VERIFICATION",
    "UNKNOWN"
];


const LIEN_STATUSES = [
    "NOT_CREATED",
    "PENDING",
    "CREATED",
    "RELEASED"
];


const RELEASE_STATUSES = [
    "NOT_APPLICABLE",
    "PENDING",
    "RELEASED"
];


// ==========================================================
// Utility - Required Positive Integer
// ==========================================================

function validatePositiveInteger(
    value,
    fieldName
) {

    const number =
        Number(value);


    if (
        !Number.isInteger(number) ||
        number <= 0
    ) {

        throw new Error(
            `${fieldName} must be a positive integer.`
        );

    }


    return number;
}


// ==========================================================
// Utility - Optional Positive Integer
// ==========================================================

function validateOptionalPositiveInteger(
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


    return validatePositiveInteger(
        value,
        fieldName
    );
}


// ==========================================================
// Utility - Non Negative Number
// ==========================================================

function validateNonNegativeNumber(
    value,
    fieldName
) {

    const number =
        Number(value);


    if (
        !Number.isFinite(number) ||
        number < 0
    ) {

        throw new Error(
            `${fieldName} must be a valid non-negative number.`
        );

    }


    return number;
}


// ==========================================================
// Utility - Optional Non Negative Number
// ==========================================================

function validateOptionalNonNegativeNumber(
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


    return validateNonNegativeNumber(
        value,
        fieldName
    );
}


// ==========================================================
// Utility - Enum Validation
// ==========================================================

function validateEnum(
    value,
    allowedValues,
    fieldName,
    required = true
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


    const normalizedValue =
        String(value)
            .trim()
            .toUpperCase();


    if (
        !allowedValues.includes(
            normalizedValue
        )
    ) {

        throw new Error(
            `Invalid ${fieldName}. Allowed values: ${allowedValues.join(", ")}.`
        );

    }


    return normalizedValue;
}


// ==========================================================
// Utility - Validate LTV Percentage
// ==========================================================

function validateLtvPercentage(
    value
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return null;

    }


    const ltv =
        Number(value);


    if (
        !Number.isFinite(ltv) ||
        ltv < 0 ||
        ltv > 100
    ) {

        throw new Error(
            "LTV percentage must be between 0 and 100."
        );

    }


    return ltv;
}


// ==========================================================
// Utility - Validate Date
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
// Validate Create Collateral
// ==========================================================

export function validateCreateLoanCollateral(
    data
) {

    if (!data || typeof data !== "object") {

        throw new Error(
            "Loan collateral data is required."
        );

    }


    const {

        loan_application_id,
        loan_id,
        user_id,
        property_id,

        collateral_type,
        collateral_description,

        ownership_type,
        owner_name,

        estimated_value,
        forced_sale_value,
        eligible_value,

        valuation_date,
        valuation_method,

        valuation_status,
        verification_status,
        legal_status,

        existing_charge_amount,
        ltv_percentage,

        lien_status,
        release_status

    } = data;


    // ======================================================
    // Required IDs
    // ======================================================

    const validatedUserId =
        validatePositiveInteger(
            user_id,
            "User ID"
        );


    const validatedApplicationId =
        validateOptionalPositiveInteger(
            loan_application_id,
            "Loan application ID"
        );


    const validatedLoanId =
        validateOptionalPositiveInteger(
            loan_id,
            "Loan ID"
        );


    const validatedPropertyId =
        validateOptionalPositiveInteger(
            property_id,
            "Property ID"
        );


    // ======================================================
    // Collateral Type
    // ======================================================

    const validatedCollateralType =
        validateEnum(
            collateral_type,
            COLLATERAL_TYPES,
            "collateral type"
        );


    // ======================================================
    // Ownership
    // ======================================================

    const validatedOwnershipType =
        validateEnum(
            ownership_type,
            OWNERSHIP_TYPES,
            "ownership type",
            false
        );


    // ======================================================
    // Monetary Values
    // ======================================================

    const validatedEstimatedValue =
        validateOptionalNonNegativeNumber(
            estimated_value,
            "Estimated value"
        );


    const validatedForcedSaleValue =
        validateOptionalNonNegativeNumber(
            forced_sale_value,
            "Forced sale value"
        );


    const validatedEligibleValue =
        validateOptionalNonNegativeNumber(
            eligible_value,
            "Eligible value"
        );


    const validatedExistingChargeAmount =
        validateOptionalNonNegativeNumber(
            existing_charge_amount,
            "Existing charge amount"
        );


    // ======================================================
    // LTV
    // ======================================================

    const validatedLtv =
        validateLtvPercentage(
            ltv_percentage
        );


    // ======================================================
    // Statuses
    // ======================================================

    const validatedValuationStatus =
        validateEnum(
            valuation_status,
            VALUATION_STATUSES,
            "valuation status",
            false
        );


    const validatedVerificationStatus =
        validateEnum(
            verification_status,
            VERIFICATION_STATUSES,
            "verification status",
            false
        );


    const validatedLegalStatus =
        validateEnum(
            legal_status,
            LEGAL_STATUSES,
            "legal status",
            false
        );


    const validatedLienStatus =
        validateEnum(
            lien_status,
            LIEN_STATUSES,
            "lien status",
            false
        );


    const validatedReleaseStatus =
        validateEnum(
            release_status,
            RELEASE_STATUSES,
            "release status",
            false
        );


    // ======================================================
    // Dates
    // ======================================================

    const validatedValuationDate =
        validateOptionalDate(
            valuation_date,
            "Valuation date"
        );


    // ======================================================
    // Business Validation
    // ======================================================

    if (
        validatedForcedSaleValue !== null &&
        validatedEstimatedValue !== null &&
        validatedForcedSaleValue >
        validatedEstimatedValue
    ) {

        throw new Error(
            "Forced sale value cannot be greater than estimated value."
        );

    }


    if (
        validatedEligibleValue !== null &&
        validatedEstimatedValue !== null &&
        validatedEligibleValue >
        validatedEstimatedValue
    ) {

        throw new Error(
            "Eligible value cannot be greater than estimated value."
        );

    }


    // ======================================================
    // Return Sanitized Payload
    // ======================================================

    return {

        loan_application_id:
            validatedApplicationId,

        loan_id:
            validatedLoanId,

        user_id:
            validatedUserId,

        property_id:
            validatedPropertyId,

        collateral_type:
            validatedCollateralType,

        collateral_description:
            collateral_description ?? null,

        ownership_type:
            validatedOwnershipType,

        owner_name:
            owner_name ?? null,

        estimated_value:
            validatedEstimatedValue,

        forced_sale_value:
            validatedForcedSaleValue,

        eligible_value:
            validatedEligibleValue,

        valuation_date:
            validatedValuationDate,

        valuation_method:
            valuation_method ?? null,

        valuation_status:
            validatedValuationStatus,

        verification_status:
            validatedVerificationStatus,

        legal_status:
            validatedLegalStatus,

        existing_charge_amount:
            validatedExistingChargeAmount,

        ltv_percentage:
            validatedLtv,

        lien_status:
            validatedLienStatus,

        release_status:
            validatedReleaseStatus

    };

}


// ==========================================================
// Validate Update Collateral
// ==========================================================

export function validateUpdateLoanCollateral(
    data
) {

    if (!data || typeof data !== "object") {

        throw new Error(
            "Loan collateral update data is required."
        );

    }


    const sanitizedData = {};


    if (
        data.loan_application_id !== undefined
    ) {

        sanitizedData.loan_application_id =
            validateOptionalPositiveInteger(
                data.loan_application_id,
                "Loan application ID"
            );

    }


    if (
        data.loan_id !== undefined
    ) {

        sanitizedData.loan_id =
            validateOptionalPositiveInteger(
                data.loan_id,
                "Loan ID"
            );

    }


    if (
        data.property_id !== undefined
    ) {

        sanitizedData.property_id =
            validateOptionalPositiveInteger(
                data.property_id,
                "Property ID"
            );

    }


    if (
        data.collateral_type !== undefined
    ) {

        sanitizedData.collateral_type =
            validateEnum(
                data.collateral_type,
                COLLATERAL_TYPES,
                "collateral type"
            );

    }


    if (
        data.ownership_type !== undefined
    ) {

        sanitizedData.ownership_type =
            validateEnum(
                data.ownership_type,
                OWNERSHIP_TYPES,
                "ownership type",
                false
            );

    }


    if (
        data.estimated_value !== undefined
    ) {

        sanitizedData.estimated_value =
            validateOptionalNonNegativeNumber(
                data.estimated_value,
                "Estimated value"
            );

    }


    if (
        data.forced_sale_value !== undefined
    ) {

        sanitizedData.forced_sale_value =
            validateOptionalNonNegativeNumber(
                data.forced_sale_value,
                "Forced sale value"
            );

    }


    if (
        data.eligible_value !== undefined
    ) {

        sanitizedData.eligible_value =
            validateOptionalNonNegativeNumber(
                data.eligible_value,
                "Eligible value"
            );

    }


    if (
        data.existing_charge_amount !== undefined
    ) {

        sanitizedData.existing_charge_amount =
            validateOptionalNonNegativeNumber(
                data.existing_charge_amount,
                "Existing charge amount"
            );

    }


    if (
        data.ltv_percentage !== undefined
    ) {

        sanitizedData.ltv_percentage =
            validateLtvPercentage(
                data.ltv_percentage
            );

    }


    if (
        data.valuation_status !== undefined
    ) {

        sanitizedData.valuation_status =
            validateEnum(
                data.valuation_status,
                VALUATION_STATUSES,
                "valuation status",
                false
            );

    }


    if (
        data.verification_status !== undefined
    ) {

        sanitizedData.verification_status =
            validateEnum(
                data.verification_status,
                VERIFICATION_STATUSES,
                "verification status",
                false
            );

    }


    if (
        data.legal_status !== undefined
    ) {

        sanitizedData.legal_status =
            validateEnum(
                data.legal_status,
                LEGAL_STATUSES,
                "legal status",
                false
            );

    }


    if (
        data.lien_status !== undefined
    ) {

        sanitizedData.lien_status =
            validateEnum(
                data.lien_status,
                LIEN_STATUSES,
                "lien status",
                false
            );

    }


    if (
        data.release_status !== undefined
    ) {

        sanitizedData.release_status =
            validateEnum(
                data.release_status,
                RELEASE_STATUSES,
                "release status",
                false
            );

    }


    if (
        data.valuation_date !== undefined
    ) {

        sanitizedData.valuation_date =
            validateOptionalDate(
                data.valuation_date,
                "Valuation date"
            );

    }


    if (
        data.collateral_description !== undefined
    ) {

        sanitizedData.collateral_description =
            data.collateral_description;

    }


    if (
        data.valuation_method !== undefined
    ) {

        sanitizedData.valuation_method =
            data.valuation_method;

    }


    if (
        data.owner_name !== undefined
    ) {

        sanitizedData.owner_name =
            data.owner_name;

    }


    // ======================================================
    // Cross Field Validation
    // ======================================================

    const estimatedValue =
        sanitizedData.estimated_value;


    const forcedSaleValue =
        sanitizedData.forced_sale_value;


    const eligibleValue =
        sanitizedData.eligible_value;


    if (
        estimatedValue !== undefined &&
        forcedSaleValue !== undefined &&
        estimatedValue !== null &&
        forcedSaleValue !== null &&
        forcedSaleValue > estimatedValue
    ) {

        throw new Error(
            "Forced sale value cannot be greater than estimated value."
        );

    }


    if (
        estimatedValue !== undefined &&
        eligibleValue !== undefined &&
        estimatedValue !== null &&
        eligibleValue !== null &&
        eligibleValue > estimatedValue
    ) {

        throw new Error(
            "Eligible value cannot be greater than estimated value."
        );

    }


    if (
        Object.keys(
            sanitizedData
        ).length === 0
    ) {

        throw new Error(
            "At least one field is required for update."
        );

    }


    return sanitizedData;

}


// ==========================================================
// Validate Collateral Status Update
// ==========================================================

export function validateLoanCollateralStatusUpdate(
    data
) {

    if (!data || typeof data !== "object") {

        throw new Error(
            "Collateral status data is required."
        );

    }


    const result = {};


    if (
        data.valuation_status !== undefined
    ) {

        result.valuation_status =
            validateEnum(
                data.valuation_status,
                VALUATION_STATUSES,
                "valuation status",
                false
            );

    }


    if (
        data.verification_status !== undefined
    ) {

        result.verification_status =
            validateEnum(
                data.verification_status,
                VERIFICATION_STATUSES,
                "verification status",
                false
            );

    }


    if (
        data.legal_status !== undefined
    ) {

        result.legal_status =
            validateEnum(
                data.legal_status,
                LEGAL_STATUSES,
                "legal status",
                false
            );

    }


    if (
        data.lien_status !== undefined
    ) {

        result.lien_status =
            validateEnum(
                data.lien_status,
                LIEN_STATUSES,
                "lien status",
                false
            );

    }


    if (
        data.release_status !== undefined
    ) {

        result.release_status =
            validateEnum(
                data.release_status,
                RELEASE_STATUSES,
                "release status",
                false
            );

    }


    if (
        Object.keys(result).length === 0
    ) {

        throw new Error(
            "At least one collateral status is required."
        );

    }


    return result;

}


// ==========================================================
// Export Constants
// ==========================================================

export {
    COLLATERAL_TYPES,
    OWNERSHIP_TYPES,
    VALUATION_STATUSES,
    VERIFICATION_STATUSES,
    LEGAL_STATUSES,
    LIEN_STATUSES,
    RELEASE_STATUSES
};

