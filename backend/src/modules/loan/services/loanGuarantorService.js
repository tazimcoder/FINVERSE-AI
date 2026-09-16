/**
 * ==========================================================
 * FINVERSE AI
 * Loan Guarantor Service
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/services/loanGuarantorService.js
 *
 * Database Table:
 * loan_guarantors
 *
 * Responsibility:
 *
 * - Loan guarantor business logic
 * - Validate guarantor data
 * - Fetch guarantors
 * - Create guarantor
 * - Update guarantor
 * - Manage guarantor status
 * - Manage verification status
 * - Manage consent status
 * - Delete guarantor
 *
 * ==========================================================
 */

import {
    getAllLoanGuarantors,
    getLoanGuarantorById,
    getLoanGuarantorsByApplicationId,
    getLoanGuarantorsByUserId,
    getLoanGuarantorsByStatus,
    getLoanGuarantorsByVerificationStatus,
    getLoanGuarantorsByConsentStatus,
    createLoanGuarantor,
    updateLoanGuarantor,
    updateLoanGuarantorStatus,
    updateLoanGuarantorVerificationStatus,
    updateLoanGuarantorConsentStatus,
    deleteLoanGuarantor
} from "../models/loanGuarantorModel.js";


// ==========================================================
// ALLOWED ENUM VALUES
// ==========================================================

const ALLOWED_GUARANTOR_STATUSES = [
    "PENDING",
    "ACTIVE",
    "RELEASED",
    "REJECTED"
];


const ALLOWED_VERIFICATION_STATUSES = [
    "PENDING",
    "IN_PROGRESS",
    "VERIFIED",
    "REJECTED",
    "REQUIRES_REVIEW"
];


const ALLOWED_CONSENT_STATUSES = [
    "PENDING",
    "GIVEN",
    "DECLINED"
];


// ==========================================================
// VALIDATE REQUIRED ID
// ==========================================================

function validateId(
    value,
    fieldName
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {
        throw new Error(
            `${fieldName} is required.`
        );
    }

    const id = Number(value);

    if (
        !Number.isInteger(id) ||
        id <= 0
    ) {
        throw new Error(
            `${fieldName} must be a valid positive integer.`
        );
    }

    return id;
}


// ==========================================================
// VALIDATE REQUIRED STRING
// ==========================================================

function validateRequiredString(
    value,
    fieldName
) {

    if (
        value === undefined ||
        value === null ||
        String(value).trim() === ""
    ) {
        throw new Error(
            `${fieldName} is required.`
        );
    }

    return String(value).trim();
}


// ==========================================================
// NORMALIZE OPTIONAL STRING
// ==========================================================

function normalizeOptionalString(
    value
) {

    if (
        value === undefined ||
        value === null ||
        String(value).trim() === ""
    ) {
        return null;
    }

    return String(value).trim();
}


// ==========================================================
// VALIDATE OPTIONAL NUMBER
// ==========================================================

function validateOptionalNumber(
    value,
    fieldName
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {
        return null;
    }

    const number = Number(value);

    if (!Number.isFinite(number)) {
        throw new Error(
            `${fieldName} must be a valid number.`
        );
    }

    if (number < 0) {
        throw new Error(
            `${fieldName} cannot be negative.`
        );
    }

    return number;
}


// ==========================================================
// NORMALIZE ENUM
// ==========================================================

function normalizeEnum(
    value,
    fieldName,
    allowedValues
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {
        return null;
    }

    const normalized =
        String(value)
            .trim()
            .toUpperCase();

    if (
        !allowedValues.includes(normalized)
    ) {
        throw new Error(
            `Invalid ${fieldName}.`
        );
    }

    return normalized;
}


// ==========================================================
// VALIDATE EMAIL
// ==========================================================

function validateOptionalEmail(
    value
) {

    const email =
        normalizeOptionalString(
            value
        );

    if (!email) {
        return null;
    }

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
        !emailPattern.test(email)
    ) {
        throw new Error(
            "Email must be a valid email address."
        );
    }

    return email;
}


// ==========================================================
// VALIDATE PHONE
// ==========================================================

