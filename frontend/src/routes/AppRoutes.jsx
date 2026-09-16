/**
 * ==========================================================
 * FINVERSE AI
 * Application Routes
 * ==========================================================
 *
 * Responsibility:
 *
 * - Public routes
 * - Protected USER routes
 * - Protected ADMIN routes
 * - Authentication-based navigation
 * - Role-based authorization
 * - Loan module routes
 *
 * ==========================================================
 */

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import useAuth from "../hooks/useAuth";

import Home from "../pages/Home/Home";

import LoginPage from "../features/auth/pages/LoginPage";

import RegisterPage from "../features/auth/pages/RegisterPage";

import Dashboard from "../pages/Dashboard/Dashboard";

import AIAssistantPage from "../features/ai/pages/AIAssistantPage";

import UserProfilePage from "../features/profile/pages/UserProfilePage";



// ==========================================================
// LOAN MODULE
// ==========================================================

import LoanPage from "../features/loan/pages/LoanPage";


// ==========================================================
// ADMIN MODULE
// ==========================================================

import AdminRoutes from "../admin/routes/AdminRoutes";

import AdminLayout from "../admin/layout/AdminLayout";

import AdminDashboard from "../admin/pages/AdminDashboard/AdminDashboard";

import AdminUsersPage from "../admin/pages/Users/AdminUsersPage";

import AdminUserCustomizationPage from "../admin/pages/UserCustomization/AdminUserCustomizationPage";

import AdminAccountsPage from "../admin/pages/Accounts/AdminAccountsPage";

import AdminHistoryPage from "../admin/pages/History/AdminHistoryPage";

import AdminProfilePage from "../admin/pages/Profile/AdminProfilePage";

import AdminLoansPage from "../admin/pages/Loans/AdminLoansPage";

import AdminInvestmentsPage from "../admin/pages/Investments/AdminInvestmentsPage";

import AdminReportsPage from "../admin/pages/Reports/AdminReportsPage";

import AdminSettingsPage from "../admin/pages/Settings/AdminSettingsPage";

import AdminAuditLogsPage from "../admin/pages/AuditLogs/AdminAuditLogsPage";

import AdminPropertyValuationPage from "../admin/pages/PropertyValuation/AdminPropertyValuationPage";




// ==========================================================
// ERROR PAGE
// ==========================================================

import NotFound from "../pages/Error/NotFound";


// ==========================================================
// ROUTE CONSTANTS
// ==========================================================

import ROUTES from "./RouteConstants";


// ==========================================================
// APPLICATION ROUTES
// ==========================================================

