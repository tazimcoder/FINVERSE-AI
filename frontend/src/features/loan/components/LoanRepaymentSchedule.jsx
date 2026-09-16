/**
 * ==========================================================
 * FINVERSE AI
 * Loan Property Card Component
 * ==========================================================
 *
 * Responsibility:
 *
 * - Display property information
 * - Show property value
 * - Show property type
 * - Show property address
 * - Show ownership information
 *
 * ==========================================================
 */

function LoanPropertyCard({
    property,
    onClick
}) {

    // ======================================================
    // Empty Safety
    // ======================================================

    if (!property) {
        return null;
    }


    // ======================================================
    // Format Currency
    // ======================================================

    const formatCurrency = (value) => {

        if (
            value === undefined ||
            value === null
        ) {
            return "Not available";
        }

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0
            }
        ).format(
            Number(value)
        );

    };


    // ======================================================
    // Property Value
    // ======================================================

    const propertyValue =
        property.property_value ??
        property.market_value ??
        property.estimated_value ??
        property.valuation_amount;


    // ======================================================
    // Property Type
    // ======================================================

    const propertyType =
        property.property_type ??
        "Property";


    // ======================================================
    // Address
    // ======================================================

    const addressParts = [

        property.address_line1,

        property.address_line2,

        property.locality,

        property.city,

        property.district,

        property.state,

        property.postal_code

    ].filter(Boolean);


    const propertyAddress =
        addressParts.join(", ") ||
        "Address not available";


    return (
        <button
            type="button"
            onClick={() =>
                onClick?.(
                    property
                )
            }
            className="w-full rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
        >

            {/* ==================================================
                Header
            ================================================== */}

            <div className="flex items-start justify-between gap-4">

                <div>

                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                        Loan Property
                    </p>

                    <h3 className="mt-2 text-lg font-bold text-slate-900">

                        {property.property_name ??
                            propertyType}

                    </h3>

                </div>


                <div className="rounded-xl bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">

                    {propertyType}

                </div>

            </div>


            {/* ==================================================
                Property Value
            ================================================== */}

            <div className="mt-6">

                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Property Value
                </p>

                <p className="mt-1 text-2xl font-extrabold text-slate-900">

                    {formatCurrency(
                        propertyValue
                    )}

                </p>

            </div>


            {/* ==================================================
                Address
            ================================================== */}

            <div className="mt-6 rounded-xl bg-slate-50 p-4">

                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Property Address
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">

                    {propertyAddress}

                </p>

            </div>


            {/* ==================================================
                Footer
            ================================================== */}

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">

                <div>

                    <p className="text-xs text-slate-400">
                        Ownership
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">

                        {property.ownership_type ??
                            property.ownership_status ??
                            "Not specified"}

                    </p>

                </div>


                <span className="text-sm font-bold text-blue-600">

                    View Details →

                </span>

            </div>

        </button>
    );

}


export default LoanPropertyCard;