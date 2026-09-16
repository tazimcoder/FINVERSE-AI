/**
 * ==========================================================
 * FINVERSE AI
 * Masterclass Smart Loan Operating Center
 * 100% Real-Time Backend & MySQL Database Integration
 * ==========================================================
 */

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
    FaHandHoldingUsd,
    FaClipboardCheck,
    FaShieldAlt,
    FaFolderOpen,
    FaCalculator,
    FaPlus,
    FaCheckCircle,
    FaCreditCard,
    FaLock,
    FaClock
} from "react-icons/fa";


import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";

// Import Core Loan Hooks + Extended Hooks
import useLoans from "../hooks/useLoans";
import useLoanApplications from "../hooks/useLoanApplications";
import useLoanProducts from "../hooks/useLoanProducts";
import useLoanOffers from "../hooks/useLoanOffers";
import useLoanRepaymentSchedules from "../hooks/useLoanRepaymentSchedules";
import useLoanPayments from "../hooks/useLoanPayments";
import useLoanDocuments from "../hooks/useLoanDocuments";
import useLoanCollaterals from "../hooks/useLoanCollaterals";
import useLoanGuarantors from "../hooks/useLoanGuarantors";
import useLoanDisbursements from "../hooks/useLoanDisbursements";
import useLoanVerificationChecks from "../hooks/useLoanVerificationChecks";
import useLoanProperties from "../hooks/useLoanProperties";
import useLoanApprovals from "../hooks/useLoanApprovals";
import useLoanKfs from "../hooks/useLoanKfs";
import useLoanAgreements from "../hooks/useLoanAgreements";
import useLoanForeclosures from "../hooks/useLoanForeclosures";
import useLoanNocs from "../hooks/useLoanNocs";

// Import Custom Feature Components
import EMICalculator from "../components/EMICalculator";
import LoanMilestoneTracker from "../components/LoanMilestoneTracker";
import EMIRepaymentHub from "../components/EMIRepaymentHub";
import DocumentOCRHub from "../components/DocumentOCRHub";
import CibilScoreMonitor from "../components/CibilScoreMonitor";
import TopUpLoanHub from "../components/TopUpLoanHub";
import ForeclosureHub from "../components/ForeclosureHub";
import SavingsVaultsHub from "../components/SavingsVaultsHub";
import TaxCertificatesHub from "../components/TaxCertificatesHub";
import FinverseRewardsHub from "../components/FinverseRewardsHub";
import VirtualCardsHub from "../components/VirtualCardsHub";

// Import Base Components
import LoanSummaryCard from "../components/LoanSummaryCard";
import LoanEligibilityCard from "../components/LoanEligibilityCard";
import LoanApplicationCard from "../components/LoanApplicationCard";
import LoanApplicationStatus from "../components/LoanApplicationStatus";
import LoanApprovalCard from "../components/LoanApprovalCard";
import LoanOfferCard from "../components/LoanOfferCard";
import LoanPaymentCard from "../components/LoanPaymentCard";
import LoanDisbursementCard from "../components/LoanDisbursementCard";
import LoanDocumentCard from "../components/LoanDocumentCard";
import LoanDocumentList from "../components/LoanDocumentList";
import LoanLoadingState from "../components/LoanLoadingState";
import ApplyLoanModal from "../components/ApplyLoanModal";
import LoanKfsCard from "../components/LoanKfsCard";
import LoanAgreementCard from "../components/LoanAgreementCard";
import LoanForeclosureModal from "../components/LoanForeclosureModal";
import LoanNocCard from "../components/LoanNocCard";

