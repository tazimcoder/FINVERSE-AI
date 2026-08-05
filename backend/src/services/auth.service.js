/**
 * ==========================================================
 * FINVERSE AI
 * Authentication Service
 * ==========================================================
 */

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { findUserByEmail } from "../models/user.model.js";

/* ----------------------------------------
   Login Service
---------------------------------------- */

export async function loginUser({
    email,
    password,
}) {

    /* ------------------------------------
       Find User
    ------------------------------------ */

    const user = await findUserByEmail(email);

    console.log("====================================");
    console.log("🔍 LOGIN DEBUG");
    console.log("EMAIL ENTERED :", email);
    console.log("USER FROM DB  :", user);
    console.log("====================================");

    if (!user) {
        throw new Error("Invalid Email or Password");
    }

    /* ------------------------------------
       Compare Password
    ------------------------------------ */

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    console.log("====================================");
    console.log("PASSWORD ENTERED :", password);
    console.log("PASSWORD HASH    :", user.password);
    console.log("PASSWORD MATCH   :", isPasswordCorrect);
    console.log("====================================");

    if (!isPasswordCorrect) {
        throw new Error("Invalid Email or Password");
    }

    /* ------------------------------------
       Generate JWT
    ------------------------------------ */

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    console.log("====================================");
    console.log("✅ LOGIN SUCCESS");
    console.log("TOKEN GENERATED :", token);
    console.log("====================================");

    /* ------------------------------------
       Return Response
    ------------------------------------ */

    return {
        token,
        user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            role: user.role,
        },
    };
}