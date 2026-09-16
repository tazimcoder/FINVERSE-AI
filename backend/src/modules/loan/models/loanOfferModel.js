/**
 * ==========================================================
 * FINVERSE AI
 * Loan Offer Model
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/models/loanOfferModel.js
 *
 * Database Table:
 * loan_offers
 *
 * Responsibility:
 *
 * - Fetch all loan offers
 * - Fetch loan offer by ID
 * - Fetch offers by loan application
 * - Fetch offers by loan product
 * - Fetch offers by user
 * - Fetch offers by status
 * - Fetch offer by reference
 * - Create loan offer
 * - Update loan offer
 * - Update offer status
 * - Delete loan offer
 *
 * Database-driven model:
 *
 * loan_offers
 *      ↓
 * loanOfferModel
 *      ↓
 * loanOfferService
 *      ↓
 * loanOfferController
 *      ↓
 * loanOfferRoutes
 *
 * ==========================================================
 */

import pool from "../../../config/db.js";


// ==========================================================
// Get All Loan Offers
// ==========================================================

export async function getAllLoanOffers() {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            loan_product_id,
            user_id,
            offer_reference,
            offered_amount,
            interest_rate,
            tenure_months,
            emi_amount,
            processing_fee_type,
            processing_fee_value,
            processing_fee_amount,
            insurance_amount,
            other_charges,
            net_disbursement_amount,
            offer_status,
            valid_from,
            valid_until,
            accepted_at,
            rejected_at,
            rejection_reason,
            terms_and_conditions,
            created_by_user_id,
            created_at,
            updated_at
        FROM loan_offers
        ORDER BY created_at DESC
        `
    );

    return rows;
}


// ==========================================================
// Get Loan Offer By ID
// ==========================================================

export async function getLoanOfferById(
    offerId
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            loan_product_id,
            user_id,
            offer_reference,
            offered_amount,
            interest_rate,
            tenure_months,
            emi_amount,
            processing_fee_type,
            processing_fee_value,
            processing_fee_amount,
            insurance_amount,
            other_charges,
            net_disbursement_amount,
            offer_status,
            valid_from,
            valid_until,
            accepted_at,
            rejected_at,
            rejection_reason,
            terms_and_conditions,
            created_by_user_id,
            created_at,
            updated_at
        FROM loan_offers
        WHERE id = ?
        LIMIT 1
        `,
        [offerId]
    );

    return rows[0] || null;
}


// ==========================================================
// Get Loan Offer By Reference
// ==========================================================

export async function getLoanOfferByReference(
    offerReference
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            loan_product_id,
            user_id,
            offer_reference,
            offered_amount,
            interest_rate,
            tenure_months,
            emi_amount,
            processing_fee_type,
            processing_fee_value,
            processing_fee_amount,
            insurance_amount,
            other_charges,
            net_disbursement_amount,
            offer_status,
            valid_from,
            valid_until,
            accepted_at,
            rejected_at,
            rejection_reason,
            terms_and_conditions,
            created_by_user_id,
            created_at,
            updated_at
        FROM loan_offers
        WHERE offer_reference = ?
        LIMIT 1
        `,
        [offerReference]
    );

    return rows[0] || null;
}


// ==========================================================
// Get Offers By Loan Application
// ==========================================================

export async function getLoanOffersByApplicationId(
    applicationId
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            loan_product_id,
            user_id,
            offer_reference,
            offered_amount,
            interest_rate,
            tenure_months,
            emi_amount,
            processing_fee_type,
            processing_fee_value,
            processing_fee_amount,
            insurance_amount,
            other_charges,
            net_disbursement_amount,
            offer_status,
            valid_from,
            valid_until,
            accepted_at,
            rejected_at,
            rejection_reason,
            terms_and_conditions,
            created_by_user_id,
            created_at,
            updated_at
        FROM loan_offers
        WHERE loan_application_id = ?
        ORDER BY created_at DESC
        `,
        [applicationId]
    );

    return rows;
}


// ==========================================================
// Get Offers By Loan Product
// ==========================================================

