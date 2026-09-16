/**
 * ==========================================================
 * FINVERSE AI
 * Express Application
 * ==========================================================
 *
 * File:
 * backend/src/app.js
 *
 * Responsibility:
 *
 * - Configure Express application
 * - Register authentication routes
 * - Register USER / COMMON routes
 * - Register ADMIN routes
 * - Register complete LOAN module routes
 * - Register Loan Guarantor routes
 * - Register Loan Disbursement routes
 * - Register Loan Status History routes
 * - Register Property Valuation routes
 * - Register Loan Lifecycle routes
 * - Provide API health check
 * - Handle unknown routes
 *
 * ==========================================================
 */

import express from "express";
import cors from "cors";


import { authenticateToken } from "./middleware/auth.middleware.js";

import authRoutes
    from "./routes/auth.routes.js";



// ==========================================================
// USER / COMMON ROUTES
// ==========================================================

import accountRoutes
    from "./routes/account.routes.js";

import transactionRoutes
    from "./routes/transaction.routes.js";

import dashboardRoutes
    from "./routes/dashboard.routes.js";

import analyticsRoutes
    from "./routes/analytics.routes.js";

import budgetRoutes
    from "./routes/budget.routes.js";

import aiRoutes
    from "./routes/ai.routes.js";

import feedbackRoutes
    from "./routes/feedback.routes.js";

import chatRoutes
    from "./routes/chat.routes.js";

import investmentRoutes
    from "./routes/investment.routes.js";

import userFeaturesRoutes
    from "./routes/userFeatures.routes.js";



// ==========================================================
// ADMIN ROUTES
// ==========================================================

import adminRoutes
    from "./admin/routes/admin.routes.js";


// ==========================================================
// LOAN MODULE ROUTES
// ==========================================================


// ----------------------------------------------------------
// Loan Product
// ----------------------------------------------------------

import loanProductRoutes
    from "./modules/loan/routes/loanProductRoutes.js";


// ----------------------------------------------------------
// Loan Application
// ----------------------------------------------------------

import loanApplicationRoutes
    from "./modules/loan/routes/loanApplicationRoutes.js";


// ----------------------------------------------------------
// Loan Applicant Profile
// ----------------------------------------------------------

import loanApplicantProfileRoutes
    from "./modules/loan/routes/loanApplicantProfileRoutes.js";


// ----------------------------------------------------------
// Loan Core
// ----------------------------------------------------------

import loanRoutes
    from "./modules/loan/routes/loanRoutes.js";


// ----------------------------------------------------------
// Loan Property
// ----------------------------------------------------------

import loanPropertyRoutes
    from "./modules/loan/routes/loanPropertyRoutes.js";


// ----------------------------------------------------------
// Loan Document
// ----------------------------------------------------------

import loanDocumentRoutes
    from "./modules/loan/routes/loanDocumentRoutes.js";


// ----------------------------------------------------------
// Loan Eligibility
// ----------------------------------------------------------

import loanEligibilityRoutes
    from "./modules/loan/routes/loanEligibilityRoutes.js";


// ----------------------------------------------------------
// Loan Repayment Schedule
// ----------------------------------------------------------

import loanRepaymentScheduleRoutes
    from "./modules/loan/routes/loanRepaymentScheduleRoutes.js";


// ----------------------------------------------------------
// Loan Approval
// ----------------------------------------------------------

import loanApprovalRoutes
    from "./modules/loan/routes/loanApprovalRoutes.js";


// ----------------------------------------------------------
// Loan Offer
// ----------------------------------------------------------

import loanOfferRoutes
    from "./modules/loan/routes/loanOfferRoutes.js";


// ----------------------------------------------------------
// Loan Verification Check
// ----------------------------------------------------------

import loanVerificationCheckRoutes
    from "./modules/loan/routes/loanVerificationCheckRoutes.js";


// ----------------------------------------------------------
// Loan Collateral
// ----------------------------------------------------------

import loanCollateralRoutes
    from "./modules/loan/routes/loanCollateralRoutes.js";


// ----------------------------------------------------------
// Loan Payment
// ----------------------------------------------------------

import loanPaymentRoutes
    from "./modules/loan/routes/loanPaymentRoutes.js";


// ----------------------------------------------------------
// Loan Penalty
// ----------------------------------------------------------

import loanPenaltyRoutes
    from "./modules/loan/routes/loanPenaltyRoutes.js";


// ----------------------------------------------------------
// Loan Guarantor
// ----------------------------------------------------------

import loanGuarantorRoutes
    from "./modules/loan/routes/loanGuarantorRoutes.js";


// ----------------------------------------------------------
// Loan Disbursement
// ----------------------------------------------------------

