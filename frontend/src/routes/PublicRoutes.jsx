import { Route, Navigate } from "react-router-dom";

import Home from "../pages/Home/Home";
import LoginPage from "../features/auth/pages/LoginPage";

import ROUTES from "./RouteConstants";

function PublicRoutes() {

    const token = localStorage.getItem("token");

    return (
        <>
            <Route
                path={ROUTES.HOME}
                element={<Home />}
            />

            <Route
                path={ROUTES.LOGIN}
                element={
                    token
                        ? <Navigate to={ROUTES.DASHBOARD} replace />
                        : <LoginPage />
                }
            />
        </>
    );
}

export default PublicRoutes;