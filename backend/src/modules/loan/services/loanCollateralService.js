/**
 * ==========================================================
 * FINVERSE AI
 * Loan Collateral Service
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/services/loanCollateralService.js
 *
 * Responsibility:
 *
 * - Loan collateral business logic
 * - Validate collateral data
 * - Fetch collateral records
 * - Fetch by status
 * - Create collateral
 * - Update collateral
 * - Manage valuation status
 * - Manage verification status
 * - Manage legal status
 * - Manage lien status
 * - Manage release status
 * - Delete collateral
 *
 * Database Table:
 * loan_collaterals
 *
 * ==========================================================
 */

import {
    getAllLoanCollaterals,
    getLoanCollateralById,
    getLoanCollateralsByApplicationId,
    getLoanCollateralsByLoanId,
    getLoanCollateralsByUserId,
    getLoanCollateralsByPropertyId,
    getLoanCollateralsByType,
    getLoanCollateralsByVerificationStatus,
    getLoanCollateralsByValuationStatus,
    getLoanCollateralsByLegalStatus,
    getLoanCollateralsByLienStatus,
    getLoanCollateralsByReleaseStatus,
    getLoanCollateralsByStatus,
    createLoanCollateral,
    updateLoanCollateral,
    updateLoanCollateralValuationStatus,
    updateLoanCollateralVerificationStatus,
    updateLoanCollateralLegalStatus,
    updateLoanCollateralLienStatus,
    updateLoanCollateralReleaseStatus,
    deleteLoanCollateral
} from "../models/loanCollateralModel.js";


// ==========================================================
// CONSTANTS
// ==========================================================

const ALLOWED_COLLATERAL_TYPES = [
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


const ALLOWED_OWNERSHIP_TYPES = [
    "SELF_OWNED",
    "JOINTLY_OWNED",
    "FAMILY_OWNED",
    "THIRD_PARTY",
    "OTHER"
];


const ALLOWED_VALUATION_STATUSES = [
    "NOT_REQUESTED",
    "PENDING",
    "PROCESSING",
    "COMPLETED",
    "FAILED",
    "MANUAL_REVIEW"
];


const ALLOWED_VERIFICATION_STATUSES = [
    "PENDING",
    "VERIFIED",
    "REJECTED",
    "REQUIRES_REVIEW"
];


const ALLOWED_LEGAL_STATUSES = [
    "CLEAR",
    "ENCUMBERED",
    "DISPUTED",
    "PENDING_VERIFICATION",
    "UNKNOWN"
];


const ALLOWED_LIEN_STATUSES = [
    "NOT_CREATED",
    "PENDING",
    "CREATED",
    "RELEASED"
];


const ALLOWED_RELEASE_STATUSES = [
    "NOT_APPLICABLE",
    "PENDING",
    "RELEASED"
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
// UTILITY - VALIDATE OPTIONAL NUMBER
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
// UTILITY - NORMALIZE ENUM
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
        !allowedValues.includes(
            normalized
        )
    ) {

        throw new Error(
            `Invalid ${fieldName}.`
        );

    }


    return normalized;
}


// ==========================================================
// UTILITY - CALCULATE LTV
// ==========================================================
//
// LTV = Loan Amount / Collateral Value × 100
//
// ==========================================================

function calculateLTV(
    loanAmount,
    collateralValue
) {

    if (
        loanAmount === null ||
        loanAmount === undefined ||
        collateralValue === null ||
        collateralValue === undefined
    ) {

        return null;
    }


    if (
        Number(collateralValue) <= 0
    ) {

        return null;
    }


    const ltv =
        (
            Number(loanAmount) /
            Number(collateralValue)
        ) * 100;


    return Number(
        ltv.toFixed(2)
    );
}


// ==========================================================
// FETCH ALL
// ==========================================================

export async function fetchAllLoanCollaterals() {

    return await getAllLoanCollaterals();

}


// ==========================================================
// FETCH BY ID
// ==========================================================

export async function fetchLoanCollateralById(
    collateralId
) {

    const id =
        validateId(
            collateralId,
            "Loan collateral ID"
        );


    return await getLoanCollateralById(
        id
    );

}


// ==========================================================
// FETCH BY APPLICATION
// ==========================================================

export async function fetchLoanCollateralsByApplicationId(
    applicationId
) {

    const id =
        validateId(
            applicationId,
            "Loan application ID"
        );


    return await getLoanCollateralsByApplicationId(
        id
    );

}


