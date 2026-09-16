/**
 * ==========================================================
 * FINVERSE AI
 * Loan Product Card
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/components/LoanProductCard.jsx
 *
 * Responsibility:
 * - Display loan product information
 * - Show amount and tenure ranges
 * - Show interest rate range
 * - Support product selection
 *
 * ==========================================================
 */

import LoanAmountDisplay
    from "./LoanAmountDisplay.jsx";


function LoanProductCard({
    product = {},
    onSelect,
    onView
}) {

    const productName =
        product.product_name ??
        product.name ??
        "Loan Product";

    const productCode =
        product.product_code ??
        product.code ??
        "—";

    const category =
        product.loan_category ??
        product.category ??
        "OTHER";

    const minAmount =
        product.min_amount;

    const maxAmount =
        product.max_amount;

    const minTenure =
        product.min_tenure_months;

    const maxTenure =
        product.max_tenure_months;

    const minInterest =
        product.min_interest_rate;

    const maxInterest =
        product.max_interest_rate;

    const status =
        String(
            product.status || "ACTIVE"
        ).toUpperCase();


    const inactive =
        status !== "ACTIVE";


    return (
        <div
            className="
                flex
                h-full
                flex-col
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:shadow-md
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
                            font-bold
                            uppercase
                            tracking-wider
                            text-blue-600
                        "
                    >
                        {category}
                    </p>

                    <h3
                        className="
                            mt-1
                            text-xl
                            font-bold
                            text-slate-900
                        "
                    >
                        {productName}
                    </h3>

                    <p
                        className="
                            mt-1
                            text-xs
                            text-slate-400
                        "
                    >
                        {productCode}
                    </p>

                </div>


                <span
                    className={`
                        rounded-full
                        border
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        ${status === "ACTIVE"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : status === "COMING_SOON"
                                ? "border-amber-200 bg-amber-50 text-amber-700"
                                : "border-slate-200 bg-slate-50 text-slate-500"
                        }
                    `}
                >
                    {status.replaceAll("_", " ")}
                </span>

            </div>


            <div
                className="
                    mt-6
                    grid
                    grid-cols-2
                    gap-4
                "
            >

                <div>

                    <p className="text-xs text-slate-500">
                        Amount Range
                    </p>

                    <div
                        className="
                            mt-1
                            text-sm
                        "
                    >
                        <LoanAmountDisplay
                            amount={minAmount}
                            compact
                        />

                        <span className="mx-1 text-slate-400">
                            –
                        </span>

                        <LoanAmountDisplay
                            amount={maxAmount}
                            compact
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
                        {minTenure != null &&
                            maxTenure != null
                            ? `${minTenure}–${maxTenure} months`
                            : "Flexible"
                        }
                    </p>

                </div>


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
                        {minInterest != null &&
                            maxInterest != null
                            ? `${minInterest}% – ${maxInterest}%`
                            : "As applicable"
                        }
                    </p>

                </div>


                <div>

                    <p className="text-xs text-slate-500">
                        Property
                    </p>

                    <p
                        className="
                            mt-1
                            text-sm
                            font-semibold
                            text-slate-900
                        "
                    >
                        {product.requires_property === "YES"
                            ? "Required"
                            : "Not Required"
                        }
                    </p>

                </div>

            </div>


            <div
                className="
                    mt-auto
                    flex
                    flex-wrap
                    gap-3
                    border-t
                    border-slate-100
                    pt-6
                "
            >

                {onView && (

                    <button
                        type="button"
                        onClick={() =>
                            onView(product)
                        }
                        className="
                            flex-1
                            rounded-xl
                            border
                            border-slate-300
                            px-4
                            py-2.5
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


                {onSelect && (

                    <button
                        type="button"
                        disabled={inactive}
                        onClick={() =>
                            onSelect(product)
                        }
                        className="
                            flex-1
                            rounded-xl
                            bg-blue-600
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-blue-700
                            disabled:cursor-not-allowed
                            disabled:bg-slate-300
                        "
                    >
                        {inactive
                            ? "Unavailable"
                            : "Select Product"
                        }
                    </button>

                )}

            </div>

        </div>
    );

}


export default LoanProductCard;

