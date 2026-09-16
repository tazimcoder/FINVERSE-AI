/**
 * ==========================================================
 * FINVERSE AI
 * Login Validation Schema
 * ==========================================================
 *
 * Responsibility:
 * - Validate login form data
 * - Keep validation separate from UI
 * - Keep validation separate from API
 * ==========================================================
 */

import { AUTH_RULES } from "../constants/authConstants";

// ==========================================================
// Email Validation
// ==========================================================

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ==========================================================
// Login Validation
// ==========================================================

export function validateLoginForm(formData) {

    const errors = {};

    const {
        email,
        password,
    } = formData;

    // ======================================================
    // Email
    // ======================================================

    if (!email?.trim()) {

        errors.email =
            "Email address is required.";

    } else if (
        email.trim().length >
        AUTH_RULES.MAX_EMAIL_LENGTH
    ) {

        errors.email =
            `Email cannot exceed ${AUTH_RULES.MAX_EMAIL_LENGTH} characters.`;

    } else if (
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

    // ======================================================
    // Return Result
    // ======================================================

    return {

        isValid:
            Object.keys(errors).length === 0,

        errors,

    };
}

export default validateLoginForm;