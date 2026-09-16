/**
 * ==========================================================
 * FINVERSE AI
 * Authentication Illustration
 * ==========================================================
 *
 * Responsibility:
 * - Visual branding for authentication pages
 * - Product feature showcase
 * - No real user/account data
 * - No fake financial balances or statistics
 *
 * IMPORTANT:
 * This component must remain reusable for:
 * - Login
 * - Register
 * - Forgot Password
 * - Future authentication screens
 * ==========================================================
 */

function AuthIllustration() {

    return (

        <div className="relative flex w-full max-w-xl items-center justify-center">

            {/* ==================================================
                Background Glow
            ================================================== */}

            <div className="absolute h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />


            {/* ==================================================
                Main Product Card
            ================================================== */}

            <div className="relative w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">

                {/* ==================================================
                    Brand
                ================================================== */}

                <div className="mb-8 text-center">

                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold text-white shadow-lg">

                        F

                    </div>

                    <h2 className="text-2xl font-bold text-white">
                        FINVERSE AI
                    </h2>

                    <p className="mt-2 text-sm text-blue-100">
                        Global Financial Operating System
                    </p>

                </div>


                {/* ==================================================
                    Product Description
                ================================================== */}

                <div className="mb-6 rounded-2xl border border-white/10 bg-white/10 p-5">

                    <p className="text-sm leading-6 text-blue-50">

                        One intelligent platform for managing
                        banking, loans, wallet, investments,
                        analytics and financial decisions.

                    </p>

                </div>


                {/* ==================================================
                    Platform Features
                ================================================== */}

                <div className="space-y-3">

                    {/* Banking */}

                    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-lg">

                            🏦

                        </div>

                        <div>

                            <h3 className="font-semibold text-white">
                                Digital Banking
                            </h3>

                            <p className="text-xs text-blue-100">
                                Manage your financial accounts
                            </p>

                        </div>

                    </div>


                    {/* Loans */}

                    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-lg">

                            💳

                        </div>

                        <div>

                            <h3 className="font-semibold text-white">
                                Smart Loans
                            </h3>

                            <p className="text-xs text-blue-100">
                                Explore personalized financing
                            </p>

                        </div>

                    </div>


                    {/* Investments */}

                    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/20 text-lg">

                            📈

                        </div>

                        <div>

                            <h3 className="font-semibold text-white">
                                Investments
                            </h3>

                            <p className="text-xs text-blue-100">
                                Understand and manage investments
                            </p>

                        </div>

                    </div>


                    {/* AI */}

                    <div className="flex items-center gap-4 rounded-xl border border-emerald-300/10 bg-emerald-500/10 p-4">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-400/20 text-lg">

                            🤖

                        </div>

                        <div>

                            <h3 className="font-semibold text-white">
                                AI Financial Assistant
                            </h3>

                            <p className="text-xs text-emerald-100">
                                Intelligent financial guidance
                            </p>

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    Security Message
                ================================================== */}

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-blue-100">

                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/20">

                        ✓

                    </span>

                    Secure authentication & protected access

                </div>

            </div>

        </div>

    );

}

export default AuthIllustration;