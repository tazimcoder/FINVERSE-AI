/**
 * ==========================================================
 * FINVERSE AI
 * Login Page
 * ----------------------------------------------------------
 * Responsibility:
 * - Render Login Screen
 * - Use Authentication Layout
 * - Show Logo
 * - Render Login Form
 * ==========================================================
 */

import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import Logo from "../../../components/common/Logo";
import LoginForm from "../components/LoginForm";

function LoginPage() {
    return (
        <AuthLayout>

            <div className="w-full max-w-md">

                {/* Logo */}

                <div className="mb-8 flex justify-center">

                    <Logo />

                </div>

                {/* Login Form */}

                <LoginForm />

            </div>

        </AuthLayout>
    );
}

export default LoginPage;