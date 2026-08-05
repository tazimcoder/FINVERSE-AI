/**
 * ==========================================================
 * FINVERSE AI
 * Authentication Hook
 * ==========================================================
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";
import { loginService } from "../services/authService";

function useLogin() {

    const navigate = useNavigate();

    const { login } = useAuth();

    // ------------------------------------
    // Form State
    // ------------------------------------

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    // ------------------------------------
    // UI State
    // ------------------------------------

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    // ------------------------------------
    // Submit
    // ------------------------------------

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        if (!email.trim()) {

            setError("Please enter your email.");

            return;

        }

        if (!password.trim()) {

            setError("Please enter your password.");

            return;

        }

        try {

            setLoading(true);


            const response = await loginService({

                email,

                password,

            });


            // DEBUG LOGS

            console.log("LOGIN RESPONSE =>", response);

            console.log("TOKEN =>", response.token);



            login({

                token: response.token,

                user: response.user,

            });


            console.log("AUTH CONTEXT UPDATED");


            console.log("Navigating to dashboard...");


            navigate("/dashboard");


        } catch (error) {


            console.error("LOGIN ERROR =>", error);


            setError(

                error.response?.data?.message ||

                "Login Failed"

            );


        } finally {


            setLoading(false);


        }

    };


    // ------------------------------------
    // Return Public API
    // ------------------------------------

    return {

        email,

        password,

        setEmail,

        setPassword,

        showPassword,

        setShowPassword,

        loading,

        error,

        handleSubmit,

    };

}


export default useLogin;