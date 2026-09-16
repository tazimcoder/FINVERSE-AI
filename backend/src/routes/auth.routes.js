/**
 * ==========================================================
 * FINVERSE
 * Authentication Routes
 * ==========================================================
 */

import express from "express";

import {
    login,
    register,
    sendOtp,
    verifyOtp,
    getMe,
    updateProfile,
    resetPassword,
} from "../controllers/auth.controller.js";

import {
    authenticateToken,
} from "../middleware/auth.middleware.js";

import {
    adminOnly,
    userOnly,
} from "../middleware/role.middleware.js";

import {
    rateLimiterMiddleware,
    securityHeadersMiddleware,
} from "../middleware/security.middleware.js";

const router = express.Router();

// Apply Security Headers to all Auth routes
router.use(securityHeadersMiddleware);

// ==========================================================
// Login (Rate-Limited Anti-Brute Force)
// POST /api/v1/auth/login
// Public
// ==========================================================

router.post(
    "/login",
    rateLimiterMiddleware,
    login
);

// ==========================================================
// Register
// POST /api/v1/auth/register
// Public
// ==========================================================

router.post(
    "/register",
    register
);

// ==========================================================
// Send 2FA Security OTP (Requires Registered DB User)
// POST /api/v1/auth/send-otp
// Public
// ==========================================================

router.post(
    "/send-otp",
    sendOtp
);

// ==========================================================
// Verify 2FA Security OTP & Sign In
// POST /api/v1/auth/verify-otp
// Public
// ==========================================================

router.post(
    "/verify-otp",
    verifyOtp
);

// ==========================================================
// Reset Password (2FA / OTP Verified)
// POST /api/v1/auth/reset-password
// Public
// ==========================================================

router.post(
    "/reset-password",
    resetPassword
);

// ==========================================================
// Get Current Logged-In User
// GET /api/v1/auth/me
// Protected
// ==========================================================

router.get(
    "/me",
    authenticateToken,
    getMe
);

// ==========================================================
// Update Current User Profile / Password
// PATCH /api/v1/auth/profile
// Protected (Admin & Regular Users)
// ==========================================================

router.patch(
    "/profile",
    authenticateToken,
    updateProfile
);

// ==========================================================
// ADMIN Test Route
// GET /api/v1/auth/admin-test
// ==========================================================

router.get(
    "/admin-test",
    authenticateToken,
    adminOnly,
    (req, res) => {
        return res.status(200).json({
            success: true,
            message: "ADMIN authorization successful.",
            user: req.user,
        });
    }
);

// ==========================================================
// USER Test Route
// GET /api/v1/auth/user-test
// ==========================================================

router.get(
    "/user-test",
    authenticateToken,
    userOnly,
    (req, res) => {
        return res.status(200).json({
            success: true,
            message: "USER authorization successful.",
            user: req.user,
        });
    }
);

export default router;