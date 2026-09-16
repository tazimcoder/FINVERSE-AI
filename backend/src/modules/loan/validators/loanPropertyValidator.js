/**
 * ==========================================================
 * FINVERSE AI
 * Loan Property Validator
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/validators/loanPropertyValidator.js
 *
 * Responsibility:
 *
 * - Validate Loan Property request parameters
 * - Validate Loan Property creation payload
 * - Validate Loan Property update payload
 * - Validate valuation / verification status
 * - Keep validation logic separate from controllers
 *
 * Database Table:
 * loan_properties
 *
 * ==========================================================
 */


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


const ALLOWED_PROPERTY_USAGE = [
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
// UTILITY - SEND VALIDATION ERROR
// ==========================================================

function validationError(
    res,
    message
) {

    return res.status(400).json({

        success: false,

        message

    });

}


// ==========================================================
// UTILITY - VALIDATE POSITIVE INTEGER
// ==========================================================

function isValidPositiveInteger(
    value
) {

    const number =
        Number(value);


    return (
        Number.isInteger(number) &&
        number > 0
    );

}


// ==========================================================
// UTILITY - VALIDATE OPTIONAL POSITIVE INTEGER
// ==========================================================

function isValidOptionalPositiveInteger(
    value
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return true;

    }


    return isValidPositiveInteger(
        value
    );

}


// ==========================================================
// UTILITY - VALIDATE OPTIONAL NON-NEGATIVE NUMBER
// ==========================================================

function isValidOptionalNumber(
    value
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return true;

    }


    const number =
        Number(value);


    return (
        Number.isFinite(number) &&
        number >= 0
    );

}


// ==========================================================
// UTILITY - VALIDATE OPTIONAL DECIMAL COORDINATE
// ==========================================================

function isValidLatitude(
    value
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return true;

    }


    const latitude =
        Number(value);


    return (
        Number.isFinite(latitude) &&
        latitude >= -90 &&
        latitude <= 90
    );

}


function isValidLongitude(
    value
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return true;

    }


    const longitude =
        Number(value);


    return (
        Number.isFinite(longitude) &&
        longitude >= -180 &&
        longitude <= 180
    );

}


// ==========================================================
// UTILITY - VALIDATE ENUM
// ==========================================================

function isValidEnum(
    value,
    allowedValues
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return true;

    }


    return allowedValues.includes(
        String(value)
            .trim()
            .toUpperCase()
    );

}


// ==========================================================
// VALIDATE LOAN PROPERTY ID
// ==========================================================
//
// Used for:
//
// GET    /:id
// PUT    /:id
// PATCH  /:id/valuation-status
// PATCH  /:id/verification-status
// DELETE /:id
//
// ==========================================================

export function validateLoanPropertyId(
    req,
    res,
    next
) {

    const {
        id
    } = req.params;


    if (
        !isValidPositiveInteger(id)
    ) {

        return validationError(
            res,
            "Loan property ID must be a valid positive integer."
        );

    }


    next();

}


// ==========================================================
// VALIDATE CREATE LOAN PROPERTY
// ==========================================================
//
// POST
// /api/v1/loan-properties
//
// ==========================================================

