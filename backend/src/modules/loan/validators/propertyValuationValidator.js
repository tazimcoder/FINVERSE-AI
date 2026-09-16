/**
 * ==========================================================
 * FINVERSE AI
 * Property Valuation Validator
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/validators/propertyValuationValidator.js
 *
 * Responsibility:
 *
 * - Validate Property Valuation API requests
 * - Validate IDs and route parameters
 * - Validate valuation status
 * - Validate property type
 * - Validate location filters
 * - Validate create/update payloads
 * - Keep validation reusable and future-ready
 *
 * ==========================================================
 */

const ALLOWED_VALUATION_STATUSES = [
    "PENDING",
    "PROCESSING",
    "COMPLETED",
    "FAILED",
    "MANUAL_REVIEW",
];


// ==========================================================
// COMMON HELPERS
// ==========================================================

const isPositiveInteger = (value) => {

    const number = Number(value);

    return (
        Number.isInteger(number) &&
        number > 0
    );

};


const isNonEmptyString = (value) => {

    return (
        typeof value === "string" &&
        value.trim().length > 0
    );

};


const isValidNumber = (value) => {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return false;

    }

    return Number.isFinite(
        Number(value)
    );

};


const isValidDecimal = (
    value,
    max = null,
    min = null
) => {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return true;

    }

    const number = Number(value);

    if (!Number.isFinite(number)) {

        return false;

    }

    if (
        min !== null &&
        number < min
    ) {

        return false;

    }

    if (
        max !== null &&
        number > max
    ) {

        return false;

    }

    return true;

};


const isValidStatus = (status) => {

    return ALLOWED_VALUATION_STATUSES.includes(
        String(status).toUpperCase()
    );

};


// ==========================================================
// CREATE PROPERTY VALUATION
// ==========================================================

export const validateCreatePropertyValuation = (
    req,
    res,
    next
) => {

    const {
        userId,
        propertyType,
        city,
        state,
        latitude,
        longitude,
        propertyAreaSqft,
        estimatedValue,
        estimatedMinValue,
        estimatedMaxValue,
        estimatedRatePerSqft,
        confidenceScore,
        valuationStatus,
        dataSources,
    } = req.body;


    // ------------------------------------------------------
    // Required user ID
    // ------------------------------------------------------

    if (!isPositiveInteger(userId)) {

        return res.status(400).json({

            success: false,

            message:
                "Valid userId is required.",

        });

    }


    // ------------------------------------------------------
    // Required property type
    // ------------------------------------------------------

    if (!isNonEmptyString(propertyType)) {

        return res.status(400).json({

            success: false,

            message:
                "Property type is required.",

        });

    }


    if (propertyType.trim().length > 100) {

        return res.status(400).json({

            success: false,

            message:
                "Property type must not exceed 100 characters.",

        });

    }


    // ------------------------------------------------------
    // Required city
    // ------------------------------------------------------

    if (!isNonEmptyString(city)) {

        return res.status(400).json({

            success: false,

            message:
                "City is required.",

        });

    }


    if (city.trim().length > 100) {

        return res.status(400).json({

            success: false,

            message:
                "City must not exceed 100 characters.",

        });

    }


    // ------------------------------------------------------
    // Required state
    // ------------------------------------------------------

    if (!isNonEmptyString(state)) {

        return res.status(400).json({

            success: false,

            message:
                "State is required.",

        });

    }


    if (state.trim().length > 100) {

        return res.status(400).json({

            success: false,

            message:
                "State must not exceed 100 characters.",

        });

    }


    // ------------------------------------------------------
    // Optional loan application ID
    // ------------------------------------------------------

    if (
        loanApplicationIdExists(req.body) &&
        !isPositiveInteger(req.body.loanApplicationId)
    ) {

        return res.status(400).json({

            success: false,

            message:
                "loanApplicationId must be a valid positive integer.",

        });

    }


    // ------------------------------------------------------
    // Optional postal code
    // ------------------------------------------------------

    if (
        req.body.postalCode !== undefined &&
        req.body.postalCode !== null &&
        String(req.body.postalCode).length > 20
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Postal code must not exceed 20 characters.",

        });

    }


    // ------------------------------------------------------
    // Latitude
    // ------------------------------------------------------

    if (
        !isValidDecimal(
            latitude,
            90,
            -90
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Latitude must be a valid number between -90 and 90.",

        });

    }


    // ------------------------------------------------------
    // Longitude
    // ------------------------------------------------------

    if (
        !isValidDecimal(
            longitude,
            180,
            -180
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Longitude must be a valid number between -180 and 180.",

        });

    }


    // ------------------------------------------------------
    // Property area
    // ------------------------------------------------------

    if (
        !isValidDecimal(
            propertyAreaSqft,
            null,
            0
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "propertyAreaSqft must be a valid non-negative number.",

        });

    }


    // ------------------------------------------------------
    // Estimated values
    // ------------------------------------------------------

    const monetaryFields = [
        [
            estimatedValue,
            "estimatedValue",
        ],
        [
            estimatedMinValue,
            "estimatedMinValue",
        ],
        [
            estimatedMaxValue,
            "estimatedMaxValue",
        ],
        [
            estimatedRatePerSqft,
            "estimatedRatePerSqft",
        ],
    ];


    for (const [
        value,
        field,
    ] of monetaryFields) {

        if (
            !isValidDecimal(
                value,
                null,
                0
            )
        ) {

            return res.status(400).json({

                success: false,

                message:
                    `${field} must be a valid non-negative number.`,

            });

        }

    }


    // ------------------------------------------------------
    // Confidence score
    // ------------------------------------------------------

    if (
        !isValidDecimal(
            confidenceScore,
            100,
            0
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "confidenceScore must be between 0 and 100.",

        });

    }


    // ------------------------------------------------------
    // Valuation status
    // ------------------------------------------------------

    if (
        valuationStatus !== undefined &&
        valuationStatus !== null &&
        valuationStatus !== ""
    ) {

        if (!isValidStatus(valuationStatus)) {

            return res.status(400).json({

                success: false,

                message:
                    `Invalid valuationStatus. Allowed values: ${ALLOWED_VALUATION_STATUSES.join(", ")}.`,

            });

        }

    }


    // ------------------------------------------------------
    // data_sources
    // ------------------------------------------------------

    if (
        dataSources !== undefined &&
        dataSources !== null &&
        typeof dataSources !== "object"
    ) {

        return res.status(400).json({

            success: false,

            message:
                "dataSources must be a valid JSON object or array.",

        });

    }


    next();

};