// ==========================================================
// FETCH BY LOAN
// ==========================================================

export async function fetchLoanCollateralsByLoanId(
    loanId
) {

    const id =
        validateId(
            loanId,
            "Loan ID"
        );


    return await getLoanCollateralsByLoanId(
        id
    );

}


// ==========================================================
// FETCH BY USER
// ==========================================================

export async function fetchLoanCollateralsByUserId(
    userId
) {

    const id =
        validateId(
            userId,
            "User ID"
        );


    return await getLoanCollateralsByUserId(
        id
    );

}


// ==========================================================
// FETCH BY PROPERTY
// ==========================================================

export async function fetchLoanCollateralsByPropertyId(
    propertyId
) {

    const id =
        validateId(
            propertyId,
            "Property ID"
        );


    return await getLoanCollateralsByPropertyId(
        id
    );

}


// ==========================================================
// FETCH BY COLLATERAL TYPE
// ==========================================================

export async function fetchLoanCollateralsByType(
    collateralType
) {

    const normalizedType =
        normalizeEnum(
            collateralType,
            "collateral type",
            ALLOWED_COLLATERAL_TYPES
        );


    if (!normalizedType) {

        throw new Error(
            "Collateral type is required."
        );

    }


    return await getLoanCollateralsByType(
        normalizedType
    );

}


// ==========================================================
// FETCH BY VERIFICATION STATUS
// ==========================================================

export async function fetchLoanCollateralsByVerificationStatus(
    verificationStatus
) {

    const normalizedStatus =
        normalizeEnum(
            verificationStatus,
            "verification status",
            ALLOWED_VERIFICATION_STATUSES
        );


    if (!normalizedStatus) {

        throw new Error(
            "Verification status is required."
        );

    }


    return await getLoanCollateralsByVerificationStatus(
        normalizedStatus
    );

}


// ==========================================================
// FETCH BY VALUATION STATUS
// ==========================================================

export async function fetchLoanCollateralsByValuationStatus(
    valuationStatus
) {

    const normalizedStatus =
        normalizeEnum(
            valuationStatus,
            "valuation status",
            ALLOWED_VALUATION_STATUSES
        );


    if (!normalizedStatus) {

        throw new Error(
            "Valuation status is required."
        );

    }


    return await getLoanCollateralsByValuationStatus(
        normalizedStatus
    );

}


// ==========================================================
// FETCH BY LEGAL STATUS
// ==========================================================

export async function fetchLoanCollateralsByLegalStatus(
    legalStatus
) {

    const normalizedStatus =
        normalizeEnum(
            legalStatus,
            "legal status",
            ALLOWED_LEGAL_STATUSES
        );


    if (!normalizedStatus) {

        throw new Error(
            "Legal status is required."
        );

    }


    return await getLoanCollateralsByLegalStatus(
        normalizedStatus
    );

}


// ==========================================================
// FETCH BY LIEN STATUS
// ==========================================================

export async function fetchLoanCollateralsByLienStatus(
    lienStatus
) {

    const normalizedStatus =
        normalizeEnum(
            lienStatus,
            "lien status",
            ALLOWED_LIEN_STATUSES
        );


    if (!normalizedStatus) {

        throw new Error(
            "Lien status is required."
        );

    }


    return await getLoanCollateralsByLienStatus(
        normalizedStatus
    );

}


// ==========================================================
// FETCH BY RELEASE STATUS
// ==========================================================

export async function fetchLoanCollateralsByReleaseStatus(
    releaseStatus
) {

    const normalizedStatus =
        normalizeEnum(
            releaseStatus,
            "release status",
            ALLOWED_RELEASE_STATUSES
        );


    if (!normalizedStatus) {

        throw new Error(
            "Release status is required."
        );

    }


    return await getLoanCollateralsByReleaseStatus(
        normalizedStatus
    );

}


// ==========================================================
// FETCH BY GENERIC STATUS
// ==========================================================
//
// This supports:
//
// valuation_status
// verification_status
// legal_status
// lien_status
// release_status
//
// ==========================================================

export async function fetchLoanCollateralsByStatus(
    status
) {

    if (
        status === undefined ||
        status === null ||
        String(status).trim() === ""
    ) {

        throw new Error(
            "Collateral status is required."
        );

    }


    const normalizedStatus =
        String(status)
            .trim()
            .toUpperCase();


    const allAllowedStatuses = [
        ...ALLOWED_VALUATION_STATUSES,
        ...ALLOWED_VERIFICATION_STATUSES,
        ...ALLOWED_LEGAL_STATUSES,
        ...ALLOWED_LIEN_STATUSES,
        ...ALLOWED_RELEASE_STATUSES
    ];


    if (
        !allAllowedStatuses.includes(
            normalizedStatus
        )
    ) {

        throw new Error(
            "Invalid collateral status."
        );

    }


    return await getLoanCollateralsByStatus(
        normalizedStatus
    );

}