function AppRoutes() {

    const {
        loading,
        isAuthenticated,
        isAdmin,
        isUser,
    } = useAuth();


    // ======================================================
    // AUTHENTICATION LOADING
    // ======================================================

    if (loading) {

        return (
            <div
                className="
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    bg-slate-50
                "
            >

                <div className="text-center">

                    <div
                        className="
                            mx-auto
                            mb-4
                            h-10
                            w-10
                            animate-spin
                            rounded-full
                            border-4
                            border-blue-600
                            border-t-transparent
                        "
                    />

                    <p
                        className="
                            text-sm
                            font-medium
                            text-slate-600
                        "
                    >
                        Loading FINVERSE AI...
                    </p>

                </div>

            </div>
        );

    }


    return (

        <BrowserRouter>

            <Routes>


                {/* ==================================================
                    HOME
                ================================================== */}

                <Route
                    path={ROUTES.HOME}
                    element={
                        isAuthenticated ? (

                            isAdmin ? (

                                <Navigate
                                    to="/admin"
                                    replace
                                />

                            ) : (

                                <Navigate
                                    to={ROUTES.DASHBOARD}
                                    replace
                                />

                            )

                        ) : (

                            <Home />

                        )
                    }
                />


                {/* ==================================================
                    LOGIN
                ================================================== */}

                <Route
                    path={ROUTES.LOGIN}
                    element={
                        isAuthenticated ? (

                            isAdmin ? (

                                <Navigate
                                    to="/admin"
                                    replace
                                />

                            ) : (

                                <Navigate
                                    to={ROUTES.DASHBOARD}
                                    replace
                                />

                            )

                        ) : (

                            <LoginPage />

                        )
                    }
                />


                {/* ==================================================
                    REGISTER
                ================================================== */}

                <Route
                    path={ROUTES.REGISTER}
                    element={
                        isAuthenticated ? (

                            isAdmin ? (

                                <Navigate
                                    to="/admin"
                                    replace
                                />

                            ) : (

                                <Navigate
                                    to={ROUTES.DASHBOARD}
                                    replace
                                />

                            )

                        ) : (

                            <RegisterPage />

                        )
                    }
                />


                {/* ==================================================
                    USER DASHBOARD
                ================================================== */}

                <Route
                    path={ROUTES.DASHBOARD}
                    element={
                        !isAuthenticated ? (

                            <Navigate
                                to={ROUTES.LOGIN}
                                replace
                            />

                        ) : isAdmin ? (

                            <Navigate
                                to="/admin"
                                replace
                            />

                        ) : isUser ? (

                            <Navigate
                                to={ROUTES.LOANS}
                                replace
                            />

                        ) : (

                            <Navigate
                                to={ROUTES.LOGIN}
                                replace
                            />

                        )
                    }
                />


                {/* ==================================================
                    REMOVED FINANCIAL MODULE REDIRECTS
                ================================================== */}
                <Route path={ROUTES.ACCOUNTS} element={<Navigate to={ROUTES.LOANS} replace />} />
                <Route path={ROUTES.TRANSACTIONS} element={<Navigate to={ROUTES.LOANS} replace />} />
                <Route path={ROUTES.ANALYTICS} element={<Navigate to={ROUTES.LOANS} replace />} />
                <Route path={ROUTES.BUDGETS} element={<Navigate to={ROUTES.LOANS} replace />} />
                <Route path={ROUTES.INVESTMENTS} element={<Navigate to={ROUTES.LOANS} replace />} />
                <Route path="/wallet" element={<Navigate to={ROUTES.LOANS} replace />} />

                {/* ==================================================
                    AI ASSISTANT
                ================================================== */}

                <Route
                    path={ROUTES.AI_ASSISTANT}
                    element={
                        !isAuthenticated ? (

                            <Navigate
                                to={ROUTES.LOGIN}
                                replace
                            />

                        ) : isAdmin ? (

                            <Navigate
                                to="/admin"
                                replace
                            />

                        ) : (

                            <AIAssistantPage />

                        )
                    }
                />


                {/* ==================================================
                    USER LOANS & FINANCIAL MODULES
                ================================================== */}

                {["/loans", "/calculator", "/repay-hub", "/documents", "/credit-health", "/agreements", "/top-up", "/foreclosure", "/vaults", "/tax-reports", "/rewards", "/virtual-cards"].map((path) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            !isAuthenticated ? (
                                <Navigate to={ROUTES.LOGIN} replace />
                            ) : isAdmin ? (
                                <Navigate to="/admin" replace />
                            ) : (
                                <LoanPage />
                            )
                        }
                    />
                ))}


                {/* ==================================================
                    USER PROFILE & SETTINGS
                ================================================== */}

                <Route
                    path="/profile"
                    element={
                        !isAuthenticated ? (
                            <Navigate to={ROUTES.LOGIN} replace />
                        ) : (
                            <UserProfilePage />
                        )
                    }
                />



                {/* ==================================================
                    ADMIN PANEL
                ================================================== */}

                <Route
                    path="/admin"
                    element={<AdminRoutes />}
                >

                    <Route
                        element={<AdminLayout />}
                    >

                        <Route
                            index
                            element={<AdminDashboard />}
                        />

                        <Route
                            path="dashboard"
                            element={<AdminDashboard />}
                        />

                        <Route
                            path="profile"
                            element={<AdminProfilePage />}
                        />

                        <Route
                            path="audit-logs"
                            element={<AdminAuditLogsPage />}
                        />

                        <Route
                            path="users"
                            element={<AdminUsersPage />}
                        />

                        <Route
                            path="user-features"
                            element={<AdminUserCustomizationPage />}
                        />


                        <Route
                            path="accounts"
                            element={<AdminAccountsPage />}
                        />

                        <Route
                            path="history"
                            element={<AdminHistoryPage />}
                        />

                        <Route
                            path="transactions"
                            element={<Navigate to="/admin/history" replace />}
                        />

                        <Route
                            path="loans"
                            element={<AdminLoansPage />}
                        />

                        <Route
                            path="investments"
                            element={<AdminInvestmentsPage />}
                        />

                        <Route
                            path="property-valuation"
                            element={<AdminPropertyValuationPage />}
                        />

                        <Route
                            path="reports"
                            element={<AdminReportsPage />}
                        />

                        <Route
                            path="settings"
                            element={<AdminSettingsPage />}
                        />


                    </Route>

                </Route>


                {/* ==================================================
                    NOT FOUND
                ================================================== */}

                <Route
                    path="*"
                    element={<NotFound />}
                />


            </Routes>

        </BrowserRouter>

    );

}


// ==========================================================
// ADMIN MODULE PLACEHOLDER
// ==========================================================

function AdminModulePlaceholder({
    title
}) {

    return (

        <div
            className="
                min-h-[calc(100vh-5rem)]
                bg-slate-50
                px-6
                py-8
            "
        >

            <div
                className="
                    mx-auto
                    max-w-7xl
                "
            >

                <div
                    className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-8
                        shadow-sm
                    "
                >

                    <p
                        className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-[0.18em]
                            text-blue-600
                        "
                    >
                        FINVERSE AI
                    </p>


                    <h1
                        className="
                            mt-2
                            text-2xl
                            font-extrabold
                            text-slate-900
                        "
                    >
                        {title}
                    </h1>


                    <p
                        className="
                            mt-2
                            text-sm
                            text-slate-500
                        "
                    >
                        This Admin module is planned and will be integrated in a future phase.
                    </p>

                </div>

            </div>

        </div>

    );

}


export default AppRoutes;