// ==========================================================
// LOAN APPLICATION ID HELPER
// ==========================================================

const loanApplicationIdExists = (
    body
) => {

    return (
        body.loanApplicationId !== undefined &&
        body.loanApplicationId !== null &&
        body.loanApplicationId !== ""
    );

};


// ==========================================================
// PROPERTY VALUATION ID
// ==========================================================

export const validatePropertyValuationId = (
    req,
    res,
    next
) => {

    const { id } =
        req.params;


    if (!isPositiveInteger(id)) {

        return res.status(400).json({

            success: false,

            message:
                "Valid property valuation ID is required.",

        });

    }


    next();

};


// ==========================================================
// APPLICATION ID
// ==========================================================

export const validatePropertyValuationApplicationId = (
    req,
    res,
    next
) => {

    const {
        applicationId,
    } = req.params;


    if (!isPositiveInteger(applicationId)) {

        return res.status(400).json({

            success: false,

            message:
                "Valid loan application ID is required.",

        });

    }


    next();

};


// ==========================================================
// USER ID
// ==========================================================

export const validatePropertyValuationUserId = (
    req,
    res,
    next
) => {

    const {
        userId,
    } = req.params;


    if (!isPositiveInteger(userId)) {

        return res.status(400).json({

            success: false,

            message:
                "Valid user ID is required.",

        });

    }


    next();

};


// ==========================================================
// VALUATION STATUS
// ==========================================================

export const validatePropertyValuationStatus = (
    req,
    res,
    next
) => {

    const {
        status,
    } = req.params;


    if (!isValidStatus(status)) {

        return res.status(400).json({

            success: false,

            message:
                `Invalid valuation status. Allowed values: ${ALLOWED_VALUATION_STATUSES.join(", ")}.`,

        });

    }


    next();

};


// ==========================================================
// PROPERTY TYPE
// ==========================================================

export const validatePropertyValuationPropertyType = (
    req,
    res,
    next
) => {

    const {
        propertyType,
    } = req.params;


    if (!isNonEmptyString(propertyType)) {

        return res.status(400).json({

            success: false,

            message:
                "Property type is required.",

        });

    }


    if (propertyType.length > 100) {

        return res.status(400).json({

            success: false,

            message:
                "Property type must not exceed 100 characters.",

        });

    }


    next();

};


// ==========================================================
// LOCATION
// ==========================================================

export const validatePropertyValuationLocation = (
    req,
    res,
    next
) => {

    const {
        city,
        state,
        postalCode,
    } = req.query;


    if (
        !city &&
        !state &&
        !postalCode
    ) {

        return res.status(400).json({

            success: false,

            message:
                "At least one location parameter is required: city, state or postalCode.",

        });

    }


    if (
        city !== undefined &&
        city !== null &&
        String(city).length > 100
    ) {

        return res.status(400).json({

            success: false,

            message:
                "City must not exceed 100 characters.",

        });

    }


    if (
        state !== undefined &&
        state !== null &&
        String(state).length > 100
    ) {

        return res.status(400).json({

            success: false,

            message:
                "State must not exceed 100 characters.",

        });

    }


    if (
        postalCode !== undefined &&
        postalCode !== null &&
        String(postalCode).length > 20
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Postal code must not exceed 20 characters.",

        });

    }


    next();

};


