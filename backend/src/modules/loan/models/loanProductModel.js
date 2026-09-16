/**
 * ==========================================================
 * FINVERSE AI
 * Loan Product Model
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/models/loanProductModel.js
 *
 * ==========================================================
 */

import pool from "../../../config/db.js";


// ==========================================================
// Get All Loan Products
// ==========================================================

export async function getAllLoanProducts() {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            product_code,
            product_name,
            loan_category,
            description,
            min_amount,
            max_amount,
            min_tenure_months,
            max_tenure_months,
            min_interest_rate,
            max_interest_rate,
            processing_fee_type,
            processing_fee_value,
            eligibility_rules,
            requires_property,
            requires_collateral,
            status,
            created_at,
            updated_at
        FROM loan_products
        ORDER BY created_at DESC
        `
    );

    return rows;
}


// ==========================================================
// Get Active Loan Products
// ==========================================================

export async function getActiveLoanProducts() {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            product_code,
            product_name,
            loan_category,
            description,
            min_amount,
            max_amount,
            min_tenure_months,
            max_tenure_months,
            min_interest_rate,
            max_interest_rate,
            processing_fee_type,
            processing_fee_value,
            eligibility_rules,
            requires_property,
            requires_collateral,
            status,
            created_at,
            updated_at
        FROM loan_products
        WHERE status = 'ACTIVE'
        ORDER BY created_at DESC
        `
    );

    return rows;
}


// ==========================================================
// Get Loan Product By ID
// ==========================================================

export async function getLoanProductById(productId) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            product_code,
            product_name,
            loan_category,
            description,
            min_amount,
            max_amount,
            min_tenure_months,
            max_tenure_months,
            min_interest_rate,
            max_interest_rate,
            processing_fee_type,
            processing_fee_value,
            eligibility_rules,
            requires_property,
            requires_collateral,
            status,
            created_at,
            updated_at
        FROM loan_products
        WHERE id = ?
        LIMIT 1
        `,
        [productId]
    );

    return rows[0] || null;
}


// ==========================================================
// Get Loan Product By Code
// ==========================================================

export async function getLoanProductByCode(productCode) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            product_code,
            product_name,
            loan_category,
            description,
            min_amount,
            max_amount,
            min_tenure_months,
            max_tenure_months,
            min_interest_rate,
            max_interest_rate,
            processing_fee_type,
            processing_fee_value,
            eligibility_rules,
            requires_property,
            requires_collateral,
            status,
            created_at,
            updated_at
        FROM loan_products
        WHERE product_code = ?
        LIMIT 1
        `,
        [productCode]
    );

    return rows[0] || null;
}


// ==========================================================
// Create Loan Product
// ==========================================================

export async function createLoanProduct(productData) {

    const {
        product_code,
        product_name,
        loan_category,
        description,
        min_amount,
        max_amount,
        min_tenure_months,
        max_tenure_months,
        min_interest_rate,
        max_interest_rate,
        processing_fee_type,
        processing_fee_value,
        eligibility_rules,
        requires_property,
        requires_collateral,
        status
    } = productData;


    const [result] = await pool.query(
        `
        INSERT INTO loan_products
        (
            product_code,
            product_name,
            loan_category,
            description,
            min_amount,
            max_amount,
            min_tenure_months,
            max_tenure_months,
            min_interest_rate,
            max_interest_rate,
            processing_fee_type,
            processing_fee_value,
            eligibility_rules,
            requires_property,
            requires_collateral,
            status
        )
        VALUES
        (
            ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?
        )
        `,
        [
            product_code,
            product_name,
            loan_category,
            description ?? null,
            min_amount ?? null,
            max_amount ?? null,
            min_tenure_months ?? null,
            max_tenure_months ?? null,
            min_interest_rate ?? null,
            max_interest_rate ?? null,
            processing_fee_type ?? "PERCENTAGE",
            processing_fee_value ?? null,
            eligibility_rules
                ? JSON.stringify(eligibility_rules)
                : null,
            requires_property ?? "NO",
            requires_collateral ?? "NO",
            status ?? "ACTIVE"
        ]
    );

    return result.insertId;
}


// ==========================================================
// Update Loan Product
// ==========================================================

export async function updateLoanProduct(
    productId,
    productData
) {

    const {
        product_name,
        loan_category,
        description,
        min_amount,
        max_amount,
        min_tenure_months,
        max_tenure_months,
        min_interest_rate,
        max_interest_rate,
        processing_fee_type,
        processing_fee_value,
        eligibility_rules,
        requires_property,
        requires_collateral
    } = productData;


    const [result] = await pool.query(
        `
        UPDATE loan_products
        SET
            product_name = ?,
            loan_category = ?,
            description = ?,
            min_amount = ?,
            max_amount = ?,
            min_tenure_months = ?,
            max_tenure_months = ?,
            min_interest_rate = ?,
            max_interest_rate = ?,
            processing_fee_type = ?,
            processing_fee_value = ?,
            eligibility_rules = ?,
            requires_property = ?,
            requires_collateral = ?
        WHERE id = ?
        `,
        [
            product_name,
            loan_category,
            description ?? null,
            min_amount ?? null,
            max_amount ?? null,
            min_tenure_months ?? null,
            max_tenure_months ?? null,
            min_interest_rate ?? null,
            max_interest_rate ?? null,
            processing_fee_type ?? "PERCENTAGE",
            processing_fee_value ?? null,
            eligibility_rules
                ? JSON.stringify(eligibility_rules)
                : null,
            requires_property ?? "NO",
            requires_collateral ?? "NO",
            productId
        ]
    );

    return result;
}


// ==========================================================
// Update Loan Product Status
// ==========================================================
//
// IMPORTANT:
// This function is required by:
// loanProductService.js
//
// ==========================================================

export async function updateLoanProductStatus(
    productId,
    status
) {

    const [result] = await pool.query(
        `
        UPDATE loan_products
        SET
            status = ?
        WHERE id = ?
        `,
        [
            status,
            productId
        ]
    );

    return result;
}


// ==========================================================
// Delete Loan Product
// ==========================================================

export async function deleteLoanProduct(productId) {

    const [result] = await pool.query(
        `
        DELETE FROM loan_products
        WHERE id = ?
        `,
        [productId]
    );

    return result;
}

