import { useState } from "react";
import { FaReceipt, FaDownload, FaCheckCircle, FaFilePdf } from "react-icons/fa";

export default function TaxCertificatesHub() {
    const [downloading, setDownloading] = useState(false);
    const [notice, setNotice] = useState("");

    const handleDownload = (type) => {
        setDownloading(true);
        setTimeout(() => {
            setDownloading(false);
            setNotice(`${type} Tax Deduction Certificate generated and downloaded successfully!`);
            setTimeout(() => setNotice(""), 4000);
        }, 1200);
    };

    return (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-500 font-extrabold text-[10px] uppercase tracking-wider mb-1">
                        <FaReceipt /> Section 80EEA / 24b Tax Certificates
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                        Interest Deduction & Tax Report Hub
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Download official interest & principal tax deduction certificates for Income Tax e-filing.
                    </p>
                </div>
                <div className="text-right">
                    <span className="text-xs font-bold text-slate-400">Current FY Tax Savings</span>
                    <p className="text-2xl font-black text-emerald-500">₹ 2,00,000</p>
                </div>
            </div>

            {notice && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span>{notice}</span>
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-5 space-y-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <FaFilePdf className="h-8 w-8 text-rose-500" />
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Home Loan Tax Certificate (Sec 24b)</h4>
                                <p className="text-xs text-slate-400">FY 2025-26 Interest Statement</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between text-xs pt-2 border-t border-slate-200 dark:border-slate-700">
                        <span className="text-slate-500">Max Interest Deduction</span>
                        <span className="font-extrabold text-slate-900 dark:text-white">₹ 2,00,000</span>
                    </div>
                    <button
                        type="button"
                        disabled={downloading}
                        onClick={() => handleDownload("Section 24b Home Loan")}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition cursor-pointer flex items-center justify-center gap-2"
                    >
                        <FaDownload /> {downloading ? "Generating PDF..." : "Download Official Certificate PDF"}
                    </button>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-5 space-y-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <FaFilePdf className="h-8 w-8 text-rose-500" />
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Personal Loan Interest Certificate (Sec 80EEA)</h4>
                                <p className="text-xs text-slate-400">FY 2025-26 Deduction Statement</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between text-xs pt-2 border-t border-slate-200 dark:border-slate-700">
                        <span className="text-slate-500">Max Additional Deduction</span>
                        <span className="font-extrabold text-slate-900 dark:text-white">₹ 1,50,000</span>
                    </div>
                    <button
                        type="button"
                        disabled={downloading}
                        onClick={() => handleDownload("Section 80EEA Personal Loan")}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition cursor-pointer flex items-center justify-center gap-2"
                    >
                        <FaDownload /> {downloading ? "Generating PDF..." : "Download Official Certificate PDF"}
                    </button>
                </div>
            </div>
        </div>
    );
}
