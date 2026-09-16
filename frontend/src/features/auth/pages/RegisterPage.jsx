/**
 * ==========================================================
 * FINVERSE AI
 * Register Page
 * ==========================================================
 */

import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import Logo from "../../../components/common/Logo";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
    return (
        <AuthLayout>
            <div className="w-full max-w-md space-y-6">
                {/* Mobile Logo Brand */}
                <div className="lg:hidden flex justify-center pb-2">
                    <Logo light={true} />
                </div>

                {/* Registration Form */}
                <RegisterForm />
            </div>
        </AuthLayout>
    );
}

export default RegisterPage;