/**
 * ==========================================================
 * FINVERSE AI
 * Register Page
 * ==========================================================
 */

import { useState } from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import api from "../../services/api";


function Register() {

    const navigate = useNavigate();


    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });


    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    // ========================================================
    // Input Handler
    // ========================================================

    function handleChange(event) {

        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

    }


    // ========================================================
    // Submit
    // ========================================================

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");

        setSuccess("");


        if (
            form.password !==
            form.confirmPassword
        ) {

            setError(
                "Passwords do not match."
            );

            return;
        }


        setLoading(true);


        try {

            const response =
                await api.post(
                    "/auth/register",
                    {
                        name: form.name,
                        email: form.email,
                        password: form.password,
                    }
                );


            const data =
                response.data;


            if (!data?.success) {

                throw new Error(
                    data?.message ||
                    "Registration failed."
                );

            }


            setSuccess(
                "Account created successfully."
            );


            // ------------------------------------------------
            // If backend directly returns token
            // ------------------------------------------------

            if (data.token) {

                localStorage.setItem(
                    "token",
                    data.token
                );

                navigate("/dashboard");

                return;
            }


            // ------------------------------------------------
            // Otherwise login page
            // ------------------------------------------------

            setTimeout(() => {

                navigate("/login");

            }, 1000);

        }

        catch (err) {

            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Unable to create account."
            );

        }

        finally {

            setLoading(false);

        }

    }


    return (

        <main
            className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-slate-50
                px-6
                py-12
            "
        >

            <div
                className="
                    w-full
                    max-w-md
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-8
                    shadow-xl
                "
            >

                {/* Header */}

                <div className="mb-7 text-center">

                    <div
                        className="
                            mx-auto
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-blue-600
                            text-2xl
                            font-bold
                            text-white
                        "
                    >
                        F
                    </div>


                    <h1
                        className="
                            mt-5
                            text-2xl
                            font-extrabold
                            text-slate-900
                        "
                    >
                        Create Account
                    </h1>


                    <p
                        className="
                            mt-2
                            text-sm
                            text-slate-500
                        "
                    >
                        Start managing your finances with
                        FINVERSE AI.
                    </p>

                </div>


                {/* Error */}

                {error && (

                    <div
                        className="
                            mb-4
                            rounded-xl
                            border
                            border-red-200
                            bg-red-50
                            px-4
                            py-3
                            text-sm
                            text-red-600
                        "
                    >
                        {error}
                    </div>

                )}


                {/* Success */}

                {success && (

                    <div
                        className="
                            mb-4
                            rounded-xl
                            border
                            border-emerald-200
                            bg-emerald-50
                            px-4
                            py-3
                            text-sm
                            text-emerald-600
                        "
                    >
                        {success}
                    </div>

                )}


                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    {/* Name */}

                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Full name"
                        required
                        autoComplete="name"
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            px-4
                            py-3
                            outline-none
                            focus:border-blue-500
                            focus:ring-4
                            focus:ring-blue-500/10
                        "
                    />


                    {/* Email */}

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email address"
                        required
                        autoComplete="email"
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            px-4
                            py-3
                            outline-none
                            focus:border-blue-500
                            focus:ring-4
                            focus:ring-blue-500/10
                        "
                    />


                    {/* Password */}

                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        minLength={6}
                        autoComplete="new-password"
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            px-4
                            py-3
                            outline-none
                            focus:border-blue-500
                            focus:ring-4
                            focus:ring-blue-500/10
                        "
                    />


                    {/* Confirm Password */}

                    <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        required
                        minLength={6}
                        autoComplete="new-password"
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            px-4
                            py-3
                            outline-none
                            focus:border-blue-500
                            focus:ring-4
                            focus:ring-blue-500/10
                        "
                    />


                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            rounded-xl
                            bg-blue-600
                            px-4
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:bg-blue-700
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >
                        {loading
                            ? "Creating account..."
                            : "Create Account"}
                    </button>

                </form>


                <p
                    className="
                        mt-6
                        text-center
                        text-sm
                        text-slate-500
                    "
                >
                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="
                            font-semibold
                            text-blue-600
                        "
                    >
                        Login
                    </Link>

                </p>

            </div>

        </main>

    );
}


export default Register;