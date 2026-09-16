/**

* ==========================================================
* FINVERSE AI
* Admin Panel Routes
* ==========================================================
*
* Location:
* src/admin/routes/AdminPanelRoutes.jsx
*
* Responsibility:
*
* * Define Admin Panel route structure
* * Connect AdminRoutes security guard
* * Connect AdminLayout
* * Register Admin Dashboard
* * Register Admin Users
* * Keep future Admin modules ready
*
* Route Flow:
*
* AdminRoutes
* ```
   ↓
  ```
* AdminLayout
* ```
   ↓
  ```
* ├── Dashboard
* ├── Users
* ├── Accounts
* ├── Transactions
* ├── Loans
* ├── Investments
* ├── Reports
* └── Settings
*
* IMPORTANT:
*
* * No API calls
* * No business logic
* * Authentication protection stays in AdminRoutes
*
* ==========================================================
  */

import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import AdminRoutes from "./AdminRoutes";

import AdminLayout
    from "../layout/AdminLayout";

import AdminDashboard
    from "../pages/AdminDashboard/AdminDashboard";

import AdminUsersPage
    from "../pages/Users/AdminUsersPage";

import AdminUserCustomizationPage
    from "../pages/UserCustomization/AdminUserCustomizationPage";

import AdminProfilePage
    from "../pages/Profile/AdminProfilePage";

import AdminAccountsPage
    from "../pages/Accounts/AdminAccountsPage";

import AdminHistoryPage
    from "../pages/History/AdminHistoryPage";


import AdminTransactionsPage
    from "../pages/Transactions/AdminTransactionsPage";

import AdminLoansPage
    from "../pages/Loans/AdminLoansPage";

import AdminInvestmentsPage
    from "../pages/Investments/AdminInvestmentsPage";

import AdminReportsPage
    from "../pages/Reports/AdminReportsPage";

import AdminSettingsPage
    from "../pages/Settings/AdminSettingsPage";

import AdminAuditLogsPage
    from "../pages/AuditLogs/AdminAuditLogsPage";

// ==========================================================
// ADMIN PANEL ROUTES
// ==========================================================

function AdminPanelRoutes() {

    return (

        <Routes>

            {/* ==================================================
                ADMIN PROTECTED AREA
            ================================================== */}

            <Route element={<AdminRoutes />}>

                {/* ==================================================
                    ADMIN COMMON LAYOUT
                ================================================== */}

                <Route
                    element={<AdminLayout />}
                >

                    {/* ==================================================
                        ADMIN DASHBOARD
                    ================================================== */}

                    <Route
                        index
                        element={<AdminDashboard />}
                    />


                    {/* ==================================================
                        ADMIN PROFILE
                    ================================================== */}

                    <Route
                        path="profile"
                        element={<AdminProfilePage />}
                    />

                    {/* ==================================================
                        AUDIT LOGS
                    ================================================== */}

                    <Route
                        path="audit-logs"
                        element={<AdminAuditLogsPage />}
                    />



                    {/* ==================================================
                        USERS & USER FEATURE CUSTOMIZATION
                    ================================================== */}

                    <Route
                        path="users"
                        element={<AdminUsersPage />}
                    />

                    <Route
                        path="user-features"
                        element={<AdminUserCustomizationPage />}
                    />


                    {/* ==================================================
                        ACCOUNTS
                    ================================================== */}

                    <Route
                        path="accounts"
                        element={<AdminAccountsPage />}
                    />

                    {/* ==================================================
                        HISTORY
                    ================================================== */}

                    <Route
                        path="history"
                        element={<AdminHistoryPage />}
                    />


                    {/* ==================================================
                        TRANSACTIONS
                    ================================================== */}

                    <Route
                        path="transactions"
                        element={<AdminTransactionsPage />}
                    />


                    {/* ==================================================
                        LOANS
                    ================================================== */}

                    <Route
                        path="loans"
                        element={<AdminLoansPage />}
                    />


                    {/* ==================================================
                        INVESTMENTS
                    ================================================== */}

                    <Route
                        path="investments"
                        element={<AdminInvestmentsPage />}
                    />


                    {/* ==================================================
                        REPORTS
                    ================================================== */}

                    <Route
                        path="reports"
                        element={<AdminReportsPage />}
                    />


                    {/* ==================================================
                        SETTINGS
                    ================================================== */}

                    <Route
                        path="settings"
                        element={<AdminSettingsPage />}
                    />

                </Route>

            </Route>



            {/* ==================================================
                FALLBACK
            ================================================== */}

            <Route
                path="*"
                element={
                    <Navigate
                        to="/admin"
                        replace
                    />
                }
            />

        </Routes>

    );

}

// ==========================================================
// TEMPORARY ADMIN MODULE PLACEHOLDER
// ==========================================================

function AdminComingSoon({ title }) {

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
                        This Admin module is planned and
                        will be integrated in the next phase.
                    </p>

                </div>

            </div>

        </div>

    );

}

// ==========================================================
// EXPORT
// ==========================================================

export default AdminPanelRoutes;
