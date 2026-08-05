/**
 * ==========================================================
 * FINVERSE AI
 * Dashboard API
 * ==========================================================
 */

import api from "../../../services/api";

/* ==========================================================
   Dashboard Summary
========================================================== */

export async function getDashboardApi() {

    return api.get("/dashboard");

}