function LoanPage() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("CALCULATOR");

    useEffect(() => {
        if (location.pathname === "/calculator") setActiveTab("CALCULATOR");
        else if (location.pathname === "/top-up") setActiveTab("TOP_UP");
        else if (location.pathname === "/foreclosure") setActiveTab("FORECLOSURE");
        else if (location.pathname === "/repay-hub") setActiveTab("MY_LOANS");
        else if (location.pathname === "/vaults") setActiveTab("VAULTS");
        else if (location.pathname === "/documents") setActiveTab("OCR_DOCS");
        else if (location.pathname === "/credit-health") setActiveTab("CIBIL");
        else if (location.pathname === "/tax-reports") setActiveTab("TAX_REPORTS");
        else if (location.pathname === "/agreements") setActiveTab("APPLICATIONS");
        else if (location.pathname === "/rewards") setActiveTab("REWARDS");
        else if (location.pathname === "/virtual-cards") setActiveTab("VIRTUAL_CARDS");
    }, [location.pathname]);

    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

    const [isForeclosureModalOpen, setIsForeclosureModalOpen] = useState(false);
    const [selectedProductForApply, setSelectedProductForApply] = useState(null);
    const [prefilledApplyData, setPrefilledApplyData] = useState(null);
    const [actionNotice, setActionNotice] = useState("");

    // Load Data via Real Backend Hooks
    const { loans, loadLoans } = useLoans();
    const { applications, loading: appsLoading, loadApplications, createApplication } = useLoanApplications();
    const { products, fetchActiveLoanProducts } = useLoanProducts();
    const { offers, acceptOffer, rejectOffer } = useLoanOffers();
    const { payments } = useLoanPayments();
    const { documents } = useLoanDocuments();
    const { collaterals } = useLoanCollaterals();
    const { guarantors } = useLoanGuarantors();
    const { disbursements } = useLoanDisbursements();
    const { verificationChecks } = useLoanVerificationChecks();
    const { properties } = useLoanProperties();
    const { approvals } = useLoanApprovals();

    // Extended Hooks
    const { kfs, fetchKfs, acceptKfs } = useLoanKfs();
    const { agreement, fetchAgreement, signAgreement } = useLoanAgreements();
    const { foreclosure, fetchForeclosure, executePayoff } = useLoanForeclosures();
    const { noc, fetchNoc } = useLoanNocs();

    useEffect(() => {
        fetchActiveLoanProducts();
    }, [fetchActiveLoanProducts]);

    useEffect(() => {
        const appList = Array.isArray(applications) ? applications : [];
        if (appList.length > 0) {
            fetchKfs(appList[0].id);
            fetchAgreement(appList[0].id);
        }
    }, [applications, fetchKfs, fetchAgreement]);

    useEffect(() => {
        const loanList = Array.isArray(loans) ? loans : [];
        if (loanList.length > 0) {
            fetchForeclosure(loanList[0].id);
            fetchNoc(loanList[0].id);
        }
    }, [loans, fetchForeclosure, fetchNoc]);

    // Database Collections
    const loanList = Array.isArray(loans) ? loans : [];
    const appList = Array.isArray(applications) ? applications : [];
    const productList = Array.isArray(products) ? products : [];
    const offerList = Array.isArray(offers) ? offers : [];
    const paymentList = Array.isArray(payments) ? payments : [];
    const docList = Array.isArray(documents) ? documents : [];
    const disbursementList = Array.isArray(disbursements) ? disbursements : [];
    const approvalList = Array.isArray(approvals) ? approvals : [];

    // Real Metrics
    const totalLoanCount = loanList.length;
    const activeLoanCount = loanList.filter((l) => ["ACTIVE", "DISBURSED"].includes(String(l.status || l.loan_status || "").toUpperCase())).length;
    const pendingAppCount = appList.filter((a) => ["PENDING", "SUBMITTED", "UNDER_REVIEW"].includes(String(a.status || "").toUpperCase())).length;
    const totalApprovedVolume = loanList.reduce((acc, l) => acc + (parseFloat(l.principal_amount || l.amount || 0)), 0);

    const handleApplyWithEligibility = (prefillData) => {
        setPrefilledApplyData(prefillData);
        setIsApplyModalOpen(true);
    };

    const handleFormSubmit = async (payload) => {
        if (createApplication) {
            await createApplication(payload);
            await loadApplications();
            await loadLoans();
            setActionNotice("Loan application submitted successfully! Saved to database and under instant evaluation.");
            setTimeout(() => setActionNotice(""), 4000);
        }
    };

    const handleAcceptOfferSubmit = async (offerId) => {
        if (acceptOffer) {
            await acceptOffer(offerId);
            await loadApplications();
            await loadLoans();
            setActionNotice("Loan offer accepted! Funds sanctioned.");
            setTimeout(() => setActionNotice(""), 4000);
        }
    };

    const handleForeclosurePayoff = async (id, loanId) => {
        await executePayoff(id, loanId);
        await loadLoans();
        setActionNotice("Loan fully foreclosed & settled! Official NOC generated.");
        setTimeout(() => setActionNotice(""), 4000);
    };

    return (
        <DashboardLayout showTopNavbar={true}>
            <div className="min-h-screen pb-16 transition-colors duration-200">
                <div className="mx-auto max-w-[1700px] space-y-6">

                    {/* TOP HEADER WITH BRAND & APPLY BUTTON */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 dark:border-slate-800 pb-6 animate-fade-in-up">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                FINVERSE SMART LOANS OPERATING SYSTEM
                            </p>
                            <h1 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                                Digital Loan Portal <FaHandHoldingUsd className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                            </h1>
                            <p className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-400 max-w-3xl">
                                Complete loan management hub connected to MySQL. Calculate EMIs, check live CIBIL health, run AI OCR document verification, and manage auto-pay repayments.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setIsForeclosureModalOpen(true)}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-xs transition cursor-pointer shrink-0"
                            >
                                <FaLock className="h-3.5 w-3.5" />
                                <span>Request Foreclosure Payoff</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setPrefilledApplyData(null);
                                    setSelectedProductForApply(null);
                                    setIsApplyModalOpen(true);
                                }}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:shadow-lg transition cursor-pointer shrink-0"
                            >
                                <FaPlus className="h-3.5 w-3.5" />
                                <span>Apply for New Loan</span>
                            </button>
                        </div>
                    </div>

                    {/* ACTION NOTICE BANNER */}
                    {actionNotice && (
                        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-3 animate-scale-pop shadow-xs">
                            <FaCheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
                            <span>{actionNotice}</span>
                        </div>
                    )}

                    {/* METRIC SUMMARY CARDS GRID */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <LoanSummaryCard
                            title="Total Loan Accounts"
                            value={totalLoanCount}
                            description="Active & past loan accounts in database"
                        />
                        <LoanSummaryCard
                            title="Active Loans"
                            value={activeLoanCount}
                            description="Currently active or disbursed"
                        />
                        <LoanSummaryCard
                            title="Pending Applications"
                            value={pendingAppCount}
                            description="Under review or evaluation"
                        />
                        <LoanSummaryCard
                            title="Approved Credit Volume"
                            value={`₹ ${totalApprovedVolume.toLocaleString("en-IN")}`}
                            description="Sanctioned credit line volume"
                        />
                    </div>

                    {/* INTERACTIVE NAVIGATION TABS */}
                    <div className="flex border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-1.5 shadow-xs overflow-x-auto gap-1">
                        <button
                            type="button"
                            onClick={() => setActiveTab("CALCULATOR")}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                                activeTab === "CALCULATOR"
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                            }`}
                        >
                            <FaCalculator className="h-3.5 w-3.5" />
                            <span>EMI & Eligibility Calculator</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("MILESTONES")}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                                activeTab === "MILESTONES"
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                            }`}
                        >
                            <FaClock className="h-3.5 w-3.5" />
                            <span>Milestone Tracker</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("MY_LOANS")}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                                activeTab === "MY_LOANS"
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                            }`}
                        >
                            <FaCreditCard className="h-3.5 w-3.5" />
                            <span>EMI Repayments & Auto-Pay</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("OCR_DOCS")}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                                activeTab === "OCR_DOCS"
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                            }`}
                        >
                            <FaFolderOpen className="h-3.5 w-3.5" />
                            <span>AI Document Scanner (OCR)</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("CIBIL")}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                                activeTab === "CIBIL"
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                            }`}
                        >
                            <FaShieldAlt className="h-3.5 w-3.5" />
                            <span>CIBIL Credit Health</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("APPLICATIONS")}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                                activeTab === "APPLICATIONS"
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                            }`}
                        >
                            <FaClipboardCheck className="h-3.5 w-3.5" />
                            <span>Applications, KFS & Agreements</span>
                        </button>
                    </div>

                    {/* TAB CONTENT WRAPPER WITH SMOOTH ANIMATION */}
                    <div key={activeTab} className="animate-google-reveal space-y-8">
                        {/* TAB 1: EMI & ELIGIBILITY CALCULATOR */}
                        {activeTab === "CALCULATOR" && (
                            <>
                                <EMICalculator
                                    onApplyWithParams={({ loanType, amount }) => {
                                        setPrefilledApplyData({ loan_type: loanType, requested_amount: amount });
                                        setIsApplyModalOpen(true);
                                    }}
                                />
                                <LoanEligibilityCard onApplyWithEligibility={handleApplyWithEligibility} />
                            </>
                        )}

                        {/* TAB 2: LIVE MILESTONE TRACKER */}
                        {activeTab === "MILESTONES" && (
                            <LoanMilestoneTracker activeLoan={loanList[0]} />
                        )}

                        {/* TAB 3: EMI REPAYMENTS & AUTO-PAY HUB */}
                        {activeTab === "MY_LOANS" && (
                            <>
                                <EMIRepaymentHub />

                                <section>
                                    <LoanNocCard noc={noc} />
                                </section>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Recent EMI Payment Receipts</h4>
                                        {paymentList.length > 0 ? (
                                            paymentList.map((payment) => (
                                                <LoanPaymentCard key={payment.id} payment={payment} />
                                            ))
                                        ) : (
                                            <div className="p-6 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-800/40">
                                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">No payment receipts recorded yet.</p>
                                            </div>
                                        )}
                                    </section>

                                    <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Fund Disbursement Receipts</h4>
                                        {disbursementList.length > 0 ? (
                                            disbursementList.map((disbursement) => (
                                                <LoanDisbursementCard key={disbursement.id} disbursement={disbursement} />
                                            ))
                                        ) : (
                                            <div className="p-6 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-800/40">
                                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">No disbursement transactions executed yet.</p>
                                            </div>
                                        )}
                                    </section>
                                </div>
                            </>
                        )}

                        {/* TAB 4: AI DOCUMENT SCANNER (OCR) */}
                        {activeTab === "OCR_DOCS" && (
                            <>
                                <DocumentOCRHub />

                                <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                                        <FaFolderOpen className="text-blue-600 dark:text-blue-400" /> Vault Documents
                                    </h3>
                                    {docList.length > 0 ? (
                                        <div className="grid gap-4 md:grid-cols-2 mt-4">
                                            {docList.map((doc) => (
                                                <LoanDocumentCard key={doc.id} document={doc} />
                                            ))}
                                        </div>
                                    ) : (
                                        <LoanDocumentList documents={[]} />
                                    )}
                                </section>
                            </>
                        )}

                        {/* TAB 5: CIBIL CREDIT HEALTH MONITOR */}
                        {activeTab === "CIBIL" && (
                            <CibilScoreMonitor />
                        )}

                        {/* TAB 6: INSTANT TOP-UP ENGINE */}
                        {activeTab === "TOP_UP" && (
                            <TopUpLoanHub />
                        )}

                        {/* TAB 7: LOAN PRE-PAYMENT & FORECLOSURE */}
                        {activeTab === "FORECLOSURE" && (
                            <ForeclosureHub activeLoan={loanList[0]} />
                        )}

                        {/* TAB 8: SAVINGS VAULTS */}
                        {activeTab === "VAULTS" && (
                            <SavingsVaultsHub />
                        )}

                        {/* TAB 9: TAX CERTIFICATES */}
                        {activeTab === "TAX_REPORTS" && (
                            <TaxCertificatesHub />
                        )}

                        {/* TAB 10: FINVERSE REWARDS HUB */}
                        {activeTab === "REWARDS" && (
                            <FinverseRewardsHub />
                        )}

                        {/* TAB 11: VIRTUAL SECURITY CARDS */}
                        {activeTab === "VIRTUAL_CARDS" && (
                            <VirtualCardsHub />
                        )}

                        {/* TAB 6: APPLICATIONS, KFS & DIGITAL AGREEMENTS */}
                        {activeTab === "APPLICATIONS" && (
                            <>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <LoanKfsCard kfs={kfs} onAccept={acceptKfs} />
                                    <LoanAgreementCard agreement={agreement} onSign={signAgreement} />
                                </div>

                                {offerList.length > 0 && (
                                    <section>
                                        <div className="mb-4">
                                            <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                                                <FaCheckCircle /> Issued Bank Sanction Offers
                                            </h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                                Review sanctioned credit terms and accept your loan offer to initiate instant fund transfer.
                                            </p>
                                        </div>
                                        <div className="grid gap-6 md:grid-cols-2">
                                            {offerList.map((offer) => (
                                                <LoanOfferCard
                                                    key={offer.id}
                                                    offer={offer}
                                                    onAccept={handleAcceptOfferSubmit}
                                                    onReject={rejectOffer}
                                                />
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {approvalList.length > 0 && (
                                    <section>
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Sanction Approvals Audit</h3>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            {approvalList.map((approval) => (
                                                <LoanApprovalCard key={approval.id} approval={approval} />
                                            ))}
                                        </div>
                                    </section>
                                )}

                                <section>
                                    <div className="mb-4 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                                Submitted Loan Applications
                                            </h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                                Live audit of your active loan requests & stage progression
                                            </p>
                                        </div>
                                    </div>

                                    {appsLoading ? (
                                        <LoanLoadingState title="Loading loan applications..." />
                                    ) : appList.length > 0 ? (
                                        <div className="space-y-4">
                                            {appList.map((app) => (
                                                <div key={app.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
                                                    <LoanApplicationCard application={app} />
                                                    <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                                                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Live Application Progress Timeline:</p>
                                                        <LoanApplicationStatus status={app.status || "SUBMITTED"} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No active loan applications found.</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Calculate your loan eligibility or click below to submit a paperless application.</p>
                                            <button
                                                type="button"
                                                onClick={() => setIsApplyModalOpen(true)}
                                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                                            >
                                                Submit New Application
                                            </button>
                                        </div>
                                    )}
                                </section>
                            </>
                        )}
                    </div>

                </div>
            </div>

            {/* APPLY FOR LOAN MODAL */}
            <ApplyLoanModal
                isOpen={isApplyModalOpen}
                onClose={() => setIsApplyModalOpen(false)}
                products={productList}
                selectedProduct={selectedProductForApply}
                prefilledData={prefilledApplyData}
                onSubmitApplication={handleFormSubmit}
            />

            {/* FORECLOSURE PAYOFF MODAL */}
            <LoanForeclosureModal
                isOpen={isForeclosureModalOpen}
                onClose={() => setIsForeclosureModalOpen(false)}
                foreclosure={foreclosure}
                onExecutePayoff={handleForeclosurePayoff}
            />
        </DashboardLayout>
    );
}

export default LoanPage;