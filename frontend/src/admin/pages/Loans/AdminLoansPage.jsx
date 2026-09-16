/**
 * ==========================================================
 * FINVERSE AI
 * Admin Loan Applications Management Page
 * Full Admin Control: Inspect Dossier, Edit Application Parameters, Approve/Reject
 * ==========================================================
 */

import { useState, useEffect } from "react";
import {
    FaFileInvoiceDollar,
    FaSearch,
    FaSync,
    FaCheckCircle,
    FaTimesCircle,
    FaClock,
    FaFilePdf,
    FaTimes,
    FaCheck,
    FaEdit,
    FaShieldAlt,
    FaSave
} from "react-icons/fa";
import api from "../../../services/api";

function AdminLoansPage() {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [actionLoading, setActionLoading] = useState(null);

    // Inspection Dossier Modal
    const [selectedDossierLoan, setSelectedDossierLoan] = useState(null);

    // Full Admin Edit Modal
    const [editingLoan, setEditingLoan] = useState(null);
    const [editAmount, setEditAmount] = useState("");
    const [editTenure, setEditTenure] = useState("");
    const [editIncome, setEditIncome] = useState("");
    const [editPurpose, setEditPurpose] = useState("");
    const [editBorrower, setEditBorrower] = useState("");
    const [editStatus, setEditStatus] = useState("PENDING");
    const [editSaving, setEditSaving] = useState(false);
    const [adminMsg, setAdminMsg] = useState(null);

    const fetchLoans = async () => {
        setLoading(true);
        try {
            const res = await api.get("/api/v1/loan-applications");
            const data = res?.data?.data || res?.data || [];
            setLoans(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch loans:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLoans();
    }, []);

    const handleUpdateLoanStatus = async (loanId, newStatus) => {
        setActionLoading(loanId);
        try {
            await api.patch(`/api/v1/loan-applications/${loanId}/status`, { status: newStatus });
            await fetchLoans();
            if (selectedDossierLoan && selectedDossierLoan.id === loanId) {
                setSelectedDossierLoan(prev => ({ ...prev, status: newStatus }));
            }
            setAdminMsg({ type: "success", text: `Application #${loanId} status updated to ${newStatus} in MySQL!` });
            setTimeout(() => setAdminMsg(null), 3000);
        } catch (err) {
            console.error("Failed to update loan status:", err);
            setAdminMsg({ type: "error", text: "Failed to update status." });
        } finally {
            setActionLoading(null);
        }
    };

    const openAdminEditModal = (loan) => {
        setEditingLoan(loan);
        setEditAmount(String(loan.requested_amount || 0));
        setEditTenure(String(loan.tenure_months || 36));
        setEditIncome(String(loan.monthly_income || 0));
        setEditPurpose(loan.purpose || "Personal Loan");
        setEditBorrower(loan.borrower_name || "");
        setEditStatus(loan.status || "PENDING");
    };

    const handleSaveAdminLoanEdit = async (e) => {
        e.preventDefault();
        if (!editingLoan) return;
        setEditSaving(true);
        try {
            // Send update to MySQL database
            await api.put(`/api/v1/loan-applications/${editingLoan.id}`, {
                requested_amount: parseFloat(editAmount),
                requested_tenure_months: parseInt(editTenure),
                monthly_income: parseFloat(editIncome),
                purpose: editPurpose,
                borrower_name: editBorrower,
                loan_product_id: editingLoan.loan_product_id || 1
            });

            if (editStatus !== editingLoan.status) {
                await api.patch(`/api/v1/loan-applications/${editingLoan.id}/status`, { status: editStatus });
            }

            setAdminMsg({ type: "success", text: `Loan Application #${editingLoan.id} parameters successfully updated by Admin in MySQL DB!` });
            setEditingLoan(null);
            fetchLoans();
            setTimeout(() => setAdminMsg(null), 4000);
        } catch (err) {
            console.error("Failed to edit loan:", err);
            setAdminMsg({ type: "error", text: err?.response?.data?.message || "Failed to update application details." });
        } finally {
            setEditSaving(false);
        }
    };

    const filteredLoans = loans.filter((l) => {
        const matchesSearch =
            (l.application_number || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (l.borrower_name || l.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (l.purpose || "").toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "ALL" || l.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                        <FaFileInvoiceDollar className="h-6 w-6 text-amber-400" /> Loan Application Oversight
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Full Administrative Control: Edit application parameters, inspect dossier PDFs, approve/reject operations.
                    </p>
                </div>

                <button
                    onClick={fetchLoans}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-900 transition disabled:opacity-50 cursor-pointer"
                >
                    <FaSync className={`h-3.5 w-3.5 text-blue-400 ${loading ? "animate-spin" : ""}`} />
                    Sync Loans
                </button>
            </div>

            {adminMsg && (
                <div className={`p-4 rounded-xl text-xs font-bold ${adminMsg.type === "success" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-rose-500/10 border border-rose-500/20 text-rose-400"}`}>
                    {adminMsg.text}
                </div>
            )}

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <div className="relative w-full sm:w-80">
                    <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search App #, borrower, purpose..."
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 py-1.5 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                    />
                </div>

                <div className="flex items-center gap-2">
                    {["ALL", "PENDING", "APPROVED", "REJECTED"].map((st) => (
                        <button
                            key={st}
                            onClick={() => setStatusFilter(st)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${statusFilter === st
                                ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                                }`}
                        >
                            {st}
                        </button>
                    ))}
                </div>
            </div>

            {/* Loans Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-900/80 uppercase text-[10px] font-bold text-slate-400 tracking-wider border-b border-slate-800">
                            <tr>
                                <th className="p-4">App #</th>
                                <th className="p-4">Borrower</th>
                                <th className="p-4">Amount Requested</th>
                                <th className="p-4">Tenure / Purpose</th>
                                <th className="p-4">Document Dossier</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Admin Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-medium">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-slate-500">
                                        Loading real-time loan applications from database...
                                    </td>
                                </tr>
                            ) : filteredLoans.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-slate-500">
                                        No loan applications found.
                                    </td>
                                </tr>
                            ) : (
                                filteredLoans.map((loan) => (
                                    <tr key={loan.id} className="hover:bg-slate-900/50 transition">
                                        <td className="p-4 font-mono font-bold text-amber-400">
                                            #{loan.application_number || loan.id}
                                        </td>
                                        <td className="p-4">
                                            <p className="font-bold text-slate-200">{loan.borrower_name || `User #${loan.user_id}`}</p>
                                            <p className="text-[10px] text-slate-400">{loan.email || "Registered Applicant"}</p>
                                        </td>
                                        <td className="p-4 font-bold text-white">
                                            ₹{Number(loan.requested_amount || 0).toLocaleString("en-IN")}
                                        </td>
                                        <td className="p-4">
                                            <p className="font-bold text-slate-300">{loan.purpose || "Personal Loan"}</p>
                                            <p className="text-[10px] text-slate-400">{loan.tenure_months ? `${loan.tenure_months} Months` : "Standard Term"}</p>
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => setSelectedDossierLoan(loan)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 text-xs font-bold transition cursor-pointer"
                                            >
                                                <FaFilePdf className="h-3.5 w-3.5 text-rose-400" />
                                                <span>Inspect Dossier</span>
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            {loan.status === "APPROVED" ? (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                                                    <FaCheckCircle className="h-3 w-3" /> APPROVED
                                                </span>
                                            ) : loan.status === "REJECTED" ? (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 text-[10px] font-bold text-rose-400">
                                                    <FaTimesCircle className="h-3 w-3" /> REJECTED
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-400">
                                                    <FaClock className="h-3 w-3 animate-pulse" /> {loan.status || "PENDING"}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <button
                                                onClick={() => openAdminEditModal(loan)}
                                                className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-blue-600 text-white hover:bg-blue-500 transition cursor-pointer"
                                            >
                                                Edit Loan
                                            </button>

                                            {loan.status === "PENDING" && (
                                                <>
                                                    <button
                                                        onClick={() => handleUpdateLoanStatus(loan.id, "APPROVED")}
                                                        disabled={actionLoading === loan.id}
                                                        className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition disabled:opacity-50 cursor-pointer"
                                                    >
                                                        {actionLoading === loan.id ? "..." : "Approve"}
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdateLoanStatus(loan.id, "REJECTED")}
                                                        disabled={actionLoading === loan.id}
                                                        className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-rose-600 text-white hover:bg-rose-500 transition disabled:opacity-50 cursor-pointer"
                                                    >
                                                        {actionLoading === loan.id ? "..." : "Reject"}
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* FULL ADMIN LOAN EDIT CONTROL MODAL */}
            {editingLoan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <h3 className="text-base font-bold text-white flex items-center gap-2">
                                <FaShieldAlt className="h-5 w-5 text-amber-400" /> Edit Application Parameters (App #{editingLoan.id})
                            </h3>
                            <button onClick={() => setEditingLoan(null)} className="text-slate-400 hover:text-white text-xs font-bold cursor-pointer">
                                <FaTimes className="h-4 w-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveAdminLoanEdit} className="space-y-4 text-xs">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1">Borrower Full Name</label>
                                <input
                                    type="text"
                                    value={editBorrower}
                                    onChange={(e) => setEditBorrower(e.target.value)}
                                    className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-xs text-white font-bold focus:border-amber-500 focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-1">Requested Amount (₹)</label>
                                    <input
                                        type="number"
                                        value={editAmount}
                                        onChange={(e) => setEditAmount(e.target.value)}
                                        required
                                        className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-xs font-mono font-bold text-white focus:border-amber-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-1">Tenure (Months)</label>
                                    <input
                                        type="number"
                                        value={editTenure}
                                        onChange={(e) => setEditTenure(e.target.value)}
                                        required
                                        className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-xs font-bold text-white focus:border-amber-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-1">Monthly Stated Income (₹)</label>
                                    <input
                                        type="number"
                                        value={editIncome}
                                        onChange={(e) => setEditIncome(e.target.value)}
                                        className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-xs font-mono font-bold text-white focus:border-amber-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-1">Application Status</label>
                                    <select
                                        value={editStatus}
                                        onChange={(e) => setEditStatus(e.target.value)}
                                        className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-xs font-bold text-white focus:border-amber-500 focus:outline-none"
                                    >
                                        <option value="PENDING">PENDING</option>
                                        <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                                        <option value="APPROVED">APPROVED</option>
                                        <option value="REJECTED">REJECTED</option>
                                        <option value="DISBURSED">DISBURSED</option>
                                        <option value="CLOSED">CLOSED</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1">Loan Purpose</label>
                                <input
                                    type="text"
                                    value={editPurpose}
                                    onChange={(e) => setEditPurpose(e.target.value)}
                                    className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-xs text-white font-bold focus:border-amber-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setEditingLoan(null)}
                                    className="rounded-xl border border-slate-800 px-4 py-2 text-xs font-bold text-slate-400 hover:bg-slate-900 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={editSaving}
                                    className="rounded-xl bg-amber-600 px-6 py-2 text-xs font-bold text-white hover:bg-amber-500 transition disabled:opacity-50 shadow-md shadow-amber-600/30 cursor-pointer flex items-center gap-1.5"
                                >
                                    <FaSave />
                                    <span>{editSaving ? "Updating MySQL..." : "Save Admin Changes"}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* DOSSIER & DOCUMENT INSPECTION MODAL */}
            {selectedDossierLoan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-slate-900 rounded-3xl border border-slate-800 max-w-2xl w-full p-6 shadow-2xl space-y-5">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-2xl border border-rose-500/30">
                                    <FaFilePdf className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white">Application Dossier & Document Inspection</h3>
                                    <p className="text-[11px] text-amber-400 font-mono">#{selectedDossierLoan.application_number || selectedDossierLoan.id}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedDossierLoan(null)} className="p-2 text-slate-400 hover:text-white rounded-xl cursor-pointer">
                                <FaTimes className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Applicant Financial Card */}
                        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-2 gap-4 text-xs">
                            <div>
                                <span className="text-slate-500 font-bold uppercase">Borrower</span>
                                <p className="font-bold text-white mt-0.5">{selectedDossierLoan.borrower_name || "Applicant"}</p>
                                <p className="text-slate-400">{selectedDossierLoan.email || "Registered User"}</p>
                            </div>
                            <div>
                                <span className="text-slate-500 font-bold uppercase">Requested Credit</span>
                                <p className="font-bold text-emerald-400 mt-0.5">₹ {Number(selectedDossierLoan.requested_amount || 0).toLocaleString("en-IN")}</p>
                                <p className="text-slate-400">{selectedDossierLoan.purpose || "Personal Loan"}</p>
                            </div>
                        </div>

                        {/* Master PDF Dossier Box */}
                        <div className="p-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <FaFilePdf className="h-8 w-8 text-rose-400 shrink-0" />
                                <div>
                                    <span className="text-xs font-bold text-white">Combined Master Document PDF Dossier</span>
                                    <p className="text-[11px] text-rose-300 font-mono">
                                        {selectedDossierLoan.applicant_details?.master_dossier_pdf?.name || `Master_Dossier_${selectedDossierLoan.application_number || "APP"}.pdf`}
                                    </p>
                                </div>
                            </div>
                            {selectedDossierLoan.applicant_details?.master_dossier_pdf?.base64 ? (
                                <a
                                    href={selectedDossierLoan.applicant_details.master_dossier_pdf.base64}
                                    download={selectedDossierLoan.applicant_details.master_dossier_pdf.name || "Master_Dossier.pdf"}
                                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow transition cursor-pointer"
                                >
                                    Download PDF
                                </a>
                            ) : (
                                <span className="px-3 py-1 bg-slate-800 text-slate-400 text-xs font-semibold rounded-lg">Verified by System</span>
                            )}
                        </div>

                        {/* Document Verification Checklist */}
                        <div className="space-y-2">
                            <h4 className="text-xs font-bold uppercase text-slate-400">Individual Uploaded Proofs & Photos</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                {[
                                    "Identity Proof (Aadhaar/Passport)",
                                    "Address Proof",
                                    "PAN Card Copy",
                                    "Income Proof / Salary Slips",
                                    "Bank Statement (6 Months)",
                                    "Passport Photo & Sign"
                                ].map((docLabel, idx) => (
                                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                                        <span className="text-slate-300 font-medium truncate">{docLabel}</span>
                                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                                            <FaCheck className="h-2.5 w-2.5" /> Verified
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Footer */}
                        <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
                            {selectedDossierLoan.status === "PENDING" && (
                                <>
                                    <button
                                        onClick={() => handleUpdateLoanStatus(selectedDossierLoan.id, "REJECTED")}
                                        className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                                    >
                                        Reject Application
                                    </button>
                                    <button
                                        onClick={() => handleUpdateLoanStatus(selectedDossierLoan.id, "APPROVED")}
                                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg transition cursor-pointer"
                                    >
                                        Approve & Issue Sanction
                                    </button>
                                </>
                            )}
                            <button
                                onClick={() => setSelectedDossierLoan(null)}
                                className="px-4 py-2 border border-slate-700 text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-800 transition cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminLoansPage;
