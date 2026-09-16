/**
 * ==========================================================
 * FINVERSE AI
 * Application Entry Point
 * ==========================================================
 *
 * Responsibility:
 * - React application bootstrap
 * - Global CSS loading
 * - Authentication Provider
 * - Root application rendering
 *
 * IMPORTANT:
 * AuthProvider must wrap the complete application so that
 * authentication state is available throughout FINVERSE AI.
 * ==========================================================
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// ==========================================================
// Global Styles
// ==========================================================

import "./index.css";

// ==========================================================
// Root Application
// ==========================================================

import App from "./App.jsx";

// ==========================================================
// Global Authentication Provider
// ==========================================================

import AuthProvider from "./context/AuthContext";

// ==========================================================
// Application Bootstrap
// ==========================================================

createRoot(
  document.getElementById("root")
).render(

  <StrictMode>

    {/* ==================================================
            Global Authentication State

            Provides:
            - user
            - token
            - login()
            - logout()
            - isAuthenticated
            - loading
        ================================================== */}

    <AuthProvider>

      <App />

    </AuthProvider>

  </StrictMode>

);