/**
 * ==========================================================
 * FINVERSE AI
 * Loan Amount Display
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/components/LoanAmountDisplay.jsx
 *
 * Responsibility:
 * - Display loan amounts consistently
 * - Support Indian Rupee formatting
 * - Handle invalid / missing values safely
 *
 * ==========================================================
 */

function LoanAmountDisplay({
    amount,
    currency = "INR",
    compact = false
}) {

    const numericAmount =
        Number(amount);


    if (!Number.isFinite(numericAmount)) {

        return (
            <span className="text-slate-400">
                —
            </span>
        );

    }


    let formattedAmount;


    try {

        formattedAmount =
            new Intl.NumberFormat(
                "en-IN",
                {
                    style: "currency",
                    currency,
                    maximumFractionDigits:
                        compact ? 1 : 2
                }
            ).format(numericAmount);

    }

    catch {

        formattedAmount =
            `${currency} ${numericAmount.toLocaleString(
                "en-IN"
            )}`;

    }


    if (!compact) {

        return (
            <span className="font-semibold text-slate-900">
                {formattedAmount}
            </span>
        );

    }


    const absoluteAmount =
        Math.abs(numericAmount);


    let compactValue;


    if (absoluteAmount >= 10000000) {

        compactValue =
            `₹${(numericAmount / 10000000).toFixed(1)} Cr`;

    }

    else if (absoluteAmount >= 100000) {

        compactValue =
            `₹${(numericAmount / 100000).toFixed(1)} L`;

    }

    else if (absoluteAmount >= 1000) {

        compactValue =
            `₹${(numericAmount / 1000).toFixed(1)} K`;

    }

    else {

        compactValue =
            formattedAmount;

    }


    return (
        <span className="font-semibold text-slate-900">
            {compactValue}
        </span>
    );

}


export default LoanAmountDisplay;

