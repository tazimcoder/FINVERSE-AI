import { FaAward, FaDownload, FaCheckCircle } from "react-icons/fa";

export default function LoanNocCard({ noc }) {
    const data = noc || {
        noc_number: "NOC-2026-104928",
        loan_id: "LN-2026-001",
        status: "ISSUED",
        noc_document_url: "#"
    };

    return (
        <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-6 shadow-xl border border-emerald-700/50 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-500/30 rounded-2xl text-emerald-300">
                        <FaAward className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white">No Objection Certificate (NOC)</h4>
                        <p className="text-[11px] text-emerald-300 font-mono">{data.noc_number}</p>
                    </div>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full text-[10px] font-black uppercase tracking-wider">
                    {data.status}
                </span>
            </div>

            <p className="text-xs text-emerald-100 leading-relaxed">
                This document certifies that all financial liabilities, interest, principal, and charges on Loan Account <strong>#{data.loan_id}</strong> have been settled in full. All hypothecation liens and pledged collaterals are unconditionally released.
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-emerald-800/80">
                <span className="text-[10px] text-emerald-300 flex items-center gap-1">
                    <FaCheckCircle className="text-emerald-400" /> Irreversible Clearance
                </span>
                <a
                    href={data.noc_document_url || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-emerald-500/30 cursor-pointer"
                >
                    <FaDownload className="h-3 w-3" />
                    <span>Download NOC Certificate</span>
                </a>
            </div>
        </div>
    );
}
