/**
 * ==========================================================
 * FINVERSE AI
 * Loan Collateral Model
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/models/loanCollateralModel.js
 *
 * Database Table:
 * loan_collaterals
 *
 * Responsibility:
 *
 * - Fetch all loan collaterals
 * - Fetch collateral by ID
 * - Fetch collaterals by loan application
 * - Fetch collaterals by loan
 * - Fetch collaterals by user
 * - Fetch collaterals by property
 * - Fetch collaterals by collateral type
 * - Fetch collaterals by verification status
 * - Fetch collaterals by valuation status
 * - Fetch collaterals by legal status
 * - Fetch collaterals by lien status
 * - Fetch collaterals by release status
 * - Fetch collaterals by generic status
 * - Create loan collateral
 * - Update loan collateral
 * - Update valuation status
 * - Update verification status
 * - Update legal status
 * - Update lien status
 * - Update release status
 * - Delete loan collateral
 *
 * ==========================================================
 */

import pool from "../../../config/db.js";


// ==========================================================
// COMMON SELECT
// ==========================================================

const COLLATERAL_SELECT = `
    SELECT
        id,
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
        release_status,
        created_at,
        updated_at
    FROM loan_collaterals
`;


// ==========================================================
// Get All Loan Collaterals
// ==========================================================

export async function getAllLoanCollaterals() {

    const [rows] = await pool.query(
        `
        ${COLLATERAL_SELECT}
        ORDER BY created_at DESC
        `
    );

    return rows;
}


// ==========================================================
// Get Loan Collateral By ID
// ==========================================================

export async function getLoanCollateralById(
    collateralId
) {

    const [rows] = await pool.query(
        `
        ${COLLATERAL_SELECT}
        WHERE id = ?
        LIMIT 1
        `,
        [collateralId]
    );

    return rows[0] || null;
}


// ==========================================================
// Get Collaterals By Loan Application
// ==========================================================

export async function getLoanCollateralsByApplicationId(
    applicationId
) {

    const [rows] = await pool.query(
        `
        ${COLLATERAL_SELECT}
        WHERE loan_application_id = ?
        ORDER BY created_at DESC
        `,
        [applicationId]
    );

    return rows;
}


// ==========================================================
// Get Collaterals By Loan
// ==========================================================

export async function getLoanCollateralsByLoanId(
    loanId
) {

    const [rows] = await pool.query(
        `
        ${COLLATERAL_SELECT}
        WHERE loan_id = ?
        ORDER BY created_at DESC
        `,
        [loanId]
    );

    return rows;
}


// ==========================================================
// Get Collaterals By User
// ==========================================================

export async function getLoanCollateralsByUserId(
    userId
) {

    const [rows] = await pool.query(
        `
        ${COLLATERAL_SELECT}
        WHERE user_id = ?
        ORDER BY created_at DESC
        `,
        [userId]
    );

    return rows;
}


// ==========================================================
// Get Collaterals By Property
// ==========================================================

export async function getLoanCollateralsByPropertyId(
    propertyId
) {

    const [rows] = await pool.query(
        `
        ${COLLATERAL_SELECT}
        WHERE property_id = ?
        ORDER BY created_at DESC
        `,
        [propertyId]
    );

    return rows;
}


// ==========================================================
// Get Collaterals By Type
// ==========================================================

export async function getLoanCollateralsByType(
    collateralType
) {

    const [rows] = await pool.query(
        `
        ${COLLATERAL_SELECT}
        WHERE collateral_type = ?
        ORDER BY created_at DESC
        `,
        [collateralType]
    );

    return rows;
}


// ==========================================================
// Get Collaterals By Verification Status
// ==========================================================

export async function getLoanCollateralsByVerificationStatus(
    verificationStatus
) {

    const [rows] = await pool.query(
        `
        ${COLLATERAL_SELECT}
        WHERE verification_status = ?
        ORDER BY created_at DESC
        `,
        [verificationStatus]
    );

    return rows;
}


// ==========================================================
// Get Collaterals By Valuation Status
// ==========================================================

export async function getLoanCollateralsByValuationStatus(
    valuationStatus
) {

    const [rows] = await pool.query(
        `
        ${COLLATERAL_SELECT}
        WHERE valuation_status = ?
        ORDER BY created_at DESC
        `,
        [valuationStatus]
    );

    return rows;
}


// ==========================================================
// Get Collaterals By Legal Status
// ==========================================================

export async function getLoanCollateralsByLegalStatus(
    legalStatus
) {

    const [rows] = await pool.query(
        `
        ${COLLATERAL_SELECT}
        WHERE legal_status = ?
        ORDER BY created_at DESC
        `,
        [legalStatus]
    );

    return rows;
}


// ==========================================================
// Get Collaterals By Lien Status
// ==========================================================

export async function getLoanCollateralsByLienStatus(
    lienStatus
) {

    const [rows] = await pool.query(
        `
        ${COLLATERAL_SELECT}
        WHERE lien_status = ?
        ORDER BY created_at DESC
        `,
        [lienStatus]
    );

    return rows;
}


// ==========================================================
// Get Collaterals By Release Status
// ==========================================================

