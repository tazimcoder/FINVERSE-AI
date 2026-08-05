/**
 * ==========================================================
 * FINVERSE AI
 * Authentication Layout
 * ==========================================================
 */

import AuthBrand from "../../components/auth/AuthBrand";
import AuthIllustration from "../../components/auth/AuthIllustration";
function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-950">
            <div className="grid min-h-screen lg:grid-cols-2">

                {/* Left */}

                <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-950 p-12">

                    <AuthBrand />

                    <AuthIllustration />

                </div>

                {/* Right */}

                <div className="flex items-center justify-center bg-slate-100 p-6">

                    <div className="w-full max-w-md">

                        {children}

                    </div>

                </div>

            </div>
        </div>
    );
}

export default AuthLayout;