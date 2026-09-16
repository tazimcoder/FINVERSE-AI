/**
 * ==========================================================
 * FINVERSE AI
 * Public Routes
 * ==========================================================
 */

import { Route, Navigate } from "react-router-dom";

import Home from "../pages/Home/Home";
import LoginPage from "../features/auth/pages/LoginPage";
import Register from "../pages/Auth/Register";

import ROUTES from "./RouteConstants";

function PublicRoutes() {

    const token = localStorage.getItem("token");

    return (
        <>
            {/* ==================================================
                HOME
            ================================================== */}

            <Route
                path={ROUTES.HOME}
                element={
                    token
                        ? <Navigate to={ROUTES.DASHBOARD} replace />
                        : <Home />
                }
            />

            {/* ==================================================
                LOGIN
            ================================================== */}

            <Route
                path={ROUTES.LOGIN}
                element={
                    token
                        ? <Navigate to={ROUTES.DASHBOARD} replace />
                        : <LoginPage />
                }
            />

            {/* ==================================================
                REGISTER
            ================================================== */}

            <Route
                path={ROUTES.REGISTER}
                element={
                    token
                        ? <Navigate to={ROUTES.DASHBOARD} replace />
                        : <Register />
                }
            />
        </>
    );
}

export default PublicRoutes;