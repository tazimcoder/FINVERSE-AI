/**
 * ==========================================================
 * FINVERSE AI
 * Executive Landing Page with Google Material 3 Expressive Cards,
 * Interactive Subsystem Process Tree Modal, Executive Navbar, and HomeFooter
 * ==========================================================
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
    FaWallet,
    FaHandHoldingUsd,
    FaExchangeAlt,
    FaChartLine,
    FaRobot,
    FaArrowRight,
    FaShieldAlt,
    FaSitemap
} from "react-icons/fa";
import HomeNavbar from "../../components/home/HomeNavbar";
import HomeFooter from "../../components/home/HomeFooter";
import ModuleProcessTreeModal from "../../components/home/ModuleProcessTreeModal";


/**
 * Scroll Reveal Hook for Google Material 3 Animation
 */
function useScrollReveal() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.15 }
        );

        const currentRef = ref.current;
        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    return [ref, isVisible];
}

/**
 * Google Material 3 Expressive Card with Ambient Spotlight
 */
function GoogleMaterialCard({ mod, idx, isVisible, onOpenTree }) {
    const Icon = mod.icon;
    const [mousePos, setMousePos] = useState({ x: 0, y: 0, isHovered: false });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            isHovered: true,
        });
    };

    const handleMouseLeave = () => {
        setMousePos((prev) => ({ ...prev, isHovered: false }));
    };

    const revealClass = isVisible ? "animate-google-reveal" : "opacity-0";

    return (
        <div
            style={{ animationDelay: `${idx * 110}ms` }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onOpenTree(mod)}
            className={`group relative rounded-3xl border border-slate-200/90 bg-white p-7 shadow-xs hover:shadow-2xl hover:border-blue-400 hover:-translate-y-2 flex flex-col justify-between cursor-pointer select-none transition-all duration-300 overflow-hidden ${revealClass}`}
        >
            {/* Google Ambient Cursor Spotlight Glow */}
            {mousePos.isHovered && (
                <div
                    className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100"
                    style={{
                        background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.08), transparent 80%)`,
                    }}
                />
            )}

            <div className="relative z-10">
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-6">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${mod.lightBg} shadow-xs group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`h-6 w-6 ${mod.iconColor}`} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/80">
                        {mod.tag}
                    </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {mod.title}
                </h3>
                <p className="mt-3 text-xs text-slate-600 leading-relaxed font-medium">
                    {mod.desc}
                </p>
            </div>

            {/* Google Style Circular Action Button Footer */}
            <div className="relative z-10 mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                    <FaSitemap className="h-3 w-3 text-blue-500" /> View Process Tree
                </span>

                {/* Google Signature Round Action Button */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 shadow-xs transition-all duration-300">
                    <FaArrowRight className="h-3.5 w-3.5" />
                </div>
            </div>
        </div>
    );
}

function Home() {
    const [subsystemRef, subsystemsVisible] = useScrollReveal();

    // Modal State
    const [selectedModule, setSelectedModule] = useState(null);
    const [isTreeModalOpen, setIsTreeModalOpen] = useState(false);

    const openTreeModal = (mod) => {
        setSelectedModule(mod);
        setIsTreeModalOpen(true);
    };

    const modules = [
        {
            title: "Digital Banking & Accounts",
            desc: "Unified multi-account management, checking, savings, multi-currency wallets, and instant balance oversight.",
            icon: FaWallet,
            tag: "Banking Subsystem",
            lightBg: "bg-blue-50/80 border-blue-100",
            iconColor: "text-blue-600",
            treeSteps: [
                {
                    stepNumber: "STEP 01",
                    title: "User Identity & Account Routing",
                    action: "Authenticates request token and loads user's registered checking, savings, and wallet balances.",
                    input: "Auth Token & User ID",
                    engine: "Decrypt Token & Load User Account Records",
                    output: "Active Account Ledger Initialized",
                    subNodes: ["Verify Session Security", "Fetch Currency Preferences", "Load Active Balance Store"]
                },
                {
                    stepNumber: "STEP 02",
                    title: "Multi-Currency Balance Sync",
                    action: "Converts account holdings across foreign currencies (USD, EUR, GBP, INR) using live exchange rates.",
                    input: "Real-Time Foreign Exchange Matrix",
                    engine: "Calculate Currency Valuation & Aggregate Balance",
                    output: "Unified Vault Net Worth Calculated",
                    subNodes: ["Fetch FX Ticker Rates", "Compute Conversion Spreads", "Cache Multi-Currency Totals"]
                },
                {
                    stepNumber: "STEP 03",
                    title: "Atomic Fund Transfer & Ledger Commit",
                    action: "Executes double-entry balance modifications when funds are deposited, withdrawn, or transferred.",
                    input: "Source Account, Recipient Account & Amount",
                    engine: "Debits Source / Credits Recipient with Row Locking",
                    output: "Real-Time Balance Update Complete",
                    subNodes: ["Acquire Row Lock", "Execute SQL Transaction Commit", "Release Locks Safely"]
                },
                {
                    stepNumber: "STEP 04",
                    title: "Audit Log & Real-Time Broadcast",
                    action: "Generates an immutable audit log record and broadcasts balance updates to the frontend interface.",
                    input: "Transaction Reference & Metadata",
                    engine: "Write Security Audit Log & Trigger Socket Event",
                    output: "Instant Notification & UI Refreshed",
                    subNodes: ["Persist Security Log", "Push WebSockets Event", "Generate Digital Receipt"]
                }
            ]
        },
        {
            title: "Smart Loans Marketplace",
            desc: "Automated paperless loan applications, AI credit score assessment, and real-time approval tracking.",
            icon: FaHandHoldingUsd,
            tag: "Credit Subsystem",
            lightBg: "bg-emerald-50/80 border-emerald-100",
            iconColor: "text-emerald-600",
            treeSteps: [
                {
                    stepNumber: "STEP 01",
                    title: "Application Ingestion & Verification",
                    action: "Gathers loan request details, requested tenure, stated income, and collateral assets.",
                    input: "Loan Principal, Tenure & Income Data",
                    engine: "Parse Employment History & Document Uploads",
                    output: "Validated Loan Application Profile",
                    subNodes: ["Verify Income Evidence", "Check Active Liabilities", "Validate Identity Metadata"]
                },
                {
                    stepNumber: "STEP 02",
                    title: "AI Risk Assessment & Credit Scoring",
                    action: "Evaluates credit risk factor, repayment capability, and assigns an optimal interest rate band.",
                    input: "Historical Spend & Repayment Performance",
                    engine: "Run Risk Model & Assign Credit Score Band",
                    output: "Automated Credit Score & Interest Rate Band",
                    subNodes: ["Compute Debt-to-Income Ratio", "Score Credit Reliability", "Determine Risk Category"]
                },
                {
                    stepNumber: "STEP 03",
                    title: "Loan Amortization Generator",
                    action: "Calculates precise monthly EMI payments, total interest payable, and repayment schedule timeline.",
                    input: "Approved Principal, Interest Rate & Term",
                    engine: "Calculate Monthly Amortization Schedule",
                    output: "Interactive EMI & Interest Breakdown Schedule",
                    subNodes: ["Compute Monthly Interest Rate", "Generate Repayment Table", "Set Due Date Calendars"]
                },
                {
                    stepNumber: "STEP 04",
                    title: "Capital Disbursal & Contract Creation",
                    action: "Executes digital contract e-signature and immediately deposits principal into user's checking account.",
                    input: "E-Signature Consent & Target Account ID",
                    engine: "Transfer Principal & Create Active Loan Record",
                    output: "Principal Deposited & Loan Account Live",
                    subNodes: ["Generate Contract PDF", "Deposit Funds to Account", "Activate Repayment Schedule"]
                }
            ]
        },
        {
            title: "Real-Time Transactions",
            desc: "Instant transfer execution, automatic ledger categorization, income analytics, and audit logging.",
            icon: FaExchangeAlt,
            tag: "Ledger Subsystem",
            lightBg: "bg-indigo-50/80 border-indigo-100",
            iconColor: "text-indigo-600",
            treeSteps: [
                {
                    stepNumber: "STEP 01",
                    title: "Transaction Payload Ingestion",
                    action: "Parses transaction requests, validates category tags, and checks account availability.",
                    input: "Amount, Recipient, Category & Notes",
                    engine: "Sanitize Inputs & Validate Account Standing",
                    output: "Verified Transaction Payload",
                    subNodes: ["Validate Input Formatting", "Check Recipient Existence", "Assign Category Tag"]
                },
                {
                    stepNumber: "STEP 02",
                    title: "Anti-Fraud & Limits Gatekeeper",
                    action: "Runs anti-fraud checks, verifies daily transaction limits, and evaluates IP location risk.",
                    input: "User Daily Limit & Session IP",
                    engine: "Evaluate Fraud Filters & Check Daily Usage",
                    output: "Security Clearance Granted",
                    subNodes: ["Check Daily Cap Limit", "Verify IP Location Risk", "Run Anti-Bot Clearance"]
                },
                {
                    stepNumber: "STEP 03",
                    title: "Double-Entry Ledger Execution",
                    action: "Performs atomic database update debiting the sender and crediting the receiver simultaneously.",
                    input: "Sender & Receiver Row Locks",
                    engine: "Execute MySQL Transaction with Isolation Level",
                    output: "Committed Double-Entry Ledger Record",
                    subNodes: ["Lock Sender Balance Row", "Execute Double-Entry SQL", "Release Database Lock"]
                },
                {
                    stepNumber: "STEP 04",
                    title: "Digital Receipt & Audit Logging",
                    action: "Stores immutable audit event details and provides downloadable PDF transaction receipts.",
                    input: "Transaction Hash Reference",
                    engine: "Persist Security Audit & Generate Receipt PDF",
                    output: "Receipt Ready & Audit Log Complete",
                    subNodes: ["Store Audit Event Hash", "Generate Digital Receipt", "Update Analytics Dashboard"]
                }
            ]
        },
        {
            title: "Investment Portfolios",
            desc: "Track stocks, mutual funds, asset performance, net worth valuation, and automated yield tracking.",
            icon: FaChartLine,
            tag: "Wealth Subsystem",
            lightBg: "bg-purple-50/80 border-purple-100",
            iconColor: "text-purple-600",
            treeSteps: [
                {
                    stepNumber: "STEP 01",
                    title: "Live Price Feed Ingestion",
                    action: "Fetches live stock exchange tickers, mutual fund NAVs, and asset pricing updates.",
                    input: "Ticker Symbols & Asset Identifiers",
                    engine: "Stream Live Exchange Data & Price Feeds",
                    output: "Fresh Asset Price Matrix",
                    subNodes: ["Connect Stock Market API", "Fetch NAV Prices", "Update Cache Stream"]
                },
                {
                    stepNumber: "STEP 02",
                    title: "Holding & Net Worth Valuation",
                    action: "Calculates total portfolio valuation, cost basis, and real-time unrealized profit & loss.",
                    input: "Quantity Owned & Purchase Price",
                    engine: "Calculate Net Portfolio Valuation & P&L",
                    output: "Live Portfolio Net Valuation",
                    subNodes: ["Compute Current Asset Value", "Calculate Unrealized P&L", "Determine Net Growth %"]
                },
                {
                    stepNumber: "STEP 03",
                    title: "Asset Allocation Categorization",
                    action: "Groups holdings into Stocks, Mutual Funds, Cash, and Fixed Income for risk diversification analysis.",
                    input: "Individual Asset Holdings",
                    engine: "Categorize Asset Classes & Calculate Weights",
                    output: "Visual Diversification Breakdown Chart",
                    subNodes: ["Compute Stock Asset Share", "Compute Fund Share", "Identify Risk Exposure"]
                },
                {
                    stepNumber: "STEP 04",
                    title: "Predictive Dividend & Return Forecast",
                    action: "Analyzes historical dividend payout rates and projects expected annual investment yields.",
                    input: "Historical Dividend Yield & Market Trends",
                    engine: "Run Predictive Dividend Yield Model",
                    output: "Annual Yield & Growth Forecast",
                    subNodes: ["Project Dividend Payouts", "Estimate Annual Growth", "Display Yield Calendar"]
                }
            ]
        },
        {
            title: "Smart Financial Assistant",
            desc: "Intelligent spending advisory, predictive budget breakdowns, and proactive financial health alerts.",
            icon: FaRobot,
            tag: "Intelligence Subsystem",
            lightBg: "bg-cyan-50/80 border-cyan-100",
            iconColor: "text-cyan-600",
            treeSteps: [
                {
                    stepNumber: "STEP 01",
                    title: "Expense Telemetry Aggregation",
                    action: "Gathers categorized transaction history to construct user spending patterns over time.",
                    input: "Categorized Ledger Records & Dates",
                    engine: "Aggregate Expenses by Merchant & Category",
                    output: "Clean Monthly Spend Dataset",
                    subNodes: ["Group Category Totals", "Normalize Expense Data", "Calculate Average Spend"]
                },
                {
                    stepNumber: "STEP 02",
                    title: "Spending Anomaly & Spike Detection",
                    action: "Runs statistical anomaly detection to highlight unusual merchant charges or subscription leaks.",
                    input: "Historical Spending Baseline",
                    engine: "Flag Spikes Exceeding Standard Deviation",
                    output: "Flagged Budget Anomalies",
                    subNodes: ["Detect Unused Subscriptions", "Identify Expense Spikes", "Flag Recurring Leaks"]
                },
                {
                    stepNumber: "STEP 03",
                    title: "Smart Budget Advisory Engine",
                    action: "Generates tailored financial advice, recommended savings goals, and budget adjustments.",
                    input: "Financial Objectives & Income Streams",
                    engine: "Generate Smart Savings Recommendations",
                    output: "Personalized Wealth Recommendations",
                    subNodes: ["Suggest Budget Caps", "Recommend Savings Goals", "Optimize Debt Payoff"]
                },

                {
                    stepNumber: "STEP 04",
                    title: "Proactive Notification Push",
                    action: "Sends timely smart alerts for upcoming bill due dates, budget thresholds, and savings milestones.",
                    input: "Generated Advisory Insights",
                    engine: "Dispatch Push Alerts & Dashboard Cards",
                    output: "Actionable Smart Alert Sent",
                    subNodes: ["Schedule Bill Reminders", "Push Budget Threshold Alert", "Highlight Savings Milestone"]
                }
            ]
        },
        {
            title: "Enterprise Audit & Security",
            desc: "Role-based access controls, encrypted authorization tokens, and immutable security audit trail logs.",
            icon: FaShieldAlt,
            tag: "Security Subsystem",
            lightBg: "bg-emerald-50/80 border-emerald-100",
            iconColor: "text-emerald-600",
            treeSteps: [
                {
                    stepNumber: "STEP 01",
                    title: "Request Telemetry Capture",
                    action: "Extracts request IP address, user agent, authorization headers, and target API endpoint.",
                    input: "HTTP Request Metadata & IP Token",
                    engine: "Extract Session Claims & Security Context",
                    output: "Captured Request Security Context",
                    subNodes: ["Extract User IP Address", "Verify JWT Signature", "Capture Target Route URI"]
                },
                {
                    stepNumber: "STEP 02",
                    title: "RBAC Role Policy Enforcement",
                    action: "Evaluates user role (ADMIN vs USER) against route permission matrices to prevent unauthorized access.",
                    input: "User Role Claim & Route Scope",
                    engine: "Enforce Role Middleware Permission Check",
                    output: "Authorization Granted / Request Denied",
                    subNodes: ["Check Admin Permission", "Validate Endpoint Scope", "Enforce Access Rules"]
                },
                {
                    stepNumber: "STEP 03",
                    title: "Immutable Security Audit Ingestion",
                    action: "Persists audit log records with action name, timestamp, affected resource, and user ID.",
                    input: "Action Type, User ID & Timestamp",
                    engine: "Persist Record in Audit Log Database Table",
                    output: "Auditable Security Event Saved",
                    subNodes: ["Format Audit Entry", "Write to MySQL Audit Table", "Update Admin Log Stream"]
                },
                {
                    stepNumber: "STEP 04",
                    title: "Anti-Brute Force Rate Containment",
                    action: "Monitors login failure attempts and automatically locks out suspicious IP addresses.",
                    input: "Failed Login Attempts Counter per IP",
                    engine: "Trigger HTTP 429 Lockout if Exceeded",
                    output: "System Protection Active",
                    subNodes: ["Track IP Failure Count", "Enforce 15-Min Lockout", "Log Threat Incident"]
                }
            ]
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative overflow-x-hidden selection:bg-blue-600 selection:text-white flex flex-col justify-between">

            {/* ==================================================
                BACKGROUND AMBIENT MESH
            ================================================== */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: `radial-gradient(#2563eb 1px, transparent 1px)`,
                        backgroundSize: '24px 24px',
                    }}
                />

                <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-linear-to-b from-blue-200/40 via-indigo-100/30 to-transparent blur-3xl rounded-full" />
                <div className="absolute top-[600px] right-[-100px] w-[500px] h-[500px] bg-emerald-100/30 blur-3xl rounded-full" />
                <div className="absolute top-[1200px] left-[-100px] w-[500px] h-[500px] bg-blue-100/30 blur-3xl rounded-full" />
            </div>

            {/* ==================================================
                EXECUTIVE NAVIGATION BAR
            ================================================== */}
            <HomeNavbar />

            {/* ==================================================
                HERO SECTION
            ================================================== */}
            <main className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-20 text-center">

                {/* Title */}
                <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.1]">
                    FINVERSE
                </h1>


                {/* Description */}
                <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
                    Manage your accounts, transactions, savings, investments and financial decisions from one intelligent platform.
                </p>

                {/* Primary Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/login"
                        className="w-full sm:w-auto rounded-2xl bg-blue-600 px-8 py-3.5 text-sm font-bold text-white hover:bg-blue-700 transition shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <span>Login</span>
                        <FaArrowRight className="h-3.5 w-3.5" />
                    </Link>

                    <Link
                        to="/register"
                        className="w-full sm:w-auto rounded-2xl border border-slate-300 bg-white px-8 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-100 transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <span>Create Account</span>
                    </Link>
                </div>

                {/* ==================================================
                    GOOGLE MATERIAL 3 EXPRESSIVE CARDS GRID
                ================================================== */}
                <section id="core-components" ref={subsystemRef} className="mt-28 text-left scroll-mt-24">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                            Platform Core Components
                        </h2>
                        <p className="mt-3 text-sm text-slate-600 font-medium">
                            Integrated subsystems powering the FINVERSE AI financial ecosystem. Hover over any card for ambient spotlight, or click to view its process tree.
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {modules.map((mod, idx) => (
                            <GoogleMaterialCard
                                key={mod.title}
                                mod={mod}
                                idx={idx}
                                isVisible={subsystemsVisible}
                                onOpenTree={openTreeModal}
                            />
                        ))}
                    </div>
                </section>

            </main>

            {/* ==================================================
                PROCESS TREE MODAL OVERLAY
            ================================================== */}
            <ModuleProcessTreeModal
                module={selectedModule}
                isOpen={isTreeModalOpen}
                onClose={() => setIsTreeModalOpen(false)}
            />

            {/* ==================================================
                EXECUTIVE FOOTER
            ================================================== */}
            <HomeFooter />

        </div>
    );
}

export default Home;