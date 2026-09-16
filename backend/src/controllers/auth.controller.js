/**
 * ==========================================================
 * FINVERSE
 * Authentication Controller
 * ==========================================================
 */

import {
    loginUser,
    registerUser,
    updateUserProfileService,
    send2FAOtpService,
    verify2FAOtpService,
    resetPasswordByEmailService
} from "../services/auth.service.js";

import {
    findUserById,
} from "../models/user.model.js";

/* ==========================================================
   Login Controller
========================================================== */

export async function login(req, res) {
    try {
        const {
            email,
            password,
        } = req.body;

        const result = await loginUser({
            email,
            password,
        });

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            ...result,
        });
    }
    catch (error) {
        console.error(
            "Login Error:",
            error.message
        );

        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
}

/* ==========================================================
   Register Controller (Accepts mobile number)
========================================================== */

export async function register(req, res) {
    try {
        const {
            full_name,
            email,
            mobile,
            password,
        } = req.body;

        if (
            !full_name ||
            !email ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Full name, email address and password are required.",
            });
        }

        const result =
            await registerUser({
                full_name,
                email,
                mobile,
                password,
            });

        return res.status(201).json({
            success: true,
            message:
                "Account created successfully.",
            ...result,
        });
    }
    catch (error) {
        console.error(
            "Registration Error:",
            error.message
        );

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

/* ==========================================================
   Send 2FA OTP Controller
   POST /api/v1/auth/send-otp
========================================================== */

export async function sendOtp(req, res) {
    try {
        const { identifier, recoveryMethod } = req.body;

        const result = await send2FAOtpService({
            identifier,
            recoveryMethod,
        });

        return res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error) {
        console.error("Send 2FA OTP Error:", error.message);
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

/* ==========================================================
   Verify 2FA OTP Controller
   POST /api/v1/auth/verify-otp
========================================================== */

export async function verifyOtp(req, res) {
    try {
        const { identifier, otp } = req.body;

        const result = await verify2FAOtpService({
            identifier,
            otp,
        });

        return res.status(200).json({
            success: true,
            message: "2FA OTP Verified Successfully. Welcome back!",
            ...result,
        });
    } catch (error) {
        console.error("Verify 2FA OTP Error:", error.message);
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

/* ==========================================================
   Get Current Logged-In User
========================================================== */

export async function getMe(req, res) {
    try {
        const dbUser = await findUserById(req.user.id);

        if (!dbUser) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User fetched successfully.",
            data: {
                id: dbUser.id,
                full_name: dbUser.full_name,
                email: dbUser.email,
                mobile: dbUser.mobile,
                role: dbUser.role,
                is_active: dbUser.is_active,
                created_at: dbUser.created_at,
                updated_at: dbUser.updated_at,
            },
        });
    }
    catch (error) {
        console.error(
            "Get Me Error:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Unable to fetch user.",
        });
    }
}

/* ==========================================================
   Update Current User Profile / Password
   PATCH /api/v1/auth/profile
========================================================== */

export async function updateProfile(req, res) {
    try {
        const userId = req.user.id;
        const { full_name, mobile, password, current_password } = req.body;

        if (!full_name || full_name.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "Full name is required.",
            });
        }

        const updatedUser = await updateUserProfileService(userId, {
            full_name,
            mobile,
            password,
            current_password,
        });

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            data: updatedUser,
        });
    } catch (error) {
        console.error("Update Profile Error:", error.message);
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to update profile.",
        });
    }
}

/* ==========================================================
   Reset Password Controller (2FA / OTP Verified)
   POST /api/v1/auth/reset-password
========================================================== */

export async function resetPassword(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and new password are required.",
            });
        }

        const result = await resetPasswordByEmailService(email, password);

        return res.status(200).json({
            success: true,
            message: "Password updated successfully in database. You can now sign in with your new password.",
            data: result,
        });
    } catch (error) {
        console.error("Reset Password Error:", error.message);
        return res.status(400).json({
            success: false,
            message: error.message || "Unable to reset password.",
        });
    }
}