// ==========================================================
// CREATE LOAN COLLATERAL
// ==========================================================

export async function createNewLoanCollateral(
    collateralData
) {

    if (
        !collateralData ||
        typeof collateralData !== "object"
    ) {

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
    } = collateralData;


    const userId =
        validateId(
            user_id,
            "User ID"
        );


    const applicationId =
        loan_application_id !== undefined &&
            loan_application_id !== null &&
            loan_application_id !== ""
            ? validateId(
                loan_application_id,
                "Loan application ID"
            )
            : null;


    const loanId =
        loan_id !== undefined &&
            loan_id !== null &&
            loan_id !== ""
            ? validateId(
                loan_id,
                "Loan ID"
            )
            : null;


    const propertyId =
        property_id !== undefined &&
            property_id !== null &&
            property_id !== ""
            ? validateId(
                property_id,
                "Property ID"
            )
            : null;


    const collateralType =
        normalizeEnum(
            collateral_type,
            "collateral type",
            ALLOWED_COLLATERAL_TYPES
        );


    if (!collateralType) {

        throw new Error(
            "Collateral type is required."
        );

    }


    const ownershipType =
        normalizeEnum(
            ownership_type,
            "ownership type",
            ALLOWED_OWNERSHIP_TYPES
        );


    const estimatedValue =
        validateOptionalNumber(
            estimated_value,
            "Estimated value"
        );


    const forcedSaleValue =
        validateOptionalNumber(
            forced_sale_value,
            "Forced sale value"
        );


    const eligibleValue =
        validateOptionalNumber(
            eligible_value,
            "Eligible value"
        );


    const existingChargeAmount =
        validateOptionalNumber(
            existing_charge_amount,
            "Existing charge amount"
        );


    const ltvPercentage =
        validateOptionalNumber(
            ltv_percentage,
            "LTV percentage"
        );


    const valuationStatus =
        normalizeEnum(
            valuation_status,
            "valuation status",
            ALLOWED_VALUATION_STATUSES
        ) || "NOT_REQUESTED";


    const verificationStatus =
        normalizeEnum(
            verification_status,
            "verification status",
            ALLOWED_VERIFICATION_STATUSES
        ) || "PENDING";


    const legalStatus =
        normalizeEnum(
            legal_status,
            "legal status",
            ALLOWED_LEGAL_STATUSES
        ) || "PENDING_VERIFICATION";


    const lienStatus =
        normalizeEnum(
            lien_status,
            "lien status",
            ALLOWED_LIEN_STATUSES
        ) || "NOT_CREATED";


    const releaseStatus =
        normalizeEnum(
            release_status,
            "release status",
            ALLOWED_RELEASE_STATUSES
        ) || "NOT_APPLICABLE";


    if (
        forcedSaleValue !== null &&
        estimatedValue !== null &&
        forcedSaleValue > estimatedValue
    ) {

        throw new Error(
            "Forced sale value cannot exceed estimated value."
        );

    }


    if (
        eligibleValue !== null &&
        estimatedValue !== null &&
        eligibleValue > estimatedValue
    ) {

        throw new Error(
            "Eligible value cannot exceed estimated value."
        );

    }


    if (
        ltvPercentage !== null &&
        ltvPercentage > 1000
    ) {

        throw new Error(
            "LTV percentage is too high."
        );

    }


    const data = {

        loan_application_id:
            applicationId,

        loan_id:
            loanId,

        user_id:
            userId,

        property_id:
            propertyId,

        collateral_type:
            collateralType,

        collateral_description:
            collateral_description ?? null,

        ownership_type:
            ownershipType,

        owner_name:
            owner_name ?? null,

        estimated_value:
            estimatedValue,

        forced_sale_value:
            forcedSaleValue,

        eligible_value:
            eligibleValue,

        valuation_date:
            valuation_date ?? null,

        valuation_method:
            valuation_method ?? null,

        valuation_status:
            valuationStatus,

        verification_status:
            verificationStatus,

        legal_status:
            legalStatus,

        existing_charge_amount:
            existingChargeAmount,

        ltv_percentage:
            ltvPercentage,

        lien_status:
            lienStatus,

        release_status:
            releaseStatus
    };


    return await createLoanCollateral(
        data
    );

}


