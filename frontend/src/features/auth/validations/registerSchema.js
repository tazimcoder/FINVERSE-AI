/**
 * ==========================================================
 * FINVERSE AI
 * Register Validation Schema
 * ==========================================================
 *
 * Responsibility:
 * - Validate registration form data
 * - Keep validation separate from UI
 * - Keep validation separate from API/business logic
 *
 * IMPORTANT:
 * This file performs client-side validation only.
 * Server-side validation must still exist on backend.
 * ==========================================================
 */

import {
    AUTH_RULES,
} from "../constants/authConstants";

// ==========================================================
// Email Validation
// ==========================================================

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
    );

}

// ==========================================================
// Register Validation
// ==========================================================

export function validateRegisterForm(formData) {

    const errors = {};

    const {
        full_name,
        email,
        password,
        confirm_password,
        acceptedTerms,
    } = formData;


    // ======================================================
    // Full Name
    // ======================================================

    if (!full_name?.trim()) {

        errors.full_name =
            "Full name is required.";

    }

    else if (
        full_name.trim().length >
        AUTH_RULES.MAX_NAME_LENGTH
    ) {

        errors.full_name =
            `Full name cannot exceed ${AUTH_RULES.MAX_NAME_LENGTH} characters.`;

    }


    // ======================================================
    // Email
    // ======================================================

    if (!email?.trim()) {

        errors.email =
            "Email address is required.";

    }

    else if (
        email.trim().length >
        AUTH_RULES.MAX_EMAIL_LENGTH
    ) {

        errors.email =
            `Email cannot exceed ${AUTH_RULES.MAX_EMAIL_LENGTH} characters.`;

    }

    else if (
        !isValidEmail(email.trim())
    ) {

        errors.email =
            "Please enter a valid email address.";

    }


    // ======================================================
    // Password
    // ======================================================

    if (!password) {

        errors.password =
            "Password is required.";

    }

    else if (
        password.length <
        AUTH_RULES.MIN_PASSWORD_LENGTH
    ) {

        errors.password =
            `Password must contain at least ${AUTH_RULES.MIN_PASSWORD_LENGTH} characters.`;

    }

    else if (
        password.length >
        AUTH_RULES.MAX_PASSWORD_LENGTH
    ) {

        errors.password =
            `Password cannot exceed ${AUTH_RULES.MAX_PASSWORD_LENGTH} characters.`;

    }


    // ======================================================
    // Confirm Password
    // ======================================================

    if (!confirm_password) {

        errors.confirm_password =
            "Please confirm your password.";

    }

    else if (
        password !== confirm_password
    ) {

        errors.confirm_password =
            "Passwords do not match.";

    }


    // ======================================================
    // Terms & Privacy
    // ======================================================

    if (!acceptedTerms) {

        errors.acceptedTerms =
            "You must accept the Terms and Privacy Policy.";

    }


    // ======================================================
    // Return Validation Result
    // ======================================================

    return {

        isValid:
            Object.keys(errors).length === 0,

        errors,

    };

}

export default validateRegisterForm;