/**
 * ==========================================================
 * FINVERSE AI
 * Transaction Controller
 * ==========================================================
 */

import {
    createTransactionService,
    getTransactionsService,
    getTransactionService,
    updateTransactionService,
    deleteTransactionService,
} from "../services/transaction.service.js";

/* ==========================================================
   Create Transaction
========================================================== */

export async function createTransaction(req, res) {

    try {

        const transactionId = await createTransactionService(req.body);

        return res.status(201).json({
            success: true,
            message: "Transaction created successfully.",
            transactionId,
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }

}

/* ==========================================================
   Get All Transactions
========================================================== */

export async function getTransactions(req, res) {

    try {

        const transactions = await getTransactionsService();

        return res.status(200).json({
            success: true,
            data: transactions,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

}

/* ==========================================================
   Get Transaction By Id
========================================================== */

export async function getTransactionById(req, res) {

    try {

        const transaction = await getTransactionService(req.params.id);

        return res.status(200).json({
            success: true,
            data: transaction,
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message,
        });

    }

}

/* ==========================================================
   Update Transaction
========================================================== */

export async function updateTransaction(req, res) {

    try {

        await updateTransactionService(req.params.id, req.body);

        return res.status(200).json({
            success: true,
            message: "Transaction updated successfully.",
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }

}

/* ==========================================================
   Delete Transaction
========================================================== */

export async function deleteTransaction(req, res) {

    try {

        await deleteTransactionService(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Transaction deleted successfully.",
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }

}