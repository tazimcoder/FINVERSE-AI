/**
 * ==========================================================
 * FINVERSE AI
 * Investment Search
 * ==========================================================
 */

import { FaSearch } from "react-icons/fa";

function InvestmentSearch({

    value,

    onChange,

}) {

    return (

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">

            <div className="relative">

                <FaSearch
                    className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                        pointer-events-none
                    "
                />

                <input

                    type="text"

                    placeholder="Search by investment name or type..."

                    value={value}

                    onChange={(event) =>
                        onChange(
                            event.target.value
                        )
                    }

                    className="
                        w-full
                        pl-11
                        pr-4
                        py-3.5
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        text-slate-700
                        placeholder:text-slate-400
                        focus:outline-none
                        focus:bg-white
                        focus:ring-2
                        focus:ring-blue-500/20
                        focus:border-blue-500
                        transition
                        duration-200
                    "

                />

            </div>

        </div>

    );

}

export default InvestmentSearch;