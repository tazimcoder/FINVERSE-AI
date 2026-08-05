/**
 * ==========================================================
 * FINVERSE AI
 * Axios Instance
 * ==========================================================
 */

import axios from "axios";
import API_CONFIG from "../config/api.config";

const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;