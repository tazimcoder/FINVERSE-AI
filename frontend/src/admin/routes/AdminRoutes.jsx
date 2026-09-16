/**
 * ==========================================================
 * FINVERSE AI
 * Admin Routes
 * ==========================================================
 *
 * Responsibility:
 *
 * - Protect all frontend admin routes
 * - Only ADMIN users can access
 * - Provide nested routing through Outlet
 *
 * ==========================================================
 */

import {
    Navigate,
    Outlet,
} from "react-router-dom";

import useAuth
    from "../../hooks/useAuth";

// ==========================================================
// Admin Route Guard
// ==========================================================

function AdminRoutes() {

    const {
        loading,
        isAuthenticated,
        isAdmin,
    } = useAuth();


    // ======================================================
    // Authentication Loading
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
                            h-10
                            w-10
                            animate-spin
                            rounded-full
                            border-4
                            border-slate-200
                            border-t-blue-600
                        "
                    />

                    <p
                        className="
                            mt-4
                            text-sm
                            font-medium
                            text-slate-600
                        "
                    >
                        Loading Admin Panel...
                    </p>

                </div>

            </div>

        );

    }


    // ======================================================
    // Not Authenticated
    // ======================================================

    if (!isAuthenticated) {

        return (

            <Navigate
                to="/login"
                replace
            />

        );

    }


    // ======================================================
    // Authenticated But Not ADMIN
    // ======================================================

    if (!isAdmin) {

        return (

            <Navigate
                to="/dashboard"
                replace
            />

        );

    }


    // ======================================================
    // ADMIN AUTHORIZED
    //
    // Child admin routes render through Outlet.
    // ======================================================

    return <Outlet />;

}


// ==========================================================
// EXPORT
// ==========================================================

export default AdminRoutes;