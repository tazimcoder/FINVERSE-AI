/**
 * ==========================================================
 * FINVERSE AI
 * Investment Empty State
 * ==========================================================
 */

import { FaChartPie } from "react-icons/fa";


function InvestmentEmpty() {

    return (

        <div
            className="
                w-full
                bg-white
                rounded-2xl
                border
                border-slate-100
                shadow-sm
                px-6
                py-14
                sm:px-10
                text-center
            "
        >

            {/* Icon */}

            <div
                className="
                    w-20
                    h-20
                    rounded-full
                    bg-blue-50
                    mx-auto
                    flex
                    items-center
                    justify-center
                    mb-6
                "
            >

                <FaChartPie
                    className="
                        text-4xl
                        text-blue-600
                    "
                />

            </div>

            {/* Heading */}

            <h2
                className="
                    text-2xl
                    font-bold
                    text-slate-800
                "
            >
                No Investments Found
            </h2>

            {/* Description */}

            <p
                className="
                    max-w-md
                    mx-auto
                    text-slate-500
                    mt-3
                    leading-6
                "
            >
                Start building your investment portfolio
                by adding your first investment.
            </p>

        </div>

    );

}

export default InvestmentEmpty;