// ==========================================================
// UPDATE PROPERTY VALUATION
// ==========================================================

export const validateUpdatePropertyValuation = (
    req,
    res,
    next
) => {

    const body =
        req.body || {};


    const allowedFields = [

        "loanApplicationId",

        "userId",

        "propertyType",

        "addressLine1",

        "addressLine2",

        "city",

        "state",

        "postalCode",

        "country",

        "latitude",

        "longitude",

        "propertyAreaSqft",

        "estimatedValue",

        "estimatedMinValue",

        "estimatedMaxValue",

        "estimatedRatePerSqft",

        "confidenceScore",

        "valuationStatus",

        "valuationMethod",

        "dataSources",

        "valuationNotes",

    ];


    const providedFields =
        Object.keys(body);


    const hasAllowedField =
        providedFields.some(
            (field) =>
                allowedFields.includes(field)
        );


    if (!hasAllowedField) {

        return res.status(400).json({

            success: false,

            message:
                "At least one valid property valuation field is required for update.",

        });

    }


    // ------------------------------------------------------
    // loanApplicationId
    // ------------------------------------------------------

    if (
        loanApplicationIdExists(body) &&
        !isPositiveInteger(
            body.loanApplicationId
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "loanApplicationId must be a valid positive integer.",

        });

    }


    // ------------------------------------------------------
    // userId
    // ------------------------------------------------------

    if (
        body.userId !== undefined &&
        !isPositiveInteger(
            body.userId
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "userId must be a valid positive integer.",

        });

    }


    // ------------------------------------------------------
    // String lengths
    // ------------------------------------------------------

    const stringLimits = {

        propertyType: 100,

        addressLine1: 255,

        addressLine2: 255,

        city: 100,

        state: 100,

        postalCode: 20,

        country: 100,

        valuationMethod: 100,

    };


    for (const [
        field,
        maxLength,
    ] of Object.entries(
        stringLimits
    )) {

        if (
            body[field] !== undefined &&
            body[field] !== null &&
            String(body[field]).length >
            maxLength
        ) {

            return res.status(400).json({

                success: false,

                message:
                    `${field} must not exceed ${maxLength} characters.`,

            });

        }

    }


    // ------------------------------------------------------
    // Coordinates
    // ------------------------------------------------------

    if (
        !isValidDecimal(
            body.latitude,
            90,
            -90
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Latitude must be between -90 and 90.",

        });

    }


    if (
        !isValidDecimal(
            body.longitude,
            180,
            -180
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Longitude must be between -180 and 180.",

        });

    }


    // ------------------------------------------------------
    // Numeric fields
    // ------------------------------------------------------

    const numericFields = [

        "propertyAreaSqft",

        "estimatedValue",

        "estimatedMinValue",

        "estimatedMaxValue",

        "estimatedRatePerSqft",

    ];


    for (const field of numericFields) {

        if (
            !isValidDecimal(
                body[field],
                null,
                0
            )
        ) {

            return res.status(400).json({

                success: false,

                message:
                    `${field} must be a valid non-negative number.`,

            });

        }

    }


    // ------------------------------------------------------
    // Confidence score
    // ------------------------------------------------------

    if (
        !isValidDecimal(
            body.confidenceScore,
            100,
            0
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "confidenceScore must be between 0 and 100.",

        });

    }


    // ------------------------------------------------------
    // Status
    // ------------------------------------------------------

    if (
        body.valuationStatus !== undefined &&
        body.valuationStatus !== null &&
        body.valuationStatus !== ""
    ) {

        if (
            !isValidStatus(
                body.valuationStatus
            )
        ) {

            return res.status(400).json({

                success: false,

                message:
                    `Invalid valuationStatus. Allowed values: ${ALLOWED_VALUATION_STATUSES.join(", ")}.`,

            });

        }

    }


    // ------------------------------------------------------
    // dataSources
    // ------------------------------------------------------

    if (
        body.dataSources !== undefined &&
        body.dataSources !== null &&
        typeof body.dataSources !== "object"
    ) {

        return res.status(400).json({

            success: false,

            message:
                "dataSources must be a valid JSON object or array.",

        });

    }


    next();

};


// ==========================================================
// UPDATE STATUS
// ==========================================================

export const validateUpdatePropertyValuationStatus = (
    req,
    res,
    next
) => {

    const {
        status,
    } = req.body;


    if (!isValidStatus(status)) {

        return res.status(400).json({

            success: false,

            message:
                `Invalid valuation status. Allowed values: ${ALLOWED_VALUATION_STATUSES.join(", ")}.`,

        });

    }


    next();

};


// ==========================================================
// EXPORT CONSTANTS FOR FUTURE USE
// ==========================================================

export {
    ALLOWED_VALUATION_STATUSES,
};

