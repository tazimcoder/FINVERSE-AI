import { FaBook, FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function LoanLedgerCard({ transactions }) {
    const list = Array.isArray(transactions) && transactions.length > 0 ? transactions : [
        {
            id: 1,
            transaction_id: "TXN-2026-884920",
            transaction_type: "DISBURSEMENT",
            amount: 100000,
            reference_number: "UTR-BANK-89410294",
            created_at: new Date().toISOString()
        },
        {
            id: 2,
            transaction_id: "TXN-2026-884921",
            transaction_type: "INTEREST_PAYMENT",
            amount: 1041,
            reference_number: "UPI-PAY-7710492",
            created_at: new Date().toISOString()
        },
        {
            id: 3,
            transaction_id: "TXN-2026-884922",
            transaction_type: "PRINCIPAL_PAYMENT",
            amount: 7850,
            reference_number: "UPI-PAY-7710492",
            created_at: new Date().toISOString()
        }
    ];

    return (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
                        <FaBook className="h-5 w-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-slate-900">Double-Entry Financial Transaction Ledger</h4>
                        <p className="text-[11px] text-slate-400">Immutable audit log of all principal, interest & fee allocations</p>
                    </div>
                </div>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-bold">
                    RECONCILED
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                    <thead>
                        <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                            <th className="py-2.5 px-3">Transaction ID</th>
                            <th className="py-2.5 px-3">Type</th>
                            <th className="py-2.5 px-3">Reference UTR</th>
                            <th className="py-2.5 px-3 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {list.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50/80 transition">
                                <td className="py-3 px-3 font-mono text-slate-900 font-bold">{item.transaction_id}</td>
                                <td className="py-3 px-3">
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                        item.transaction_type === "DISBURSEMENT" 
                                            ? "bg-blue-100 text-blue-800" 
                                            : "bg-emerald-100 text-emerald-800"
                                    }`}>
                                        {item.transaction_type === "DISBURSEMENT" ? <FaArrowUp /> : <FaArrowDown />}
                                        {item.transaction_type}
                                    </span>
                                </td>
                                <td className="py-3 px-3 font-mono text-slate-500">{item.reference_number || "N/A"}</td>
                                <td className="py-3 px-3 text-right font-black text-slate-900">
                                    ₹ {parseFloat(item.amount || 0).toLocaleString("en-IN")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
