/**
 * ==========================================================
 * FINVERSE AI
 * Recent Transactions Table
 * ==========================================================
 */

import TableCard from "./TableCard";

import { recentTransactions } from "../../../data/transactionData";

function RecentTransactions() {

    return (

        <TableCard title="Recent Transactions">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b border-slate-200">

                            <th className="py-3 text-left text-sm font-semibold text-slate-600">
                                Title
                            </th>

                            <th className="py-3 text-left text-sm font-semibold text-slate-600">
                                Type
                            </th>

                            <th className="py-3 text-right text-sm font-semibold text-slate-600">
                                Amount
                            </th>

                            <th className="py-3 text-right text-sm font-semibold text-slate-600">
                                Date
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {recentTransactions.map((transaction) => (

                            <tr
                                key={transaction.id}
                                className="border-b border-slate-100 hover:bg-slate-50 transition"
                            >

                                <td className="py-4 font-medium text-slate-700">
                                    {transaction.title}
                                </td>

                                <td className="py-4 text-slate-500">
                                    {transaction.type}
                                </td>

                                <td
                                    className={`py-4 text-right font-semibold ${transaction.amount.startsWith("+")
                                            ? "text-green-600"
                                            : "text-red-600"
                                        }`}
                                >
                                    {transaction.amount}
                                </td>

                                <td className="py-4 text-right text-slate-500">
                                    {transaction.date}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </TableCard>

    );

}

export default RecentTransactions;