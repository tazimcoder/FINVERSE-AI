/**
 * ==========================================================
 * FINVERSE AI
 * Loan Status Badge
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/components/LoanStatusBadge.jsx
 *
 * Responsibility:
 * - Display loan status consistently
 * - Support all major loan lifecycle statuses
 * - Provide reusable status styling
 *
 * ==========================================================
 */

function LoanStatusBadge({ status }) {

    const normalizedStatus =
        String(status || "UNKNOWN")
            .trim()
            .toUpperCase();


    const statusConfig = {

        DRAFT: {
            label: "Draft",
            className:
                "bg-slate-100 text-slate-700 border-slate-200"
        },

        SUBMITTED: {
            label: "Submitted",
            className:
                "bg-blue-50 text-blue-700 border-blue-200"
        },

        UNDER_REVIEW: {
            label: "Under Review",
            className:
                "bg-amber-50 text-amber-700 border-amber-200"
        },

        VERIFIED: {
            label: "Verified",
            className:
                "bg-cyan-50 text-cyan-700 border-cyan-200"
        },

        APPROVED: {
            label: "Approved",
            className:
                "bg-emerald-50 text-emerald-700 border-emerald-200"
        },

        OFFERED: {
            label: "Offer Available",
            className:
                "bg-indigo-50 text-indigo-700 border-indigo-200"
        },

        ACCEPTED: {
            label: "Accepted",
            className:
                "bg-green-50 text-green-700 border-green-200"
        },

        DISBURSEMENT_PENDING: {
            label: "Disbursement Pending",
            className:
                "bg-orange-50 text-orange-700 border-orange-200"
        },

        DISBURSED: {
            label: "Disbursed",
            className:
                "bg-teal-50 text-teal-700 border-teal-200"
        },

        ACTIVE: {
            label: "Active",
            className:
                "bg-green-50 text-green-700 border-green-200"
        },

        COMPLETED: {
            label: "Completed",
            className:
                "bg-emerald-50 text-emerald-700 border-emerald-200"
        },

        CLOSED: {
            label: "Closed",
            className:
                "bg-slate-100 text-slate-700 border-slate-200"
        },

        REJECTED: {
            label: "Rejected",
            className:
                "bg-red-50 text-red-700 border-red-200"
        },

        CANCELLED: {
            label: "Cancelled",
            className:
                "bg-red-50 text-red-700 border-red-200"
        },

        DEFAULT: {
            label: normalizedStatus
                .replaceAll("_", " "),
            className:
                "bg-slate-100 text-slate-700 border-slate-200"
        }

    };


    const config =
        statusConfig[normalizedStatus] ||
        statusConfig.DEFAULT;


    return (
        <span
            className={`
                inline-flex
                items-center
                rounded-full
                border
                px-3
                py-1
                text-xs
                font-semibold
                ${config.className}
            `}
        >
            <span
                className="
                    mr-2
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-current
                "
            />

            {config.label}

        </span>
    );

}


export default LoanStatusBadge;

