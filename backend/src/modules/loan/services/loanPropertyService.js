/**
 * ==========================================================
 * FINVERSE AI
 * Loan Property Service
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/services/loanPropertyService.js
 *
 * Responsibility:
 *
 * - Loan property business logic
 * - Validate property data
 * - Fetch property records
 * - Create property
 * - Update property
 * - Manage valuation status
 * - Manage verification status
 * - Delete property
 *
 * Database Table:
 * loan_properties
 *
 * ==========================================================
 */

import {
    getAllLoanProperties,
    getLoanPropertyById,
    getLoanPropertiesByApplicationId,
    getLoanPropertiesByUserId,
    getLoanPropertiesByType,
    getLoanPropertiesByOwnershipType,
    getLoanPropertiesByUsage,
    getLoanPropertiesByValuationStatus,
    getLoanPropertiesByVerificationStatus,
    createLoanProperty,
    updateLoanProperty,
    updateLoanPropertyValuationStatus,
    updateLoanPropertyVerificationStatus,
    deleteLoanProperty
} from "../models/loanPropertyModel.js";


// ==========================================================
// ALLOWED ENUM VALUES
// ==========================================================

const ALLOWED_PROPERTY_TYPES = [
    "RESIDENTIAL",
    "COMMERCIAL",
    "PLOT",
    "LAND",
    "APARTMENT",
    "VILLA",
    "HOUSE",
    "OFFICE",
    "SHOP",
    "INDUSTRIAL",
    "OTHER"
];


const ALLOWED_OWNERSHIP_TYPES = [
    "SELF_OWNED",
    "JOINTLY_OWNED",
    "FAMILY_OWNED",
    "UNDER_CONSTRUCTION",
    "PROPOSED_PURCHASE",
    "OTHER"
];


