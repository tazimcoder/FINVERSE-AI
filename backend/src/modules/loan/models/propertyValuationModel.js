/**
 * ==========================================================
 * FINVERSE AI
 * Property Valuation Model
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/models/propertyValuationModel.js
 *
 * Responsibility:
 *
 * - Create property valuation records
 * - Fetch all property valuations
 * - Fetch valuation by ID
 * - Fetch valuations by loan application
 * - Fetch valuations by user
 * - Fetch valuations by city/state
 * - Fetch valuations by valuation status
 * - Fetch latest valuation
 * - Update valuation
 * - Update valuation status
 * - Delete valuation
 *
 * Database Table:
 *
 * property_valuations
 *
 * ==========================================================
 */

import pool from "../../../config/db.js";


// ==========================================================
// SELECT COLUMNS
// ==========================================================
//
// Centralized column list.
// This prevents accidental SELECT * usage and keeps the
// model consistent when new columns are added later.
//
// ==========================================================

const PROPERTY_VALUATION_COLUMNS = `
    id,
    loan_application_id,
    user_id,
    property_type,
    address_line1,
    address_line2,
    city,
    state,
    postal_code,
    country,
    latitude,
    longitude,
    property_area_sqft,
    estimated_value,
    estimated_min_value,
    estimated_max_value,
    estimated_rate_per_sqft,
    confidence_score,
    valuation_status,
    valuation_method,
    data_sources,
    valuation_notes,
    created_at,
    updated_at
`;


// ==========================================================
// CREATE PROPERTY VALUATION
// ==========================================================

