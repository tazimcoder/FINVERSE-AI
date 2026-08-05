/**
 * ==========================================================
 * FINVERSE AI
 * Authentication API
 * ==========================================================
 */

import api from "../../../services/api";

export const loginApi = (credentials) => {
    return api.post("/auth/login", credentials);
};