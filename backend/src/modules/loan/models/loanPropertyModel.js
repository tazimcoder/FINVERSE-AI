/**
 * ==========================================================
 * FINVERSE AI
 * Loan Property Model
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/models/loanPropertyModel.js
 *
 * Database Table:
 * loan_properties
 *
 * Responsibility:
 *
 * - Fetch all loan properties
 * - Fetch property by ID
 * - Fetch properties by loan application
 * - Fetch properties by user
 * - Fetch properties by property type
 * - Fetch properties by ownership type
 * - Fetch properties by usage
 * - Fetch properties by valuation status
 * - Fetch properties by verification status
 * - Create loan property
 * - Update loan property
 * - Update valuation status
 * - Update verification status
 * - Delete loan property
 *
 * ==========================================================
 */

import pool from "../../../config/db.js";


// ==========================================================
// SELECT COLUMNS
// ==========================================================

const PROPERTY_COLUMNS = `
    id,
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
    property_description,
    created_at,
    updated_at
`;


// ==========================================================
// GET ALL LOAN PROPERTIES
// ==========================================================

export async function getAllLoanProperties() {

    const [rows] = await pool.query(
        `
        SELECT
            ${PROPERTY_COLUMNS}
        FROM loan_properties
        ORDER BY created_at DESC
        `
    );

    return rows;
}


// ==========================================================
// GET LOAN PROPERTY BY ID
// ==========================================================

export async function getLoanPropertyById(
    propertyId
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${PROPERTY_COLUMNS}
        FROM loan_properties
        WHERE id = ?
        LIMIT 1
        `,
        [propertyId]
    );

    return rows[0] || null;
}


// ==========================================================
// GET PROPERTIES BY LOAN APPLICATION
// ==========================================================

export async function getLoanPropertiesByApplicationId(
    applicationId
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${PROPERTY_COLUMNS}
        FROM loan_properties
        WHERE loan_application_id = ?
        ORDER BY created_at DESC
        `,
        [applicationId]
    );

    return rows;
}


// ==========================================================
// GET PROPERTIES BY USER
// ==========================================================

export async function getLoanPropertiesByUserId(
    userId
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${PROPERTY_COLUMNS}
        FROM loan_properties
        WHERE user_id = ?
        ORDER BY created_at DESC
        `,
        [userId]
    );

    return rows;
}


// ==========================================================
// GET PROPERTIES BY PROPERTY TYPE
// ==========================================================

export async function getLoanPropertiesByType(
    propertyType
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${PROPERTY_COLUMNS}
        FROM loan_properties
        WHERE property_type = ?
        ORDER BY created_at DESC
        `,
        [propertyType]
    );

    return rows;
}


// ==========================================================
// GET PROPERTIES BY OWNERSHIP TYPE
// ==========================================================

export async function getLoanPropertiesByOwnershipType(
    ownershipType
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${PROPERTY_COLUMNS}
        FROM loan_properties
        WHERE ownership_type = ?
        ORDER BY created_at DESC
        `,
        [ownershipType]
    );

    return rows;
}


// ==========================================================
// GET PROPERTIES BY USAGE
// ==========================================================

export async function getLoanPropertiesByUsage(
    propertyUsage
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${PROPERTY_COLUMNS}
        FROM loan_properties
        WHERE property_usage = ?
        ORDER BY created_at DESC
        `,
        [propertyUsage]
    );

    return rows;
}


// ==========================================================
// GET PROPERTIES BY VALUATION STATUS
// ==========================================================

export async function getLoanPropertiesByValuationStatus(
    valuationStatus
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${PROPERTY_COLUMNS}
        FROM loan_properties
        WHERE valuation_status = ?
        ORDER BY created_at DESC
        `,
        [valuationStatus]
    );

    return rows;
}


// ==========================================================
// GET PROPERTIES BY VERIFICATION STATUS
// ==========================================================

export async function getLoanPropertiesByVerificationStatus(
    verificationStatus
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${PROPERTY_COLUMNS}
        FROM loan_properties
        WHERE verification_status = ?
        ORDER BY created_at DESC
        `,
        [verificationStatus]
    );

    return rows;
}


// ==========================================================
// CREATE LOAN PROPERTY
// ==========================================================

