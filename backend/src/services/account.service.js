/**
 * ==========================================================
 * FINVERSE AI
 * Account Service
 * User-Specific & Secure
 * ==========================================================
 */

import {
    createAccount,
    getAccounts,
    getAccountById,
    updateAccount,
    deleteAccount,
} from "../models/account.model.js";


// ==========================================================
// Create Account
// ==========================================================

export async function createAccountService(
    userId,
    data
) {

    return await createAccount(
        userId,
        data
    );
}


// ==========================================================
// Get All Accounts
// ==========================================================

export async function getAccountsService(
    userId
) {

    return await getAccounts(
        userId
    );
}


// ==========================================================
// Get Account By ID
// ==========================================================

export async function getAccountByIdService(
    id,
    userId
) {

    return await getAccountById(
        id,
        userId
    );
}


// ==========================================================
// Update Account
// ==========================================================

export async function updateAccountService(
    id,
    userId,
    data
) {

    return await updateAccount(
        id,
        userId,
        data
    );
}


// ==========================================================
// Delete Account
// ==========================================================

export async function deleteAccountService(
    id,
    userId
) {

    return await deleteAccount(
        id,
        userId
    );
}