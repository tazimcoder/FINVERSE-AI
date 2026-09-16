/**
 * ==========================================================
 * FINVERSE AI
 * Budget Form
 * ==========================================================
 */

import { useState } from "react";

import {
    createBudgetService,
} from "../services/budgetService";


function BudgetForm({ reload }) {

    const currentDate = new Date();


    const [formData, setFormData] = useState({

        month: currentDate.getMonth() + 1,

        year: currentDate.getFullYear(),

        budget_amount: "",

    });


    /* ======================================================
       Handle Input Change
    ====================================================== */

    function handleChange(e) {

        const {
            name,
            value,
        } = e.target;


        setFormData((previous) => ({

            ...previous,

            [name]:
                name === "budget_amount"
                    ? value
                    : Number(value),

        }));

    }


    /* ======================================================
       Submit Budget
    ====================================================== */

    async function handleSubmit(e) {

        e.preventDefault();


        if (!formData.budget_amount) {

            alert("Please enter budget amount.");

            return;

        }


        try {

            await createBudgetService(
                formData
            );


            alert(
                "Budget Added Successfully ✅"
            );


            setFormData({

                month:
                    currentDate.getMonth() + 1,

                year:
                    currentDate.getFullYear(),

                budget_amount: "",

            });


            reload();

        }

        catch (error) {

            console.error(
                "Create Budget Error:",
                error
            );


            alert(
                error?.response?.data?.message ||
                "Failed to Add Budget"
            );

        }

    }


    /* ======================================================
       UI
    ====================================================== */

    return (

        <form

            onSubmit={handleSubmit}

            className="
                bg-white
                rounded-2xl
                shadow-sm
                border
                border-slate-200
                p-6
                mb-8
            "

        >

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-slate-800">

                    Add Monthly Budget

                </h2>


                <p className="text-sm text-slate-500 mt-1">

                    Set a spending limit for your selected month.

                </p>

            </div>


            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-4
                "
            >

                {/* ===============================
                    Month
                =============================== */}

                <div>

                    <label className="block text-sm font-medium text-slate-700 mb-2">

                        Month

                    </label>


                    <select

                        name="month"

                        className="
                            w-full
                            border
                            border-slate-300
                            rounded-xl
                            p-3
                            bg-white
                            outline-none
                            transition
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                        "

                        value={formData.month}

                        onChange={handleChange}

                    >

                        {

                            [

                                "January",
                                "February",
                                "March",
                                "April",
                                "May",
                                "June",
                                "July",
                                "August",
                                "September",
                                "October",
                                "November",
                                "December",

                            ].map((month, index) => (

                                <option

                                    key={index}

                                    value={index + 1}

                                >

                                    {month}

                                </option>

                            ))

                        }

                    </select>

                </div>


                {/* ===============================
                    Year
                =============================== */}

                <div>

                    <label className="block text-sm font-medium text-slate-700 mb-2">

                        Year

                    </label>


                    <input

                        type="number"

                        name="year"

                        min="2000"

                        max="2100"

                        className="
                            w-full
                            border
                            border-slate-300
                            rounded-xl
                            p-3
                            outline-none
                            transition
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                        "

                        value={formData.year}

                        onChange={handleChange}

                    />

                </div>


                {/* ===============================
                    Budget Amount
                =============================== */}

                <div>

                    <label className="block text-sm font-medium text-slate-700 mb-2">

                        Budget Amount

                    </label>


                    <input

                        type="number"

                        name="budget_amount"

                        min="0"

                        step="0.01"

                        placeholder="₹ 50,000"

                        className="
                            w-full
                            border
                            border-slate-300
                            rounded-xl
                            p-3
                            outline-none
                            transition
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                        "

                        value={
                            formData.budget_amount
                        }

                        onChange={handleChange}

                    />

                </div>

            </div>


            {/* ===============================
                Submit
            =============================== */}

            <button

                type="submit"

                className="
                    mt-6
                    bg-blue-600
                    hover:bg-blue-700
                    active:bg-blue-800
                    text-white
                    font-semibold
                    px-6
                    py-3
                    rounded-xl
                    transition-all
                    duration-200
                    shadow-sm
                    hover:shadow-md
                "

            >

                Save Budget

            </button>

        </form>

    );

}


export default BudgetForm;