/**
 * ==========================================================
 * FINVERSE AI
 * Loan Verification Status
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/components/LoanVerificationStatus.jsx
 *
 * Responsibility:
 * - Display verification status
 * - Display verification progress
 * - Display verification remarks
 *
 * ==========================================================
 */

function LoanVerificationStatus({
    verification = {},
    loading = false
}) {

    if (loading) {

        return (
            <div
                className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                    shadow-sm
                "
            >

                <div className="animate-pulse space-y-5">

                    <div className="h-5 w-44 rounded bg-slate-200" />

                    <div className="h-10 w-32 rounded bg-slate-200" />

                    <div className="h-4 w-full rounded bg-slate-200" />

                </div>

            </div>
        );

    }


    const status =
        String(
            verification.status ??
            verification.verification_status ??
            "PENDING"
        )
            .trim()
            .toUpperCase();


    const remarks =
        verification.remarks ??
        verification.notes ??
        null;


    const statusConfig = {

        PENDING: {
            label: "Pending",
            className:
                "border-amber-200 bg-amber-50 text-amber-700"
        },

        IN_PROGRESS: {
            label: "In Progress",
            className:
                "border-blue-200 bg-blue-50 text-blue-700"
        },

        VERIFIED: {
            label: "Verified",
            className:
                "border-emerald-200 bg-emerald-50 text-emerald-700"
        },

        REJECTED: {
            label: "Rejected",
            className:
                "border-red-200 bg-red-50 text-red-700"
        },

        REQUIRES_REVIEW: {
            label: "Requires Review",
            className:
                "border-orange-200 bg-orange-50 text-orange-700"
        }

    };


    const config =
        statusConfig[status] || {

            label:
                status.replaceAll("_", " "),

            className:
                "border-slate-200 bg-slate-50 text-slate-600"

        };


    return (
        <div
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
            "
        >

            <div>

                <p
                    className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-blue-600
                    "
                >
                    Verification
                </p>

                <h2
                    className="
                        mt-1
                        text-xl
                        font-bold
                        text-slate-900
                    "
                >
                    Loan Verification
                </h2>

            </div>


            <div className="mt-6">

                <span
                    className={`
                        inline-flex
                        rounded-full
                        border
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        ${config.className}
                    `}
                >
                    {config.label}
                </span>

            </div>


            {verification.verified_at && (

                <div className="mt-5">

                    <p className="text-xs text-slate-500">
                        Verified At
                    </p>

                    <p
                        className="
                            mt-1
                            text-sm
                            font-semibold
                            text-slate-900
                        "
                    >
                        {new Date(
                            verification.verified_at
                        ).toLocaleString("en-IN")}
                    </p>

                </div>

            )}


            {remarks && (

                <div
                    className="
                        mt-5
                        rounded-xl
                        bg-slate-50
                        p-4
                    "
                >

                    <p
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wider
                            text-slate-500
                        "
                    >
                        Remarks
                    </p>

                    <p
                        className="
                            mt-2
                            text-sm
                            leading-6
                            text-slate-700
                        "
                    >
                        {remarks}
                    </p>

                </div>

            )}

        </div>
    );

}


export default LoanVerificationStatus;

