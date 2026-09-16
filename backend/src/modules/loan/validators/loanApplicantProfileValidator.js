/**
 * ==========================================================
 * FINVERSE AI
 * Loan Applicant Profile Validator
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/validators/loanApplicantProfileValidator.js
 *
 * Database Table:
 * loan_applicant_profiles
 *
 * Responsibility:
 *
 * - Validate applicant profile input
 * - Validate loan application ID
 * - Validate user ID
 * - Validate applicant type
 * - Validate personal information
 * - Validate employment information
 * - Validate financial information
 * - Validate residential information
 * - Validate create payload
 * - Validate update payload
 * - Validate profile ID
 *
 * Flow:
 *
 * LOAN APPLICATION
 *        ↓
 * APPLICANT PROFILE
 *        ↓
 * PERSONAL DATA
 *        ↓
 * EMPLOYMENT DATA
 *        ↓
 * FINANCIAL DATA
 *        ↓
 * RESIDENTIAL DATA
 *
 * ==========================================================
 */


// ==========================================================
// Allowed Applicant Types
// ==========================================================

export const ALLOWED_APPLICANT_TYPES = [

    "PRIMARY",

    "CO_APPLICANT",

    "GUARANTOR"

];


// ==========================================================
// Allowed Gender Values
// ==========================================================
//
// Kept flexible because database/model may allow NULL
// and the exact ENUM definition can vary.
//

export const ALLOWED_GENDER_VALUES = [

    "MALE",

    "FEMALE",

    "OTHER"

];


// ==========================================================
// Allowed Marital Status Values
// ==========================================================

export const ALLOWED_MARITAL_STATUS_VALUES = [

    "SINGLE",

    "MARRIED",

    "DIVORCED",

    "WIDOWED",

    "SEPARATED"

];


// ==========================================================
// Allowed Residential Status Values
// ==========================================================

export const ALLOWED_RESIDENTIAL_STATUS_VALUES = [

    "OWNED",

    "RENTED",

    "FAMILY",

    "LEASED",

    "OTHER"

];


// ==========================================================
// Utility
// Validate Positive Integer
// ==========================================================

function validatePositiveInteger(
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


    const numericValue =
        Number(value);


    if (
        !Number.isInteger(
            numericValue
        ) ||
        numericValue <= 0
    ) {

        throw new Error(
            `${fieldName} must be a valid positive integer.`
        );

    }


    return numericValue;

}


// ==========================================================
// Utility
// Validate Non-Negative Number
// ==========================================================

function validateNonNegativeNumber(
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


    const numericValue =
        Number(value);


    if (
        !Number.isFinite(
            numericValue
        )
    ) {

        throw new Error(
            `${fieldName} must be a valid number.`
        );

    }


    if (
        numericValue < 0
    ) {

        throw new Error(
            `${fieldName} cannot be negative.`
        );

    }


    return numericValue;

}


// ==========================================================
// Utility
// Validate Non-Negative Integer
// ==========================================================

function validateNonNegativeInteger(
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


    const numericValue =
        Number(value);


    if (
        !Number.isInteger(
            numericValue
        )
    ) {

        throw new Error(
            `${fieldName} must be a valid integer.`
        );

    }


    if (
        numericValue < 0
    ) {

        throw new Error(
            `${fieldName} cannot be negative.`
        );

    }


    return numericValue;

}


// ==========================================================
// Utility
// Validate Date
// ==========================================================

function validateDate(
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


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        throw new Error(
            `${fieldName} must be a valid date.`
        );

    }


    return value;

}


// ==========================================================
// Validate Profile ID
// ==========================================================

export function validateLoanApplicantProfileId(
    profileId
) {

    return validatePositiveInteger(
        profileId,
        "Applicant profile ID"
    );

}


// ==========================================================
// Validate Loan Application ID
// ==========================================================

export function validateLoanApplicationId(
    applicationId
) {

    return validatePositiveInteger(
        applicationId,
        "Loan application ID"
    );

}