function validateOptionalPhone(
    value
) {

    const phone =
        normalizeOptionalString(
            value
        );

    if (!phone) {
        return null;
    }

    const phonePattern =
        /^[0-9+\-\s()]{7,20}$/;

    if (
        !phonePattern.test(phone)
    ) {
        throw new Error(
            "Phone must be a valid phone number."
        );
    }

    return phone;
}


// ==========================================================
// VALIDATE DATE OF BIRTH
// ==========================================================

function validateOptionalDate(
    value
) {

    const date =
        normalizeOptionalString(
            value
        );

    if (!date) {
        return null;
    }

    const dateValue =
        new Date(date);

    if (
        Number.isNaN(
            dateValue.getTime()
        )
    ) {
        throw new Error(
            "Date of birth must be a valid date."
        );
    }

    if (
        dateValue > new Date()
    ) {
        throw new Error(
            "Date of birth cannot be in the future."
        );
    }

    return date;
}


// ==========================================================
// VALIDATE AADHAAR LAST 4
// ==========================================================

function validateAadhaarLast4(
    value
) {

    const aadhaar =
        normalizeOptionalString(
            value
        );

    if (!aadhaar) {
        return null;
    }

    if (
        !/^\d{4}$/.test(aadhaar)
    ) {
        throw new Error(
            "Aadhaar last 4 digits must contain exactly 4 digits."
        );
    }

    return aadhaar;
}


// ==========================================================
// VALIDATE PAN
// ==========================================================

function validateOptionalPan(
    value
) {

    const pan =
        normalizeOptionalString(
            value
        );

    if (!pan) {
        return null;
    }

    const normalized =
        pan.toUpperCase();

    if (
        !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(
            normalized
        )
    ) {
        throw new Error(
            "PAN number must be in a valid format."
        );
    }

    return normalized;
}


// ==========================================================
// VALIDATE CREDIT SCORE
// ==========================================================

function validateCreditScore(
    value
) {

    const score =
        validateOptionalNumber(
            value,
            "Credit score"
        );

    if (
        score !== null &&
        (
            score < 0 ||
            score > 1000
        )
    ) {
        throw new Error(
            "Credit score must be between 0 and 1000."
        );
    }

    return score;
}


// ==========================================================
// VALIDATE CONSENT DATE
// ==========================================================

function validateConsentAt(
    value
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {
        return null;
    }

    const date =
        new Date(value);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        throw new Error(
            "Consent date must be a valid date."
        );
    }

    return value;
}


// ==========================================================
// FETCH ALL
// ==========================================================

export async function fetchAllLoanGuarantors() {

    return await getAllLoanGuarantors();

}


// ==========================================================
// FETCH BY ID
// ==========================================================

export async function fetchLoanGuarantorById(
    guarantorId
) {

    const id =
        validateId(
            guarantorId,
            "Loan guarantor ID"
        );

    return await getLoanGuarantorById(
        id
    );

}


// ==========================================================
// FETCH BY APPLICATION
// ==========================================================

export async function fetchLoanGuarantorsByApplicationId(
    applicationId
) {

    const id =
        validateId(
            applicationId,
            "Loan application ID"
        );

    return await getLoanGuarantorsByApplicationId(
        id
    );

}


// ==========================================================
// FETCH BY USER
// ==========================================================

export async function fetchLoanGuarantorsByUserId(
    userId
) {

    const id =
        validateId(
            userId,
            "User ID"
        );

    return await getLoanGuarantorsByUserId(
        id
    );

}


// ==========================================================
// FETCH BY GUARANTOR STATUS
// ==========================================================

export async function fetchLoanGuarantorsByStatus(
    status
) {

    const normalizedStatus =
        normalizeEnum(
            status,
            "guarantor status",
            ALLOWED_GUARANTOR_STATUSES
        );

    if (!normalizedStatus) {
        throw new Error(
            "Guarantor status is required."
        );
    }

    return await getLoanGuarantorsByStatus(
        normalizedStatus
    );

}


// ==========================================================
// FETCH BY VERIFICATION STATUS
// ==========================================================

