/**
 * ==========================================================
 * FINVERSE AI
 * Account Controller
 * User-Specific & Secure
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

        const userId = req.user.id;


        const accountId =
            await createAccountService(
                userId,
                req.body
            );


        return res.status(201).json({

            success: true,

            message:
                "Account created successfully.",

            accountId,

        });

    }

    catch (error) {

        console.error(
            "Create Account Error:",
            error.message
        );


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

        const accounts =
            await getAccountsService(req.user.id);

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

export async function getAccountById(
    req,
    res
) {

    try {

        const userId = req.user.id;

        const accountId =
            req.params.id;


        const account =
            await getAccountByIdService(
                accountId,
                userId
            );


        if (!account) {

            return res.status(404).json({

                success: false,

                message:
                    "Account not found.",

            });

        }


        return res.status(200).json({

            success: true,

            data: account,

        });

    }

    catch (error) {

        console.error(
            "Get Account Error:",
            error.message
        );


        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

}


/* ==========================================================
   Delete Account
   ========================================================== */

export async function deleteAccount(
    req,
    res
) {

    try {

        const userId = req.user.id;

        const accountId =
            req.params.id;


        const result =
            await deleteAccountService(
                accountId,
                userId
            );


        if (result.affectedRows === 0) {

            return res.status(404).json({

                success: false,

                message:
                    "Account not found.",

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Account deleted successfully.",

        });

    }

    catch (error) {

        console.error(
            "Delete Account Error:",
            error.message
        );


        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

}


/* ==========================================================
   Update Account
   ========================================================== */

export async function updateAccount(
    req,
    res
) {

    try {

        const userId = req.user.id;

        const accountId =
            req.params.id;


        const result =
            await updateAccountService(

                accountId,

                userId,

                req.body

            );


        if (result.affectedRows === 0) {

            return res.status(404).json({

                success: false,

                message:
                    "Account not found.",

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Account updated successfully.",

        });

    }

    catch (error) {

        console.error(
            "Update Account Error:",
            error.message
        );


        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

}