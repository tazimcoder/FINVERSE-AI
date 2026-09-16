/**
 * ==========================================================
 * FINVERSE
 * Authentication API
 * ==========================================================
 */

import api from "../../../services/api";

// Login API
export const loginApi = (credentials) => {
    return api.post("/auth/login", credentials);
};

// Register API
export const registerApi = (userData) => {
    return api.post("/auth/register", userData);
};

// Send 2FA OTP API
export const sendOtpApi = (otpData) => {
    return api.post("/auth/send-otp", otpData);
};

// Verify 2FA OTP API
export const verifyOtpApi = (otpData) => {
    return api.post("/auth/verify-otp", otpData);
};

// Get Current User API
export const getMeApi = () => {
    return api.get("/auth/me");
};