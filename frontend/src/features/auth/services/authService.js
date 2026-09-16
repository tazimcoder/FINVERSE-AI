/**
 * ==========================================================
 * FINVERSE
 * Authentication Service
 * ==========================================================
 */

import {
    loginApi,
    registerApi,
    sendOtpApi,
    verifyOtpApi
} from "../api/authApi";

// Login
export const loginService = async (credentials) => {
    const response = await loginApi(credentials);
    return response.data;
};

// Register
export const registerService = async (userData) => {
    const response = await registerApi(userData);
    return response.data;
};

// Send OTP
export const sendOtpService = async (otpData) => {
    const response = await sendOtpApi(otpData);
    return response.data;
};

// Verify OTP
export const verifyOtpService = async (otpData) => {
    const response = await verifyOtpApi(otpData);
    return response.data;
};