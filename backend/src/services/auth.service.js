/**
 * ==========================================================
 * FINVERSE
 * Authentication Service
 * Features Registered User Verification, Nodemailer Email Dispatch & 2FA OTP Store
 * ==========================================================
 */

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import {
    findUserByEmail,
    findUserByMobile,
    findUserByEmailOrMobile,
    createUser,
    findUserById,
    findUserWithPasswordById,
    updateUserProfileInDb,
    updateUserPasswordByEmailInDb,
} from "../models/user.model.js";

// In-Memory OTP Store: key = identifier (email/mobile), value = { otp, expiresAt, userId }
const otpStore = new Map();

/* ==========================================================
   Nodemailer Email Transporter Setup
========================================================== */
function createEmailTransporter() {
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "587");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (user && pass) {
        return nodemailer.createTransport({
            host,
            port,
            secure: port === 465,
            auth: { user, pass },
        });
    }

    return null;
}

/* ==========================================================
   Login Service (Email/Password)
========================================================== */

export async function loginUser({
    email,
    password,
}) {
    const cleanEmail = email ? email.trim().toLowerCase() : "";
    const user = await findUserByEmail(cleanEmail);

    if (!user) {
        throw new Error("No registered account found with this email address.");
    }

    if (!user.is_active) {
        throw new Error("Account is inactive. Please contact support.");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new Error("Invalid password. Please check your credentials.");
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET || "finverse_default_jwt_secret_key_2026",
        {
            expiresIn: "7d",
        }
    );

    return {
        token,
        user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
        },
    };
}

/* ==========================================================
   Register Customer/User (With Mobile Number)
========================================================== */

export async function registerUser({
    full_name,
    email,
    mobile,
    password,
}) {
    const cleanEmail = email ? email.trim().toLowerCase() : "";
    const cleanMobile = mobile ? mobile.trim() : null;

    // Check existing email
    const existingEmailUser = await findUserByEmail(cleanEmail);
    if (existingEmailUser) {
        throw new Error("An account with this email address already exists.");
    }

    // Check existing mobile if provided
    if (cleanMobile) {
        const existingMobileUser = await findUserByMobile(cleanMobile);
        if (existingMobileUser) {
            throw new Error("An account with this mobile number already exists.");
        }
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const userId = await createUser({
        full_name: full_name?.trim(),
        email: cleanEmail,
        mobile: cleanMobile,
        password: hashedPassword,
        role: "USER",
    });

    const user = await findUserById(userId);

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET || "finverse_default_jwt_secret_key_2026",
        {
            expiresIn: "7d",
        }
    );

    return {
        token,
        user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
        },
    };
}

/* ==========================================================
   Send 2FA OTP Service (Requires Registered User in Database)
========================================================== */

