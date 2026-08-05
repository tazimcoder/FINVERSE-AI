/**
 * ==========================================================
 * FINVERSE AI
 * Account Controller
 * ==========================================================
 */

import {

    createAccountService,

    getAccountsService,

    getAccountByIdService,

    updateAccountService,

    deleteAccountService,

} from "../services/account.service.js";

/* ==========================================================
   Create Account
========================================================== */

export async function createAccount(req, res) {

    try {

        const accountId = await createAccountService(req.body);

        return res.status(201).json({

            success: true,

            message: "Account created successfully.",

            accountId,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

}

/* ==========================================================
   Get All Accounts
========================================================== */

export async function getAccounts(req, res) {

    try {

        const accounts = await getAccountsService();

        return res.status(200).json({

            success: true,

            data: accounts,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

}

/* ==========================================================
   Get Account By Id
========================================================== */

export async function getAccountById(req, res) {

    try {

        const account = await getAccountByIdService(

            req.params.id

        );

        if (!account) {

            return res.status(404).json({

                success: false,

                message: "Account not found.",

            });

        }

        return res.status(200).json({

            success: true,

            data: account,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

}

/* ==========================================================
   Delete Account
========================================================== */

export async function deleteAccount(req, res) {

    try {

        await deleteAccountService(req.params.id);

        return res.status(200).json({

            success: true,

            message: "Account deleted successfully.",

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

}

/* ==========================================================
   Update Account
========================================================== */

export async function updateAccount(req, res) {

    try {

        await updateAccountService(

            req.params.id,

            req.body

        );

        return res.status(200).json({

            success: true,

            message: "Account updated successfully."

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

}