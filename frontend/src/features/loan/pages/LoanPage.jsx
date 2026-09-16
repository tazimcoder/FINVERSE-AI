/**
 * ==========================================================
 * FINVERSE AI — Masterclass Smart Loan Operating Center
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
    FaClock,
    FaPiggyBank,
    FaReceipt,
    FaGift
} from "react-icons/fa";

import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import MetricCard from "../../../components/ui/MetricCard/MetricCard";
import Button from "../../../components/ui/Button/Button";
import Badge from "../../../components/ui/Badge/Badge";
import Tabs from "../../../components/ui/Tabs/Tabs";

// Import Core Loan Hooks
import useLoans from "../hooks/useLoans";
import useLoanApplications from "../hooks/useLoanApplications";
import useLoanProducts from "../hooks/useLoanProducts";
import useLoanOffers from "../hooks/useLoanOffers";
import useLoanPayments from "../hooks/useLoanPayments";
import useLoanDocuments from "../hooks/useLoanDocuments";
import useLoanDisbursements from "../hooks/useLoanDisbursements";
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

// Import Base Cards & Modals
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
    const { disbursements } = useLoanDisbursements();
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

    const loanList = Array.isArray(loans) ? loans : [];
    const appList = Array.isArray(applications) ? applications : [];
    const productList = Array.isArray(products) ? products : [];
    const offerList = Array.isArray(offers) ? offers : [];
    const paymentList = Array.isArray(payments) ? payments : [];
    const docList = Array.isArray(documents) ? documents : [];
    const disbursementList = Array.isArray(disbursements) ? disbursements : [];
    const approvalList = Array.isArray(approvals) ? approvals : [];

    // Real Metrics Calculations
    const totalLoanCount = loanList.length;
    const activeLoanCount = loanList.filter((l) => ["ACTIVE", "DISBURSED"].includes(String(l.status || l.loan_status || "").toUpperCase())).length;
    const pendingAppCount = appList.filter((a) => ["PENDING", "SUBMITTED", "UNDER_REVIEW"].includes(String(a.status || "").toUpperCase())).length;
    const totalApprovedVolume = loanList.reduce((acc, l) => acc + parseFloat(l.principal_amount || l.amount || 0), 0);

    // Calculate Loan Repayment Visualizer Progress
    const primaryActiveLoan = loanList[0] || {};
    const totalPrincipal = parseFloat(primaryActiveLoan.principal_amount || primaryActiveLoan.amount || 0);
    const remainingPrincipal = parseFloat(primaryActiveLoan.remaining_principal || primaryActiveLoan.balance || totalPrincipal * 0.65);
    const paidPrincipal = Math.max(0, totalPrincipal - remainingPrincipal);
    const repaymentPct = totalPrincipal > 0 ? Math.round((paidPrincipal / totalPrincipal) * 100) : 0;

    const handleApplyWithEligibility = (prefillData) => {
        setPrefilledApplyData(prefillData);
        setIsApplyModalOpen(true);
    };

    const handleFormSubmit = async (payload) => {
        if (createApplication) {
            await createApplication(payload);
            await loadApplications();
            await loadLoans();
            setActionNotice("Loan application submitted successfully! Under instant evaluation.");
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

    const loanTabs = [
        { id: "CALCULATOR", label: "EMI & Eligibility", icon: <FaCalculator className="h-3.5 w-3.5" /> },
        { id: "MILESTONES", label: "Milestones", icon: <FaClock className="h-3.5 w-3.5" /> },
        { id: "MY_LOANS", label: "EMI Repayments", icon: <FaCreditCard className="h-3.5 w-3.5" />, badge: activeLoanCount > 0 ? "ACTIVE" : null },
        { id: "OCR_DOCS", label: "OCR Vault", icon: <FaFolderOpen className="h-3.5 w-3.5" /> },
        { id: "CIBIL", label: "CIBIL Health", icon: <FaShieldAlt className="h-3.5 w-3.5" /> },
        { id: "TOP_UP", label: "Instant Top-Up", icon: <FaHandHoldingUsd className="h-3.5 w-3.5" /> },
        { id: "FORECLOSURE", label: "Pre-Payment", icon: <FaLock className="h-3.5 w-3.5" /> },
        { id: "VAULTS", label: "Savings Vaults", icon: <FaPiggyBank className="h-3.5 w-3.5" /> },
        { id: "TAX_REPORTS", label: "Tax Reports", icon: <FaReceipt className="h-3.5 w-3.5" /> },
        { id: "REWARDS", label: "Rewards", icon: <FaGift className="h-3.5 w-3.5" /> },
        { id: "VIRTUAL_CARDS", label: "Virtual Cards", icon: <FaCreditCard className="h-3.5 w-3.5" /> },
        { id: "APPLICATIONS", label: "Agreements & KFS", icon: <FaClipboardCheck className="h-3.5 w-3.5" /> },
    ];

    return (
        <DashboardLayout showTopNavbar>
            <div className="space-y-6">
                {/* PAGE HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Badge variant="emerald" size="xs">SMART CREDIT OS</Badge>
                            <span className="text-xs text-slate-400 font-medium">• MySQL Direct Sync</span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                            Digital Credit & Loan Operating Hub
                        </h1>

                        <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium max-w-2xl">
                            Calculate EMIs, verify OCR documents, check CIBIL health, execute foreclosures, and manage auto-pay repayments.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setIsForeclosureModalOpen(true)}
                            icon={<FaLock className="h-3 w-3 text-amber-400" />}
                        >
                            Foreclosure Payoff
                        </Button>

                        <Button
                            variant="emerald"
                            size="sm"
                            onClick={() => {
                                setPrefilledApplyData(null);
                                setSelectedProductForApply(null);
                                setIsApplyModalOpen(true);
                            }}
                            icon={<FaPlus className="h-3 w-3" />}
                        >
                            Apply for New Loan
                        </Button>
                    </div>
                </div>

                {/* ACTION NOTICE BANNER */}
                {actionNotice && (
                    <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-200 text-xs font-bold flex items-center gap-3 animate-scale-pop shadow-md">
                        <FaCheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
                        <span>{actionNotice}</span>
                    </div>
                )}

                {/* EXECUTIVE METRIC SUMMARY CARDS GRID */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <MetricCard
                        title="Total Loan Accounts"
                        value={totalLoanCount}
                        subtitle="Recorded in loan database"
                        icon={<FaCreditCard className="h-4 w-4" />}
                    />

                    <MetricCard
                        title="Active Loans"
                        value={activeLoanCount}
                        subtitle="Currently active or disbursed"
                        badgeText="DISBURSED"
                        badgeVariant="success"
                    />

                    <MetricCard
                        title="Pending Applications"
                        value={pendingAppCount}
                        subtitle="Under review or evaluation"
                        badgeText={pendingAppCount > 0 ? "IN REVIEW" : "NONE"}
                        badgeVariant="warning"
                    />

                    <MetricCard
                        title="Approved Credit Volume"
                        value={`₹ ${totalApprovedVolume.toLocaleString("en-IN")}`}
                        subtitle="Sanctioned credit line volume"
                        icon={<FaHandHoldingUsd className="h-4 w-4 text-emerald-400" />}
                    />
                </div>

                {/* LOAN REPAYMENT PROGRESS VISUALIZER (If Active Loan Exists) */}
                {totalPrincipal > 0 && (
                    <div className="p-6 rounded-2xl bg-[#0F172A]/90 border border-slate-800/90 shadow-xl backdrop-blur-md">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                            <div>
                                <p className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                                    Active Loan Repayment Visualizer
                                </p>
                                <h3 className="text-base font-bold text-white">
                                    Principal Payoff Progress — {primaryActiveLoan.loan_type || "Personal Loan"}
                                </h3>
                            </div>

                            <Badge variant="success" size="md">
                                {repaymentPct}% REPAID
                            </Badge>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60 my-3">
                            <div
                                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-1000"
                                style={{ width: `${repaymentPct}%` }}
                            />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs font-medium text-slate-400">
                            <div>
                                <span>Principal Paid: </span>
                                <span className="font-extrabold text-emerald-400 financial-num">
                                    ₹ {paidPrincipal.toLocaleString("en-IN")}
                                </span>
                            </div>
                            <div>
                                <span>Remaining Principal: </span>
                                <span className="font-extrabold text-slate-200 financial-num">
                                    ₹ {remainingPrincipal.toLocaleString("en-IN")}
                                </span>
                            </div>
                            <div>
                                <span>Total Loan Facility: </span>
                                <span className="font-extrabold text-white financial-num">
                                    ₹ {totalPrincipal.toLocaleString("en-IN")}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* INTERACTIVE MODULE TABS */}
                <Tabs tabs={loanTabs} activeTab={activeTab} onChange={setActiveTab} variant="pill" />

                {/* TAB CONTENT WRAPPER */}
                <div key={activeTab} className="animate-fade-in-up space-y-8">
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

                    {activeTab === "MILESTONES" && <LoanMilestoneTracker activeLoan={loanList[0]} />}

                    {activeTab === "MY_LOANS" && (
                        <>
                            <EMIRepaymentHub />
                            <section>
                                <LoanNocCard noc={noc} />
                            </section>
                            <div className="grid gap-6 md:grid-cols-2">
                                <section className="bg-[#0F172A]/90 rounded-2xl border border-slate-800 p-6 shadow-xl">
                                    <h4 className="text-sm font-bold text-white mb-4">Recent EMI Payment Receipts</h4>
                                    {paymentList.length > 0 ? (
                                        paymentList.map((payment) => <LoanPaymentCard key={payment.id} payment={payment} />)
                                    ) : (
                                        <p className="text-xs text-slate-400 font-medium">No payment receipts logged yet.</p>
                                    )}
                                </section>

                                <section className="bg-[#0F172A]/90 rounded-2xl border border-slate-800 p-6 shadow-xl">
                                    <h4 className="text-sm font-bold text-white mb-4">Disbursement Receipts</h4>
                                    {disbursementList.length > 0 ? (
                                        disbursementList.map((disbursement) => (
                                            <LoanDisbursementCard key={disbursement.id} disbursement={disbursement} />
                                        ))
                                    ) : (
                                        <p className="text-xs text-slate-400 font-medium">No disbursements executed yet.</p>
                                    )}
                                </section>
                            </div>
                        </>
                    )}

                    {activeTab === "OCR_DOCS" && (
                        <>
                            <DocumentOCRHub />
                            <section className="bg-[#0F172A]/90 rounded-2xl border border-slate-800 p-6 shadow-xl">
                                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                                    <FaFolderOpen className="text-cyan-400" /> Vault Documents
                                </h3>
                                {docList.length > 0 ? (
                                    <div className="grid gap-4 md:grid-cols-2">
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

                    {activeTab === "CIBIL" && <CibilScoreMonitor />}
                    {activeTab === "TOP_UP" && <TopUpLoanHub />}
                    {activeTab === "FORECLOSURE" && <ForeclosureHub activeLoan={loanList[0]} />}
                    {activeTab === "VAULTS" && <SavingsVaultsHub />}
                    {activeTab === "TAX_REPORTS" && <TaxCertificatesHub />}
                    {activeTab === "REWARDS" && <FinverseRewardsHub />}
                    {activeTab === "VIRTUAL_CARDS" && <VirtualCardsHub />}

                    {activeTab === "APPLICATIONS" && (
                        <>
                            <div className="grid gap-6 md:grid-cols-2">
                                <LoanKfsCard kfs={kfs} onAccept={acceptKfs} />
                                <LoanAgreementCard agreement={agreement} onSign={signAgreement} />
                            </div>

                            {offerList.length > 0 && (
                                <section>
                                    <div className="mb-4">
                                        <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                                            <FaCheckCircle /> Issued Bank Sanction Offers
                                        </h3>
                                        <p className="text-xs text-slate-400 font-medium">
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
                                    <h3 className="text-base font-bold text-white mb-3">Sanction Approvals Audit</h3>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {approvalList.map((approval) => (
                                            <LoanApprovalCard key={approval.id} approval={approval} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            <section>
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-white">Submitted Loan Applications</h3>
                                    <p className="text-xs text-slate-400 font-medium">
                                        Live audit of your active loan requests & stage progression
                                    </p>
                                </div>

                                {appsLoading ? (
                                    <LoanLoadingState title="Loading loan applications..." />
                                ) : appList.length > 0 ? (
                                    <div className="space-y-4">
                                        {appList.map((app) => (
                                            <div
                                                key={app.id}
                                                className="bg-[#0F172A]/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4"
                                            >
                                                <LoanApplicationCard application={app} />
                                                <div className="border-t border-slate-800 pt-4">
                                                    <p className="text-xs font-bold text-slate-300 mb-2">
                                                        Live Application Progress Timeline:
                                                    </p>
                                                    <LoanApplicationStatus status={app.status || "SUBMITTED"} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center bg-[#0F172A]/90 rounded-2xl border border-slate-800 shadow-xl space-y-3">
                                        <p className="text-sm font-bold text-white">No active loan applications found.</p>
                                        <p className="text-xs text-slate-400">Calculate loan eligibility or click below to apply.</p>
                                        <Button variant="primary" size="sm" onClick={() => setIsApplyModalOpen(true)}>
                                            Submit New Application
                                        </Button>
                                    </div>
                                )}
                            </section>
                        </>
                    )}
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