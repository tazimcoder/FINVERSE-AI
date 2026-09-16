/**
 * ==========================================================
 * FINVERSE AI
 * Transaction Controller
 * User-Specific & Secure
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

        const userId = req.user.id;


        const transactionId =
            await createTransactionService(
                userId,
                req.body
            );


        return res.status(201).json({

            success: true,

            message:
                "Transaction created successfully.",

            transactionId,

        });

    }

    catch (error) {

        console.error(
            "Create Transaction Error:",
            error.message
        );


        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

}


/* ==========================================================
Get All Transactions
Only Logged-in User Transactions
========================================================== */

export async function getTransactions(req, res) {

    try {

        const userId = req.user.id;


        const transactions =
            await getTransactionsService(
                userId
            );


        return res.status(200).json({

            success: true,

            data: transactions,

        });

    }

    catch (error) {

        console.error(
            "Get Transactions Error:",
            error.message
        );


        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

}


/* ==========================================================
Get Transaction By Id
User-Specific
========================================================== */

export async function getTransactionById(
    req,
    res
) {

    try {

        const userId = req.user.id;

        const transactionId =
            req.params.id;


        const transaction =
            await getTransactionService(
                transactionId,
                userId
            );


        return res.status(200).json({

            success: true,

            data: transaction,

        });

    }

    catch (error) {

        console.error(
            "Get Transaction Error:",
            error.message
        );


        return res.status(404).json({

            success: false,

            message: error.message,

        });

    }

}


/* ==========================================================
Update Transaction
User-Specific
========================================================== */

export async function updateTransaction(
    req,
    res
) {

    try {

        const userId = req.user.id;

        const transactionId =
            req.params.id;


        await updateTransactionService(

            transactionId,

            userId,

            req.body

        );


        return res.status(200).json({

            success: true,

            message:
                "Transaction updated successfully.",

        });

    }

    catch (error) {

        console.error(
            "Update Transaction Error:",
            error.message
        );


        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

}


/* ==========================================================
Delete Transaction
User-Specific
========================================================== */

export async function deleteTransaction(
    req,
    res
) {

    try {

        const userId = req.user.id;

        const transactionId =
            req.params.id;


        await deleteTransactionService(

            transactionId,

            userId

        );


        return res.status(200).json({

            success: true,

            message:
                "Transaction deleted successfully.",

        });

    }

    catch (error) {

        console.error(
            "Delete Transaction Error:",
            error.message
        );


        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

}