/**

* ==========================================================
* FINVERSE AI
* Loan Product Validator
* ==========================================================
*
* File:
* src/modules/loan/validators/loanProductValidator.js
*
* Responsibility:
*
* * Validate loan product input
* * Validate required fields
* * Validate amount ranges
* * Validate tenure ranges
* * Validate interest rate ranges
* * Validate processing fee
* * Validate loan category
* * Validate product status
*
* ==========================================================
  */

// ==========================================================
// Allowed Values
// ==========================================================

const ALLOWED_CATEGORIES = [
    "PERSONAL",
    "HOME",
    "PROPERTY",
    "PLOT",
    "VEHICLE",
    "EDUCATION",
    "BUSINESS",
    "GOLD",
    "OTHER"
];

const ALLOWED_FEE_TYPES = [
    "FIXED",
    "PERCENTAGE"
];

const ALLOWED_PROPERTY_REQUIREMENTS = [
    "YES",
    "NO"
];

const ALLOWED_COLLATERAL_REQUIREMENTS = [
    "YES",
    "NO"
];

const ALLOWED_STATUSES = [
    "ACTIVE",
    "INACTIVE",
    "COMING_SOON"
];

// ==========================================================
// Helper
// ==========================================================

function createValidationError(message) {

    const error = new Error(message);

    error.statusCode = 400;

    return error;


}

// ==========================================================
// Validate Create Loan Product
// ==========================================================

