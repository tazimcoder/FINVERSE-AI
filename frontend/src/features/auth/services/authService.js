/**
 * ==========================================================
 * FINVERSE AI
 * Authentication Service
 * ----------------------------------------------------------
 * Responsibility:
 * - Business Logic
 * - Call Authentication APIs
 * - Return Response
 * ==========================================================
 */

import { loginApi } from "../api/authApi";

export const loginService = async (credentials) => {

    try {

        const response = await loginApi(credentials);

        return response.data;

    } catch (error) {

        throw error;

    }

};