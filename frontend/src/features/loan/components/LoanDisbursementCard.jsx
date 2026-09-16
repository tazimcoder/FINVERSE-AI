import LoanStatusBadge from "./LoanStatusBadge";

function LoanDisbursementCard({
    disbursement,
    onView,
}) {

    if (!disbursement) {
        return null;
    }

    function formatCurrency(value) {

        if (
            value === null ||
            value === undefined
        ) {
            return "Not available";
        }

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
            }
        ).format(
            Number(value)
        );

    }

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
        ).format(date);

    }

    return (

        <div
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
            "
        >

            <div
                className="
                    flex
                    items-start
                    justify-between
                    gap-4
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
                        Loan Disbursement
                    </p>

                    <h3
                        className="
                            mt-1
                            text-xl
                            font-bold
                            text-slate-900
                        "
                    >
                        {
                            formatCurrency(
                                disbursement.disbursement_amount ||
                                disbursement.amount
                            )
                        }
                    </h3>

                </div>

                <LoanStatusBadge
                    status={
                        disbursement.status ||
                        "PENDING"
                    }
                />

            </div>


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

                    <p className="text-xs text-slate-500">
                        Disbursement Date
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                        {
                            formatDate(
                                disbursement.disbursement_date ||
                                disbursement.disbursed_at
                            )
                        }
                    </p>

                </div>


                <div>

                    <p className="text-xs text-slate-500">
                        Payment Method
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                        {
                            disbursement.payment_method ||
                            "Not available"
                        }
                    </p>

                </div>


                <div>

                    <p className="text-xs text-slate-500">
                        Reference Number
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                        {
                            disbursement.transaction_reference ||
                            disbursement.reference_number ||
                            "Not available"
                        }
                    </p>

                </div>


                <div>

                    <p className="text-xs text-slate-500">
                        Notes
                    </p>

                    <p className="mt-1 text-sm text-slate-700">
                        {
                            disbursement.notes ||
                            "No notes available"
                        }
                    </p>

                </div>

            </div>


            {
                typeof onView === "function" && (

                    <div
                        className="
                            mt-5
                            border-t
                            border-slate-100
                            pt-5
                        "
                    >

                        <button
                            type="button"
                            onClick={() => onView(disbursement)}
                            className="
                                rounded-xl
                                bg-slate-100
                                px-4
                                py-2
                                text-sm
                                font-semibold
                                text-slate-700
                            "
                        >
                            View Details
                        </button>

                    </div>

                )
            }

        </div>

    );

}

export default LoanDisbursementCard;

