/**
 * ==========================================================
 * FINVERSE AI
 * Budget Card
 * ==========================================================
 */

import { deleteBudgetService } from "../services/budgetService";


function BudgetCard({ budget, reload }) {


    /* ======================================================
       Month Name
    ====================================================== */

    const monthName = new Date(

        budget.year,

        budget.month - 1

    ).toLocaleString(

        "default",

        {
            month: "long",
        }

    );


    /* ======================================================
       Budget Amount
    ====================================================== */

    const budgetAmount = Number(

        budget.budget_amount || 0

    );


    /* ======================================================
       Delete Budget
    ====================================================== */

    async function handleDelete() {


        const confirmDelete = window.confirm(

            `Are you sure you want to delete the ${monthName} ${budget.year} budget?`

        );


        if (!confirmDelete) {

            return;

        }


        try {


            await deleteBudgetService(

                budget.id

            );


            alert(

                "Budget Deleted Successfully ✅"

            );


            reload();


        }

        catch (error) {


            console.error(

                "Delete Budget Error:",

                error

            );


            alert(

                error?.response?.data?.message ||

                "Failed to delete budget"

            );

        }

    }


    /* ======================================================
       UI
    ====================================================== */

    return (

        <div

            className="
                bg-white
                rounded-2xl
                border
                border-slate-200
                shadow-sm
                p-6
                hover:shadow-lg
                transition-all
                duration-300
            "

        >

            <div

                className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-5
                "

            >


                {/* ==========================================
                    Budget Information
                ========================================== */}

                <div>


                    <div className="flex items-center gap-3">

                        <div

                            className="
                                w-11
                                h-11
                                rounded-xl
                                bg-blue-50
                                flex
                                items-center
                                justify-center
                                text-blue-600
                                font-bold
                            "

                        >

                            ₹

                        </div>


                        <div>

                            <h2 className="text-xl font-bold text-slate-800">

                                {monthName} {budget.year}

                            </h2>


                            <p className="text-sm text-slate-500 mt-1">

                                Monthly Budget

                            </p>

                        </div>

                    </div>


                    <div className="mt-5">

                        <p className="text-xs uppercase tracking-wide text-slate-400">

                            Budget Limit

                        </p>


                        <p className="text-sm text-slate-500 mt-1">

                            Your planned spending limit for this month.

                        </p>

                    </div>


                </div>


                {/* ==========================================
                    Amount + Actions
                ========================================== */}

                <div

                    className="
                        sm:text-right
                    "

                >

                    <p className="text-xs uppercase tracking-wide text-slate-400">

                        Budget Amount

                    </p>


                    <p

                        className="
                            text-3xl
                            font-bold
                            text-blue-600
                            mt-1
                        "

                    >

                        ₹ {budgetAmount.toLocaleString("en-IN")}

                    </p>


                    <button

                        type="button"

                        onClick={handleDelete}

                        className="
                            mt-4
                            bg-red-50
                            hover:bg-red-600
                            text-red-600
                            hover:text-white
                            border
                            border-red-200
                            hover:border-red-600
                            font-medium
                            px-4
                            py-2
                            rounded-xl
                            transition-all
                            duration-200
                        "

                    >

                        Delete Budget

                    </button>


                </div>


            </div>


        </div>

    );

}


export default BudgetCard;