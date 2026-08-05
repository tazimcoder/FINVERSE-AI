/**
 * ==========================================================
 * FINVERSE AI
 * Authentication Illustration
 * ----------------------------------------------------------
 * Reusable illustration section for authentication pages.
 * This component will be shown only on large screens.
 * ==========================================================
 */

function AuthIllustration() {
    return (
        <div className="relative flex h-full items-center justify-center">

            {/* Background Glow */}
            <div className="absolute h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"></div>

            {/* Main Card */}
            <div className="relative w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">

                <h2 className="mb-8 text-center text-2xl font-bold text-white">
                    FINVERSE AI
                </h2>

                {/* Fake Dashboard */}
                <div className="space-y-5">

                    {/* Balance */}
                    <div className="rounded-2xl bg-white/10 p-5">
                        <p className="text-sm text-blue-100">
                            Total Balance
                        </p>

                        <h3 className="mt-2 text-3xl font-bold text-white">
                            ₹12,45,890
                        </h3>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">

                        <div className="rounded-xl bg-white/10 p-4">
                            <p className="text-xs text-blue-100">
                                Loans
                            </p>

                            <h4 className="mt-2 text-lg font-semibold text-white">
                                08
                            </h4>
                        </div>

                        <div className="rounded-xl bg-white/10 p-4">
                            <p className="text-xs text-blue-100">
                                Wallet
                            </p>

                            <h4 className="mt-2 text-lg font-semibold text-white">
                                Active
                            </h4>
                        </div>

                    </div>

                    {/* AI Status */}
                    <div className="rounded-xl bg-emerald-500/20 p-4">
                        <p className="text-sm text-emerald-200">
                            🤖 AI Financial Assistant
                        </p>

                        <p className="mt-2 text-white">
                            Monitoring your finances in real time.
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default AuthIllustration;