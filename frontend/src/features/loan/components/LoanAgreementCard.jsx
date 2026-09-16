import { useState } from "react";
import { FaFileSignature, FaCheckCircle, FaLock } from "react-icons/fa";

export default function LoanAgreementCard({ agreement, onSign }) {
    const [signedState, setSignedState] = useState(false);

    const data = agreement || {
        id: "DEFAULT-AGR-1",
        agreement_number: "AGR-2026-774019",
        version: "v1.0",
        status: signedState ? "ACCEPTED" : "GENERATED",
        signed_ip: "127.0.0.1"
    };

    const isSigned = data.status === "ACCEPTED" || data.status === "SIGNED" || signedState;

    const handleSign = async () => {
        setSignedState(true);
        if (onSign) {
            await onSign(data.id);
        }
    };

    return (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl">
                        <FaFileSignature className="h-5 w-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-slate-900">Digital Loan Agreement</h4>
                        <p className="text-[11px] text-slate-400 font-mono">{data.agreement_number}</p>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    isSigned ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                }`}>
                    {isSigned ? "ACCEPTED & SIGNED" : "SIGNATURE PENDING"}
                </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
                By digitally signing this agreement, you accept all sanction conditions, EMI amortization schedule, auto-debit NACH mandates, and legal terms governing FINVERSE credit lines.
            </p>

            {isSigned ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2">
                    <FaCheckCircle className="text-emerald-600" />
                    <span>Digitally Executed & Signed (IP: {data.signed_ip || "127.0.0.1"})</span>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={handleSign}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                    <FaLock className="text-blue-400 h-3.5 w-3.5" />
                    <span>Digitally Sign Loan Agreement</span>
                </button>
            )}
        </div>
    );
}
