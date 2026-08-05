/**
 * ==========================================================
 * FINVERSE AI
 * Auth Brand Component
 * ----------------------------------------------------------
 * Reusable branding section for all authentication pages.
 * ==========================================================
 */

import Logo from "../common/Logo";

function AuthBrand() {
    return (
        <div className="flex flex-col justify-center h-full text-white">
            {/* Logo */}
            <Logo />

            {/* Heading */}
            <h1 className="mt-8 text-5xl font-bold leading-tight">
                Global Financial
                <br />
                Operating System
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg text-blue-100 leading-8">
                One platform for Banking, Loans, Wallet, Investments,
                AI Financial Assistant, Business Finance,
                Analytics and much more.
            </p>

            {/* Feature List */}
            <div className="mt-10 space-y-4">

                <div className="flex items-center gap-3">
                    <span>✅</span>
                    <span>AI Financial Assistant</span>
                </div>

                <div className="flex items-center gap-3">
                    <span>✅</span>
                    <span>Secure Digital Banking</span>
                </div>

                <div className="flex items-center gap-3">
                    <span>✅</span>
                    <span>Smart Loan Marketplace</span>
                </div>

                <div className="flex items-center gap-3">
                    <span>✅</span>
                    <span>Personal & Business Finance</span>
                </div>

            </div>
        </div>
    );
}

export default AuthBrand;