const ALLOWED_PROPERTY_USAGES = [
    "SELF_OCCUPIED",
    "RENTED",
    "INVESTMENT",
    "COMMERCIAL_USE",
    "VACANT",
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


// ==========================================================
// VALIDATE ID
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
// VALIDATE OPTIONAL STRING
// ==========================================================

function normalizeOptionalString(
    value
) {

    if (
        value === undefined ||
        value === null
    ) {

        return null;

    }


    const normalized =
        String(value).trim();


    return normalized === ""
        ? null
        : normalized;
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
// VALIDATE OPTIONAL INTEGER
// ==========================================================

function validateOptionalInteger(
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
        !Number.isInteger(number) ||
        number < 0
    ) {

        throw new Error(
            `${fieldName} must be a valid non-negative integer.`
        );

    }


    return number;
}


// ==========================================================
// VALIDATE ENUM
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
// VALIDATE LATITUDE
// ==========================================================

function validateLatitude(
    value
) {

    const latitude =
        validateOptionalNumber(
            value,
            "Latitude"
        );


    if (
        latitude !== null &&
        (
            latitude < -90 ||
            latitude > 90
        )
    ) {

        throw new Error(
            "Latitude must be between -90 and 90."
        );

    }


    return latitude;
}


// ==========================================================
// VALIDATE LONGITUDE
// ==========================================================

function validateLongitude(
    value
) {

    const longitude =
        validateOptionalNumber(
            value,
            "Longitude"
        );


    if (
        longitude !== null &&
        (
            longitude < -180 ||
            longitude > 180
        )
    ) {

        throw new Error(
            "Longitude must be between -180 and 180."
        );

    }


    return longitude;
}


// ==========================================================
// FETCH ALL
// ==========================================================

export async function fetchAllLoanProperties() {

    return await getAllLoanProperties();

}


// ==========================================================
// FETCH BY ID
// ==========================================================

export async function fetchLoanPropertyById(
    propertyId
) {

    const id =
        validateId(
            propertyId,
            "Loan property ID"
        );


    return await getLoanPropertyById(
        id
    );

}


// ==========================================================
// FETCH BY APPLICATION
// ==========================================================

export async function fetchLoanPropertiesByApplicationId(
    applicationId
) {

    const id =
        validateId(
            applicationId,
            "Loan application ID"
        );


    return await getLoanPropertiesByApplicationId(
        id
    );

}


// ==========================================================
// FETCH BY USER
// ==========================================================

export async function fetchLoanPropertiesByUserId(
    userId
) {

    const id =
        validateId(
            userId,
            "User ID"
        );


    return await getLoanPropertiesByUserId(
        id
    );

}


// ==========================================================
// FETCH BY PROPERTY TYPE
// ==========================================================

export async function fetchLoanPropertiesByType(
    propertyType
) {

    const type =
        normalizeEnum(
            propertyType,
            "property type",
            ALLOWED_PROPERTY_TYPES
        );


    if (!type) {

        throw new Error(
            "Property type is required."
        );

    }


    return await getLoanPropertiesByType(
        type
    );

}


// ==========================================================
// FETCH BY OWNERSHIP TYPE
// ==========================================================

export async function fetchLoanPropertiesByOwnershipType(
    ownershipType
) {

    const type =
        normalizeEnum(
            ownershipType,
            "ownership type",
            ALLOWED_OWNERSHIP_TYPES
        );


    if (!type) {

        throw new Error(
            "Ownership type is required."
        );

    }


    return await getLoanPropertiesByOwnershipType(
        type
    );

}


// ==========================================================
// FETCH BY PROPERTY USAGE
// ==========================================================

export async function fetchLoanPropertiesByUsage(
    propertyUsage
) {

    const usage =
        normalizeEnum(
            propertyUsage,
            "property usage",
            ALLOWED_PROPERTY_USAGES
        );


    if (!usage) {

        throw new Error(
            "Property usage is required."
        );

    }


    return await getLoanPropertiesByUsage(
        usage
    );

}


// ==========================================================
// FETCH BY VALUATION STATUS
// ==========================================================

export async function fetchLoanPropertiesByValuationStatus(
    valuationStatus
) {

    const status =
        normalizeEnum(
            valuationStatus,
            "valuation status",
            ALLOWED_VALUATION_STATUSES
        );


    if (!status) {

        throw new Error(
            "Valuation status is required."
        );

    }


    return await getLoanPropertiesByValuationStatus(
        status
    );

}


// ==========================================================
// FETCH BY VERIFICATION STATUS
// ==========================================================

export async function fetchLoanPropertiesByVerificationStatus(
    verificationStatus
) {

    const status =
        normalizeEnum(
            verificationStatus,
            "verification status",
            ALLOWED_VERIFICATION_STATUSES
        );


    if (!status) {

        throw new Error(
            "Verification status is required."
        );

    }


    return await getLoanPropertiesByVerificationStatus(
        status
    );

}


// ==========================================================
// CREATE LOAN PROPERTY
// ==========================================================

export async function createNewLoanProperty(
    propertyData
) {

    if (
        !propertyData ||
        typeof propertyData !== "object" ||
        Array.isArray(propertyData)
    ) {

        throw new Error(
            "Loan property data is required."
        );

    }


    const {

        loan_application_id,
        user_id,

        property_type,
        ownership_type,
        property_usage,

        address_line1,
        address_line2,
        landmark,
        locality,
        city,
        district,
        state,
        postal_code,
        country,

        latitude,
        longitude,

        property_area_sqft,
        built_up_area_sqft,
        carpet_area_sqft,
        land_area_sqft,

        property_age_years,
        construction_year,

        floor_number,
        total_floors,
        bedrooms,
        bathrooms,
        parking_spaces,

        purchase_price,
        estimated_market_value,
        estimated_market_rate_per_sqft,

        valuation_status,
        verification_status,

        property_description

    } = propertyData;


    const applicationId =
        validateId(
            loan_application_id,
            "Loan application ID"
        );


    const userId =
        validateId(
            user_id,
            "User ID"
        );


    const propertyType =
        normalizeEnum(
            property_type,
            "property type",
            ALLOWED_PROPERTY_TYPES
        );


    if (!propertyType) {

        throw new Error(
            "Property type is required."
        );

    }


    const ownershipType =
        normalizeEnum(
            ownership_type,
            "ownership type",
            ALLOWED_OWNERSHIP_TYPES
        );


    const propertyUsage =
        normalizeEnum(
            property_usage,
            "property usage",
            ALLOWED_PROPERTY_USAGES
        );


    const cityValue =
        validateRequiredString(
            city,
            "City"
        );


    const stateValue =
        validateRequiredString(
            state,
            "State"
        );


    const latitudeValue =
        validateLatitude(
            latitude
        );


    const longitudeValue =
        validateLongitude(
            longitude
        );


    const propertyArea =
        validateOptionalNumber(
            property_area_sqft,
            "Property area"
        );


    const builtUpArea =
        validateOptionalNumber(
            built_up_area_sqft,
            "Built-up area"
        );


    const carpetArea =
        validateOptionalNumber(
            carpet_area_sqft,
            "Carpet area"
        );


    const landArea =
        validateOptionalNumber(
            land_area_sqft,
            "Land area"
        );


    const propertyAge =
        validateOptionalNumber(
            property_age_years,
            "Property age"
        );


    const constructionYearValue =
        validateOptionalInteger(
            construction_year,
            "Construction year"
        );


    const currentYear =
        new Date().getFullYear();


    if (
        constructionYearValue !== null &&
        (
            constructionYearValue < 1800 ||
            constructionYearValue > currentYear
        )
    ) {

        throw new Error(
            `Construction year must be between 1800 and ${currentYear}.`
        );

    }


    const floorNumber =
        validateOptionalInteger(
            floor_number,
            "Floor number"
        );


    const totalFloors =
        validateOptionalInteger(
            total_floors,
            "Total floors"
        );


    const bedroomsValue =
        validateOptionalInteger(
            bedrooms,
            "Bedrooms"
        );


    const bathroomsValue =
        validateOptionalInteger(
            bathrooms,
            "Bathrooms"
        );


    const parkingSpaces =
        validateOptionalInteger(
            parking_spaces,
            "Parking spaces"
        );


    if (
        floorNumber !== null &&
        totalFloors !== null &&
        floorNumber > totalFloors
    ) {

        throw new Error(
            "Floor number cannot exceed total floors."
        );

    }


    const purchasePrice =
        validateOptionalNumber(
            purchase_price,
            "Purchase price"
        );


    const marketValue =
        validateOptionalNumber(
            estimated_market_value,
            "Estimated market value"
        );


    const marketRate =
        validateOptionalNumber(
            estimated_market_rate_per_sqft,
            "Estimated market rate per sqft"
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


    const data = {

        loan_application_id:
            applicationId,

        user_id:
            userId,

        property_type:
            propertyType,

        ownership_type:
            ownershipType,

        property_usage:
            propertyUsage,

        address_line1:
            normalizeOptionalString(
                address_line1
            ),

        address_line2:
            normalizeOptionalString(
                address_line2
            ),

        landmark:
            normalizeOptionalString(
                landmark
            ),

        locality:
            normalizeOptionalString(
                locality
            ),

        city:
            cityValue,

        district:
            normalizeOptionalString(
                district
            ),

        state:
            stateValue,

        postal_code:
            normalizeOptionalString(
                postal_code
            ),

        country:
            normalizeOptionalString(
                country
            ) || "India",

        latitude:
            latitudeValue,

        longitude:
            longitudeValue,

        property_area_sqft:
            propertyArea,

        built_up_area_sqft:
            builtUpArea,

        carpet_area_sqft:
            carpetArea,

        land_area_sqft:
            landArea,

        property_age_years:
            propertyAge,

        construction_year:
            constructionYearValue,

        floor_number:
            floorNumber,

        total_floors:
            totalFloors,

        bedrooms:
            bedroomsValue,

        bathrooms:
            bathroomsValue,

        parking_spaces:
            parkingSpaces,

        purchase_price:
            purchasePrice,

        estimated_market_value:
            marketValue,

        estimated_market_rate_per_sqft:
            marketRate,

        valuation_status:
            valuationStatus,

        verification_status:
            verificationStatus,

        property_description:
            normalizeOptionalString(
                property_description
            )

    };


    return await createLoanProperty(
        data
    );

}


// ==========================================================
// UPDATE LOAN PROPERTY
// ==========================================================

export async function updateExistingLoanProperty(
    propertyId,
    propertyData
) {

    const id =
        validateId(
            propertyId,
            "Loan property ID"
        );


    if (
        !propertyData ||
        typeof propertyData !== "object" ||
        Array.isArray(propertyData)
    ) {

        throw new Error(
            "Loan property data is required."
        );

    }


    const existingProperty =
        await getLoanPropertyById(
            id
        );


    if (!existingProperty) {

        throw new Error(
            "Loan property not found."
        );

    }


    const {

        property_type,
        ownership_type,
        property_usage,

        address_line1,
        address_line2,
        landmark,
        locality,
        city,
        district,
        state,
        postal_code,
        country,

        latitude,
        longitude,

        property_area_sqft,
        built_up_area_sqft,
        carpet_area_sqft,
        land_area_sqft,

        property_age_years,
        construction_year,

        floor_number,
        total_floors,
        bedrooms,
        bathrooms,
        parking_spaces,

        purchase_price,
        estimated_market_value,
        estimated_market_rate_per_sqft,

        property_description

    } = propertyData;


    const propertyType =
        property_type !== undefined
            ? normalizeEnum(
                property_type,
                "property type",
                ALLOWED_PROPERTY_TYPES
            )
            : existingProperty.property_type;


    const ownershipType =
        ownership_type !== undefined
            ? normalizeEnum(
                ownership_type,
                "ownership type",
                ALLOWED_OWNERSHIP_TYPES
            )
            : existingProperty.ownership_type;


    const propertyUsage =
        property_usage !== undefined
            ? normalizeEnum(
                property_usage,
                "property usage",
                ALLOWED_PROPERTY_USAGES
            )
            : existingProperty.property_usage;


    const cityValue =
        city !== undefined
            ? validateRequiredString(
                city,
                "City"
            )
            : existingProperty.city;


    const stateValue =
        state !== undefined
            ? validateRequiredString(
                state,
                "State"
            )
            : existingProperty.state;


    const latitudeValue =
        latitude !== undefined
            ? validateLatitude(
                latitude
            )
            : existingProperty.latitude;


    const longitudeValue =
        longitude !== undefined
            ? validateLongitude(
                longitude
            )
            : existingProperty.longitude;


    const propertyArea =
        property_area_sqft !== undefined
            ? validateOptionalNumber(
                property_area_sqft,
                "Property area"
            )
            : existingProperty.property_area_sqft;


    const builtUpArea =
        built_up_area_sqft !== undefined
            ? validateOptionalNumber(
                built_up_area_sqft,
                "Built-up area"
            )
            : existingProperty.built_up_area_sqft;


    const carpetArea =
        carpet_area_sqft !== undefined
            ? validateOptionalNumber(
                carpet_area_sqft,
                "Carpet area"
            )
            : existingProperty.carpet_area_sqft;


    const landArea =
        land_area_sqft !== undefined
            ? validateOptionalNumber(
                land_area_sqft,
                "Land area"
            )
            : existingProperty.land_area_sqft;


    const propertyAge =
        property_age_years !== undefined
            ? validateOptionalNumber(
                property_age_years,
                "Property age"
            )
            : existingProperty.property_age_years;


    const constructionYearValue =
        construction_year !== undefined
            ? validateOptionalInteger(
                construction_year,
                "Construction year"
            )
            : existingProperty.construction_year;


    const currentYear =
        new Date().getFullYear();


    if (
        constructionYearValue !== null &&
        (
            constructionYearValue < 1800 ||
            constructionYearValue > currentYear
        )
    ) {

        throw new Error(
            `Construction year must be between 1800 and ${currentYear}.`
        );

    }


    const floorNumber =
        floor_number !== undefined
            ? validateOptionalInteger(
                floor_number,
                "Floor number"
            )
            : existingProperty.floor_number;


    const totalFloors =
        total_floors !== undefined
            ? validateOptionalInteger(
                total_floors,
                "Total floors"
            )
            : existingProperty.total_floors;


    if (
        floorNumber !== null &&
        totalFloors !== null &&
        Number(floorNumber) > Number(totalFloors)
    ) {

        throw new Error(
            "Floor number cannot exceed total floors."
        );

    }


    const bedroomsValue =
        bedrooms !== undefined
            ? validateOptionalInteger(
                bedrooms,
                "Bedrooms"
            )
            : existingProperty.bedrooms;


    const bathroomsValue =
        bathrooms !== undefined
            ? validateOptionalInteger(
                bathrooms,
                "Bathrooms"
            )
            : existingProperty.bathrooms;


    const parkingSpaces =
        parking_spaces !== undefined
            ? validateOptionalInteger(
                parking_spaces,
                "Parking spaces"
            )
            : existingProperty.parking_spaces;


    const purchasePrice =
        purchase_price !== undefined
            ? validateOptionalNumber(
                purchase_price,
                "Purchase price"
            )
            : existingProperty.purchase_price;


    const marketValue =
        estimated_market_value !== undefined
            ? validateOptionalNumber(
                estimated_market_value,
                "Estimated market value"
            )
            : existingProperty.estimated_market_value;


    const marketRate =
        estimated_market_rate_per_sqft !== undefined
            ? validateOptionalNumber(
                estimated_market_rate_per_sqft,
                "Estimated market rate per sqft"
            )
            : existingProperty.estimated_market_rate_per_sqft;


    const updateData = {

        property_type:
            propertyType,

        ownership_type:
            ownershipType,

        property_usage:
            propertyUsage,

        address_line1:
            address_line1 !== undefined
                ? normalizeOptionalString(
                    address_line1
                )
                : existingProperty.address_line1,

        address_line2:
            address_line2 !== undefined
                ? normalizeOptionalString(
                    address_line2
                )
                : existingProperty.address_line2,

        landmark:
            landmark !== undefined
                ? normalizeOptionalString(
                    landmark
                )
                : existingProperty.landmark,

        locality:
            locality !== undefined
                ? normalizeOptionalString(
                    locality
                )
                : existingProperty.locality,

        city:
            cityValue,

        district:
            district !== undefined
                ? normalizeOptionalString(
                    district
                )
                : existingProperty.district,

        state:
            stateValue,

        postal_code:
            postal_code !== undefined
                ? normalizeOptionalString(
                    postal_code
                )
                : existingProperty.postal_code,

        country:
            country !== undefined
                ? normalizeOptionalString(
                    country
                ) || "India"
                : existingProperty.country || "India",

        latitude:
            latitudeValue,

        longitude:
            longitudeValue,

        property_area_sqft:
            propertyArea,

        built_up_area_sqft:
            builtUpArea,

        carpet_area_sqft:
            carpetArea,

        land_area_sqft:
            landArea,

        property_age_years:
            propertyAge,

        construction_year:
            constructionYearValue,

        floor_number:
            floorNumber,

        total_floors:
            totalFloors,

        bedrooms:
            bedroomsValue,

        bathrooms:
            bathroomsValue,

        parking_spaces:
            parkingSpaces,

        purchase_price:
            purchasePrice,

        estimated_market_value:
            marketValue,

        estimated_market_rate_per_sqft:
            marketRate,

        property_description:
            property_description !== undefined
                ? normalizeOptionalString(
                    property_description
                )
                : existingProperty.property_description

    };


    return await updateLoanProperty(
        id,
        updateData
    );

}


// ==========================================================
// CHANGE VALUATION STATUS
// ==========================================================

export async function changeLoanPropertyValuationStatus(
    propertyId,
    status
) {

    const id =
        validateId(
            propertyId,
            "Loan property ID"
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


    const existingProperty =
        await getLoanPropertyById(
            id
        );


    if (!existingProperty) {

        throw new Error(
            "Loan property not found."
        );

    }


    return await updateLoanPropertyValuationStatus(
        id,
        normalizedStatus
    );

}


// ==========================================================
// CHANGE VERIFICATION STATUS
// ==========================================================

export async function changeLoanPropertyVerificationStatus(
    propertyId,
    status
) {

    const id =
        validateId(
            propertyId,
            "Loan property ID"
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


    const existingProperty =
        await getLoanPropertyById(
            id
        );


    if (!existingProperty) {

        throw new Error(
            "Loan property not found."
        );

    }


    return await updateLoanPropertyVerificationStatus(
        id,
        normalizedStatus
    );

}


// ==========================================================
// DELETE LOAN PROPERTY
// ==========================================================

export async function removeLoanProperty(
    propertyId
) {

    const id =
        validateId(
            propertyId,
            "Loan property ID"
        );


    const existingProperty =
        await getLoanPropertyById(
            id
        );


    if (!existingProperty) {

        throw new Error(
            "Loan property not found."
        );

    }


    return await deleteLoanProperty(
        id
    );

}


// ==========================================================
// EXPORT CONSTANTS
// ==========================================================

export {
    ALLOWED_PROPERTY_TYPES,
    ALLOWED_OWNERSHIP_TYPES,
    ALLOWED_PROPERTY_USAGES,
    ALLOWED_VALUATION_STATUSES,
    ALLOWED_VERIFICATION_STATUSES
};