// ==========================================================
// Validate User ID
// ==========================================================

export function validateUserId(
    userId
) {

    return validatePositiveInteger(
        userId,
        "User ID"
    );

}


// ==========================================================
// Validate Applicant Type
// ==========================================================

export function validateApplicantType(
    applicantType
) {

    const normalizedType =
        applicantType === undefined ||
            applicantType === null ||
            applicantType === ""
            ? "PRIMARY"
            : String(
                applicantType
            ).toUpperCase();


    if (
        !ALLOWED_APPLICANT_TYPES.includes(
            normalizedType
        )
    ) {

        throw new Error(
            `Invalid applicant type. Allowed types: ${ALLOWED_APPLICANT_TYPES.join(", ")}.`
        );

    }


    return normalizedType;

}


// ==========================================================
// Validate Gender
// ==========================================================

export function validateGender(
    gender
) {

    if (
        gender === undefined ||
        gender === null ||
        gender === ""
    ) {

        return null;

    }


    const normalizedGender =
        String(
            gender
        ).toUpperCase();


    if (
        !ALLOWED_GENDER_VALUES.includes(
            normalizedGender
        )
    ) {

        throw new Error(
            `Invalid gender. Allowed values: ${ALLOWED_GENDER_VALUES.join(", ")}.`
        );

    }


    return normalizedGender;

}


// ==========================================================
// Validate Marital Status
// ==========================================================

export function validateMaritalStatus(
    maritalStatus
) {

    if (
        maritalStatus === undefined ||
        maritalStatus === null ||
        maritalStatus === ""
    ) {

        return null;

    }


    const normalizedStatus =
        String(
            maritalStatus
        ).toUpperCase();


    if (
        !ALLOWED_MARITAL_STATUS_VALUES.includes(
            normalizedStatus
        )
    ) {

        throw new Error(
            `Invalid marital status. Allowed values: ${ALLOWED_MARITAL_STATUS_VALUES.join(", ")}.`
        );

    }


    return normalizedStatus;

}


// ==========================================================
// Validate Residential Status
// ==========================================================

export function validateResidentialStatus(
    residentialStatus
) {

    if (
        residentialStatus === undefined ||
        residentialStatus === null ||
        residentialStatus === ""
    ) {

        return null;

    }


    const normalizedStatus =
        String(
            residentialStatus
        ).toUpperCase();


    if (
        !ALLOWED_RESIDENTIAL_STATUS_VALUES.includes(
            normalizedStatus
        )
    ) {

        throw new Error(
            `Invalid residential status. Allowed values: ${ALLOWED_RESIDENTIAL_STATUS_VALUES.join(", ")}.`
        );

    }


    return normalizedStatus;

}


// ==========================================================
// Validate Date Of Birth
// ==========================================================

export function validateDateOfBirth(
    dateOfBirth
) {

    return validateDate(
        dateOfBirth,
        "Date of birth"
    );

}


// ==========================================================
// Validate Work Experience
// ==========================================================

export function validateWorkExperienceYears(
    workExperienceYears
) {

    return validateNonNegativeNumber(
        workExperienceYears,
        "Work experience years"
    );

}


// ==========================================================
// Validate Monthly Income
// ==========================================================

export function validateMonthlyIncome(
    monthlyIncome
) {

    return validateNonNegativeNumber(
        monthlyIncome,
        "Monthly income"
    );

}


// ==========================================================
// Validate Annual Income
// ==========================================================

export function validateAnnualIncome(
    annualIncome
) {

    return validateNonNegativeNumber(
        annualIncome,
        "Annual income"
    );

}


// ==========================================================
// Validate Additional Income
// ==========================================================

export function validateAdditionalIncome(
    additionalIncome
) {

    return validateNonNegativeNumber(
        additionalIncome,
        "Additional income"
    );

}


