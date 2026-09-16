/**
 * ==========================================================
 * FINVERSE AI
 * Loan Property Card
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/components/LoanPropertyCard.jsx
 *
 * Responsibility:
 *
 * - Display loan property information
 * - Show property value
 * - Show property type
 * - Show property location
 * - Show property verification status
 *
 * ==========================================================
 */

import LoanAmountDisplay
    from "./LoanAmountDisplay";

import LoanStatusBadge
    from "./LoanStatusBadge";


function LoanPropertyCard({
    property,
    onView
}) {

    if (!property) {
        return null;
    }


    const propertyName =
        property.property_name ||
        property.property_type ||
        "Property";


    const location =
        [
            property.city,
            property.state,
            property.country
        ]
            .filter(Boolean)
            .join(", ");


    const valuationAmount =
        property.property_value ??
        property.market_value ??
        property.estimated_value;


    const verificationStatus =
        property.verification_status ||
        property.status;


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
                        Loan Property
                    </p>


                    <h3
                        className="
                            mt-1
                            text-lg
                            font-bold
                            text-slate-900
                        "
                    >
                        {propertyName}
                    </h3>


                    {location && (
                        <p
                            className="
                                mt-1
                                text-sm
                                text-slate-500
                            "
                        >
                            {location}
                        </p>
                    )}

                </div>


                {verificationStatus && (
                    <LoanStatusBadge
                        status={verificationStatus}
                    />
                )}

            </div>


            <div
                className="
                    mt-5
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                "
            >

                <div
                    className="
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
                        Property Type
                    </p>

                    <p
                        className="
                            mt-1
                            font-semibold
                            text-slate-900
                        "
                    >
                        {property.property_type || "—"}
                    </p>

                </div>


                <div
                    className="
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
                        Property Value
                    </p>

                    <div className="mt-1">

                        <LoanAmountDisplay
                            amount={valuationAmount}
                        />

                    </div>

                </div>

            </div>


            {onView && (

                <button
                    type="button"
                    onClick={() =>
                        onView(property)
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
                    View Property Details →
                </button>

            )}

        </article>
    );

}


export default LoanPropertyCard;

