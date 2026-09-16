/**
 * ==========================================================
 * FINVERSE AI — Executive Public Routes
 * Routing for Landing Page, Executive Login, and Executive Register
 * ==========================================================
 */

import { Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ROUTES from "./RouteConstants";

function PublicRoutes() {
  const token = localStorage.getItem("token");

  return (
    <>
      {/* HOME */}
      <Route
        path={ROUTES.HOME}
        element={
          token ? <Navigate to={ROUTES.DASHBOARD} replace /> : <Home />
        }
      />

      {/* LOGIN */}
      <Route
        path={ROUTES.LOGIN}
        element={
          token ? <Navigate to={ROUTES.DASHBOARD} replace /> : <LoginPage />
        }
      />

      {/* REGISTER */}
      <Route
        path={ROUTES.REGISTER}
        element={
          token ? <Navigate to={ROUTES.DASHBOARD} replace /> : <RegisterPage />
        }
      />
    </>
  );
}

export default PublicRoutes;