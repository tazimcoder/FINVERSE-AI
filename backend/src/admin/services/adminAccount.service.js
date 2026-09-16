/**
 * ==========================================================
 * FINVERSE AI
 * Admin Account Service
 * ==========================================================
 *
 * Responsibility:
 *
 * - Admin Account Management business logic
 * - Validate account operations
 * - Prepare clean data for controllers
 *
 * IMPORTANT:
 *
 * - No Express logic
 * - No HTTP response handling
 * - No frontend logic
 * - Database access only through model
 *
 * ==========================================================
 */

import {
    findAllAccounts,
    findAccountById,
    accountExists,
    updateAccountActiveStatus,
    deleteAccountById,
    restoreAccountById,
} from "../models/adminAccount.model.js";

// ==========================================================
// GET ALL ACCOUNTS
// ==========================================================

export async function getAllAccounts() {

    const accounts =
        await findAllAccounts();

    return accounts;
}

// ==========================================================
// GET SINGLE ACCOUNT
// ==========================================================

export async function getAccount(id) {

    const account =
        await findAccountById(id);

    if (!account) {

        throw new Error(
            "Account not found."
        );

    }

    return account;
}

// ==========================================================
// CHANGE ACCOUNT STATUS
// ==========================================================

export async function changeAccountStatus(
    id,
    isActive
) {
    const exists =
        await accountExists(id);

    if (!exists) {
        throw new Error(
            "Account not found."
        );
    }

    await updateAccountActiveStatus(
        id,
        isActive
    );

    const updatedAccount =
        await findAccountById(id);

    return updatedAccount;
}

// ==========================================================
// REMOVE ACCOUNT
// ==========================================================

export async function removeAccountService(id) {
    const exists = await accountExists(id);

    if (!exists) {
        throw new Error("Account not found.");
    }

    const affectedRows = await deleteAccountById(id);

    if (affectedRows === 0) {
        throw new Error("Unable to delete account.");
    }

    return true;
}

// ==========================================================
// RESTORE ACCOUNT
// ==========================================================

export async function restoreAccountService(id) {
    const exists = await accountExists(id);

    if (!exists) {
        throw new Error("Account not found.");
    }

    const affectedRows = await restoreAccountById(id);

    if (affectedRows === 0) {
        throw new Error("Unable to restore account.");
    }

    return true;
}