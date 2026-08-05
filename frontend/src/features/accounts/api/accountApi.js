/**
 * ==========================================================
 * FINVERSE AI
 * Accounts API
 * ==========================================================
 */

import api from "../../../services/api";

/* ----------------------------------------
   Get All Accounts
---------------------------------------- */

export const getAccountsApi = () => {

    return api.get("/accounts");

};

/* ----------------------------------------
   Get Account By Id
---------------------------------------- */

export const getAccountByIdApi = (id) => {

    return api.get(`/accounts/${id}`);

};

/* ----------------------------------------
   Create Account
---------------------------------------- */

export const createAccountApi = (data) => {

    return api.post("/accounts", data);

};

/* ----------------------------------------
   Update Account
---------------------------------------- */

export const updateAccountApi = (id, data) => {

    return api.put(`/accounts/${id}`, data);

};

/* ----------------------------------------
   Delete Account
---------------------------------------- */

export const deleteAccountApi = (id) => {

    return api.delete(`/accounts/${id}`);

};