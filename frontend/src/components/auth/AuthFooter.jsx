/**
 * ==========================================================
 * FINVERSE AI
 * Authentication Footer
 * ----------------------------------------------------------
 * Reusable footer for all authentication pages.
 * ==========================================================
 */

function AuthFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="mt-10 text-center text-sm text-slate-400">

            <p>
                © {currentYear} FINVERSE AI. All Rights Reserved.
            </p>

            <div className="mt-3 flex justify-center gap-6">

                <button className="transition hover:text-blue-600">
                    Privacy Policy
                </button>

                <button className="transition hover:text-blue-600">
                    Terms of Service
                </button>

                <button className="transition hover:text-blue-600">
                    Support
                </button>

            </div>

        </div>
    );
}

export default AuthFooter;