export async function getLoanCollateralsByReleaseStatus(
    releaseStatus
) {

    const [rows] = await pool.query(
        `
        ${COLLATERAL_SELECT}
        WHERE release_status = ?
        ORDER BY created_at DESC
        `,
        [releaseStatus]
    );

    return rows;
}


// ==========================================================
// Get Collaterals By Generic Status
// ==========================================================
//
// This function checks all supported status columns.
//
// Supported:
//
// - valuation_status
// - verification_status
// - legal_status
// - lien_status
// - release_status
//
// ==========================================================

export async function getLoanCollateralsByStatus(
    status
) {

    const [rows] = await pool.query(
        `
        ${COLLATERAL_SELECT}
        WHERE
            valuation_status = ?
            OR verification_status = ?
            OR legal_status = ?
            OR lien_status = ?
            OR release_status = ?
        ORDER BY created_at DESC
        `,
        [
            status,
            status,
            status,
            status,
            status
        ]
    );

    return rows;
}


// ==========================================================
// Create Loan Collateral
// ==========================================================

export async function createLoanCollateral(
    collateralData
) {

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


    const [result] = await pool.query(
        `
        INSERT INTO loan_collaterals
        (
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
        )
        VALUES
        (
            ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?
        )
        `,
        [
            loan_application_id ?? null,
            loan_id ?? null,
            user_id,
            property_id ?? null,
            collateral_type,
            collateral_description ?? null,
            ownership_type ?? null,
            owner_name ?? null,
            estimated_value ?? null,
            forced_sale_value ?? null,
            eligible_value ?? null,
            valuation_date ?? null,
            valuation_method ?? null,
            valuation_status ?? "NOT_REQUESTED",
            verification_status ?? "PENDING",
            legal_status ?? "PENDING_VERIFICATION",
            existing_charge_amount ?? null,
            ltv_percentage ?? null,
            lien_status ?? "NOT_CREATED",
            release_status ?? "NOT_APPLICABLE"
        ]
    );

    return result.insertId;
}


// ==========================================================
// Update Loan Collateral
// ==========================================================

export async function updateLoanCollateral(
    collateralId,
    collateralData
) {

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


    const [result] = await pool.query(
        `
        UPDATE loan_collaterals
        SET
            collateral_type = ?,
            collateral_description = ?,
            ownership_type = ?,
            owner_name = ?,
            estimated_value = ?,
            forced_sale_value = ?,
            eligible_value = ?,
            valuation_date = ?,
            valuation_method = ?,
            valuation_status = ?,
            verification_status = ?,
            legal_status = ?,
            existing_charge_amount = ?,
            ltv_percentage = ?
        WHERE id = ?
        `,
        [
            collateral_type,
            collateral_description ?? null,
            ownership_type ?? null,
            owner_name ?? null,
            estimated_value ?? null,
            forced_sale_value ?? null,
            eligible_value ?? null,
            valuation_date ?? null,
            valuation_method ?? null,
            valuation_status ?? "NOT_REQUESTED",
            verification_status ?? "PENDING",
            legal_status ?? "PENDING_VERIFICATION",
            existing_charge_amount ?? null,
            ltv_percentage ?? null,
            collateralId
        ]
    );

    return result;
}


// ==========================================================
// Update Valuation Status
// ==========================================================

export async function updateLoanCollateralValuationStatus(
    collateralId,
    valuationStatus
) {

    const [result] = await pool.query(
        `
        UPDATE loan_collaterals
        SET
            valuation_status = ?
        WHERE id = ?
        `,
        [
            valuationStatus,
            collateralId
        ]
    );

    return result;
}


// ==========================================================
// Update Verification Status
// ==========================================================

export async function updateLoanCollateralVerificationStatus(
    collateralId,
    verificationStatus
) {

    const [result] = await pool.query(
        `
        UPDATE loan_collaterals
        SET
            verification_status = ?
        WHERE id = ?
        `,
        [
            verificationStatus,
            collateralId
        ]
    );

    return result;
}


// ==========================================================
// Update Legal Status
// ==========================================================

export async function updateLoanCollateralLegalStatus(
    collateralId,
    legalStatus
) {

    const [result] = await pool.query(
        `
        UPDATE loan_collaterals
        SET
            legal_status = ?
        WHERE id = ?
        `,
        [
            legalStatus,
            collateralId
        ]
    );

    return result;
}


// ==========================================================
// Update Lien Status
// ==========================================================

export async function updateLoanCollateralLienStatus(
    collateralId,
    lienStatus
) {

    const [result] = await pool.query(
        `
        UPDATE loan_collaterals
        SET
            lien_status = ?
        WHERE id = ?
        `,
        [
            lienStatus,
            collateralId
        ]
    );

    return result;
}


// ==========================================================
// Update Release Status
// ==========================================================

export async function updateLoanCollateralReleaseStatus(
    collateralId,
    releaseStatus
) {

    const [result] = await pool.query(
        `
        UPDATE loan_collaterals
        SET
            release_status = ?
        WHERE id = ?
        `,
        [
            releaseStatus,
            collateralId
        ]
    );

    return result;
}


// ==========================================================
// Delete Loan Collateral
// ==========================================================

export async function deleteLoanCollateral(
    collateralId
) {

    const [result] = await pool.query(
        `
        DELETE FROM loan_collaterals
        WHERE id = ?
        `,
        [collateralId]
    );

    return result;
}