export function validateCreateLoanProduct(data = {}) {


    const {
        product_code,
        product_name,
        loan_category,
        min_amount,
        max_amount,
        min_tenure_months,
        max_tenure_months,
        min_interest_rate,
        max_interest_rate,
        processing_fee_type,
        processing_fee_value,
        requires_property,
        requires_collateral,
        status
    } = data;


    // ------------------------------------------------------
    // Required Fields
    // ------------------------------------------------------

    if (
        !product_code ||
        typeof product_code !== "string"
    ) {

        throw createValidationError(
            "Product code is required."
        );

    }


    if (
        !product_name ||
        typeof product_name !== "string"
    ) {

        throw createValidationError(
            "Product name is required."
        );

    }


    if (
        !loan_category ||
        !ALLOWED_CATEGORIES.includes(loan_category)
    ) {

        throw createValidationError(
            "Invalid loan category."
        );

    }


    // ------------------------------------------------------
    // Product Code
    // ------------------------------------------------------

    if (product_code.length > 50) {

        throw createValidationError(
            "Product code cannot exceed 50 characters."
        );

    }


    // ------------------------------------------------------
    // Product Name
    // ------------------------------------------------------

    if (product_name.length > 150) {

        throw createValidationError(
            "Product name cannot exceed 150 characters."
        );

    }


    // ------------------------------------------------------
    // Amount Validation
    // ------------------------------------------------------

    if (
        min_amount !== undefined &&
        min_amount !== null &&
        Number(min_amount) < 0
    ) {

        throw createValidationError(
            "Minimum loan amount cannot be negative."
        );

    }


    if (
        max_amount !== undefined &&
        max_amount !== null &&
        Number(max_amount) < 0
    ) {

        throw createValidationError(
            "Maximum loan amount cannot be negative."
        );

    }


    if (
        min_amount !== undefined &&
        max_amount !== undefined &&
        min_amount !== null &&
        max_amount !== null &&
        Number(min_amount) > Number(max_amount)
    ) {

        throw createValidationError(
            "Minimum loan amount cannot be greater than maximum loan amount."
        );

    }


    // ------------------------------------------------------
    // Tenure Validation
    // ------------------------------------------------------

    if (
        min_tenure_months !== undefined &&
        min_tenure_months !== null &&
        Number(min_tenure_months) < 1
    ) {

        throw createValidationError(
            "Minimum tenure must be at least 1 month."
        );

    }


    if (
        max_tenure_months !== undefined &&
        max_tenure_months !== null &&
        Number(max_tenure_months) < 1
    ) {

        throw createValidationError(
            "Maximum tenure must be at least 1 month."
        );

    }


    if (
        min_tenure_months !== undefined &&
        max_tenure_months !== undefined &&
        min_tenure_months !== null &&
        max_tenure_months !== null &&
        Number(min_tenure_months) > Number(max_tenure_months)
    ) {

        throw createValidationError(
            "Minimum tenure cannot be greater than maximum tenure."
        );

    }


    // ------------------------------------------------------
    // Interest Rate Validation
    // ------------------------------------------------------

    if (
        min_interest_rate !== undefined &&
        min_interest_rate !== null &&
        Number(min_interest_rate) < 0
    ) {

        throw createValidationError(
            "Minimum interest rate cannot be negative."
        );

    }


    if (
        max_interest_rate !== undefined &&
        max_interest_rate !== null &&
        Number(max_interest_rate) < 0
    ) {

        throw createValidationError(
            "Maximum interest rate cannot be negative."
        );

    }


    if (
        min_interest_rate !== undefined &&
        max_interest_rate !== undefined &&
        min_interest_rate !== null &&
        max_interest_rate !== null &&
        Number(min_interest_rate) > Number(max_interest_rate)
    ) {

        throw createValidationError(
            "Minimum interest rate cannot be greater than maximum interest rate."
        );

    }


    // ------------------------------------------------------
    // Processing Fee
    // ------------------------------------------------------

    if (
        processing_fee_type !== undefined &&
        processing_fee_type !== null &&
        !ALLOWED_FEE_TYPES.includes(processing_fee_type)
    ) {

        throw createValidationError(
            "Invalid processing fee type."
        );

    }


    if (
        processing_fee_value !== undefined &&
        processing_fee_value !== null &&
        Number(processing_fee_value) < 0
    ) {

        throw createValidationError(
            "Processing fee cannot be negative."
        );

    }


    if (
        processing_fee_type === "PERCENTAGE" &&
        processing_fee_value !== undefined &&
        processing_fee_value !== null &&
        Number(processing_fee_value) > 100
    ) {

        throw createValidationError(
            "Percentage processing fee cannot exceed 100%."
        );

    }


    // ------------------------------------------------------
    // Property Requirement
    // ------------------------------------------------------

    if (
        requires_property !== undefined &&
        requires_property !== null &&
        !ALLOWED_PROPERTY_REQUIREMENTS.includes(
            requires_property
        )
    ) {

        throw createValidationError(
            "Invalid property requirement value."
        );

    }


    // ------------------------------------------------------
    // Collateral Requirement
    // ------------------------------------------------------

    if (
        requires_collateral !== undefined &&
        requires_collateral !== null &&
        !ALLOWED_COLLATERAL_REQUIREMENTS.includes(
            requires_collateral
        )
    ) {

        throw createValidationError(
            "Invalid collateral requirement value."
        );

    }


    // ------------------------------------------------------
    // Status
    // ------------------------------------------------------

    if (
        status !== undefined &&
        status !== null &&
        !ALLOWED_STATUSES.includes(status)
    ) {

        throw createValidationError(
            "Invalid loan product status."
        );

    }


    return true;


}

// ==========================================================
// Validate Update Loan Product
// ==========================================================

export function validateUpdateLoanProduct(data = {}) {


    if (
        !data ||
        typeof data !== "object" ||
        Array.isArray(data)
    ) {

        throw createValidationError(
            "Invalid loan product data."
        );

    }


    /*
     * Update validation uses the same business rules
     * as create validation.
     *
     * Required fields are not enforced here because
     * partial updates are allowed.
     */

    const validationData = {
        product_code:
            data.product_code ?? "VALID_PRODUCT_CODE",

        product_name:
            data.product_name ?? "VALID_PRODUCT_NAME",

        loan_category:
            data.loan_category ?? "OTHER",

        ...data
    };


    return validateCreateLoanProduct(
        validationData
    );


}

// ==========================================================
// Validate Loan Product Status
// ==========================================================

export function validateLoanProductStatus(status) {


    if (
        !status ||
        !ALLOWED_STATUSES.includes(status)
    ) {

        throw createValidationError(
            "Invalid loan product status."
        );

    }


    return true;


}

// ==========================================================
// Export Constants
// ==========================================================

export {
    ALLOWED_CATEGORIES,
    ALLOWED_FEE_TYPES,
    ALLOWED_PROPERTY_REQUIREMENTS,
    ALLOWED_COLLATERAL_REQUIREMENTS,
    ALLOWED_STATUSES
};
