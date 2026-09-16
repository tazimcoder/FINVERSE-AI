/**
 * ==========================================================
 * FINVERSE AI
 * Loan Application Card
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/components/LoanApplicationCard.jsx
 *
 * Responsibility:
 * - Display loan application summary
 * - Display applicant and loan information
 * - Provide reusable application card UI
 *
 * ==========================================================
 */

import LoanAmountDisplay
    from "./LoanAmountDisplay.jsx";

import LoanStatusBadge
    from "./LoanStatusBadge.jsx";


function LoanApplicationCard({
    application = {},
    onView,
    onContinue
}) {

    const applicationId =
        application.id ??
        application.loan_application_id ??
        "—";

    const applicantName =
        application.full_name ??
        application.applicant_name ??
        application.name ??
        "Applicant";

    const productName =
        application.product_name ??
        application.loan_product_name ??
        application.loan_type ??
        "Loan";

    const requestedAmount =
        application.requested_amount ??
        application.loan_amount ??
        application.amount ??
        null;

    const tenure =
        application.tenure_months ??
        application.tenure ??
        null;

    const status =
        application.status ??
        application.application_status ??
        "UNKNOWN";


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
                        Application #{applicationId}
                    </p>

                    <h3
                        className="
                            mt-1
                            text-lg
                            font-bold
                            text-slate-900
                        "
                    >
                        {productName}
                    </h3>

                    <p
                        className="
                            mt-1
                            text-sm
                            text-slate-500
                        "
                    >
                        {applicantName}
                    </p>

                </div>


                <LoanStatusBadge
                    status={status}
                />

            </div>


            <div
                className="
                    mt-6
                    grid
                    gap-4
                    sm:grid-cols-3
                "
            >

                <div>

                    <p className="text-xs text-slate-500">
                        Requested Amount
                    </p>

                    <div className="mt-1">
                        <LoanAmountDisplay
                            amount={requestedAmount}
                        />
                    </div>

                </div>


                <div>

                    <p className="text-xs text-slate-500">
                        Tenure
                    </p>

                    <p
                        className="
                            mt-1
                            text-sm
                            font-semibold
                            text-slate-900
                        "
                    >
                        {tenure !== null
                            ? `${tenure} months`
                            : "—"
                        }
                    </p>

                </div>


                <div>

                    <p className="text-xs text-slate-500">
                        Submitted
                    </p>

                    <p
                        className="
                            mt-1
                            text-sm
                            font-semibold
                            text-slate-900
                        "
                    >
                        {application.created_at
                            ? new Date(
                                application.created_at
                            ).toLocaleDateString(
                                "en-IN"
                            )
                            : "—"
                        }
                    </p>

                </div>

            </div>


            {(onView || onContinue) && (

                <div
                    className="
                        mt-6
                        flex
                        flex-wrap
                        gap-3
                        border-t
                        border-slate-100
                        pt-4
                    "
                >

                    {onView && (

                        <button
                            type="button"
                            onClick={() =>
                                onView(application)
                            }
                            className="
                                rounded-xl
                                border
                                border-slate-300
                                px-4
                                py-2
                                text-sm
                                font-semibold
                                text-slate-700
                                transition
                                hover:bg-slate-50
                            "
                        >
                            View Details
                        </button>

                    )}


                    {onContinue && (

                        <button
                            type="button"
                            onClick={() =>
                                onContinue(application)
                            }
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
                            Continue
                        </button>

                    )}

                </div>

            )}

        </div>
    );

}


export default LoanApplicationCard;