import loanDisbursementRoutes
    from "./modules/loan/routes/loanDisbursementRoutes.js";


// ----------------------------------------------------------
// Loan Status History
// ----------------------------------------------------------

import loanStatusHistoryRoutes
    from "./modules/loan/routes/loanStatusHistoryRoutes.js";


// ----------------------------------------------------------
// Property Valuation
// ----------------------------------------------------------

import propertyValuationRoutes
    from "./modules/loan/routes/propertyValuationRoutes.js";


// ----------------------------------------------------------
// Loan Lifecycle
// ----------------------------------------------------------

import loanLifecycleRoutes
    from "./modules/loan/routes/loanLifecycleRoutes.js";

import loanKfsRoutes
    from "./modules/loan/routes/loanKfsRoutes.js";

import loanAgreementRoutes
    from "./modules/loan/routes/loanAgreementRoutes.js";

import loanForeclosureRoutes
    from "./modules/loan/routes/loanForeclosureRoutes.js";

import loanNocRoutes
    from "./modules/loan/routes/loanNocRoutes.js";


// ==========================================================
// CREATE EXPRESS APPLICATION
// ==========================================================

const app =
    express();


// ==========================================================
// GLOBAL MIDDLEWARE
// ==========================================================


// ----------------------------------------------------------
// CORS Configuration
// Allow all local development origins dynamically (5173, 5174, etc.)
// ----------------------------------------------------------

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl)
            if (!origin) return callback(null, true);
            // Allow any http://localhost or http://127.0.0.1 origin
            if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
                return callback(null, origin);
            }
            return callback(null, origin);
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    })
);



// ----------------------------------------------------------
// JSON BODY PARSER (Support up to 50mb for avatar image uploads)
// ----------------------------------------------------------

app.use(
    express.json({ limit: "50mb" })
);


// ----------------------------------------------------------
// URL ENCODED BODY PARSER
// ----------------------------------------------------------

app.use(
    express.urlencoded({
        limit: "50mb",
        extended: true
    })
);


// ==========================================================
// HEALTH CHECK
// ==========================================================

app.get(
    "/",
    (req, res) => {

        return res.status(200).json({

            success: true,

            message:
                "FINVERSE AI Backend Running 🚀"

        });

    }
);


// ==========================================================
// AUTHENTICATION ROUTES
// ==========================================================

app.use(
    "/api/v1/auth",
    authRoutes
);


// ==========================================================
// USER / COMMON ROUTES
// ==========================================================


// ----------------------------------------------------------
// Accounts
// ----------------------------------------------------------

app.use(
    "/api/v1/accounts",
    accountRoutes
);


// ----------------------------------------------------------
// Transactions
// ----------------------------------------------------------

app.use(
    "/api/v1/transactions",
    transactionRoutes
);


// ----------------------------------------------------------
// Dashboard
// ----------------------------------------------------------

app.use(
    "/api/v1/dashboard",
    dashboardRoutes
);


// ----------------------------------------------------------
// Analytics
// ----------------------------------------------------------

app.use(
    "/api/v1/analytics",
    analyticsRoutes
);


// ----------------------------------------------------------
// Budgets
// ----------------------------------------------------------

app.use(
    "/api/v1/budgets",
    budgetRoutes
);


// ----------------------------------------------------------
// AI
// ----------------------------------------------------------

app.use(
    "/api/v1/ai",
    aiRoutes
);


// ----------------------------------------------------------
// Feedback
// ----------------------------------------------------------

app.use(
    "/api/v1/feedback",
    feedbackRoutes
);


// ----------------------------------------------------------
// Chats
// ----------------------------------------------------------

app.use(
    "/api/v1/chats",
    chatRoutes
);


app.use(
    "/api/v1/user",
    userFeaturesRoutes
);

// ----------------------------------------------------------
// Investments
// ----------------------------------------------------------

app.use(
    "/api/v1/investments",
    investmentRoutes
);



// ==========================================================
// LOAN MODULE
// ==========================================================


// ----------------------------------------------------------
// ----------------------------------------------------------
// Loan Products
// ----------------------------------------------------------

app.use(
    "/api/v1/loan-products",
    authenticateToken,
    loanProductRoutes
);


// ----------------------------------------------------------
// Loan Applications
// ----------------------------------------------------------

app.use(
    "/api/v1/loan-applications",
    authenticateToken,
    loanApplicationRoutes
);


// ----------------------------------------------------------
// Loan Applicant Profiles
// ----------------------------------------------------------

app.use(
    "/api/v1/loan-applicant-profiles",
    authenticateToken,
    loanApplicantProfileRoutes
);


