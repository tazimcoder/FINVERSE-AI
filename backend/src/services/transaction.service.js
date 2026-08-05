/**
 * ==========================================================
 * FINVERSE AI
 * Transaction Service
 * ==========================================================
 */

import {

    createTransaction,

    getAllTransactions,

    getTransactionById,

    updateTransaction,

    deleteTransaction,

} from "../models/transaction.model.js";

/* ==========================================================
   Create Transaction
========================================================== */

export async function createTransactionService(data) {

    const transactionId = await createTransaction(data);

    return transactionId;

}

/* ==========================================================
   Get All Transactions
========================================================== */

export async function getTransactionsService() {

    return await getAllTransactions();

}

/* ==========================================================
   Get Transaction By Id
========================================================== */

export async function getTransactionService(id) {

    const transaction = await getTransactionById(id);

    if (!transaction) {

        throw new Error("Transaction not found");

    }

    return transaction;

}

/* ==========================================================
   Update Transaction
========================================================== */

export async function updateTransactionService(id, data) {

    const transaction = await getTransactionById(id);

    if (!transaction) {

        throw new Error("Transaction not found");

    }

    await updateTransaction(id, data);

    return {

        success: true,

    };

}

/* ==========================================================
   Delete Transaction
========================================================== */

export async function deleteTransactionService(id) {

    const transaction = await getTransactionById(id);

    if (!transaction) {

        throw new Error("Transaction not found");

    }

    await deleteTransaction(id);

    return {

        success: true,

    };

}