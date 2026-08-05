/**
 * ==========================================================
 * FINVERSE AI
 * Transaction API
 * ==========================================================
 */

import api from "../../../services/api";

/* ==========================================================
   Get All Transactions
========================================================== */

export const getTransactionsApi = () => {

    return api.get("/transactions");

};

/* ==========================================================
   Get Transaction By Id
========================================================== */

export const getTransactionByIdApi = (id) => {

    return api.get(`/transactions/${id}`);

};

/* ==========================================================
   Create Transaction
========================================================== */

export const createTransactionApi = (data) => {

    return api.post("/transactions", data);

};

/* ==========================================================
   Update Transaction
========================================================== */

export const updateTransactionApi = (id, data) => {

    return api.put(`/transactions/${id}`, data);

};

/* ==========================================================
   Delete Transaction
========================================================== */

export const deleteTransactionApi = (id) => {

    return api.delete(`/transactions/${id}`);

};