export function validateLoanPropertyCreate(
    req,
    res,
    next
) {

    const data =
        req.body;


    if (
        !data ||
        typeof data !== "object" ||
        Array.isArray(data)
    ) {

        return validationError(
            res,
            "Loan property data is required."
        );

    }


    // ======================================================
    // Required Fields
    // ======================================================

    if (
        !isValidPositiveInteger(
            data.loan_application_id
        )
    ) {

        return validationError(
            res,
            "loan_application_id must be a valid positive integer."
        );

    }


    if (
        !isValidPositiveInteger(
            data.user_id
        )
    ) {

        return validationError(
            res,
            "user_id must be a valid positive integer."
        );

    }


    if (
        !data.property_type
    ) {

        return validationError(
            res,
            "property_type is required."
        );

    }


    if (
        !ALLOWED_PROPERTY_TYPES.includes(
            String(data.property_type)
                .trim()
                .toUpperCase()
        )
    ) {

        return validationError(
            res,
            "Invalid property_type."
        );

    }


    if (
        !data.city ||
        String(data.city).trim() === ""
    ) {

        return validationError(
            res,
            "city is required."
        );

    }


    if (
        !data.state ||
        String(data.state).trim() === ""
    ) {

        return validationError(
            res,
            "state is required."
        );

    }


    // ======================================================
    // Optional Reference / Integer Fields
    // ======================================================

    const integerFields = [

        "floor_number",
        "total_floors",
        "bedrooms",
        "bathrooms",
        "parking_spaces",
        "construction_year"

    ];


    for (
        const field of integerFields
    ) {

        if (
            !isValidOptionalPositiveInteger(
                data[field]
            )
        ) {

            return validationError(
                res,
                `${field} must be a valid positive integer.`
            );

        }

    }


    // ======================================================
    // Optional Numeric Fields
    // ======================================================

    const numericFields = [

        "property_area_sqft",
        "built_up_area_sqft",
        "carpet_area_sqft",
        "land_area_sqft",
        "property_age_years",
        "purchase_price",
        "estimated_market_value",
        "estimated_market_rate_per_sqft"

    ];


    for (
        const field of numericFields
    ) {

        if (
            !isValidOptionalNumber(
                data[field]
            )
        ) {

            return validationError(
                res,
                `${field} must be a valid non-negative number.`
            );

        }

    }


    // ======================================================
    // Latitude / Longitude
    // ======================================================

    if (
        !isValidLatitude(
            data.latitude
        )
    ) {

        return validationError(
            res,
            "latitude must be between -90 and 90."
        );

    }


    if (
        !isValidLongitude(
            data.longitude
        )
    ) {

        return validationError(
            res,
            "longitude must be between -180 and 180."
        );

    }


    // ======================================================
    // Enum Validation
    // ======================================================

    if (
        !isValidEnum(
            data.ownership_type,
            ALLOWED_OWNERSHIP_TYPES
        )
    ) {

        return validationError(
            res,
            "Invalid ownership_type."
        );

    }


    if (
        !isValidEnum(
            data.property_usage,
            ALLOWED_PROPERTY_USAGE
        )
    ) {

        return validationError(
            res,
            "Invalid property_usage."
        );

    }


    if (
        !isValidEnum(
            data.valuation_status,
            ALLOWED_VALUATION_STATUSES
        )
    ) {

        return validationError(
            res,
            "Invalid valuation_status."
        );

    }


    if (
        !isValidEnum(
            data.verification_status,
            ALLOWED_VERIFICATION_STATUSES
        )
    ) {

        return validationError(
            res,
            "Invalid verification_status."
        );

    }


    // ======================================================
    // String Length Validation
    // ======================================================

    const stringLimits = {

        address_line1: 255,
        address_line2: 255,
        landmark: 255,
        locality: 150,
        city: 100,
        district: 100,
        state: 100,
        postal_code: 20,
        country: 100

    };


    for (
        const [
            field,
            maxLength
        ] of Object.entries(
            stringLimits
        )
    ) {

        if (
            data[field] !== undefined &&
            data[field] !== null &&
            String(data[field]).length > maxLength
        ) {

            return validationError(
                res,
                `${field} cannot exceed ${maxLength} characters.`
            );

        }

    }


    // ======================================================
    // Business Validation
    // ======================================================

    if (
        data.built_up_area_sqft !== undefined &&
        data.property_area_sqft !== undefined &&
        Number(data.built_up_area_sqft) >
        Number(data.property_area_sqft)
    ) {

        return validationError(
            res,
            "built_up_area_sqft cannot exceed property_area_sqft."
        );

    }


    if (
        data.carpet_area_sqft !== undefined &&
        data.built_up_area_sqft !== undefined &&
        Number(data.carpet_area_sqft) >
        Number(data.built_up_area_sqft)
    ) {

        return validationError(
            res,
            "carpet_area_sqft cannot exceed built_up_area_sqft."
        );

    }


    if (
        data.construction_year !== undefined &&
        data.construction_year !== null &&
        Number(data.construction_year) >
        new Date().getFullYear()
    ) {

        return validationError(
            res,
            "construction_year cannot be in the future."
        );

    }


    next();

}


// ==========================================================
// VALIDATE UPDATE LOAN PROPERTY
// ==========================================================
//
// PUT
// /api/v1/loan-properties/:id
//
// ==========================================================

