/**
 * ==========================================================
 * FINVERSE AI
 * Loan Guarantor Model
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/models/loanGuarantorModel.js
 *
 * Database Table:
 * loan_guarantors
 *
 * Responsibility:
 *
 * - Fetch all loan guarantors
 * - Fetch guarantor by ID
 * - Fetch guarantors by loan application
 * - Fetch guarantors by user
 * - Fetch guarantors by guarantor status
 * - Fetch guarantors by verification status
 * - Fetch guarantors by consent status
 * - Create loan guarantor
 * - Update loan guarantor
 * - Update guarantor status
 * - Update verification status
 * - Update consent status
 * - Delete loan guarantor
 *
 * ==========================================================
 */

import pool from "../../../config/db.js";


// ==========================================================
// SELECT COLUMNS
// ==========================================================

const GUARANTOR_COLUMNS = `
    id,
    loan_application_id,
    user_id,
    full_name,
    relationship_with_applicant,
    date_of_birth,
    gender,
    email,
    phone,
    address_line1,
    address_line2,
    landmark,
    locality,
    city,
    district,
    state,
    postal_code,
    country,
    occupation,
    employer_name,
    monthly_income,
    pan_number,
    aadhaar_last4,
    credit_score,
    guarantor_status,
    verification_status,
    consent_status,
    consent_at,
    notes,
    created_at,
    updated_at
`;


// ==========================================================
// GET ALL LOAN GUARANTORS
// ==========================================================

export async function getAllLoanGuarantors() {

    const [rows] = await pool.query(
        `
        SELECT
            ${GUARANTOR_COLUMNS}
        FROM loan_guarantors
        ORDER BY created_at DESC
        `
    );

    return rows;
}


// ==========================================================
// GET GUARANTOR BY ID
// ==========================================================

export async function getLoanGuarantorById(
    guarantorId
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${GUARANTOR_COLUMNS}
        FROM loan_guarantors
        WHERE id = ?
        LIMIT 1
        `,
        [guarantorId]
    );

    return rows[0] || null;
}


// ==========================================================
// GET GUARANTORS BY LOAN APPLICATION
// ==========================================================

export async function getLoanGuarantorsByApplicationId(
    applicationId
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${GUARANTOR_COLUMNS}
        FROM loan_guarantors
        WHERE loan_application_id = ?
        ORDER BY created_at DESC
        `,
        [applicationId]
    );

    return rows;
}


// ==========================================================
// GET GUARANTORS BY USER
// ==========================================================

export async function getLoanGuarantorsByUserId(
    userId
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${GUARANTOR_COLUMNS}
        FROM loan_guarantors
        WHERE user_id = ?
        ORDER BY created_at DESC
        `,
        [userId]
    );

    return rows;
}


// ==========================================================
// GET GUARANTORS BY GUARANTOR STATUS
// ==========================================================

export async function getLoanGuarantorsByStatus(
    guarantorStatus
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${GUARANTOR_COLUMNS}
        FROM loan_guarantors
        WHERE guarantor_status = ?
        ORDER BY created_at DESC
        `,
        [guarantorStatus]
    );

    return rows;
}


// ==========================================================
// GET GUARANTORS BY VERIFICATION STATUS
// ==========================================================

export async function getLoanGuarantorsByVerificationStatus(
    verificationStatus
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${GUARANTOR_COLUMNS}
        FROM loan_guarantors
        WHERE verification_status = ?
        ORDER BY created_at DESC
        `,
        [verificationStatus]
    );

    return rows;
}


// ==========================================================
// GET GUARANTORS BY CONSENT STATUS
// ==========================================================

export async function getLoanGuarantorsByConsentStatus(
    consentStatus
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${GUARANTOR_COLUMNS}
        FROM loan_guarantors
        WHERE consent_status = ?
        ORDER BY created_at DESC
        `,
        [consentStatus]
    );

    return rows;
}


// ==========================================================
// CREATE LOAN GUARANTOR
// ==========================================================

