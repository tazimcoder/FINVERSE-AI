/**
 * ==========================================================
 * FINVERSE
 * Registration Hook (Includes Mobile Number Support)
 * ==========================================================
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { registerService } from "../services/authService";
import validateRegisterForm from "../validations/registerSchema";

function useRegister() {
    const navigate = useNavigate();
    const { login } = useAuth();

    // Form State
    const [full_name, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    // UI State
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Submit Registration
    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({});
        setServerError("");

        // Client-side Validation
        const validation = validateRegisterForm({
            full_name,
            email,
            password,
            confirm_password,
            acceptedTerms,
        });

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        try {
            setLoading(true);

            const response = await registerService({
                full_name: full_name.trim(),
                email: email.trim().toLowerCase(),
                mobile: mobile ? mobile.trim() : null,
                password,
            });

            if (response?.token && response?.user) {
                login({
                    token: response.token,
                    user: response.user,
                });

                navigate("/dashboard", { replace: true });
                return;
            }

            setServerError("Account was created, but the login session could not be started.");
        } catch (error) {
            console.error("REGISTRATION ERROR =>", error);
            setServerError(
                error.response?.data?.message ||
                "Unable to create your account. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        // Form values
        full_name,
        email,
        mobile,
        password,
        confirm_password,
        acceptedTerms,

        // Form setters
        setFullName,
        setEmail,
        setMobile,
        setPassword,
        setConfirmPassword,
        setAcceptedTerms,

        // UI state
        loading,
        errors,
        serverError,

        // Password visibility
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,

        // Actions
        handleSubmit,
    };
}

export default useRegister;