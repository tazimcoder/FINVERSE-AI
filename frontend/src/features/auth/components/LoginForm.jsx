/**
 * ==========================================================
 * FINVERSE AI
 * Login Form
 * ==========================================================
 */

import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import useLogin from "../hooks/useLogin";

function LoginForm() {

    const {
        email,
        password,

        setEmail,
        setPassword,

        showPassword,
        setShowPassword,

        handleSubmit,

        loading,

        error,

    } = useLogin();

    return (

        <Card>

            <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
            >

                {/* Heading */}

                <div>

                    <h2 className="text-3xl font-bold text-slate-800">
                        Welcome Back
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Sign in to continue using FINVERSE AI
                    </p>

                </div>

                {/* Global Error */}

                {error && (

                    <div className="rounded-lg bg-red-100 border border-red-300 p-3 text-sm text-red-600">

                        {error}

                    </div>

                )}

                {/* Email */}

                <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password */}

                <div>

                    <Input
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="button"
                        className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "Hide Password" : "Show Password"}
                    </button>

                </div>

                {/* Remember */}

                <div className="flex items-center justify-between">

                    <label className="flex items-center gap-2">

                        <input type="checkbox" />

                        <span className="text-sm">

                            Remember Me

                        </span>

                    </label>

                    <button
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-700"
                    >
                        Forgot Password?
                    </button>

                </div>

                {/* Submit */}

                <Button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Signing In..." : "Sign In"}
                </Button>

            </form>

        </Card>

    );

}

export default LoginForm;