// ==========================================================
// UPDATE LOAN COLLATERAL
// ==========================================================

export async function updateExistingLoanCollateral(
    collateralId,
    collateralData
) {

    const id =
        validateId(
            collateralId,
            "Loan collateral ID"
        );


    if (
        !collateralData ||
        typeof collateralData !== "object"
    ) {

        throw new Error(
            "Loan collateral data is required."
        );

    }


    const existingCollateral =
        await getLoanCollateralById(
            id
        );


    if (!existingCollateral) {

        throw new Error(
            "Loan collateral not found."
        );

    }


    const {
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
        ltv_percentage
    } = collateralData;


    const collateralType =
        collateral_type !== undefined
            ? normalizeEnum(
                collateral_type,
                "collateral type",
                ALLOWED_COLLATERAL_TYPES
            )
            : existingCollateral.collateral_type;


    const ownershipType =
        ownership_type !== undefined
            ? normalizeEnum(
                ownership_type,
                "ownership type",
                ALLOWED_OWNERSHIP_TYPES
            )
            : existingCollateral.ownership_type;


    const estimatedValue =
        estimated_value !== undefined
            ? validateOptionalNumber(
                estimated_value,
                "Estimated value"
            )
            : existingCollateral.estimated_value;


    const forcedSaleValue =
        forced_sale_value !== undefined
            ? validateOptionalNumber(
                forced_sale_value,
                "Forced sale value"
            )
            : existingCollateral.forced_sale_value;


    const eligibleValue =
        eligible_value !== undefined
            ? validateOptionalNumber(
                eligible_value,
                "Eligible value"
            )
            : existingCollateral.eligible_value;


    const existingChargeAmount =
        existing_charge_amount !== undefined
            ? validateOptionalNumber(
                existing_charge_amount,
                "Existing charge amount"
            )
            : existingCollateral.existing_charge_amount;


    const ltvPercentage =
        ltv_percentage !== undefined
            ? validateOptionalNumber(
                ltv_percentage,
                "LTV percentage"
            )
            : existingCollateral.ltv_percentage;


    if (
        forcedSaleValue !== null &&
        estimatedValue !== null &&
        Number(forcedSaleValue) >
        Number(estimatedValue)
    ) {

        throw new Error(
            "Forced sale value cannot exceed estimated value."
        );

    }


    if (
        eligibleValue !== null &&
        estimatedValue !== null &&
        Number(eligibleValue) >
        Number(estimatedValue)
    ) {

        throw new Error(
            "Eligible value cannot exceed estimated value."
        );

    }


    const updateData = {

        collateral_type:
            collateralType,

        collateral_description:
            collateral_description !== undefined
                ? collateral_description
                : existingCollateral.collateral_description,

        ownership_type:
            ownershipType,

        owner_name:
            owner_name !== undefined
                ? owner_name
                : existingCollateral.owner_name,

        estimated_value:
            estimatedValue,

        forced_sale_value:
            forcedSaleValue,

        eligible_value:
            eligibleValue,

        valuation_date:
            valuation_date !== undefined
                ? valuation_date
                : existingCollateral.valuation_date,

        valuation_method:
            valuation_method !== undefined
                ? valuation_method
                : existingCollateral.valuation_method,

        valuation_status:
            valuation_status !== undefined
                ? normalizeEnum(
                    valuation_status,
                    "valuation status",
                    ALLOWED_VALUATION_STATUSES
                )
                : existingCollateral.valuation_status,

        verification_status:
            verification_status !== undefined
                ? normalizeEnum(
                    verification_status,
                    "verification status",
                    ALLOWED_VERIFICATION_STATUSES
                )
                : existingCollateral.verification_status,

        legal_status:
            legal_status !== undefined
                ? normalizeEnum(
                    legal_status,
                    "legal status",
                    ALLOWED_LEGAL_STATUSES
                )
                : existingCollateral.legal_status,

        existing_charge_amount:
            existingChargeAmount,

        ltv_percentage:
            ltvPercentage
    };


    return await updateLoanCollateral(
        id,
        updateData
    );

}


// ==========================================================
// CHANGE VALUATION STATUS
// ==========================================================

