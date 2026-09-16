/**
 * ==========================================================
 * FINVERSE AI
 * Admin Routes
 * ==========================================================
 *
 * Responsibility:
 *
 * - Admin-only API routes
 * - Authentication protection
 * - Role authorization
 * - Admin dashboard
 * - Admin user management
 * - Admin account management
 * - Admin transaction management
 *
 * Architecture:
 *
 * Request
 * ↓
 * authenticateToken
 * ↓
 * adminOnly
 * ↓
 * Controller
 * ↓
 * Service
 * ↓
 * Model
 * ↓
 * MySQL
 *
 * ==========================================================
 */

import express from "express";

// ==========================================================
// AUTHENTICATION & AUTHORIZATION
// ==========================================================

import {
    authenticateToken,
} from "../../middleware/auth.middleware.js";

import {
    adminOnly,
} from "../../middleware/role.middleware.js";

// ==========================================================
// ADMIN DASHBOARD
// ==========================================================

import {
    getAdminDashboard,
} from "../controllers/adminDashboard.controller.js";

import {
    searchAdminPlatform,
} from "../controllers/adminSearch.controller.js";

import {
    getAdminReports,
} from "../controllers/adminReport.controller.js";

import {
    getAdminHistory,
    logAdminEvent
} from "../controllers/adminHistory.controller.js";

// ==========================================================
// ADMIN USER MANAGEMENT
// ==========================================================

import {
    getUsers,
    getUserById,
    updateUserStatus,
    updateAdminProfile,
    updateUserRole,
    updateUserProfileByAdmin,
} from "../controllers/adminUser.controller.js";

// ==========================================================
// ADMIN ACCOUNT MANAGEMENT
// ==========================================================

import {
    getAccounts,
    getAccountById,
    updateAccountStatus,
    deleteAccount,
    restoreAccount,
} from "../controllers/adminAccount.controller.js";

// ==========================================================
// ADMIN TRANSACTION MANAGEMENT
// ==========================================================

import {
    getTransactions,
    getTransactionById,
    deleteTransaction,
    restoreTransaction,
} from "../controllers/adminTransaction.controller.js";

// ==========================================================
// ROUTER
// ==========================================================

const router = express.Router();

// ==========================================================
// ADMIN AUTHORIZATION
// ==========================================================

router.use(
    authenticateToken,
    adminOnly
);

// ==========================================================
// SEARCH & REPORTS & PROFILE
// ==========================================================

router.get("/search", searchAdminPlatform);
router.get("/reports", getAdminReports);
router.patch("/profile", updateAdminProfile);
router.get("/history", getAdminHistory);
router.post("/history/log", logAdminEvent);

// ==========================================================
// ADMIN DASHBOARD
// ==========================================================

router.get(
    "/dashboard",
    getAdminDashboard
);

// ==========================================================
// USER MANAGEMENT
// ==========================================================

router.patch("/users/:id/role", updateUserRole);
router.patch("/users/:id/profile", updateUserProfileByAdmin);

//
// GET
// /api/v1/admin/users
//
// ==========================================================

router.get(
    "/users",
    getUsers
);

// ==========================================================
// SINGLE USER
// ==========================================================
//
// GET
// /api/v1/admin/users/:id
//
// ==========================================================

router.get(
    "/users/:id",
    getUserById
);

// ==========================================================
// USER STATUS
// ==========================================================
//
// PATCH
// /api/v1/admin/users/:id/status
//
// Body:
//
// {
//     "is_active": 1
// }
//
// or
//
// {
//     "is_active": 0
// }
//
// ==========================================================

router.patch(
    "/users/:id/status",
    updateUserStatus
);

// ==========================================================
// ADMIN ACCOUNTS
// ==========================================================
//
// GET
// /api/v1/admin/accounts
//
// Get all financial accounts.
//
// ==========================================================

router.get(
    "/accounts",
    getAccounts
);

// ==========================================================
// SINGLE ADMIN ACCOUNT
// ==========================================================
//
// GET
// /api/v1/admin/accounts/:id
//
// ==========================================================

router.get(
    "/accounts/:id",
    getAccountById
);

// ==========================================================
// ADMIN ACCOUNT STATUS
// ==========================================================
//
// PATCH
// /api/v1/admin/accounts/:id/status
//
// Body:
//
// {
//     "is_active": 1
// }
//
// or
//
// {
//     "is_active": 0
// }
//
// ==========================================================

router.patch(
    "/accounts/:id/status",
    updateAccountStatus
);

router.delete(
    "/accounts/:id",
    deleteAccount
);

router.patch(
    "/accounts/:id/restore",
    restoreAccount
);

// ==========================================================
// ADMIN TRANSACTIONS
// ==========================================================
//
// GET
// /api/v1/admin/transactions
//
// Get all platform transactions.
//
// ==========================================================

router.get(
    "/transactions",
    getTransactions
);

// ==========================================================
// SINGLE ADMIN TRANSACTION
// ==========================================================
//
// GET
// /api/v1/admin/transactions/:id
//
// Get transaction details.
//
// ==========================================================

router.get(
    "/transactions/:id",
    getTransactionById
);

// ==========================================================
// EXPORT
// ==========================================================

export default router;