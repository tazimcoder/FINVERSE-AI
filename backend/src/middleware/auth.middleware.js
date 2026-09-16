/**
 * ==========================================================
 * FINVERSE AI
 * Authentication Middleware
 * ==========================================================
 */

import jwt from "jsonwebtoken";


/* ==========================================================
   Verify JWT Token
========================================================== */

export function authenticateToken(req, res, next) {

    try {

        /* --------------------------------------------------
           Get Authorization Header
        -------------------------------------------------- */

        const authHeader =
            req.headers.authorization;


        if (!authHeader) {

            return res.status(401).json({

                success: false,

                message: "Authentication required",

            });

        }


        /* --------------------------------------------------
           Check Bearer Token
        -------------------------------------------------- */

        const parts =
            authHeader.split(" ");


        if (
            parts.length !== 2 ||
            parts[0] !== "Bearer"
        ) {

            return res.status(401).json({

                success: false,

                message: "Invalid authorization format",

            });

        }


        const token = parts[1];


        /* --------------------------------------------------
           Verify Token
        -------------------------------------------------- */

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );


        /* --------------------------------------------------
           Attach User To Request
        -------------------------------------------------- */

        req.user = {

            id: decoded.id,

            email: decoded.email,

            role: decoded.role,

        };


        /* --------------------------------------------------
           Continue Request
        -------------------------------------------------- */

        next();

    }

    catch (error) {

        console.error(
            "Authentication Error:",
            error.message
        );


        return res.status(401).json({

            success: false,

            message: "Invalid or expired token",

        });

    }

}