export async function changeLoanCollateralValuationStatus(
    collateralId,
    status
) {

    const id =
        validateId(
            collateralId,
            "Loan collateral ID"
        );


    const normalizedStatus =
        normalizeEnum(
            status,
            "valuation status",
            ALLOWED_VALUATION_STATUSES
        );


    if (!normalizedStatus) {

        throw new Error(
            "Valuation status is required."
        );

    }


    const existingCollateral =
        await getLoanCollateralById(
            id
        );


    if (!existingCollateral) {

        throw new Error(
            "Loan collateral not found."
        );

    }


    return await updateLoanCollateralValuationStatus(
        id,
        normalizedStatus
    );

}


// ==========================================================
// CHANGE VERIFICATION STATUS
// ==========================================================

export async function changeLoanCollateralVerificationStatus(
    collateralId,
    status
) {

    const id =
        validateId(
            collateralId,
            "Loan collateral ID"
        );


    const normalizedStatus =
        normalizeEnum(
            status,
            "verification status",
            ALLOWED_VERIFICATION_STATUSES
        );


    if (!normalizedStatus) {

        throw new Error(
            "Verification status is required."
        );

    }


    const existingCollateral =
        await getLoanCollateralById(
            id
        );


    if (!existingCollateral) {

        throw new Error(
            "Loan collateral not found."
        );

    }


    return await updateLoanCollateralVerificationStatus(
        id,
        normalizedStatus
    );

}


// ==========================================================
// CHANGE LEGAL STATUS
// ==========================================================

export async function changeLoanCollateralLegalStatus(
    collateralId,
    status
) {

    const id =
        validateId(
            collateralId,
            "Loan collateral ID"
        );


    const normalizedStatus =
        normalizeEnum(
            status,
            "legal status",
            ALLOWED_LEGAL_STATUSES
        );


    if (!normalizedStatus) {

        throw new Error(
            "Legal status is required."
        );

    }


    const existingCollateral =
        await getLoanCollateralById(
            id
        );


    if (!existingCollateral) {

        throw new Error(
            "Loan collateral not found."
        );

    }


    return await updateLoanCollateralLegalStatus(
        id,
        normalizedStatus
    );

}


// ==========================================================
// CHANGE LIEN STATUS
// ==========================================================

export async function changeLoanCollateralLienStatus(
    collateralId,
    status
) {

    const id =
        validateId(
            collateralId,
            "Loan collateral ID"
        );


    const normalizedStatus =
        normalizeEnum(
            status,
            "lien status",
            ALLOWED_LIEN_STATUSES
        );


    if (!normalizedStatus) {

        throw new Error(
            "Lien status is required."
        );

    }


    const existingCollateral =
        await getLoanCollateralById(
            id
        );


    if (!existingCollateral) {

        throw new Error(
            "Loan collateral not found."
        );

    }


    return await updateLoanCollateralLienStatus(
        id,
        normalizedStatus
    );

}


// ==========================================================
// CHANGE RELEASE STATUS
// ==========================================================

export async function changeLoanCollateralReleaseStatus(
    collateralId,
    status
) {

    const id =
        validateId(
            collateralId,
            "Loan collateral ID"
        );


    const normalizedStatus =
        normalizeEnum(
            status,
            "release status",
            ALLOWED_RELEASE_STATUSES
        );


    if (!normalizedStatus) {

        throw new Error(
            "Release status is required."
        );

    }


    const existingCollateral =
        await getLoanCollateralById(
            id
        );


    if (!existingCollateral) {

        throw new Error(
            "Loan collateral not found."
        );

    }


    return await updateLoanCollateralReleaseStatus(
        id,
        normalizedStatus
    );

}


// ==========================================================
// DELETE LOAN COLLATERAL
// ==========================================================

export async function removeLoanCollateral(
    collateralId
) {

    const id =
        validateId(
            collateralId,
            "Loan collateral ID"
        );


    const existingCollateral =
        await getLoanCollateralById(
            id
        );


    if (!existingCollateral) {

        throw new Error(
            "Loan collateral not found."
        );

    }


    return await deleteLoanCollateral(
        id
    );

}


// ==========================================================
// EXPORT CONSTANTS & UTILITIES
// ==========================================================

export {
    ALLOWED_COLLATERAL_TYPES,
    ALLOWED_OWNERSHIP_TYPES,
    ALLOWED_VALUATION_STATUSES,
    ALLOWED_VERIFICATION_STATUSES,
    ALLOWED_LEGAL_STATUSES,
    ALLOWED_LIEN_STATUSES,
    ALLOWED_RELEASE_STATUSES,
    calculateLTV
};