export async function fetchLoanGuarantorsByVerificationStatus(
    status
) {

    const normalizedStatus =
        normalizeEnum(
            status,
            "verification status",
            ALLOWED_VERIFICATION_STATUSES
        );

    if (!normalizedStatus) {
        throw new Error(
            "Verification status is required."
        );
    }

    return await getLoanGuarantorsByVerificationStatus(
        normalizedStatus
    );

}


// ==========================================================
// FETCH BY CONSENT STATUS
// ==========================================================

export async function fetchLoanGuarantorsByConsentStatus(
    status
) {

    const normalizedStatus =
        normalizeEnum(
            status,
            "consent status",
            ALLOWED_CONSENT_STATUSES
        );

    if (!normalizedStatus) {
        throw new Error(
            "Consent status is required."
        );
    }

    return await getLoanGuarantorsByConsentStatus(
        normalizedStatus
    );

}


// ==========================================================
// CREATE LOAN GUARANTOR
// ==========================================================

export async function createNewLoanGuarantor(
    guarantorData
) {

    if (
        !guarantorData ||
        typeof guarantorData !== "object"
    ) {
        throw new Error(
            "Loan guarantor data is required."
        );
    }


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


    const applicationId =
        validateId(
            loan_application_id,
            "Loan application ID"
        );


    const userId =
        validateId(
            user_id,
            "User ID"
        );


    const fullName =
        validateRequiredString(
            full_name,
            "Full name"
        );


    const relationship =
        normalizeOptionalString(
            relationship_with_applicant
        );


    const dateOfBirth =
        validateOptionalDate(
            date_of_birth
        );


    const genderValue =
        normalizeOptionalString(
            gender
        );


    const emailValue =
        validateOptionalEmail(
            email
        );


    const phoneValue =
        validateOptionalPhone(
            phone
        );


    const monthlyIncome =
        validateOptionalNumber(
            monthly_income,
            "Monthly income"
        );


    const panValue =
        validateOptionalPan(
            pan_number
        );


    const aadhaarValue =
        validateAadhaarLast4(
            aadhaar_last4
        );


    const creditScore =
        validateCreditScore(
            credit_score
        );


    const guarantorStatus =
        normalizeEnum(
            guarantor_status,
            "guarantor status",
            ALLOWED_GUARANTOR_STATUSES
        ) || "PENDING";


    const verificationStatus =
        normalizeEnum(
            verification_status,
            "verification status",
            ALLOWED_VERIFICATION_STATUSES
        ) || "PENDING";


    const consentStatus =
        normalizeEnum(
            consent_status,
            "consent status",
            ALLOWED_CONSENT_STATUSES
        ) || "PENDING";


    let consentAt =
        validateConsentAt(
            consent_at
        );


    if (
        consentStatus === "GIVEN" &&
        !consentAt
    ) {
        consentAt =
            new Date();
    }


    if (
        consentStatus !== "GIVEN"
    ) {
        consentAt = null;
    }


    const data = {

        loan_application_id:
            applicationId,

        user_id:
            userId,

        full_name:
            fullName,

        relationship_with_applicant:
            relationship,

        date_of_birth:
            dateOfBirth,

        gender:
            genderValue,

        email:
            emailValue,

        phone:
            phoneValue,

        address_line1:
            normalizeOptionalString(
                address_line1
            ),

        address_line2:
            normalizeOptionalString(
                address_line2
            ),

        landmark:
            normalizeOptionalString(
                landmark
            ),

        locality:
            normalizeOptionalString(
                locality
            ),

        city:
            normalizeOptionalString(
                city
            ),

        district:
            normalizeOptionalString(
                district
            ),

        state:
            normalizeOptionalString(
                state
            ),

        postal_code:
            normalizeOptionalString(
                postal_code
            ),

        country:
            normalizeOptionalString(
                country
            ) || "India",

        occupation:
            normalizeOptionalString(
                occupation
            ),

        employer_name:
            normalizeOptionalString(
                employer_name
            ),

        monthly_income:
            monthlyIncome,

        pan_number:
            panValue,

        aadhaar_last4:
            aadhaarValue,

        credit_score:
            creditScore,

        guarantor_status:
            guarantorStatus,

        verification_status:
            verificationStatus,

        consent_status:
            consentStatus,

        consent_at:
            consentAt,

        notes:
            normalizeOptionalString(
                notes
            )

    };


    return await createLoanGuarantor(
        data
    );

}


