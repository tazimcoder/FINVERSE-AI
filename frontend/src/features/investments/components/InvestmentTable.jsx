/**
 * ==========================================================
 * FINVERSE AI
 * Investment Table
 * ==========================================================
 */

import InvestmentTableRow from "./InvestmentTableRow";

import InvestmentEmpty from "./InvestmentEmpty";

function InvestmentTable({

    investments,

    loading,

    onEdit,

    onDelete,

}) {

    /* ==========================================================
       Loading State
    ========================================================== */

    if (loading) {

        return (

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">

                <div className="flex items-center gap-3">

                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />

                    <p className="text-slate-500">
                        Loading Investments...
                    </p>

                </div>

            </div>

        );

    }


    /* ==========================================================
       Empty State
    ========================================================== */

    if (!investments.length) {

        return <InvestmentEmpty />;

    }


    /* ==========================================================
       Investment Table
    ========================================================== */

    return (

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

            {/* ==================================================
               Table Header
            ================================================== */}

            <div className="px-6 py-5 border-b border-slate-100">

                <div className="flex items-center justify-between">

                    <div>

                        <h2 className="text-xl font-bold text-slate-800">
                            Investments
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                            Manage and track your investments.
                        </p>

                    </div>

                    <div className="text-sm text-slate-500">

                        {investments.length}{" "}

                        {investments.length === 1
                            ? "Investment"
                            : "Investments"
                        }

                    </div>

                </div>

            </div>


            {/* ==================================================
               Table
            ================================================== */}

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-slate-50 border-b border-slate-100">

                        <tr>

                            <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Investment
                            </th>

                            <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Type
                            </th>

                            <th className="text-right px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Invested
                            </th>

                            <th className="text-right px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Current
                            </th>

                            <th className="text-right px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Profit
                            </th>

                            <th className="text-right px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                ROI
                            </th>

                            <th className="text-right px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Quantity
                            </th>

                            <th className="text-center px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Purchase Date
                            </th>

                            <th className="text-center px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Action
                            </th>

                        </tr>

                    </thead>


                    {/* ==================================================
                       Table Body
                    ================================================== */}

                    <tbody className="divide-y divide-slate-100">

                        {

                            investments.map(

                                (investment) => (

                                    <InvestmentTableRow

                                        key={investment.id}

                                        investment={investment}

                                        onEdit={onEdit}

                                        onDelete={onDelete}

                                    />

                                )

                            )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default InvestmentTable;