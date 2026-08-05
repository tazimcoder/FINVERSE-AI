/**
 * ==========================================================
 * FINVERSE AI
 * Authentication Controller
 * ==========================================================
 */

import { loginUser } from "../services/auth.service.js";

/* ----------------------------------------
   Login Controller
---------------------------------------- */

export async function login(req, res) {
    try {



        const { email, password } = req.body;

        const result = await loginUser({
            email,
            password,
        });

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            ...result,
        });

    } catch (error) {

        console.error(error);

        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
}