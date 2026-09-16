/**
 * ==========================================================
 * FINVERSE AI
 * Role Authorization Middleware
 * ==========================================================
 *
 * Responsibility:
 * - Check authenticated user's role
 * - Protect ADMIN-only resources
 * - Protect USER-only resources
 *
 * IMPORTANT:
 * authenticateToken() must run before this middleware.
 * ==========================================================
 */

// ==========================================================
// Generic Role Authorization
// ==========================================================

export function authorizeRoles(...allowedRoles) {

    return (req, res, next) => {

        // --------------------------------------------------
        // User must already be authenticated
        // --------------------------------------------------

        if (!req.user) {

            return res.status(401).json({

                success: false,

                message: "Authentication required.",

            });

        }


        // --------------------------------------------------
        // Check User Role
        // --------------------------------------------------

        if (!allowedRoles.includes(req.user.role)) {

            return res.status(403).json({

                success: false,

                message:
                    "Access denied. You do not have permission to access this resource.",

            });

        }


        // --------------------------------------------------
        // Role Authorized
        // --------------------------------------------------

        next();

    };

}


// ==========================================================
// ADMIN Only
// ==========================================================

export function adminOnly(req, res, next) {

    return authorizeRoles("ADMIN")(
        req,
        res,
        next
    );

}


// ==========================================================
// USER Only
// ==========================================================

export function userOnly(req, res, next) {

    return authorizeRoles("USER")(
        req,
        res,
        next
    );

}