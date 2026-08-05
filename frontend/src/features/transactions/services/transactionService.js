/**
 * ==========================================================
 * FINVERSE AI
 * Transaction Service
 * ==========================================================
 */

import {

    getTransactionsApi,

    getTransactionByIdApi,

    createTransactionApi,

    updateTransactionApi,

    deleteTransactionApi,

} from "../api/transactionApi";

/* ==========================================================
   Get All Transactions
========================================================== */

export async function getTransactionsService() {

    const response = await getTransactionsApi();

    return response.data;

}

/* ==========================================================
   Get Transaction By Id
========================================================== */

export async function getTransactionByIdService(id) {

    const response = await getTransactionByIdApi(id);

    return response.data;

}

/* ==========================================================
   Create Transaction
========================================================== */

export async function createTransactionService(data) {

    const response = await createTransactionApi(data);

    return response.data;

}

/* ==========================================================
   Update Transaction
========================================================== */

export async function updateTransactionService(id, data) {

    const response = await updateTransactionApi(id, data);

    return response.data;

}

/* ==========================================================
   Delete Transaction
========================================================== */

export async function deleteTransactionService(id) {

    const response = await deleteTransactionApi(id);

    return response.data;

}