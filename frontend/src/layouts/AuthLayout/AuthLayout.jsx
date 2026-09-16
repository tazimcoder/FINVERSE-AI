/**
 * ==========================================================
 * FINVERSE
 * Executive Light Authentication Layout
 * Premium light theme with harmonious gradient Orbs & glass cards
 * ==========================================================
 */

import AuthBrand from "../../components/auth/AuthBrand";

function AuthLayout({ children }) {
    return (
        <div className="relative min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-hidden">
            {/* Ambient Background Mesh & Premium Soft Gradient Orbs */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-blue-300/25 blur-[120px]" />
                <div className="absolute top-1/2 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-200/30 blur-[120px]" />
                <div className="absolute -bottom-40 left-1/3 h-[500px] w-[500px] rounded-full bg-emerald-200/25 blur-[140px]" />
            </div>

            {/* Grid Container */}
            <div className="relative z-10 grid min-h-screen lg:grid-cols-12 max-w-7xl mx-auto">
                {/* Left Column: Brand & Feature Showcase */}
                <div className="hidden lg:flex lg:col-span-6 flex-col justify-between p-8 xl:p-12 border-r border-slate-200/80 bg-white/80 backdrop-blur-xl">
                    <AuthBrand />
                </div>

                {/* Right Column: Premium Auth Form */}
                <div className="col-span-12 lg:col-span-6 flex items-center justify-center p-6 sm:p-10 lg:p-12">
                    <div className="w-full max-w-md">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;