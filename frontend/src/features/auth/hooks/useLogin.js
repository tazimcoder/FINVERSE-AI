/**
 * ==========================================================
 * FINVERSE
 * Authentication Hook with Remembered Email Memory & Backend 2FA OTP Services
 * ==========================================================
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import {
    loginService,
    sendOtpService,
    verifyOtpService
} from "../services/authService";

function useLogin() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [lastEmail, setLastEmail] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // On mount, load last remembered login email from localStorage
    useEffect(() => {
        const savedEmail = localStorage.getItem("finverse_last_email");
        if (savedEmail) {
            setLastEmail(savedEmail);
            setEmail(savedEmail);
        }
    }, []);

    // Standard Password Login
    const handleSubmit = async (event) => {
        if (event) event.preventDefault();
        setError("");

        if (!email.trim()) {
            setError("Please enter your registered email address.");
            return;
        }

        if (!password.trim()) {
            setError("Please enter your password.");
            return;
        }

        try {
            setLoading(true);

            const cleanEmail = email.trim().toLowerCase();
            const response = await loginService({
                email: cleanEmail,
                password,
            });

            localStorage.setItem("finverse_last_email", cleanEmail);

            login({
                token: response.token,
                user: response.user,
            });

            navigate("/dashboard");
        } catch (err) {
            console.error("LOGIN ERROR =>", err);
            setError(
                err.response?.data?.message ||
                "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    };

    // Send 2FA OTP API Request
    const handleSendOtp = async ({ identifier, recoveryMethod }) => {
        setError("");

        if (!identifier || !identifier.trim()) {
            setError(recoveryMethod === "MOBILE" ? "Please enter your registered mobile number." : "Please enter your registered email address.");
            return null;
        }

        try {
            setLoading(true);
            const response = await sendOtpService({
                identifier: identifier.trim(),
                recoveryMethod,
            });

            return response;
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "No registered account found with this email or mobile number."
            );
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Verify 2FA OTP API Request
    const handleVerifyOtp = async ({ identifier, otp }) => {
        setError("");

        if (!identifier || !identifier.trim()) {
            setError("Identifier is required.");
            return;
        }

        if (!otp || !otp.trim()) {
            setError("Please enter the 6-digit 2FA OTP code.");
            return;
        }

        try {
            setLoading(true);
            const response = await verifyOtpService({
                identifier: identifier.trim(),
                otp: otp.trim(),
            });

            if (response?.token && response?.user) {
                localStorage.setItem("finverse_last_email", response.user.email);

                login({
                    token: response.token,
                    user: response.user,
                });

                navigate("/dashboard");
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Invalid 2FA OTP Code."
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        password,
        lastEmail,
        setEmail,
        setPassword,
        showPassword,
        setShowPassword,
        loading,
        error,
        setError,
        handleSubmit,
        handleSendOtp,
        handleVerifyOtp,
    };
}

export default useLogin;