export async function getLoanOffersByProductId(
    productId
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            loan_product_id,
            user_id,
            offer_reference,
            offered_amount,
            interest_rate,
            tenure_months,
            emi_amount,
            processing_fee_type,
            processing_fee_value,
            processing_fee_amount,
            insurance_amount,
            other_charges,
            net_disbursement_amount,
            offer_status,
            valid_from,
            valid_until,
            accepted_at,
            rejected_at,
            rejection_reason,
            terms_and_conditions,
            created_by_user_id,
            created_at,
            updated_at
        FROM loan_offers
        WHERE loan_product_id = ?
        ORDER BY created_at DESC
        `,
        [productId]
    );

    return rows;
}


// ==========================================================
// Get Offers By User
// ==========================================================

export async function getLoanOffersByUserId(
    userId
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            loan_product_id,
            user_id,
            offer_reference,
            offered_amount,
            interest_rate,
            tenure_months,
            emi_amount,
            processing_fee_type,
            processing_fee_value,
            processing_fee_amount,
            insurance_amount,
            other_charges,
            net_disbursement_amount,
            offer_status,
            valid_from,
            valid_until,
            accepted_at,
            rejected_at,
            rejection_reason,
            terms_and_conditions,
            created_by_user_id,
            created_at,
            updated_at
        FROM loan_offers
        WHERE user_id = ?
        ORDER BY created_at DESC
        `,
        [userId]
    );

    return rows;
}


// ==========================================================
// Get Offers By Status
// ==========================================================

export async function getLoanOffersByStatus(
    status
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            loan_product_id,
            user_id,
            offer_reference,
            offered_amount,
            interest_rate,
            tenure_months,
            emi_amount,
            processing_fee_type,
            processing_fee_value,
            processing_fee_amount,
            insurance_amount,
            other_charges,
            net_disbursement_amount,
            offer_status,
            valid_from,
            valid_until,
            accepted_at,
            rejected_at,
            rejection_reason,
            terms_and_conditions,
            created_by_user_id,
            created_at,
            updated_at
        FROM loan_offers
        WHERE offer_status = ?
        ORDER BY created_at DESC
        `,
        [status]
    );

    return rows;
}


// ==========================================================
// Get Active / Pending Offers
// ==========================================================

export async function getActiveLoanOffers() {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            loan_product_id,
            user_id,
            offer_reference,
            offered_amount,
            interest_rate,
            tenure_months,
            emi_amount,
            processing_fee_type,
            processing_fee_value,
            processing_fee_amount,
            insurance_amount,
            other_charges,
            net_disbursement_amount,
            offer_status,
            valid_from,
            valid_until,
            accepted_at,
            rejected_at,
            rejection_reason,
            terms_and_conditions,
            created_by_user_id,
            created_at,
            updated_at
        FROM loan_offers
        WHERE offer_status IN (
            'GENERATED',
            'PENDING_ACCEPTANCE'
        )
        AND (
            valid_until IS NULL
            OR valid_until >= CURRENT_TIMESTAMP
        )
        ORDER BY created_at DESC
        `
    );

    return rows;
}


// ==========================================================
// Create Loan Offer
// ==========================================================

export async function createLoanOffer(
    offerData
) {

    const {
        loan_application_id,
        loan_product_id,
        user_id,
        offer_reference,
        offered_amount,
        interest_rate,
        tenure_months,
        emi_amount,
        processing_fee_type,
        processing_fee_value,
        processing_fee_amount,
        insurance_amount,
        other_charges,
        net_disbursement_amount,
        offer_status,
        valid_from,
        valid_until,
        accepted_at,
        rejected_at,
        rejection_reason,
        terms_and_conditions,
        created_by_user_id
    } = offerData;


    const [result] = await pool.query(
        `
        INSERT INTO loan_offers
        (
            loan_application_id,
            loan_product_id,
            user_id,
            offer_reference,
            offered_amount,
            interest_rate,
            tenure_months,
            emi_amount,
            processing_fee_type,
            processing_fee_value,
            processing_fee_amount,
            insurance_amount,
            other_charges,
            net_disbursement_amount,
            offer_status,
            valid_from,
            valid_until,
            accepted_at,
            rejected_at,
            rejection_reason,
            terms_and_conditions,
            created_by_user_id
        )
        VALUES
        (
            ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?,
            ?
        )
        `,
        [
            loan_application_id,
            loan_product_id,
            user_id,
            offer_reference,
            offered_amount,
            interest_rate,
            tenure_months,
            emi_amount,
            processing_fee_type ?? null,
            processing_fee_value ?? null,
            processing_fee_amount ?? null,
            insurance_amount ?? 0,
            other_charges ?? 0,
            net_disbursement_amount ?? null,
            offer_status ?? "GENERATED",
            valid_from ?? null,
            valid_until ?? null,
            accepted_at ?? null,
            rejected_at ?? null,
            rejection_reason ?? null,
            terms_and_conditions ?? null,
            created_by_user_id ?? null
        ]
    );

    return result.insertId;
}


