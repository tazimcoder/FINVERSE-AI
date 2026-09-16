/**
 * ==========================================================
 * FINVERSE AI
 * Admin Account Service
 * ==========================================================
 *
 * Responsibility:
 *
 * - Admin Account business logic
 * - Validate account operations
 * - Communicate with Admin Account Model
 *
 * IMPORTANT:
 *
 * - No Express logic
 * - No HTTP response handling
 * - No frontend logic
 * - Database access only through model
 *
 * ==========================================================
 */

import {

    findAllAdminAccounts,

    findAdminAccountById,

    updateAdminAccountStatus,

} from "../models/adminAccount.model.js";


// ==========================================================
// GET ALL ACCOUNTS
// ==========================================================

export async function getAllAdminAccounts() {

    const accounts =
        await findAllAdminAccounts();

    return accounts;

}


// ==========================================================
// GET SINGLE ACCOUNT
// ==========================================================

export async function getAdminAccount(id) {

    const account =
        await findAdminAccountById(id);


    if (!account) {

        throw new Error(
            "Account not found."
        );

    }


    return account;

}


// ==========================================================
// CHANGE ACCOUNT STATUS
// ==========================================================
//
// 1 = Active
// 0 = Inactive
//
// ==========================================================

export async function changeAdminAccountStatus(
    id,
    isActive
) {

    const account =
        await findAdminAccountById(id);


    if (!account) {

        throw new Error(
            "Account not found."
        );

    }


    const status =
        Number(isActive) === 1
            ? "active"
            : "inactive";


    const result =
        await updateAdminAccountStatus(
            id,
            status
        );


    if (result.affectedRows === 0) {

        throw new Error(
            "Unable to update account status."
        );

    }


    return await findAdminAccountById(id);

}