// ==========================================================
// UPDATE LOAN GUARANTOR
// ==========================================================

export async function updateExistingLoanGuarantor(
    guarantorId,
    guarantorData
) {

    const id =
        validateId(
            guarantorId,
            "Loan guarantor ID"
        );


    if (
        !guarantorData ||
        typeof guarantorData !== "object"
    ) {
        throw new Error(
            "Loan guarantor data is required."
        );
    }


    const existingGuarantor =
        await getLoanGuarantorById(
            id
        );


    if (!existingGuarantor) {
        throw new Error(
            "Loan guarantor not found."
        );
    }


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


    const fullName =
        full_name !== undefined
            ? validateRequiredString(
                full_name,
                "Full name"
            )
            : existingGuarantor.full_name;


    const relationship =
        relationship_with_applicant !== undefined
            ? normalizeOptionalString(
                relationship_with_applicant
            )
            : existingGuarantor.relationship_with_applicant;


    const dateOfBirth =
        date_of_birth !== undefined
            ? validateOptionalDate(
                date_of_birth
            )
            : existingGuarantor.date_of_birth;


    const genderValue =
        gender !== undefined
            ? normalizeOptionalString(
                gender
            )
            : existingGuarantor.gender;


    const emailValue =
        email !== undefined
            ? validateOptionalEmail(
                email
            )
            : existingGuarantor.email;


    const phoneValue =
        phone !== undefined
            ? validateOptionalPhone(
                phone
            )
            : existingGuarantor.phone;


    const monthlyIncome =
        monthly_income !== undefined
            ? validateOptionalNumber(
                monthly_income,
                "Monthly income"
            )
            : existingGuarantor.monthly_income;


    const panValue =
        pan_number !== undefined
            ? validateOptionalPan(
                pan_number
            )
            : existingGuarantor.pan_number;


    const aadhaarValue =
        aadhaar_last4 !== undefined
            ? validateAadhaarLast4(
                aadhaar_last4
            )
            : existingGuarantor.aadhaar_last4;


    const creditScore =
        credit_score !== undefined
            ? validateCreditScore(
                credit_score
            )
            : existingGuarantor.credit_score;


    const updateData = {

        full_name:
            fullName,

        relationship_with_applicant:
            relationship,

        date_of_birth:
            dateOfBirth,

        gender:
            genderValue,

        email:
            emailValue,

        phone:
            phoneValue,

        address_line1:
            address_line1 !== undefined
                ? normalizeOptionalString(
                    address_line1
                )
                : existingGuarantor.address_line1,

        address_line2:
            address_line2 !== undefined
                ? normalizeOptionalString(
                    address_line2
                )
                : existingGuarantor.address_line2,

        landmark:
            landmark !== undefined
                ? normalizeOptionalString(
                    landmark
                )
                : existingGuarantor.landmark,

        locality:
            locality !== undefined
                ? normalizeOptionalString(
                    locality
                )
                : existingGuarantor.locality,

        city:
            city !== undefined
                ? normalizeOptionalString(
                    city
                )
                : existingGuarantor.city,

        district:
            district !== undefined
                ? normalizeOptionalString(
                    district
                )
                : existingGuarantor.district,

        state:
            state !== undefined
                ? normalizeOptionalString(
                    state
                )
                : existingGuarantor.state,

        postal_code:
            postal_code !== undefined
                ? normalizeOptionalString(
                    postal_code
                )
                : existingGuarantor.postal_code,

        country:
            country !== undefined
                ? normalizeOptionalString(
                    country
                ) || "India"
                : existingGuarantor.country,

        occupation:
            occupation !== undefined
                ? normalizeOptionalString(
                    occupation
                )
                : existingGuarantor.occupation,

        employer_name:
            employer_name !== undefined
                ? normalizeOptionalString(
                    employer_name
                )
                : existingGuarantor.employer_name,

        monthly_income:
            monthlyIncome,

        pan_number:
            panValue,

        aadhaar_last4:
            aadhaarValue,

        credit_score:
            creditScore,

        notes:
            notes !== undefined
                ? normalizeOptionalString(
                    notes
                )
                : existingGuarantor.notes

    };


    return await updateLoanGuarantor(
        id,
        updateData
    );

}