// ==========================================================
// Update Loan Offer
// ==========================================================

export async function updateLoanOffer(
    offerId,
    offerData
) {

    const {
        loan_product_id,
        offered_amount,
        interest_rate,
        tenure_months,
        emi_amount,
        processing_fee_type,
        processing_fee_value,
        processing_fee_amount,
        insurance_amount,
        other_charges,
        net_disbursement_amount,
        valid_until,
        terms_and_conditions
    } = offerData;


    const [result] = await pool.query(
        `
        UPDATE loan_offers
        SET
            loan_product_id = ?,
            offered_amount = ?,
            interest_rate = ?,
            tenure_months = ?,
            emi_amount = ?,
            processing_fee_type = ?,
            processing_fee_value = ?,
            processing_fee_amount = ?,
            insurance_amount = ?,
            other_charges = ?,
            net_disbursement_amount = ?,
            valid_until = ?,
            terms_and_conditions = ?
        WHERE id = ?
        `,
        [
            loan_product_id,
            offered_amount,
            interest_rate,
            tenure_months,
            emi_amount,
            processing_fee_type ?? null,
            processing_fee_value ?? null,
            processing_fee_amount ?? null,
            insurance_amount ?? 0,
            other_charges ?? 0,
            net_disbursement_amount ?? null,
            valid_until ?? null,
            terms_and_conditions ?? null,
            offerId
        ]
    );

    return result;
}


// ==========================================================
// Update Loan Offer Status
// ==========================================================

export async function updateLoanOfferStatus(
    offerId,
    offerStatus,
    rejectionReason = null
) {

    let query = `
        UPDATE loan_offers
        SET
            offer_status = ?
    `;

    const values = [
        offerStatus
    ];


    // ======================================================
    // ACCEPTED
    // ======================================================

    if (
        offerStatus === "ACCEPTED"
    ) {

        query += `,
            accepted_at = CURRENT_TIMESTAMP,
            rejected_at = NULL,
            rejection_reason = NULL
        `;

    }


    // ======================================================
    // REJECTED
    // ======================================================

    else if (
        offerStatus === "REJECTED"
    ) {

        query += `,
            accepted_at = NULL,
            rejected_at = CURRENT_TIMESTAMP,
            rejection_reason = ?
        `;

        values.push(
            rejectionReason
        );

    }


    // ======================================================
    // EXPIRED / WITHDRAWN / SUPERSEDED
    // ======================================================

    else if (
        offerStatus === "EXPIRED" ||
        offerStatus === "WITHDRAWN" ||
        offerStatus === "SUPERSEDED"
    ) {

        query += `,
            accepted_at = NULL,
            rejected_at = NULL
        `;

    }


    // ======================================================
    // GENERATED / PENDING_ACCEPTANCE
    // ======================================================

    else {

        query += `,
            accepted_at = NULL,
            rejected_at = NULL,
            rejection_reason = NULL
        `;

    }


    query += `
        WHERE id = ?
    `;

    values.push(
        offerId
    );


    const [result] = await pool.query(
        query,
        values
    );

    return result;
}


// ==========================================================
// Delete Loan Offer
// ==========================================================

export async function deleteLoanOffer(
    offerId
) {

    const [result] = await pool.query(
        `
        DELETE FROM loan_offers
        WHERE id = ?
        `,
        [offerId]
    );

    return result;
}

