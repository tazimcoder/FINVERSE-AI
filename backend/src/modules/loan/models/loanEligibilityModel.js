/**
 * ==========================================================
 * FINVERSE AI
 * Loan Eligibility Model
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/models/loanEligibilityModel.js
 *
 * Database Table:
 * loan_eligibility_checks
 *
 * Responsibility:
 *
 * - Fetch all eligibility checks
 * - Fetch eligibility check by ID
 * - Fetch eligibility check by application
 * - Create eligibility check
 * - Update eligibility check
 * - Update eligibility status
 * - Delete eligibility check
 *
 * ==========================================================
 */

import pool from "../../../config/db.js";


// ==========================================================
// Get All Eligibility Checks
// ==========================================================

export async function getAllLoanEligibilityChecks() {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            monthly_income,
            existing_monthly_obligations,
            credit_score,
            debt_to_income_ratio,
            eligible_amount,
            eligible_tenure_months,
            eligibility_status,
            reason,
            checked_at
        FROM loan_eligibility_checks
        ORDER BY checked_at DESC, id DESC
        `
    );

    return rows;
}


// ==========================================================
// Get Eligibility Check By ID
// ==========================================================

export async function getLoanEligibilityCheckById(
    eligibilityId
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            monthly_income,
            existing_monthly_obligations,
            credit_score,
            debt_to_income_ratio,
            eligible_amount,
            eligible_tenure_months,
            eligibility_status,
            reason,
            checked_at
        FROM loan_eligibility_checks
        WHERE id = ?
        LIMIT 1
        `,
        [
            eligibilityId
        ]
    );

    return rows[0] || null;
}


// ==========================================================
// Get Eligibility Check By Application
// ==========================================================

export async function getLoanEligibilityCheckByApplicationId(
    applicationId
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            monthly_income,
            existing_monthly_obligations,
            credit_score,
            debt_to_income_ratio,
            eligible_amount,
            eligible_tenure_months,
            eligibility_status,
            reason,
            checked_at
        FROM loan_eligibility_checks
        WHERE loan_application_id = ?
        ORDER BY checked_at DESC, id DESC
        LIMIT 1
        `,
        [
            applicationId
        ]
    );

    return rows[0] || null;
}


// ==========================================================
// Get All Eligibility Checks By Application
// ==========================================================

export async function getLoanEligibilityChecksByApplicationId(
    applicationId
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            monthly_income,
            existing_monthly_obligations,
            credit_score,
            debt_to_income_ratio,
            eligible_amount,
            eligible_tenure_months,
            eligibility_status,
            reason,
            checked_at
        FROM loan_eligibility_checks
        WHERE loan_application_id = ?
        ORDER BY checked_at DESC, id DESC
        `,
        [
            applicationId
        ]
    );

    return rows;
}


// ==========================================================
// Get Eligibility Checks By Status
// ==========================================================

export async function getLoanEligibilityChecksByStatus(
    status
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            monthly_income,
            existing_monthly_obligations,
            credit_score,
            debt_to_income_ratio,
            eligible_amount,
            eligible_tenure_months,
            eligibility_status,
            reason,
            checked_at
        FROM loan_eligibility_checks
        WHERE eligibility_status = ?
        ORDER BY checked_at DESC, id DESC
        `,
        [
            status
        ]
    );

    return rows;
}


// ==========================================================
// Create Eligibility Check
// ==========================================================

export async function createLoanEligibilityCheck(
    eligibilityData
) {

    const {
        loan_application_id,
        monthly_income,
        existing_monthly_obligations,
        credit_score,
        debt_to_income_ratio,
        eligible_amount,
        eligible_tenure_months,
        eligibility_status,
        reason
    } = eligibilityData;


    const [result] = await pool.query(
        `
        INSERT INTO loan_eligibility_checks
        (
            loan_application_id,
            monthly_income,
            existing_monthly_obligations,
            credit_score,
            debt_to_income_ratio,
            eligible_amount,
            eligible_tenure_months,
            eligibility_status,
            reason
        )
        VALUES
        (
            ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
        `,
        [
            loan_application_id,
            monthly_income ?? null,
            existing_monthly_obligations ?? null,
            credit_score ?? null,
            debt_to_income_ratio ?? null,
            eligible_amount ?? null,
            eligible_tenure_months ?? null,
            eligibility_status ?? "PENDING",
            reason ?? null
        ]
    );

    return result.insertId;
}


// ==========================================================
// Update Eligibility Check
// ==========================================================

export async function updateLoanEligibilityCheck(
    eligibilityId,
    eligibilityData
) {

    const {
        monthly_income,
        existing_monthly_obligations,
        credit_score,
        debt_to_income_ratio,
        eligible_amount,
        eligible_tenure_months,
        reason
    } = eligibilityData;


    const [result] = await pool.query(
        `
        UPDATE loan_eligibility_checks
        SET
            monthly_income = ?,
            existing_monthly_obligations = ?,
            credit_score = ?,
            debt_to_income_ratio = ?,
            eligible_amount = ?,
            eligible_tenure_months = ?,
            reason = ?
        WHERE id = ?
        `,
        [
            monthly_income ?? null,
            existing_monthly_obligations ?? null,
            credit_score ?? null,
            debt_to_income_ratio ?? null,
            eligible_amount ?? null,
            eligible_tenure_months ?? null,
            reason ?? null,
            eligibilityId
        ]
    );

    return result;
}


// ==========================================================
// Update Eligibility Status
// ==========================================================

export async function updateLoanEligibilityStatus(
    eligibilityId,
    status,
    reason = null
) {

    const [result] = await pool.query(
        `
        UPDATE loan_eligibility_checks
        SET
            eligibility_status = ?,
            reason = ?
        WHERE id = ?
        `,
        [
            status,
            reason,
            eligibilityId
        ]
    );

    return result;
}


// ==========================================================
// Delete Eligibility Check
// ==========================================================

export async function deleteLoanEligibilityCheck(
    eligibilityId
) {

    const [result] = await pool.query(
        `
        DELETE FROM loan_eligibility_checks
        WHERE id = ?
        `,
        [
            eligibilityId
        ]
    );

    return result;
}

