/**
 * ==========================================================
 * FINVERSE AI
 * Recent Transactions
 * ==========================================================
 */

import {
    FaArrowDown,
    FaArrowUp,
    FaReceipt,
} from "react-icons/fa";


function RecentTransactions({ transactions = [] }) {

    /* ==========================================================
       EMPTY STATE
    ========================================================== */

    if (transactions.length === 0) {

        return (

            <div
                className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    shadow-sm
                "
            >

                <div
                    className="
                        border-b
                        border-slate-100
                        px-6
                        py-5
                    "
                >

                    <p
                        className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.16em]
                            text-blue-600
                        "
                    >
                        Activity
                    </p>

                    <h2
                        className="
                            mt-1
                            text-xl
                            font-bold
                            tracking-tight
                            text-slate-900
                        "
                    >
                        Recent Transactions
                    </h2>

                </div>


                <div
                    className="
                        flex
                        min-h-[220px]
                        flex-col
                        items-center
                        justify-center
                        px-6
                        text-center
                    "
                >

                    <div
                        className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-slate-100
                            text-slate-400
                        "
                    >

                        <FaReceipt className="text-xl" />

                    </div>


                    <h3
                        className="
                            mt-4
                            text-sm
                            font-bold
                            text-slate-800
                        "
                    >
                        No Transactions Found
                    </h3>


                    <p
                        className="
                            mt-2
                            text-sm
                            text-slate-400
                        "
                    >
                        Your recent financial activity will appear here.
                    </p>

                </div>

            </div>

        );

    }


    return (

        <div
            className="
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:shadow-lg
            "
        >

            {/* ==================================================
                HEADER
            ================================================== */}

            <div
                className="
                    flex
                    flex-col
                    gap-3
                    border-b
                    border-slate-100
                    px-6
                    py-5
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >

                <div>

                    <p
                        className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.16em]
                            text-blue-600
                        "
                    >
                        Activity
                    </p>

                    <h2
                        className="
                            mt-1
                            text-xl
                            font-bold
                            tracking-tight
                            text-slate-900
                        "
                    >
                        Recent Transactions
                    </h2>

                    <p
                        className="
                            mt-1
                            text-sm
                            text-slate-500
                        "
                    >
                        Your latest financial activity.
                    </p>

                </div>


                <div
                    className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        bg-slate-100
                        text-slate-500
                    "
                >

                    <FaReceipt />

                </div>

            </div>


            {/* ==================================================
                TRANSACTIONS
            ================================================== */}

            <div>

                {

                    transactions.map(
                        (transaction) => {

                            const isIncome =
                                transaction.type === "INCOME";


                            const amount =
                                Number(
                                    transaction.amount || 0
                                );


                            const date =
                                transaction.transaction_date
                                    ? new Date(
                                        transaction.transaction_date
                                    ).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )
                                    : "-";


                            return (

                                <div
                                    key={transaction.id}
                                    className="
                                        group
                                        flex
                                        flex-col
                                        gap-4
                                        border-b
                                        border-slate-100
                                        px-6
                                        py-5
                                        transition
                                        last:border-b-0
                                        hover:bg-slate-50/70
                                        sm:flex-row
                                        sm:items-center
                                        sm:justify-between
                                    "
                                >

                                    {/* LEFT */}

                                    <div
                                        className="
                                            flex
                                            min-w-0
                                            items-center
                                            gap-4
                                        "
                                    >

                                        {/* ICON */}

                                        <div
                                            className={`
                                                flex
                                                h-11
                                                w-11
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-xl

                                                ${isIncome
                                                    ? "bg-emerald-50 text-emerald-600"
                                                    : "bg-red-50 text-red-600"
                                                }
                                            `}
                                        >

                                            {

                                                isIncome

                                                    ? (
                                                        <FaArrowDown />
                                                    )

                                                    : (
                                                        <FaArrowUp />
                                                    )

                                            }

                                        </div>


                                        {/* DETAILS */}

                                        <div
                                            className="
                                                min-w-0
                                            "
                                        >

                                            <h3
                                                className="
                                                    truncate
                                                    text-sm
                                                    font-bold
                                                    text-slate-800
                                                "
                                            >
                                                {
                                                    transaction.category ||
                                                    "Transaction"
                                                }
                                            </h3>


                                            <p
                                                className="
                                                    mt-1
                                                    truncate
                                                    text-xs
                                                    text-slate-400
                                                "
                                            >
                                                {
                                                    transaction.description ||
                                                    "No Description"
                                                }
                                            </p>


                                            <p
                                                className="
                                                    mt-1.5
                                                    text-[11px]
                                                    font-medium
                                                    text-slate-400
                                                "
                                            >
                                                {date}
                                            </p>

                                        </div>

                                    </div>


                                    {/* RIGHT */}

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            gap-5
                                            sm:justify-end
                                        "
                                    >

                                        <span
                                            className={`
                                                rounded-full
                                                px-3
                                                py-1
                                                text-[10px]
                                                font-bold
                                                uppercase
                                                tracking-wider

                                                ${isIncome
                                                    ? "bg-emerald-50 text-emerald-600"
                                                    : "bg-red-50 text-red-600"
                                                }
                                            `}
                                        >
                                            {
                                                isIncome
                                                    ? "Income"
                                                    : "Expense"
                                            }
                                        </span>


                                        <p
                                            className={`
                                                whitespace-nowrap
                                                text-sm
                                                font-extrabold

                                                ${isIncome
                                                    ? "text-emerald-600"
                                                    : "text-red-600"
                                                }
                                            `}
                                        >

                                            {isIncome
                                                ? "+"
                                                : "-"
                                            }

                                            ₹{" "}

                                            {amount.toLocaleString(
                                                "en-IN"
                                            )}

                                        </p>

                                    </div>

                                </div>

                            );

                        }

                    )

                }

            </div>

        </div>

    );

}


export default RecentTransactions;