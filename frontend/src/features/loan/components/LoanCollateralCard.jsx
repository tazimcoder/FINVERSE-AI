/**
 * ==========================================================
 * FINVERSE AI
 * Loan Collateral Card
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/components/LoanCollateralCard.jsx
 *
 * Responsibility:
 *
 * - Display collateral information
 * - Show collateral type
 * - Show collateral value
 * - Show collateral status
 *
 * ==========================================================
 */

import LoanAmountDisplay
    from "./LoanAmountDisplay";

import LoanStatusBadge
    from "./LoanStatusBadge";


function LoanCollateralCard({
    collateral,
    onView
}) {

    if (!collateral) {
        return null;
    }


    const collateralName =
        collateral.collateral_name ||
        collateral.collateral_type ||
        "Collateral";


    const collateralValue =
        collateral.collateral_value ??
        collateral.market_value ??
        collateral.estimated_value;


    const collateralStatus =
        collateral.status ||
        collateral.verification_status;


    return (
        <article
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
                            font-bold
                            uppercase
                            tracking-wider
                            text-blue-600
                        "
                    >
                        Loan Collateral
                    </p>


                    <h3
                        className="
                            mt-1
                            text-lg
                            font-bold
                            text-slate-900
                        "
                    >
                        {collateralName}
                    </h3>


                    <p
                        className="
                            mt-1
                            text-sm
                            text-slate-500
                        "
                    >
                        {collateral.collateral_type ||
                            "Collateral Asset"}
                    </p>

                </div>


                {collateralStatus && (
                    <LoanStatusBadge
                        status={collateralStatus}
                    />
                )}

            </div>


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
                        font-medium
                        text-slate-500
                    "
                >
                    Estimated Collateral Value
                </p>


                <div className="mt-2">

                    <LoanAmountDisplay
                        amount={collateralValue}
                    />

                </div>

            </div>


            {collateral.description && (

                <p
                    className="
                        mt-4
                        text-sm
                        leading-6
                        text-slate-600
                    "
                >
                    {collateral.description}
                </p>

            )}


            {onView && (

                <button
                    type="button"
                    onClick={() =>
                        onView(collateral)
                    }
                    className="
                        mt-5
                        text-sm
                        font-semibold
                        text-blue-600
                        transition
                        hover:text-blue-700
                    "
                >
                    View Collateral Details →
                </button>

            )}

        </article>
    );

}


export default LoanCollateralCard;

