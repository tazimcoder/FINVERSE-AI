/**
 * ==========================================================
 * FINVERSE AI
 * Authentication Constants
 * ==========================================================
 *
 * Responsibility:
 * - Authentication related constants
 * - Authentication routes
 * - User roles
 * - Registration validation rules
 *
 * IMPORTANT:
 * - No API calls
 * - No business logic
 * - No UI logic
 * ==========================================================
 */

// ==========================================================
// Authentication Routes
// ==========================================================

export const AUTH_ROUTES = {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
};

// ==========================================================
// User Roles
// ==========================================================

export const USER_ROLES = {
    ADMIN: "ADMIN",
    USER: "USER",
};

// ==========================================================
// Authentication Rules
// ==========================================================

export const AUTH_RULES = {
    MIN_PASSWORD_LENGTH: 8,
    MAX_PASSWORD_LENGTH: 128,

    MAX_NAME_LENGTH: 100,
    MAX_EMAIL_LENGTH: 150,
};