export async function createLoanGuarantor(
    guarantorData
) {

    const {

        loan_application_id,
        user_id,
        full_name,
        relationship_with_applicant,

        date_of_birth,
        gender,

        email,
        phone,

        address_line1,
        address_line2,
        landmark,
        locality,
        city,
        district,
        state,
        postal_code,
        country,

        occupation,
        employer_name,
        monthly_income,

        pan_number,
        aadhaar_last4,
        credit_score,

        guarantor_status,
        verification_status,
        consent_status,
        consent_at,

        notes

    } = guarantorData;


    const [result] = await pool.query(
        `
        INSERT INTO loan_guarantors
        (
            loan_application_id,
            user_id,
            full_name,
            relationship_with_applicant,

            date_of_birth,
            gender,

            email,
            phone,

            address_line1,
            address_line2,
            landmark,
            locality,
            city,
            district,
            state,
            postal_code,
            country,

            occupation,
            employer_name,
            monthly_income,

            pan_number,
            aadhaar_last4,
            credit_score,

            guarantor_status,
            verification_status,
            consent_status,
            consent_at,

            notes
        )
        VALUES
        (
            ?, ?, ?, ?,
            ?, ?,
            ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?,
            ?, ?, ?,
            ?, ?, ?, ?, ?,
            ?
        )
        `,
        [

            loan_application_id,
            user_id,
            full_name,
            relationship_with_applicant ?? null,

            date_of_birth ?? null,
            gender ?? null,

            email ?? null,
            phone ?? null,

            address_line1 ?? null,
            address_line2 ?? null,
            landmark ?? null,
            locality ?? null,
            city ?? null,
            district ?? null,
            state ?? null,
            postal_code ?? null,
            country ?? "India",

            occupation ?? null,
            employer_name ?? null,
            monthly_income ?? null,

            pan_number ?? null,
            aadhaar_last4 ?? null,
            credit_score ?? null,

            guarantor_status ?? "PENDING",
            verification_status ?? "PENDING",
            consent_status ?? "PENDING",
            consent_at ?? null,

            notes ?? null

        ]
    );

    return result.insertId;
}


// ==========================================================
// UPDATE LOAN GUARANTOR
// ==========================================================

export async function updateLoanGuarantor(
    guarantorId,
    guarantorData
) {

    const {

        full_name,
        relationship_with_applicant,

        date_of_birth,
        gender,

        email,
        phone,

        address_line1,
        address_line2,
        landmark,
        locality,
        city,
        district,
        state,
        postal_code,
        country,

        occupation,
        employer_name,
        monthly_income,

        pan_number,
        aadhaar_last4,
        credit_score,

        notes

    } = guarantorData;


    const [result] = await pool.query(
        `
        UPDATE loan_guarantors
        SET

            full_name = ?,
            relationship_with_applicant = ?,

            date_of_birth = ?,
            gender = ?,

            email = ?,
            phone = ?,

            address_line1 = ?,
            address_line2 = ?,
            landmark = ?,
            locality = ?,
            city = ?,
            district = ?,
            state = ?,
            postal_code = ?,
            country = ?,

            occupation = ?,
            employer_name = ?,
            monthly_income = ?,

            pan_number = ?,
            aadhaar_last4 = ?,
            credit_score = ?,

            notes = ?

        WHERE id = ?
        `,
        [

            full_name,
            relationship_with_applicant ?? null,

            date_of_birth ?? null,
            gender ?? null,

            email ?? null,
            phone ?? null,

            address_line1 ?? null,
            address_line2 ?? null,
            landmark ?? null,
            locality ?? null,
            city ?? null,
            district ?? null,
            state ?? null,
            postal_code ?? null,
            country ?? "India",

            occupation ?? null,
            employer_name ?? null,
            monthly_income ?? null,

            pan_number ?? null,
            aadhaar_last4 ?? null,
            credit_score ?? null,

            notes ?? null,

            guarantorId

        ]
    );

    return result;
}


// ==========================================================
// UPDATE GUARANTOR STATUS
// ==========================================================

export async function updateLoanGuarantorStatus(
    guarantorId,
    guarantorStatus
) {

    const [result] = await pool.query(
        `
        UPDATE loan_guarantors
        SET
            guarantor_status = ?
        WHERE id = ?
        `,
        [
            guarantorStatus,
            guarantorId
        ]
    );

    return result;
}


// ==========================================================
// UPDATE VERIFICATION STATUS
// ==========================================================

export async function updateLoanGuarantorVerificationStatus(
    guarantorId,
    verificationStatus
) {

    const [result] = await pool.query(
        `
        UPDATE loan_guarantors
        SET
            verification_status = ?
        WHERE id = ?
        `,
        [
            verificationStatus,
            guarantorId
        ]
    );

    return result;
}


// ==========================================================
// UPDATE CONSENT STATUS
// ==========================================================

export async function updateLoanGuarantorConsentStatus(
    guarantorId,
    consentStatus,
    consentAt = null
) {

    const [result] = await pool.query(
        `
        UPDATE loan_guarantors
        SET
            consent_status = ?,
            consent_at = ?
        WHERE id = ?
        `,
        [
            consentStatus,
            consentAt,
            guarantorId
        ]
    );

    return result;
}


// ==========================================================
// DELETE LOAN GUARANTOR
// ==========================================================

export async function deleteLoanGuarantor(
    guarantorId
) {

    const [result] = await pool.query(
        `
        DELETE FROM loan_guarantors
        WHERE id = ?
        `,
        [guarantorId]
    );

    return result;
}

