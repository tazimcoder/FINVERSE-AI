import { FaFileInvoice, FaCheckCircle, FaPercent } from "react-icons/fa";

export default function LoanKfsCard({ kfs, onAccept }) {
    const data = kfs || {
        id: "DEFAULT-KFS-1",
        kfs_number: "KFS-2026-981042",
        sanctioned_amount: 150000,
        interest_rate: 11.5,
        apr: 12.85,
        tenure_months: 24,
        emi_amount: 7025,
        total_interest: 18600,
        processing_fee: 1500,
        documentation_fee: 500,
        insurance_charge: 1000,
        total_repayment: 168600,
        penal_charge_rules: "2% per month on overdue EMI principal",
        foreclosure_terms: "3% foreclosure fee on outstanding principal balance",
        status: "GENERATED"
    };

    const isAccepted = data.status === "ACCEPTED";

    return (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-6 shadow-xl border border-slate-700/60 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-600/30 rounded-2xl border border-blue-400/30 text-blue-400">
                        <FaFileInvoice className="h-5 w-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold tracking-tight">Key Facts Statement (KFS)</h4>
                        <p className="text-[11px] text-slate-400 font-mono">{data.kfs_number}</p>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    isAccepted ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                }`}>
                    {data.status}
                </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 text-xs">
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/40">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Sanctioned Amount</p>
                    <p className="text-sm font-black text-white mt-0.5">₹ {parseFloat(data.sanctioned_amount || 0).toLocaleString("en-IN")}</p>
                </div>
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/40">
                    <p className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                        <FaPercent className="text-blue-400 h-2.5 w-2.5" /> APR (Effective)
                    </p>
                    <p className="text-sm font-black text-blue-300 mt-0.5">{data.apr}%</p>
                </div>
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/40">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Monthly EMI</p>
                    <p className="text-sm font-black text-white mt-0.5">₹ {parseFloat(data.emi_amount || 0).toLocaleString("en-IN")}</p>
                </div>
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/40">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Total Repayment</p>
                    <p className="text-sm font-black text-emerald-400 mt-0.5">₹ {parseFloat(data.total_repayment || 0).toLocaleString("en-IN")}</p>
                </div>
            </div>

            <div className="text-[11px] text-slate-300 bg-slate-950/40 p-3 rounded-xl border border-slate-800 space-y-1">
                <p><strong className="text-white">Upfront Fees:</strong> Processing: ₹{data.processing_fee} | Doc Fee: ₹{data.documentation_fee} | Insurance: ₹{data.insurance_charge}</p>
                <p><strong className="text-white">Penal Charges:</strong> {data.penal_charge_rules}</p>
            </div>

            {!isAccepted && (
                <button
                    type="button"
                    onClick={() => onAccept && onAccept(data.id)}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
                >
                    <FaCheckCircle className="h-3.5 w-3.5" />
                    <span>Accept Key Facts Statement (KFS)</span>
                </button>
            )}
        </div>
    );
}
