import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import LoginPage from "../features/auth/pages/LoginPage";
import AccountsPage from "../features/accounts/pages/AccountsPage";
import TransactionsPage from "../features/transactions/pages/TransactionsPage";
import NotFound from "../pages/Error/NotFound";

function AppRoutes() {

    const token = localStorage.getItem("token");

    return (

        <BrowserRouter>

            <Routes>

                {/* Home */}

                <Route
                    path="/"
                    element={
                        token
                            ? <Navigate to="/dashboard" replace />
                            : <Home />
                    }
                />

                {/* Login */}

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                {/* Dashboard */}

                <Route
                    path="/dashboard"
                    element={
                        token
                            ? <Dashboard />
                            : <Navigate to="/login" replace />
                    }
                />

                {/* Accounts */}

                <Route
                    path="/accounts"
                    element={
                        token
                            ? <AccountsPage />
                            : <Navigate to="/login" replace />
                    }
                />

                {/* Transactions */}

                <Route
                    path="/transactions"
                    element={
                        token
                            ? <TransactionsPage />
                            : <Navigate to="/login" replace />
                    }
                />

                {/* 404 */}

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;