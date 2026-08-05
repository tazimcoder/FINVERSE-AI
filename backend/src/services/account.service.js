/**
 * ==========================================================
 * FINVERSE AI
 * Account Service
 * ==========================================================
 */

import {

    createAccount,

    getAccounts,

    getAccountById,

    updateAccount,

    deleteAccount,

} from "../models/account.model.js";

/* ==========================================================
   Create Account
========================================================== */

export async function createAccountService(data) {

    return await createAccount(data);

}

/* ==========================================================
   Get All Accounts
========================================================== */

export async function getAccountsService() {

    return await getAccounts();

}

/* ==========================================================
   Get Account By Id
========================================================== */

export async function getAccountByIdService(id) {

    return await getAccountById(id);

}

/* ==========================================================
   Delete Account
========================================================== */

export async function deleteAccountService(id) {

    return await deleteAccount(id);

}

/* ==========================================================
   Update Account
========================================================== */

export async function updateAccountService(id, data) {

    return await updateAccount(id, data);

}