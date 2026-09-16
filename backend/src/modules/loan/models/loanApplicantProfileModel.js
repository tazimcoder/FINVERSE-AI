/**
 * ==========================================================
 * FINVERSE AI
 * Loan Applicant Profile Model
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/models/loanApplicantProfileModel.js
 *
 * Database Table:
 * loan_applicant_profiles
 *
 * Responsibility:
 *
 * - Fetch all applicant profiles
 * - Fetch applicant profile by ID
 * - Fetch profiles by loan application
 * - Fetch profiles by user
 * - Create applicant profile
 * - Update applicant profile
 * - Delete applicant profile
 *
 * ==========================================================
 */

import pool from "../../../config/db.js";


// ==========================================================
// Get All Loan Applicant Profiles
// ==========================================================

export async function getAllLoanApplicantProfiles() {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            user_id,
            applicant_type,
            date_of_birth,
            gender,
            marital_status,
            occupation_type,
            employer_name,
            designation,
            work_experience_years,
            monthly_income,
            annual_income,
            additional_income,
            existing_emi_amount,
            existing_loan_count,
            residential_status,
            address_line1,
            address_line2,
            city,
            state,
            postal_code,
            country,
            created_at,
            updated_at
        FROM loan_applicant_profiles
        ORDER BY created_at DESC
        `
    );

    return rows;
}


// ==========================================================
// Get Applicant Profile By ID
// ==========================================================

export async function getLoanApplicantProfileById(
    profileId
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            user_id,
            applicant_type,
            date_of_birth,
            gender,
            marital_status,
            occupation_type,
            employer_name,
            designation,
            work_experience_years,
            monthly_income,
            annual_income,
            additional_income,
            existing_emi_amount,
            existing_loan_count,
            residential_status,
            address_line1,
            address_line2,
            city,
            state,
            postal_code,
            country,
            created_at,
            updated_at
        FROM loan_applicant_profiles
        WHERE id = ?
        LIMIT 1
        `,
        [profileId]
    );

    return rows[0] || null;
}


// ==========================================================
// Get Applicant Profiles By Loan Application
// ==========================================================

export async function getLoanApplicantProfilesByApplicationId(
    applicationId
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            user_id,
            applicant_type,
            date_of_birth,
            gender,
            marital_status,
            occupation_type,
            employer_name,
            designation,
            work_experience_years,
            monthly_income,
            annual_income,
            additional_income,
            existing_emi_amount,
            existing_loan_count,
            residential_status,
            address_line1,
            address_line2,
            city,
            state,
            postal_code,
            country,
            created_at,
            updated_at
        FROM loan_applicant_profiles
        WHERE loan_application_id = ?
        ORDER BY
            CASE applicant_type
                WHEN 'PRIMARY' THEN 1
                WHEN 'CO_APPLICANT' THEN 2
                WHEN 'GUARANTOR' THEN 3
                ELSE 4
            END,
            created_at ASC
        `,
        [applicationId]
    );

    return rows;
}


// ==========================================================
// Get Applicant Profiles By User
// ==========================================================

export async function getLoanApplicantProfilesByUserId(
    userId
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_application_id,
            user_id,
            applicant_type,
            date_of_birth,
            gender,
            marital_status,
            occupation_type,
            employer_name,
            designation,
            work_experience_years,
            monthly_income,
            annual_income,
            additional_income,
            existing_emi_amount,
            existing_loan_count,
            residential_status,
            address_line1,
            address_line2,
            city,
            state,
            postal_code,
            country,
            created_at,
            updated_at
        FROM loan_applicant_profiles
        WHERE user_id = ?
        ORDER BY created_at DESC
        `,
        [userId]
    );

    return rows;
}


// ==========================================================
// Create Applicant Profile
// ==========================================================

export async function createLoanApplicantProfile(
    profileData
) {

    const {
        loan_application_id,
        user_id,
        applicant_type,
        date_of_birth,
        gender,
        marital_status,
        occupation_type,
        employer_name,
        designation,
        work_experience_years,
        monthly_income,
        annual_income,
        additional_income,
        existing_emi_amount,
        existing_loan_count,
        residential_status,
        address_line1,
        address_line2,
        city,
        state,
        postal_code,
        country
    } = profileData;


    const [result] = await pool.query(
        `
        INSERT INTO loan_applicant_profiles
        (
            loan_application_id,
            user_id,
            applicant_type,
            date_of_birth,
            gender,
            marital_status,
            occupation_type,
            employer_name,
            designation,
            work_experience_years,
            monthly_income,
            annual_income,
            additional_income,
            existing_emi_amount,
            existing_loan_count,
            residential_status,
            address_line1,
            address_line2,
            city,
            state,
            postal_code,
            country
        )
        VALUES
        (
            ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?
        )
        `,
        [
            loan_application_id,
            user_id,
            applicant_type ?? "PRIMARY",
            date_of_birth ?? null,
            gender ?? null,
            marital_status ?? null,
            occupation_type ?? null,
            employer_name ?? null,
            designation ?? null,
            work_experience_years ?? null,
            monthly_income ?? null,
            annual_income ?? null,
            additional_income ?? null,
            existing_emi_amount ?? null,
            existing_loan_count ?? 0,
            residential_status ?? null,
            address_line1 ?? null,
            address_line2 ?? null,
            city ?? null,
            state ?? null,
            postal_code ?? null,
            country ?? "India"
        ]
    );


    return result.insertId;
}


// ==========================================================
// Update Applicant Profile
// ==========================================================

export async function updateLoanApplicantProfile(
    profileId,
    profileData
) {

    const {
        applicant_type,
        date_of_birth,
        gender,
        marital_status,
        occupation_type,
        employer_name,
        designation,
        work_experience_years,
        monthly_income,
        annual_income,
        additional_income,
        existing_emi_amount,
        existing_loan_count,
        residential_status,
        address_line1,
        address_line2,
        city,
        state,
        postal_code,
        country
    } = profileData;


    const [result] = await pool.query(
        `
        UPDATE loan_applicant_profiles
        SET
            applicant_type = ?,
            date_of_birth = ?,
            gender = ?,
            marital_status = ?,
            occupation_type = ?,
            employer_name = ?,
            designation = ?,
            work_experience_years = ?,
            monthly_income = ?,
            annual_income = ?,
            additional_income = ?,
            existing_emi_amount = ?,
            existing_loan_count = ?,
            residential_status = ?,
            address_line1 = ?,
            address_line2 = ?,
            city = ?,
            state = ?,
            postal_code = ?,
            country = ?
        WHERE id = ?
        `,
        [
            applicant_type ?? "PRIMARY",
            date_of_birth ?? null,
            gender ?? null,
            marital_status ?? null,
            occupation_type ?? null,
            employer_name ?? null,
            designation ?? null,
            work_experience_years ?? null,
            monthly_income ?? null,
            annual_income ?? null,
            additional_income ?? null,
            existing_emi_amount ?? null,
            existing_loan_count ?? 0,
            residential_status ?? null,
            address_line1 ?? null,
            address_line2 ?? null,
            city ?? null,
            state ?? null,
            postal_code ?? null,
            country ?? "India",
            profileId
        ]
    );


    return result;
}


// ==========================================================
// Delete Applicant Profile
// ==========================================================

export async function deleteLoanApplicantProfile(
    profileId
) {

    const [result] = await pool.query(
        `
        DELETE FROM loan_applicant_profiles
        WHERE id = ?
        `,
        [profileId]
    );


    return result;
}

