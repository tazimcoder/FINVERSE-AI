/**
 * ==========================================================
 * FINVERSE AI
 * Loan Offer Card
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/components/LoanOfferCard.jsx
 *
 * Responsibility:
 * - Display loan offer
 * - Display offer amount
 * - Display interest and tenure
 * - Support accept / reject actions
 *
 * ==========================================================
 */

import LoanAmountDisplay
    from "./LoanAmountDisplay.jsx";


function LoanOfferCard({
    offer = {},
    onAccept,
    onReject,
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

                    <div className="h-5 w-36 rounded bg-slate-200" />

                    <div className="h-8 w-44 rounded bg-slate-200" />

                    <div className="h-4 w-full rounded bg-slate-200" />

                    <div className="h-10 w-full rounded-xl bg-slate-200" />

                </div>

            </div>
        );

    }


    const status =
        String(
            offer.status ??
            offer.offer_status ??
            "PENDING"
        ).toUpperCase();


    const amount =
        offer.offered_amount ??
        offer.approved_amount ??
        offer.loan_amount ??
        null;


    const interestRate =
        offer.interest_rate ??
        offer.offered_interest_rate ??
        null;


    const tenure =
        offer.tenure_months ??
        offer.offered_tenure_months ??
        null;


    const processingFee =
        offer.processing_fee ??
        offer.processing_fee_value ??
        null;


    const isPending =
        status === "PENDING" ||
        status === "ACTIVE";


    return (
        <div
            className="
                overflow-hidden
                rounded-2xl
                border
                border-blue-200
                bg-white
                shadow-sm
            "
        >

            <div
                className="
                    bg-blue-600
                    px-6
                    py-5
                    text-white
                "
            >

                <p
                    className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-blue-100
                    "
                >
                    FINVERSE AI
                </p>

                <h2
                    className="
                        mt-1
                        text-xl
                        font-bold
                    "
                >
                    Your Loan Offer
                </h2>

            </div>


            <div className="p-6">

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-4
                    "
                >

                    <div>

                        <p className="text-xs text-slate-500">
                            Offered Amount
                        </p>

                        <div className="mt-1 text-2xl">
                            <LoanAmountDisplay
                                amount={amount}
                            />
                        </div>

                    </div>


                    <span
                        className="
                            rounded-full
                            border
                            border-blue-200
                            bg-blue-50
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            text-blue-700
                        "
                    >
                        {status.replaceAll("_", " ")}
                    </span>

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
                            Interest Rate
                        </p>

                        <p
                            className="
                                mt-1
                                text-sm
                                font-semibold
                                text-slate-900
                            "
                        >
                            {interestRate !== null
                                ? `${interestRate}%`
                                : "—"
                            }
                        </p>

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
                            Processing Fee
                        </p>

                        <p
                            className="
                                mt-1
                                text-sm
                                font-semibold
                                text-slate-900
                            "
                        >
                            {processingFee !== null
                                ? processingFee
                                : "—"
                            }
                        </p>

                    </div>

                </div>


                {isPending &&
                    (onAccept || onReject) && (

                        <div
                            className="
                            mt-6
                            flex
                            flex-col
                            gap-3
                            border-t
                            border-slate-100
                            pt-5
                            sm:flex-row
                        "
                        >

                            {onAccept && (

                                <button
                                    type="button"
                                    onClick={() =>
                                        onAccept(offer)
                                    }
                                    className="
                                    flex-1
                                    rounded-xl
                                    bg-emerald-600
                                    px-4
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-white
                                    transition
                                    hover:bg-emerald-700
                                "
                                >
                                    Accept Offer
                                </button>

                            )}


                            {onReject && (

                                <button
                                    type="button"
                                    onClick={() =>
                                        onReject(offer)
                                    }
                                    className="
                                    flex-1
                                    rounded-xl
                                    border
                                    border-red-200
                                    bg-red-50
                                    px-4
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-red-700
                                    transition
                                    hover:bg-red-100
                                "
                                >
                                    Reject Offer
                                </button>

                            )}

                        </div>

                    )}

            </div>

        </div>
    );

}


export default LoanOfferCard;

