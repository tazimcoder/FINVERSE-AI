/**
 * ==========================================================
 * FINVERSE AI
 * Investment Table Row
 * ==========================================================
 */

import {
    FaEdit,
    FaTrash,
} from "react-icons/fa";

function InvestmentTableRow({

    investment,

    onEdit,

    onDelete,

}) {

    const invested = Number(
        investment.invested_amount ?? 0
    );

    const current = Number(
        investment.current_value ?? 0
    );

    const quantity = Number(
        investment.quantity ?? 0
    );

    const profit = current - invested;

    const roi =
        invested === 0
            ? 0
            : (profit / invested) * 100;


    /* ==========================================================
       Currency Formatter
    ========================================================== */

    const formatCurrency = (value) => {

        return `₹ ${Number(
            value ?? 0
        ).toLocaleString("en-IN")}`;

    };


    /* ==========================================================
       Date Formatter
    ========================================================== */

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(
            date
        ).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );

    };


    return (

        <tr
            className="
                border-t
                border-slate-100
                hover:bg-slate-50
                transition
                duration-200
            "
        >

            {/* ==================================================
               Investment
            ================================================== */}

            <td className="px-6 py-5">

                <div className="min-w-[180px]">

                    <h3 className="font-semibold text-slate-800">

                        {investment.name}

                    </h3>

                    {

                        investment.notes && (

                            <p className="text-xs text-slate-400 mt-1 max-w-[220px] truncate">

                                {investment.notes}

                            </p>

                        )

                    }

                </div>

            </td>


            {/* ==================================================
               Type
            ================================================== */}

            <td className="px-6 py-5">

                <span
                    className="
                        inline-flex
                        items-center
                        px-3
                        py-1.5
                        rounded-full
                        text-xs
                        font-semibold
                        bg-blue-50
                        text-blue-700
                        border
                        border-blue-100
                    "
                >

                    {investment.type}

                </span>

            </td>


            {/* ==================================================
               Invested
            ================================================== */}

            <td className="px-6 py-5 text-right whitespace-nowrap">

                <span className="font-medium text-slate-700">

                    {formatCurrency(
                        invested
                    )}

                </span>

            </td>


            {/* ==================================================
               Current
            ================================================== */}

            <td className="px-6 py-5 text-right whitespace-nowrap">

                <span className="font-semibold text-slate-800">

                    {formatCurrency(
                        current
                    )}

                </span>

            </td>


            {/* ==================================================
               Profit / Loss
            ================================================== */}

            <td
                className={`
                    px-6
                    py-5
                    text-right
                    whitespace-nowrap
                    font-semibold
                    ${profit >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                `}
            >

                <div className="flex items-center justify-end gap-1">

                    <span>

                        {profit >= 0
                            ? "+"
                            : "-"
                        }

                    </span>

                    <span>

                        {formatCurrency(
                            Math.abs(profit)
                        )}

                    </span>

                </div>

            </td>


            {/* ==================================================
               ROI
            ================================================== */}

            <td
                className={`
                    px-6
                    py-5
                    text-right
                    whitespace-nowrap
                    font-semibold
                    ${roi >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                `}
            >

                {roi >= 0
                    ? "+"
                    : "-"
                }

                {Math.abs(
                    roi
                ).toFixed(2)}

                %

            </td>


            {/* ==================================================
               Quantity
            ================================================== */}

            <td className="px-6 py-5 text-right whitespace-nowrap">

                <span className="text-slate-700">

                    {quantity}

                </span>

            </td>


            {/* ==================================================
               Purchase Date
            ================================================== */}

            <td className="px-6 py-5 text-center whitespace-nowrap">

                <span className="text-sm text-slate-600">

                    {formatDate(
                        investment.purchase_date
                    )}

                </span>

            </td>


            {/* ==================================================
               Actions
            ================================================== */}

            <td className="px-6 py-5">

                <div className="flex justify-center items-center gap-2">

                    {/* Edit */}

                    <button

                        type="button"

                        onClick={() =>
                            onEdit(
                                investment
                            )
                        }

                        className="
                            w-9
                            h-9
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            text-blue-600
                            bg-blue-50
                            hover:bg-blue-100
                            hover:text-blue-700
                            transition
                        "

                        title="Edit Investment"

                    >

                        <FaEdit />

                    </button>


                    {/* Delete */}

                    <button

                        type="button"

                        onClick={() =>
                            onDelete(
                                investment.id
                            )
                        }

                        className="
                            w-9
                            h-9
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            text-red-600
                            bg-red-50
                            hover:bg-red-100
                            hover:text-red-700
                            transition
                        "

                        title="Delete Investment"

                    >

                        <FaTrash />

                    </button>

                </div>

            </td>

        </tr>

    );

}

export default InvestmentTableRow;