/**
 * ==========================================================
 * FINVERSE AI
 * Admin Service
 * ==========================================================
 *
 * Responsibility:
 *
 * - Admin business logic
 * - User management operations
 *
 * ==========================================================
 */

import {
    getAllUsers,
    getUserById,
    updateUserStatus,
} from "../models/admin.model.js";


// ==========================================================
// Get All Users
// ==========================================================

export async function getUsers() {

    return await getAllUsers();

}


// ==========================================================
// Get User
// ==========================================================

export async function getUser(id) {

    const user = await getUserById(id);

    if (!user) {

        throw new Error(
            "User not found."
        );

    }

    return user;
}


// ==========================================================
// Change User Status
// ==========================================================

export async function changeUserStatus(
    id,
    is_active
) {

    const user =
        await getUserById(id);


    if (!user) {

        throw new Error(
            "User not found."
        );

    }


    // ------------------------------------------------------
    // Prevent Admin From Accidentally Deactivating Himself
    // ------------------------------------------------------

    if (
        Number(id) === Number(user.id) &&
        user.role === "ADMIN"
    ) {

        throw new Error(
            "Admin account cannot be modified through this operation."
        );

    }


    await updateUserStatus(
        id,
        is_active
    );


    return await getUserById(id);
}