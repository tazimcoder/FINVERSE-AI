import { Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import ROUTES from "./RouteConstants";

function ProtectedRoutes() {

    const token = localStorage.getItem("token");

    return (
        <>
            <Route
                path={ROUTES.DASHBOARD}
                element={
                    token
                        ? <Dashboard />
                        : <Navigate to={ROUTES.LOGIN} replace />
                }
            />
        </>
    );

}

export default ProtectedRoutes;