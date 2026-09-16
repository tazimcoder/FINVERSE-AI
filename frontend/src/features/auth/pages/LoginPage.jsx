/**
 * ==========================================================
 * FINVERSE AI
 * Login Page
 * ==========================================================
 */

import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import Logo from "../../../components/common/Logo";
import LoginForm from "../components/LoginForm";

function LoginPage() {
    return (
        <AuthLayout>
            <div className="w-full max-w-md space-y-6">
                {/* Mobile Logo Brand (visible only when left column is hidden on small screens) */}
                <div className="lg:hidden flex justify-center pb-2">
                    <Logo light={true} />
                </div>

                {/* Login Form Container */}
                <LoginForm />
            </div>
        </AuthLayout>
    );
}

export default LoginPage;