const createPropertyValuation = async ({
    loanApplicationId = null,
    userId,
    propertyType,
    addressLine1 = null,
    addressLine2 = null,
    city,
    state,
    postalCode = null,
    country = "India",
    latitude = null,
    longitude = null,
    propertyAreaSqft = null,
    estimatedValue = null,
    estimatedMinValue = null,
    estimatedMaxValue = null,
    estimatedRatePerSqft = null,
    confidenceScore = null,
    valuationStatus = "PENDING",
    valuationMethod = null,
    dataSources = null,
    valuationNotes = null,
}) => {

    const [result] = await pool.execute(
        `
        INSERT INTO property_valuations
        (
            loan_application_id,
            user_id,
            property_type,
            address_line1,
            address_line2,
            city,
            state,
            postal_code,
            country,
            latitude,
            longitude,
            property_area_sqft,
            estimated_value,
            estimated_min_value,
            estimated_max_value,
            estimated_rate_per_sqft,
            confidence_score,
            valuation_status,
            valuation_method,
            data_sources,
            valuation_notes
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            loanApplicationId,
            userId,
            propertyType,
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode,
            country,
            latitude,
            longitude,
            propertyAreaSqft,
            estimatedValue,
            estimatedMinValue,
            estimatedMaxValue,
            estimatedRatePerSqft,
            confidenceScore,
            valuationStatus,
            valuationMethod,
            dataSources,
            valuationNotes,
        ]
    );

    return result.insertId;
};


// ==========================================================
// GET ALL PROPERTY VALUATIONS
// ==========================================================

const getAllPropertyValuations = async () => {

    const [rows] = await pool.execute(
        `
        SELECT
            ${PROPERTY_VALUATION_COLUMNS}
        FROM property_valuations
        ORDER BY created_at DESC, id DESC
        `
    );

    return rows;
};


// ==========================================================
// GET PROPERTY VALUATION BY ID
// ==========================================================

const getPropertyValuationById = async (id) => {

    const [rows] = await pool.execute(
        `
        SELECT
            ${PROPERTY_VALUATION_COLUMNS}
        FROM property_valuations
        WHERE id = ?
        LIMIT 1
        `,
        [id]
    );

    return rows[0] || null;
};


// ==========================================================
// GET BY LOAN APPLICATION ID
// ==========================================================

const getPropertyValuationsByApplicationId = async (
    loanApplicationId
) => {

    const [rows] = await pool.execute(
        `
        SELECT
            ${PROPERTY_VALUATION_COLUMNS}
        FROM property_valuations
        WHERE loan_application_id = ?
        ORDER BY created_at DESC, id DESC
        `,
        [loanApplicationId]
    );

    return rows;
};


// ==========================================================
// GET LATEST BY LOAN APPLICATION ID
// ==========================================================

const getLatestPropertyValuationByApplicationId = async (
    loanApplicationId
) => {

    const [rows] = await pool.execute(
        `
        SELECT
            ${PROPERTY_VALUATION_COLUMNS}
        FROM property_valuations
        WHERE loan_application_id = ?
        ORDER BY created_at DESC, id DESC
        LIMIT 1
        `,
        [loanApplicationId]
    );

    return rows[0] || null;
};


// ==========================================================
// GET BY USER ID
// ==========================================================

const getPropertyValuationsByUserId = async (
    userId
) => {

    const [rows] = await pool.execute(
        `
        SELECT
            ${PROPERTY_VALUATION_COLUMNS}
        FROM property_valuations
        WHERE user_id = ?
        ORDER BY created_at DESC, id DESC
        `,
        [userId]
    );

    return rows;
};


// ==========================================================
// GET BY CITY
// ==========================================================

const getPropertyValuationsByCity = async (
    city
) => {

    const [rows] = await pool.execute(
        `
        SELECT
            ${PROPERTY_VALUATION_COLUMNS}
        FROM property_valuations
        WHERE city = ?
        ORDER BY created_at DESC, id DESC
        `,
        [city]
    );

    return rows;
};


// ==========================================================
// GET BY STATE
// ==========================================================

const getPropertyValuationsByState = async (
    state
) => {

    const [rows] = await pool.execute(
        `
        SELECT
            ${PROPERTY_VALUATION_COLUMNS}
        FROM property_valuations
        WHERE state = ?
        ORDER BY created_at DESC, id DESC
        `,
        [state]
    );

    return rows;
};


// ==========================================================
// GET BY PROPERTY TYPE
// ==========================================================

const getPropertyValuationsByPropertyType = async (
    propertyType
) => {

    const [rows] = await pool.execute(
        `
        SELECT
            ${PROPERTY_VALUATION_COLUMNS}
        FROM property_valuations
        WHERE property_type = ?
        ORDER BY created_at DESC, id DESC
        `,
        [propertyType]
    );

    return rows;
};


// ==========================================================
// GET BY CITY + STATE
// ==========================================================

const getPropertyValuationsByLocation = async ({
    city,
    state,
    postalCode = null,
}) => {

    let query = `
        SELECT
            ${PROPERTY_VALUATION_COLUMNS}
        FROM property_valuations
        WHERE city = ?
        AND state = ?
    `;

    const params = [
        city,
        state,
    ];


    if (postalCode) {

        query += `
            AND postal_code = ?
        `;

        params.push(postalCode);

    }


    query += `
        ORDER BY created_at DESC, id DESC
    `;


    const [rows] = await pool.execute(
        query,
        params
    );

    return rows;
};


// ==========================================================
// GET BY VALUATION STATUS
// ==========================================================

const getPropertyValuationsByStatus = async (
    valuationStatus
) => {

    const [rows] = await pool.execute(
        `
        SELECT
            ${PROPERTY_VALUATION_COLUMNS}
        FROM property_valuations
        WHERE valuation_status = ?
        ORDER BY created_at DESC, id DESC
        `,
        [valuationStatus]
    );

    return rows;
};


// ==========================================================
// GET LATEST VALUATION BY USER
// ==========================================================

const getLatestPropertyValuationByUserId = async (
    userId
) => {

    const [rows] = await pool.execute(
        `
        SELECT
            ${PROPERTY_VALUATION_COLUMNS}
        FROM property_valuations
        WHERE user_id = ?
        ORDER BY created_at DESC, id DESC
        LIMIT 1
        `,
        [userId]
    );

    return rows[0] || null;
};


// ==========================================================
// UPDATE PROPERTY VALUATION
// ==========================================================

const updatePropertyValuation = async (
    id,
    {
        loanApplicationId = null,
        propertyType,
        addressLine1 = null,
        addressLine2 = null,
        city,
        state,
        postalCode = null,
        country = "India",
        latitude = null,
        longitude = null,
        propertyAreaSqft = null,
        estimatedValue = null,
        estimatedMinValue = null,
        estimatedMaxValue = null,
        estimatedRatePerSqft = null,
        confidenceScore = null,
        valuationStatus = "PENDING",
        valuationMethod = null,
        dataSources = null,
        valuationNotes = null,
    }
) => {

    const [result] = await pool.execute(
        `
        UPDATE property_valuations
        SET
            loan_application_id = ?,
            property_type = ?,
            address_line1 = ?,
            address_line2 = ?,
            city = ?,
            state = ?,
            postal_code = ?,
            country = ?,
            latitude = ?,
            longitude = ?,
            property_area_sqft = ?,
            estimated_value = ?,
            estimated_min_value = ?,
            estimated_max_value = ?,
            estimated_rate_per_sqft = ?,
            confidence_score = ?,
            valuation_status = ?,
            valuation_method = ?,
            data_sources = ?,
            valuation_notes = ?
        WHERE id = ?
        `,
        [
            loanApplicationId,
            propertyType,
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode,
            country,
            latitude,
            longitude,
            propertyAreaSqft,
            estimatedValue,
            estimatedMinValue,
            estimatedMaxValue,
            estimatedRatePerSqft,
            confidenceScore,
            valuationStatus,
            valuationMethod,
            dataSources,
            valuationNotes,
            id,
        ]
    );

    return result.affectedRows > 0;
};


// ==========================================================
// UPDATE VALUATION STATUS
// ==========================================================

const updatePropertyValuationStatus = async (
    id,
    valuationStatus,
    valuationNotes = null
) => {

    const [result] = await pool.execute(
        `
        UPDATE property_valuations
        SET
            valuation_status = ?,
            valuation_notes = COALESCE(?, valuation_notes)
        WHERE id = ?
        `,
        [
            valuationStatus,
            valuationNotes,
            id,
        ]
    );

    return result.affectedRows > 0;
};


// ==========================================================
// UPDATE VALUATION RESULT
// ==========================================================
//
// Used when an external/internal valuation engine finishes
// processing a property.
//
// ==========================================================

const updateValuationResult = async (
    id,
    {
        estimatedValue = null,
        estimatedMinValue = null,
        estimatedMaxValue = null,
        estimatedRatePerSqft = null,
        confidenceScore = null,
        valuationStatus = "COMPLETED",
        valuationMethod = null,
        dataSources = null,
        valuationNotes = null,
    }
) => {

    const [result] = await pool.execute(
        `
        UPDATE property_valuations
        SET
            estimated_value = ?,
            estimated_min_value = ?,
            estimated_max_value = ?,
            estimated_rate_per_sqft = ?,
            confidence_score = ?,
            valuation_status = ?,
            valuation_method = ?,
            data_sources = ?,
            valuation_notes = ?
        WHERE id = ?
        `,
        [
            estimatedValue,
            estimatedMinValue,
            estimatedMaxValue,
            estimatedRatePerSqft,
            confidenceScore,
            valuationStatus,
            valuationMethod,
            dataSources,
            valuationNotes,
            id,
        ]
    );

    return result.affectedRows > 0;
};


// ==========================================================
// DELETE PROPERTY VALUATION
// ==========================================================

const deletePropertyValuation = async (
    id
) => {

    const [result] = await pool.execute(
        `
        DELETE FROM property_valuations
        WHERE id = ?
        `,
        [id]
    );

    return result.affectedRows > 0;
};


// ==========================================================
// DEFAULT EXPORT
// ==========================================================

const propertyValuationModel = {

    createPropertyValuation,

    getAllPropertyValuations,

    getPropertyValuationById,

    getPropertyValuationsByApplicationId,

    getLatestPropertyValuationByApplicationId,

    getPropertyValuationsByUserId,

    getPropertyValuationsByCity,

    getPropertyValuationsByState,

    getPropertyValuationsByPropertyType,

    getPropertyValuationsByLocation,

    getPropertyValuationsByStatus,

    getLatestPropertyValuationByUserId,

    updatePropertyValuation,

    updatePropertyValuationStatus,

    updateValuationResult,

    deletePropertyValuation,

};

export default propertyValuationModel;