// ----------------------------------------------------------
// Loans
// ----------------------------------------------------------

app.use(
    "/api/v1/loans",
    authenticateToken,
    loanRoutes
);


// ----------------------------------------------------------
// Loan Properties
// ----------------------------------------------------------

app.use(
    "/api/v1/loan-properties",
    authenticateToken,
    loanPropertyRoutes
);


// ----------------------------------------------------------
// Loan Documents
// ----------------------------------------------------------

app.use(
    "/api/v1/loan-documents",
    authenticateToken,
    loanDocumentRoutes
);


// ----------------------------------------------------------
// Loan Eligibility
// ----------------------------------------------------------

app.use(
    "/api/v1/loan-eligibility",
    authenticateToken,
    loanEligibilityRoutes
);


// ----------------------------------------------------------
// Loan Repayment Schedules
// ----------------------------------------------------------

app.use(
    "/api/v1/loan-repayment-schedules",
    authenticateToken,
    loanRepaymentScheduleRoutes
);


// ----------------------------------------------------------
// Loan Approvals
// ----------------------------------------------------------

app.use(
    "/api/v1/loan-approvals",
    authenticateToken,
    loanApprovalRoutes
);


// ----------------------------------------------------------
// Loan Offers
// ----------------------------------------------------------

app.use(
    "/api/v1/loan-offers",
    authenticateToken,
    loanOfferRoutes
);


// ----------------------------------------------------------
// Loan Verification Checks
// ----------------------------------------------------------

app.use(
    "/api/v1/loan-verification-checks",
    authenticateToken,
    loanVerificationCheckRoutes
);


// ----------------------------------------------------------
// Loan Collaterals
// ----------------------------------------------------------

app.use(
    "/api/v1/loan-collaterals",
    authenticateToken,
    loanCollateralRoutes
);


// ----------------------------------------------------------
// Loan Payments
// ----------------------------------------------------------

app.use(
    "/api/v1/loan-payments",
    authenticateToken,
    loanPaymentRoutes
);


// ----------------------------------------------------------
// Loan Penalties
// ----------------------------------------------------------

app.use(
    "/api/v1/loan-penalties",
    authenticateToken,
    loanPenaltyRoutes
);


// ----------------------------------------------------------
// Loan Guarantors
// ----------------------------------------------------------

app.use(
    "/api/v1/loan-guarantors",
    authenticateToken,
    loanGuarantorRoutes
);


// ----------------------------------------------------------
// Loan Disbursements
// ----------------------------------------------------------

app.use(
    "/api/v1/loan-disbursements",
    authenticateToken,
    loanDisbursementRoutes
);


// ----------------------------------------------------------
// Loan Status History
// ----------------------------------------------------------

app.use(
    "/api/v1/loan-status-history",
    authenticateToken,
    loanStatusHistoryRoutes
);


// ----------------------------------------------------------
// Property Valuations
// ----------------------------------------------------------

app.use(
    "/api/v1/property-valuations",
    authenticateToken,
    propertyValuationRoutes
);


// ----------------------------------------------------------
// Loan Lifecycle
// ----------------------------------------------------------

app.use(
    "/api/v1/loan-lifecycle",
    authenticateToken,
    loanLifecycleRoutes
);


// ----------------------------------------------------------
// Loan KFS
// ----------------------------------------------------------

app.use(
    "/api/v1/loan-kfs",
    authenticateToken,
    loanKfsRoutes
);


// ----------------------------------------------------------
// Loan Agreements
// ----------------------------------------------------------

app.use(
    "/api/v1/loan-agreements",
    authenticateToken,
    loanAgreementRoutes
);


// ----------------------------------------------------------
// Loan Foreclosures
// ----------------------------------------------------------

app.use(
    "/api/v1/loan-foreclosures",
    authenticateToken,
    loanForeclosureRoutes
);


// ----------------------------------------------------------
// Loan NOCs
// ----------------------------------------------------------

app.use(
    "/api/v1/loan-nocs",
    authenticateToken,
    loanNocRoutes
);



// ==========================================================
// ADMIN ROUTES
// ==========================================================
//
// adminRoutes internally applies:
//
// authenticateToken
// +
// adminOnly
//
// Therefore every route under:
//
// /api/v1/admin/*
//
// is ADMIN ONLY.
//
// ==========================================================

app.use(
    "/api/v1/admin",
    adminRoutes
);


// ==========================================================
// 404 — ROUTE NOT FOUND
// ==========================================================

app.use(
    (req, res) => {

        return res.status(404).json({

            success: false,

            message:
                "Route Not Found"

        });

    }
);


// ==========================================================
// EXPORT APPLICATION
// ==========================================================

export default app;