// ==========================================================
// Validate Existing EMI Amount
// ==========================================================

export function validateExistingEmiAmount(
    existingEmiAmount
) {

    return validateNonNegativeNumber(
        existingEmiAmount,
        "Existing EMI amount"
    );

}


// ==========================================================
// Validate Existing Loan Count
// ==========================================================

export function validateExistingLoanCount(
    existingLoanCount
) {

    return validateNonNegativeInteger(
        existingLoanCount,
        "Existing loan count"
    );

}


// ==========================================================
// Validate Postal Code
// ==========================================================

export function validatePostalCode(
    postalCode
) {

    if (
        postalCode === undefined ||
        postalCode === null ||
        postalCode === ""
    ) {

        return null;

    }


    const value =
        String(
            postalCode
        ).trim();


    if (
        value.length === 0
    ) {

        throw new Error(
            "Postal code cannot be empty."
        );

    }


    if (
        value.length > 20
    ) {

        throw new Error(
            "Postal code cannot exceed 20 characters."
        );

    }


    return value;

}


// ==========================================================
// Validate Create Applicant Profile
// ==========================================================

export function validateCreateLoanApplicantProfile(
    profileData
) {

    if (
        !profileData ||
        typeof profileData !== "object"
    ) {

        throw new Error(
            "Applicant profile data is required."
        );

    }


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


    // ------------------------------------------------------
    // Required Relationships
    // ------------------------------------------------------

    const validatedApplicationId =
        validateLoanApplicationId(
            loan_application_id
        );


    const validatedUserId =
        validateUserId(
            user_id
        );


    // ------------------------------------------------------
    // Applicant Type
    // ------------------------------------------------------

    const validatedApplicantType =
        validateApplicantType(
            applicant_type
        );


    // ------------------------------------------------------
    // Personal Information
    // ------------------------------------------------------

    const validatedDateOfBirth =
        validateDateOfBirth(
            date_of_birth
        );


    const validatedGender =
        validateGender(
            gender
        );


    const validatedMaritalStatus =
        validateMaritalStatus(
            marital_status
        );


    // ------------------------------------------------------
    // Employment Information
    // ------------------------------------------------------

    const validatedWorkExperience =
        validateWorkExperienceYears(
            work_experience_years
        );


    // ------------------------------------------------------
    // Financial Information
    // ------------------------------------------------------

    const validatedMonthlyIncome =
        validateMonthlyIncome(
            monthly_income
        );


    const validatedAnnualIncome =
        validateAnnualIncome(
            annual_income
        );


    const validatedAdditionalIncome =
        validateAdditionalIncome(
            additional_income
        );


    const validatedExistingEmi =
        validateExistingEmiAmount(
            existing_emi_amount
        );


    const validatedExistingLoanCount =
        validateExistingLoanCount(
            existing_loan_count
        );


    // ------------------------------------------------------
    // Residential Information
    // ------------------------------------------------------

    const validatedResidentialStatus =
        validateResidentialStatus(
            residential_status
        );


    const validatedPostalCode =
        validatePostalCode(
            postal_code
        );


    return {

        ...profileData,

        loan_application_id:
            validatedApplicationId,

        user_id:
            validatedUserId,

        applicant_type:
            validatedApplicantType,

        date_of_birth:
            validatedDateOfBirth,

        gender:
            validatedGender,

        marital_status:
            validatedMaritalStatus,

        work_experience_years:
            validatedWorkExperience,

        monthly_income:
            validatedMonthlyIncome,

        annual_income:
            validatedAnnualIncome,

        additional_income:
            validatedAdditionalIncome,

        existing_emi_amount:
            validatedExistingEmi,

        existing_loan_count:
            validatedExistingLoanCount,

        residential_status:
            validatedResidentialStatus,

        postal_code:
            validatedPostalCode

    };

}


// ==========================================================
// Validate Update Applicant Profile
// ==========================================================

