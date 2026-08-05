/**
 * ==========================================================
 * FINVERSE AI
 * Accounts Service
 * ==========================================================
 */

import {

    getAccountsApi,

    getAccountByIdApi,

    createAccountApi,

    updateAccountApi,

    deleteAccountApi,

} from "../api/accountApi";

/* ----------------------------------------
   Get All Accounts
---------------------------------------- */

export async function getAccountsService() {

    const response = await getAccountsApi();

    return response.data;

}

/* ----------------------------------------
   Get Account By Id
---------------------------------------- */

export async function getAccountByIdService(id) {

    const response = await getAccountByIdApi(id);

    return response.data;

}

/* ----------------------------------------
   Create Account
---------------------------------------- */

export async function createAccountService(data) {

    const response = await createAccountApi(data);

    return response.data;

}

/* ----------------------------------------
   Update Account
---------------------------------------- */

export async function updateAccountService(id, data) {

    const response = await updateAccountApi(id, data);

    return response.data;

}

/* ----------------------------------------
   Delete Account
---------------------------------------- */

export async function deleteAccountService(id) {

    const response = await deleteAccountApi(id);

    return response.data;

}