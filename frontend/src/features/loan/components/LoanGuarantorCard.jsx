/**
 * ==========================================================
 * FINVERSE AI
 * Loan Guarantor Card
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/components/LoanGuarantorCard.jsx
 *
 * Responsibility:
 *
 * - Display loan guarantor information
 * - Display guarantor status
 * - Display verification status
 * - Display consent status
 * - Display contact information
 * - Provide optional action callbacks
 *
 * ==========================================================
 */

import LoanStatusBadge from "./LoanStatusBadge";


function LoanGuarantorCard({
    guarantor,
    onView,
    onEdit,
    onDelete,
}) {

    if (!guarantor) {
        return null;
    }


    // ======================================================
    // FORMAT DATE
    // ======================================================

    function formatDate(value) {

        if (!value) {
            return "Not available";
        }

        const date =
            new Date(value);


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return "Not available";
        }


        return new Intl.DateTimeFormat(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        ).format(
            date
        );

    }


    // ======================================================
    // STATUS LABEL
    // ======================================================

    function formatStatus(value) {

        if (!value) {
            return "PENDING";
        }

        return String(value)
            .replaceAll("_", " ");

    }


    // ======================================================
    // RENDER
    // ======================================================

    return (

        <div
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition
                hover:shadow-md
            "
        >

            {/* ============================================== */}
            {/* HEADER */}
            {/* ============================================== */}

            <div
                className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-start
                    sm:justify-between
                "
            >

                <div>

                    <p
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wider
                            text-slate-400
                        "
                    >
                        Loan Guarantor
                    </p>


                    <h3
                        className="
                            mt-1
                            text-lg
                            font-bold
                            text-slate-900
                        "
                    >
                        {guarantor.full_name ||
                            "Unnamed Guarantor"}
                    </h3>


                    {guarantor.relationship_with_applicant && (

                        <p
                            className="
                                mt-1
                                text-sm
                                text-slate-500
                            "
                        >
                            {
                                guarantor.relationship_with_applicant
                            }
                        </p>

                    )}

                </div>


                <LoanStatusBadge
                    status={
                        guarantor.guarantor_status ||
                        "PENDING"
                    }
                />

            </div>


            {/* ============================================== */}
            {/* CONTACT DETAILS */}
            {/* ============================================== */}

            <div
                className="
                    mt-5
                    grid
                    gap-4
                    border-t
                    border-slate-100
                    pt-5
                    sm:grid-cols-2
                "
            >

                <div>

                    <p
                        className="
                            text-xs
                            font-medium
                            text-slate-400
                        "
                    >
                        Email
                    </p>


                    <p
                        className="
                            mt-1
                            break-all
                            text-sm
                            font-medium
                            text-slate-700
                        "
                    >
                        {guarantor.email ||
                            "Not provided"}
                    </p>

                </div>


                <div>

                    <p
                        className="
                            text-xs
                            font-medium
                            text-slate-400
                        "
                    >
                        Phone
                    </p>


                    <p
                        className="
                            mt-1
                            text-sm
                            font-medium
                            text-slate-700
                        "
                    >
                        {guarantor.phone ||
                            "Not provided"}
                    </p>

                </div>

            </div>


            {/* ============================================== */}
            {/* STATUS DETAILS */}
            {/* ============================================== */}

            <div
                className="
                    mt-5
                    grid
                    gap-3
                    sm:grid-cols-2
                    lg:grid-cols-3
                "
            >

                {/* Verification */}

                <div
                    className="
                        rounded-xl
                        bg-slate-50
                        p-3
                    "
                >

                    <p
                        className="
                            text-xs
                            font-medium
                            text-slate-500
                        "
                    >
                        Verification
                    </p>


                    <p
                        className="
                            mt-1
                            text-sm
                            font-bold
                            text-slate-800
                        "
                    >
                        {
                            formatStatus(
                                guarantor.verification_status
                            )
                        }
                    </p>

                </div>


                {/* Consent */}

                <div
                    className="
                        rounded-xl
                        bg-slate-50
                        p-3
                    "
                >

                    <p
                        className="
                            text-xs
                            font-medium
                            text-slate-500
                        "
                    >
                        Consent
                    </p>


                    <p
                        className="
                            mt-1
                            text-sm
                            font-bold
                            text-slate-800
                        "
                    >
                        {
                            formatStatus(
                                guarantor.consent_status
                            )
                        }
                    </p>

                </div>


                {/* Consent Date */}

                <div
                    className="
                        rounded-xl
                        bg-slate-50
                        p-3
                    "
                >

                    <p
                        className="
                            text-xs
                            font-medium
                            text-slate-500
                        "
                    >
                        Consent Date
                    </p>


                    <p
                        className="
                            mt-1
                            text-sm
                            font-bold
                            text-slate-800
                        "
                    >
                        {
                            formatDate(
                                guarantor.consent_at
                            )
                        }
                    </p>

                </div>

            </div>


            {/* ============================================== */}
            {/* OPTIONAL DETAILS */}
            {/* ============================================== */}

            {
                (
                    guarantor.occupation ||
                    guarantor.employer_name ||
                    guarantor.monthly_income
                ) && (

                    <div
                        className="
                            mt-5
                            border-t
                            border-slate-100
                            pt-5
                        "
                    >

                        <p
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-slate-400
                            "
                        >
                            Employment Information
                        </p>


                        <div
                            className="
                                mt-3
                                grid
                                gap-3
                                sm:grid-cols-3
                            "
                        >

                            <div>

                                <p
                                    className="
                                        text-xs
                                        text-slate-500
                                    "
                                >
                                    Occupation
                                </p>


                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        font-medium
                                        text-slate-800
                                    "
                                >
                                    {
                                        guarantor.occupation ||
                                        "Not available"
                                    }
                                </p>

                            </div>


                            <div>

                                <p
                                    className="
                                        text-xs
                                        text-slate-500
                                    "
                                >
                                    Employer
                                </p>


                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        font-medium
                                        text-slate-800
                                    "
                                >
                                    {
                                        guarantor.employer_name ||
                                        "Not available"
                                    }
                                </p>

                            </div>


                            <div>

                                <p
                                    className="
                                        text-xs
                                        text-slate-500
                                    "
                                >
                                    Monthly Income
                                </p>


                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        font-medium
                                        text-slate-800
                                    "
                                >
                                    {
                                        guarantor.monthly_income
                                            ? new Intl.NumberFormat(
                                                "en-IN",
                                                {
                                                    style: "currency",
                                                    currency: "INR",
                                                    maximumFractionDigits: 0,
                                                }
                                            ).format(
                                                Number(
                                                    guarantor.monthly_income
                                                )
                                            )
                                            : "Not available"
                                    }
                                </p>

                            </div>

                        </div>

                    </div>

                )
            }


            {/* ============================================== */}
            {/* ACTIONS */}
            {/* ============================================== */}

            {
                (
                    onView ||
                    onEdit ||
                    onDelete
                ) && (

                    <div
                        className="
                            mt-5
                            flex
                            flex-wrap
                            gap-3
                            border-t
                            border-slate-100
                            pt-5
                        "
                    >

                        {
                            typeof onView === "function" && (

                                <button
                                    type="button"

                                    onClick={() => {

                                        onView(
                                            guarantor
                                        );

                                    }}

                                    className="
                                        rounded-xl
                                        bg-slate-100
                                        px-4
                                        py-2
                                        text-sm
                                        font-semibold
                                        text-slate-700
                                        transition
                                        hover:bg-slate-200
                                    "
                                >
                                    View
                                </button>

                            )
                        }


                        {
                            typeof onEdit === "function" && (

                                <button
                                    type="button"

                                    onClick={() => {

                                        onEdit(
                                            guarantor
                                        );

                                    }}

                                    className="
                                        rounded-xl
                                        bg-blue-600
                                        px-4
                                        py-2
                                        text-sm
                                        font-semibold
                                        text-white
                                        transition
                                        hover:bg-blue-700
                                    "
                                >
                                    Edit
                                </button>

                            )
                        }


                        {
                            typeof onDelete === "function" && (

                                <button
                                    type="button"

                                    onClick={() => {

                                        onDelete(
                                            guarantor
                                        );

                                    }}

                                    className="
                                        rounded-xl
                                        bg-red-50
                                        px-4
                                        py-2
                                        text-sm
                                        font-semibold
                                        text-red-600
                                        transition
                                        hover:bg-red-100
                                    "
                                >
                                    Delete
                                </button>

                            )
                        }

                    </div>

                )
            }

        </div>

    );

}


export default LoanGuarantorCard;