// ==========================================================
// CHANGE GUARANTOR STATUS
// ==========================================================

export async function changeLoanGuarantorStatus(
    guarantorId,
    status
) {

    const id =
        validateId(
            guarantorId,
            "Loan guarantor ID"
        );


    const normalizedStatus =
        normalizeEnum(
            status,
            "guarantor status",
            ALLOWED_GUARANTOR_STATUSES
        );


    if (!normalizedStatus) {
        throw new Error(
            "Guarantor status is required."
        );
    }


    const existingGuarantor =
        await getLoanGuarantorById(
            id
        );


    if (!existingGuarantor) {
        throw new Error(
            "Loan guarantor not found."
        );
    }


    return await updateLoanGuarantorStatus(
        id,
        normalizedStatus
    );

}


// ==========================================================
// CHANGE VERIFICATION STATUS
// ==========================================================

export async function changeLoanGuarantorVerificationStatus(
    guarantorId,
    status
) {

    const id =
        validateId(
            guarantorId,
            "Loan guarantor ID"
        );


    const normalizedStatus =
        normalizeEnum(
            status,
            "verification status",
            ALLOWED_VERIFICATION_STATUSES
        );


    if (!normalizedStatus) {
        throw new Error(
            "Verification status is required."
        );
    }


    const existingGuarantor =
        await getLoanGuarantorById(
            id
        );


    if (!existingGuarantor) {
        throw new Error(
            "Loan guarantor not found."
        );
    }


    return await updateLoanGuarantorVerificationStatus(
        id,
        normalizedStatus
    );

}


// ==========================================================
// CHANGE CONSENT STATUS
// ==========================================================

export async function changeLoanGuarantorConsentStatus(
    guarantorId,
    status,
    consentAt = undefined
) {

    const id =
        validateId(
            guarantorId,
            "Loan guarantor ID"
        );


    const normalizedStatus =
        normalizeEnum(
            status,
            "consent status",
            ALLOWED_CONSENT_STATUSES
        );


    if (!normalizedStatus) {
        throw new Error(
            "Consent status is required."
        );
    }


    const existingGuarantor =
        await getLoanGuarantorById(
            id
        );


    if (!existingGuarantor) {
        throw new Error(
            "Loan guarantor not found."
        );
    }


    let normalizedConsentAt =
        consentAt !== undefined
            ? validateConsentAt(
                consentAt
            )
            : existingGuarantor.consent_at;


    if (
        normalizedStatus === "GIVEN" &&
        !normalizedConsentAt
    ) {
        normalizedConsentAt =
            new Date();
    }


    if (
        normalizedStatus !== "GIVEN"
    ) {
        normalizedConsentAt = null;
    }


    return await updateLoanGuarantorConsentStatus(
        id,
        normalizedStatus,
        normalizedConsentAt
    );

}


// ==========================================================
// DELETE LOAN GUARANTOR
// ==========================================================

export async function removeLoanGuarantor(
    guarantorId
) {

    const id =
        validateId(
            guarantorId,
            "Loan guarantor ID"
        );


    const existingGuarantor =
        await getLoanGuarantorById(
            id
        );


    if (!existingGuarantor) {
        throw new Error(
            "Loan guarantor not found."
        );
    }


    return await deleteLoanGuarantor(
        id
    );

}


// ==========================================================
// EXPORT CONSTANTS
// ==========================================================

export {
    ALLOWED_GUARANTOR_STATUSES,
    ALLOWED_VERIFICATION_STATUSES,
    ALLOWED_CONSENT_STATUSES
};

