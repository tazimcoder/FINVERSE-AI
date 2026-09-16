/**
 * ==========================================================
 * FINVERSE AI
 * Transaction Service
 * User-Specific & Secure
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

export async function createTransactionService(
    userId,
    data
) {

    const transactionId =
        await createTransaction(
            userId,
            data
        );


    return transactionId;
}


/* ==========================================================
Get All Transactions
Only Logged-in User Transactions
========================================================== */

export async function getTransactionsService(
    userId
) {

    return await getAllTransactions(
        userId
    );
}


/* ==========================================================
Get Transaction By Id
User-Specific
========================================================== */

export async function getTransactionService(
    id,
    userId
) {

    const transaction =
        await getTransactionById(
            id,
            userId
        );


    if (!transaction) {

        throw new Error(
            "Transaction not found"
        );

    }


    return transaction;
}


/* ==========================================================
Update Transaction
User-Specific
========================================================== */

export async function updateTransactionService(
    id,
    userId,
    data
) {

    const transaction =
        await getTransactionById(
            id,
            userId
        );


    if (!transaction) {

        throw new Error(
            "Transaction not found"
        );

    }


    const result =
        await updateTransaction(
            id,
            userId,
            data
        );


    return {

        success: true,

        result,

    };
}


/* ==========================================================
Delete Transaction
User-Specific
========================================================== */

export async function deleteTransactionService(
    id,
    userId
) {

    const transaction =
        await getTransactionById(
            id,
            userId
        );


    if (!transaction) {

        throw new Error(
            "Transaction not found"
        );

    }


    const result =
        await deleteTransaction(
            id,
            userId
        );


    return {

        success: true,

        result,

    };
}