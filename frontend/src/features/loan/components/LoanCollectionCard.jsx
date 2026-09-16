import { FaShieldAlt, FaClock, FaCalendarCheck } from "react-icons/fa";

export default function LoanCollectionCard({ collection }) {
    const data = collection || {
        dpd_bucket: "0",
        collection_status: "RESOLVED",
        promise_date: "2026-09-15",
        promise_amount: 8891,
        ptp_status: "KEPT",
        notes: "Account in good standing. All EMIs paid on time."
    };

    return (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl">
                        <FaShieldAlt className="h-5 w-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-slate-900">Collections, DPD & Promise to Pay (PTP) Audit</h4>
                        <p className="text-[11px] text-slate-400">Delinquency aging bucket & repayment commitment tracker</p>
                    </div>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
                    DPD: {data.dpd_bucket} (STANDARD)
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                        <FaClock className="text-blue-500" /> DPD Aging Bucket
                    </p>
                    <p className="text-sm font-black text-slate-900">{data.dpd_bucket} Days Past Due</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                        <FaCalendarCheck className="text-emerald-500" /> Promise Date (PTP)
                    </p>
                    <p className="text-sm font-black text-slate-900">{data.promise_date}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">PTP Status</p>
                    <span className="inline-block px-2.5 py-0.5 bg-emerald-600 text-white rounded-full text-[10px] font-bold">
                        {data.ptp_status}
                    </span>
                </div>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100 italic">
                "{data.notes}"
            </p>
        </div>
    );
}
