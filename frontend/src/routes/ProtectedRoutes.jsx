/**
 * ==========================================================
 * FINVERSE AI
 * Protected Routes
 * ==========================================================
 *
 * Responsibility:
 * - Protect authenticated routes
 * - Wait for authentication restoration
 * - Redirect unauthenticated users to Login
 * - Prepare role-based route protection
 * ==========================================================
 */

import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import ROUTES from "./RouteConstants";


function ProtectedRoutes() {

    const {
        loading,
        isAuthenticated,
    } = useAuth();


    // ======================================================
    // Authentication State Loading
    // ======================================================

    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center">

                <p className="text-slate-500">
                    Loading FINVERSE AI...
                </p>

            </div>
        );

    }


    // ======================================================
    // Authentication Check
    // ======================================================

    if (!isAuthenticated) {

        return (
            <Navigate
                to={ROUTES.LOGIN}
                replace
            />
        );

    }


    // ======================================================
    // Protected Route
    // ======================================================

    return <Outlet />;

}


export default ProtectedRoutes;