export async function send2FAOtpService({ identifier, recoveryMethod }) {
    if (!identifier || !identifier.trim()) {
        throw new Error("Please enter your registered email address or mobile number.");
    }

    const cleanId = identifier.trim();

    // 1. Strict Requirement: Verify User exists in DB
    const user = await findUserByEmailOrMobile(cleanId);
    if (!user) {
        throw new Error("No registered account found with this email or mobile number. Please check your input or register a new account.");
    }

    if (!user.is_active) {
        throw new Error("Your account is currently inactive.");
    }

    // 2. Generate 6-digit Security OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 Minutes Validity

    otpStore.set(cleanId.toLowerCase(), { otp, expiresAt, userId: user.id });
    if (user.email) {
        otpStore.set(user.email.toLowerCase(), { otp, expiresAt, userId: user.id });
    }

    // 3. Dispatch OTP to user's registered email inbox via Nodemailer
    const targetEmail = user.email;
    const transporter = createEmailTransporter();
    let emailSent = false;

    if (transporter) {
        try {
            const senderAddress = process.env.SMTP_FROM || (process.env.SMTP_USER ? `"FINVERSE Security Gateway" <${process.env.SMTP_USER}>` : `"FINVERSE Security Gateway" <noreply@finverse.com>`);
            await transporter.sendMail({
                from: senderAddress,
                to: targetEmail,
                subject: `🔒 FINVERSE 2FA Security OTP Code: ${otp}`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8fafc; color: #0f172a;">
                        <h2 style="color: #2563eb;">FINVERSE Financial Operating System</h2>
                        <p style="font-size: 14px;">Hello ${user.full_name},</p>
                        <p style="font-size: 14px;">Your 2FA Security Verification Code is:</p>
                        <div style="font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #059669; padding: 12px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; display: inline-block; margin: 10px 0;">
                            ${otp}
                        </div>
                        <p style="font-size: 12px; color: #64748b;">This code will expire in 5 minutes. Do not share this OTP with anyone.</p>
                    </div>
                `,
            });
            emailSent = true;
            console.log(`✉️ Real 2FA OTP Email sent via SMTP to ${targetEmail}`);
        } catch (emailErr) {
            console.error("❌ Failed to send SMTP email:", emailErr.message);
        }
    }

    console.log(`\n==================================================`);
    console.log(`✉️ [2FA OTP DISPATCHED TO USER MAILBOX]`);
    console.log(`Target User  : ${user.full_name}`);
    console.log(`Target Email : ${targetEmail}`);
    console.log(`Security OTP : ${otp}`);
    console.log(`Real Email Sent : ${emailSent ? "YES (via SMTP)" : "DEV LOG (Set SMTP_USER & SMTP_PASS in .env for live inbox delivery)"}`);
    console.log(`==================================================\n`);

    return {
        success: true,
        message: emailSent
            ? `2FA Security OTP Code sent to your email inbox (${targetEmail}). Please check your inbox.`
            : `2FA Security OTP Code dispatched for ${targetEmail}. (Check backend terminal or enter code below for Dev Testing)`,
        email: targetEmail,
        devOtp: emailSent ? null : otp, // Auto-helper for dev mode if SMTP isn't set up yet
    };
}

/* ==========================================================
   Verify 2FA OTP Service & Issue Auth Token
========================================================== */

export async function verify2FAOtpService({ identifier, otp }) {
    if (!identifier || !identifier.trim()) {
        throw new Error("Identifier is required.");
    }
    if (!otp || !otp.trim()) {
        throw new Error("Please enter the 6-digit 2FA OTP code.");
    }

    const cleanId = identifier.trim().toLowerCase();

    // Look up by email/mobile in DB to get user cleanId
    const dbUser = await findUserByEmailOrMobile(cleanId);
    if (!dbUser) {
        throw new Error("No registered account found.");
    }

    const userEmailKey = dbUser.email.toLowerCase();
    const storedData = otpStore.get(userEmailKey) || otpStore.get(cleanId);

    if (!storedData) {
        throw new Error("No 2FA OTP requested for this account, or the code has expired. Please click 'Send 2FA OTP Code' again.");
    }

    if (Date.now() > storedData.expiresAt) {
        otpStore.delete(userEmailKey);
        otpStore.delete(cleanId);
        throw new Error("2FA OTP code has expired. Please request a new code.");
    }

    if (storedData.otp !== otp.trim()) {
        throw new Error("Invalid 2FA OTP code. Please enter the correct code.");
    }

    // OTP Verified successfully! Remove from store
    otpStore.delete(userEmailKey);
    otpStore.delete(cleanId);

    const user = await findUserById(storedData.userId);
    if (!user) {
        throw new Error("User account not found.");
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET || "finverse_default_jwt_secret_key_2026",
        {
            expiresIn: "7d",
        }
    );

    return {
        token,
        user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
        },
    };
}

/* ==========================================================
   Update User Profile & Password
========================================================== */

export async function updateUserProfileService(userId, { full_name, mobile, password, current_password }) {
    let hashedPassword = null;

    if (password && password.trim().length > 0) {
        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters long.");
        }

        if (current_password) {
            const userWithPass = await findUserWithPasswordById(userId);
            if (userWithPass && userWithPass.password) {
                const isMatch = await bcrypt.compare(current_password, userWithPass.password);
                if (!isMatch) {
                    throw new Error("Current password is incorrect.");
                }
            }
        }

        hashedPassword = await bcrypt.hash(password.trim(), 12);
    }

    await updateUserProfileInDb(userId, {
        full_name: full_name?.trim(),
        mobile: mobile?.trim() || null,
        password: hashedPassword,
    });

    return await findUserById(userId);
}

/* ==========================================================
   Reset Password Service (2FA Verified)
========================================================== */

export async function resetPasswordByEmailService(email, newPassword) {
    if (!email || !email.trim()) {
        throw new Error("Email address is required.");
    }
    if (!newPassword || newPassword.trim().length < 6) {
        throw new Error("New password must be at least 6 characters long.");
    }

    const user = await findUserByEmail(email.trim());
    if (!user) {
        throw new Error("No account found matching specified credentials.");
    }

    const hashedPassword = await bcrypt.hash(newPassword.trim(), 12);
    await updateUserPasswordByEmailInDb(email.trim(), hashedPassword);

    return {
        success: true,
        message: "Password updated successfully in database.",
        email: user.email,
    };
}