export function validateUpdateLoanApplicantProfile(
    profileId,
    profileData
) {

    const validatedProfileId =
        validateLoanApplicantProfileId(
            profileId
        );


    if (
        !profileData ||
        typeof profileData !== "object"
    ) {

        throw new Error(
            "Applicant profile data is required."
        );

    }


    const {

        applicant_type,

        date_of_birth,

        gender,

        marital_status,

        work_experience_years,

        monthly_income,

        annual_income,

        additional_income,

        existing_emi_amount,

        existing_loan_count,

        residential_status,

        postal_code

    } = profileData;


    const validatedApplicantType =
        validateApplicantType(
            applicant_type
        );


    const validatedDateOfBirth =
        validateDateOfBirth(
            date_of_birth
        );


    const validatedGender =
        validateGender(
            gender
        );


    const validatedMaritalStatus =
        validateMaritalStatus(
            marital_status
        );


    const validatedWorkExperience =
        validateWorkExperienceYears(
            work_experience_years
        );


    const validatedMonthlyIncome =
        validateMonthlyIncome(
            monthly_income
        );


    const validatedAnnualIncome =
        validateAnnualIncome(
            annual_income
        );


    const validatedAdditionalIncome =
        validateAdditionalIncome(
            additional_income
        );


    const validatedExistingEmi =
        validateExistingEmiAmount(
            existing_emi_amount
        );


    const validatedExistingLoanCount =
        validateExistingLoanCount(
            existing_loan_count
        );


    const validatedResidentialStatus =
        validateResidentialStatus(
            residential_status
        );


    const validatedPostalCode =
        validatePostalCode(
            postal_code
        );


    return {

        ...profileData,

        id:
            validatedProfileId,

        applicant_type:
            validatedApplicantType,

        date_of_birth:
            validatedDateOfBirth,

        gender:
            validatedGender,

        marital_status:
            validatedMaritalStatus,

        work_experience_years:
            validatedWorkExperience,

        monthly_income:
            validatedMonthlyIncome,

        annual_income:
            validatedAnnualIncome,

        additional_income:
            validatedAdditionalIncome,

        existing_emi_amount:
            validatedExistingEmi,

        existing_loan_count:
            validatedExistingLoanCount,

        residential_status:
            validatedResidentialStatus,

        postal_code:
            validatedPostalCode

    };

}


// ==========================================================
// Validate Delete Applicant Profile
// ==========================================================

export function validateDeleteLoanApplicantProfile(
    profileId
) {

    return validateLoanApplicantProfileId(
        profileId
    );

}


// ==========================================================
// Validate Fetch By Application
// ==========================================================

export function validateLoanApplicantProfilesByApplication(
    applicationId
) {

    return validateLoanApplicationId(
        applicationId
    );

}


// ==========================================================
// Validate Fetch By User
// ==========================================================

export function validateLoanApplicantProfilesByUser(
    userId
) {

    return validateUserId(
        userId
    );

}


// ==========================================================
// Default Export
// ==========================================================

export default {

    ALLOWED_APPLICANT_TYPES,

    ALLOWED_GENDER_VALUES,

    ALLOWED_MARITAL_STATUS_VALUES,

    ALLOWED_RESIDENTIAL_STATUS_VALUES,

    validateLoanApplicantProfileId,

    validateLoanApplicationId,

    validateUserId,

    validateApplicantType,

    validateGender,

    validateMaritalStatus,

    validateResidentialStatus,

    validateDateOfBirth,

    validateWorkExperienceYears,

    validateMonthlyIncome,

    validateAnnualIncome,

    validateAdditionalIncome,

    validateExistingEmiAmount,

    validateExistingLoanCount,

    validatePostalCode,

    validateCreateLoanApplicantProfile,

    validateUpdateLoanApplicantProfile,

    validateDeleteLoanApplicantProfile,

    validateLoanApplicantProfilesByApplication,

    validateLoanApplicantProfilesByUser

};