export function validateLoanPropertyUpdate(
    req,
    res,
    next
) {

    const data =
        req.body;


    if (
        !data ||
        typeof data !== "object" ||
        Array.isArray(data)
    ) {

        return validationError(
            res,
            "Loan property update data is required."
        );

    }


    // ======================================================
    // Property Type
    // ======================================================

    if (
        data.property_type !== undefined &&
        !isValidEnum(
            data.property_type,
            ALLOWED_PROPERTY_TYPES
        )
    ) {

        return validationError(
            res,
            "Invalid property_type."
        );

    }


    // ======================================================
    // Ownership / Usage
    // ======================================================

    if (
        data.ownership_type !== undefined &&
        !isValidEnum(
            data.ownership_type,
            ALLOWED_OWNERSHIP_TYPES
        )
    ) {

        return validationError(
            res,
            "Invalid ownership_type."
        );

    }


    if (
        data.property_usage !== undefined &&
        !isValidEnum(
            data.property_usage,
            ALLOWED_PROPERTY_USAGE
        )
    ) {

        return validationError(
            res,
            "Invalid property_usage."
        );

    }


    // ======================================================
    // Numeric Fields
    // ======================================================

    const numericFields = [

        "property_area_sqft",
        "built_up_area_sqft",
        "carpet_area_sqft",
        "land_area_sqft",
        "property_age_years",
        "purchase_price",
        "estimated_market_value",
        "estimated_market_rate_per_sqft"

    ];


    for (
        const field of numericFields
    ) {

        if (
            !isValidOptionalNumber(
                data[field]
            )
        ) {

            return validationError(
                res,
                `${field} must be a valid non-negative number.`
            );

        }

    }


    // ======================================================
    // Integer Fields
    // ======================================================

    const integerFields = [

        "floor_number",
        "total_floors",
        "bedrooms",
        "bathrooms",
        "parking_spaces",
        "construction_year"

    ];


    for (
        const field of integerFields
    ) {

        if (
            !isValidOptionalPositiveInteger(
                data[field]
            )
        ) {

            return validationError(
                res,
                `${field} must be a valid positive integer.`
            );

        }

    }


    // ======================================================
    // Coordinates
    // ======================================================

    if (
        !isValidLatitude(
            data.latitude
        )
    ) {

        return validationError(
            res,
            "latitude must be between -90 and 90."
        );

    }


    if (
        !isValidLongitude(
            data.longitude
        )
    ) {

        return validationError(
            res,
            "longitude must be between -180 and 180."
        );

    }


    // ======================================================
    // String Lengths
    // ======================================================

    const stringLimits = {

        address_line1: 255,
        address_line2: 255,
        landmark: 255,
        locality: 150,
        city: 100,
        district: 100,
        state: 100,
        postal_code: 20,
        country: 100

    };


    for (
        const [
            field,
            maxLength
        ] of Object.entries(
            stringLimits
        )
    ) {

        if (
            data[field] !== undefined &&
            data[field] !== null &&
            String(data[field]).length > maxLength
        ) {

            return validationError(
                res,
                `${field} cannot exceed ${maxLength} characters.`
            );

        }

    }


    // ======================================================
    // Status Fields
    // ======================================================

    if (
        data.valuation_status !== undefined &&
        !isValidEnum(
            data.valuation_status,
            ALLOWED_VALUATION_STATUSES
        )
    ) {

        return validationError(
            res,
            "Invalid valuation_status."
        );

    }


    if (
        data.verification_status !== undefined &&
        !isValidEnum(
            data.verification_status,
            ALLOWED_VERIFICATION_STATUSES
        )
    ) {

        return validationError(
            res,
            "Invalid verification_status."
        );

    }


    next();

}


// ==========================================================
// VALIDATE PROPERTY STATUS
// ==========================================================
//
// Used by:
//
// PATCH /:id/valuation-status
// PATCH /:id/verification-status
//
// ==========================================================

export function validateLoanPropertyStatus(
    req,
    res,
    next
) {

    const {
        status
    } = req.body;


    if (
        status === undefined ||
        status === null ||
        String(status).trim() === ""
    ) {

        return validationError(
            res,
            "status is required."
        );

    }


    const normalizedStatus =
        String(status)
            .trim()
            .toUpperCase();


    const routePath =
        req.route?.path || "";


    // ======================================================
    // Valuation Status
    // ======================================================

    if (
        routePath.includes(
            "valuation-status"
        )
    ) {

        if (
            !ALLOWED_VALUATION_STATUSES.includes(
                normalizedStatus
            )
        ) {

            return validationError(
                res,
                "Invalid valuation status."
            );

        }

        req.body.status =
            normalizedStatus;

        return next();

    }


    // ======================================================
    // Verification Status
    // ======================================================

    if (
        routePath.includes(
            "verification-status"
        )
    ) {

        if (
            !ALLOWED_VERIFICATION_STATUSES.includes(
                normalizedStatus
            )
        ) {

            return validationError(
                res,
                "Invalid verification status."
            );

        }

        req.body.status =
            normalizedStatus;

        return next();

    }


    return validationError(
        res,
        "Invalid property status route."
    );

}


// ==========================================================
// EXPORT CONSTANTS
// ==========================================================

export {
    ALLOWED_PROPERTY_TYPES,
    ALLOWED_OWNERSHIP_TYPES,
    ALLOWED_PROPERTY_USAGE,
    ALLOWED_VALUATION_STATUSES,
    ALLOWED_VERIFICATION_STATUSES
};