export async function createLoanProperty(
    propertyData
) {

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


    const [result] = await pool.query(
        `
        INSERT INTO loan_properties
        (
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
        )
        VALUES
        (
            ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?,
            ?, ?, ?, ?,
            ?, ?,
            ?, ?, ?, ?, ?,
            ?, ?, ?,
            ?, ?,
            ?
        )
        `,
        [

            loan_application_id,
            user_id,
            property_type,
            ownership_type ?? null,
            property_usage ?? null,

            address_line1 ?? null,
            address_line2 ?? null,
            landmark ?? null,
            locality ?? null,
            city,
            district ?? null,
            state,
            postal_code ?? null,
            country ?? "India",

            latitude ?? null,
            longitude ?? null,

            property_area_sqft ?? null,
            built_up_area_sqft ?? null,
            carpet_area_sqft ?? null,
            land_area_sqft ?? null,

            property_age_years ?? null,
            construction_year ?? null,

            floor_number ?? null,
            total_floors ?? null,
            bedrooms ?? null,
            bathrooms ?? null,
            parking_spaces ?? null,

            purchase_price ?? null,
            estimated_market_value ?? null,
            estimated_market_rate_per_sqft ?? null,

            valuation_status ?? "NOT_REQUESTED",
            verification_status ?? "PENDING",

            property_description ?? null

        ]
    );

    return result.insertId;
}


// ==========================================================
// UPDATE LOAN PROPERTY
// ==========================================================

export async function updateLoanProperty(
    propertyId,
    propertyData
) {

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


    const [result] = await pool.query(
        `
        UPDATE loan_properties
        SET

            property_type = ?,
            ownership_type = ?,
            property_usage = ?,

            address_line1 = ?,
            address_line2 = ?,
            landmark = ?,
            locality = ?,
            city = ?,
            district = ?,
            state = ?,
            postal_code = ?,
            country = ?,

            latitude = ?,
            longitude = ?,

            property_area_sqft = ?,
            built_up_area_sqft = ?,
            carpet_area_sqft = ?,
            land_area_sqft = ?,

            property_age_years = ?,
            construction_year = ?,

            floor_number = ?,
            total_floors = ?,
            bedrooms = ?,
            bathrooms = ?,
            parking_spaces = ?,

            purchase_price = ?,
            estimated_market_value = ?,
            estimated_market_rate_per_sqft = ?,

            property_description = ?

        WHERE id = ?
        `,
        [

            property_type,
            ownership_type ?? null,
            property_usage ?? null,

            address_line1 ?? null,
            address_line2 ?? null,
            landmark ?? null,
            locality ?? null,
            city,
            district ?? null,
            state,
            postal_code ?? null,
            country ?? "India",

            latitude ?? null,
            longitude ?? null,

            property_area_sqft ?? null,
            built_up_area_sqft ?? null,
            carpet_area_sqft ?? null,
            land_area_sqft ?? null,

            property_age_years ?? null,
            construction_year ?? null,

            floor_number ?? null,
            total_floors ?? null,
            bedrooms ?? null,
            bathrooms ?? null,
            parking_spaces ?? null,

            purchase_price ?? null,
            estimated_market_value ?? null,
            estimated_market_rate_per_sqft ?? null,

            property_description ?? null,

            propertyId

        ]
    );

    return result;
}


// ==========================================================
// UPDATE VALUATION STATUS
// ==========================================================

export async function updateLoanPropertyValuationStatus(
    propertyId,
    valuationStatus
) {

    const [result] = await pool.query(
        `
        UPDATE loan_properties
        SET
            valuation_status = ?
        WHERE id = ?
        `,
        [
            valuationStatus,
            propertyId
        ]
    );

    return result;
}


// ==========================================================
// UPDATE VERIFICATION STATUS
// ==========================================================

export async function updateLoanPropertyVerificationStatus(
    propertyId,
    verificationStatus
) {

    const [result] = await pool.query(
        `
        UPDATE loan_properties
        SET
            verification_status = ?
        WHERE id = ?
        `,
        [
            verificationStatus,
            propertyId
        ]
    );

    return result;
}


// ==========================================================
// DELETE LOAN PROPERTY
// ==========================================================

export async function deleteLoanProperty(
    propertyId
) {

    const [result] = await pool.query(
        `
        DELETE FROM loan_properties
        WHERE id = ?
        `,
        [propertyId]
    );

    return result;
}

