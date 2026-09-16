/**
 * ==========================================================
 * FINVERSE AI
 * Admin User Service
 * ==========================================================
 *
 * Responsibility:
 *
 * - Admin User Management business logic
 * - Validate user operations
 * - Protect important Admin accounts
 * - Prepare clean data for controllers
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

import bcrypt from "bcrypt";
import {
    findAllUsers,
    findUserById,
    updateUserActiveStatus,
    userExists,
    findUserRole,
    updateUserProfile,
    updateUserRole,
} from "../models/adminUser.model.js";



// ==========================================================
// GET ALL USERS
// ==========================================================

export async function getAllUsers() {

    const users =
        await findAllUsers();

    return users;

}


// ==========================================================
// GET SINGLE USER
// ==========================================================

export async function getUser(id) {

    const user =
        await findUserById(id);


    if (!user) {

        throw new Error(
            "User not found."
        );

    }


    return user;

}


// ==========================================================
// CHANGE USER STATUS
// ==========================================================
//
// status:
// 1 = Active
// 0 = Inactive
//
// ==========================================================

export async function changeUserStatus(
    id,
    isActive
) {

    // ------------------------------------------------------
    // Validate User
    // ------------------------------------------------------

    const exists =
        await userExists(id);


    if (!exists) {

        throw new Error(
            "User not found."
        );

    }


    // ------------------------------------------------------
    // Get Current Role
    // ------------------------------------------------------

    const role =
        await findUserRole(id);


    // ------------------------------------------------------
    // Protect Primary Admin
    // ------------------------------------------------------
    //
    // Admin ID 1 is currently the primary Admin account.
    //
    // This protection prevents accidental lockout.
    //
    // Later this can be replaced with a dedicated
    // "is_super_admin" database field.
    //
    // ------------------------------------------------------

    if (
        id === 1 &&
        role === "ADMIN" &&
        isActive === 0
    ) {

        throw new Error(
            "Primary admin account cannot be deactivated."
        );

    }


    // ------------------------------------------------------
    // Update Status
    // ------------------------------------------------------

    const affectedRows =
        await updateUserActiveStatus(
            id,
            isActive
        );


    if (affectedRows === 0) {

        throw new Error(
            "Unable to update user status."
        );

    }


    // ------------------------------------------------------
    // Return Updated User
    // ------------------------------------------------------

    const updatedUser =
        await findUserById(id);


    return updatedUser;

}

// ==========================================================
// UPDATE ADMIN PROFILE
// ==========================================================

export async function updateAdminProfileService(userId, { full_name, email, avatar_url, password }) {
    let hashedPassword = null;
    if (password && password.trim().length > 0) {
        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters.");
        }
        hashedPassword = await bcrypt.hash(password.trim(), 12);
    }

    await updateUserProfile(userId, {
        full_name: full_name?.trim(),
        email: email?.trim(),
        avatar_url: avatar_url?.trim(),
        password: hashedPassword,
    });

    return await findUserById(userId);
}


// ==========================================================
// CHANGE USER ROLE
// ==========================================================

export async function changeUserRoleService(userId, role) {
    if (!["USER", "ADMIN"].includes(role)) {
        throw new Error("Invalid role specified.");
    }

    await updateUserRole(userId, role);
    return await findUserById(userId);
}

// ==========================================================
// UPDATE ANY USER PROFILE & CUSTOMIZATION (ADMIN ACCESS)
// ==========================================================

export async function updateUserProfileByAdminService(targetUserId, {
    full_name,
    email,
    mobile,
    phone,
    account_tier,
    credit_limit,
    kyc_status,
    is_active,
    feature_permissions,
    password
}) {
    const exists = await userExists(targetUserId);
    if (!exists) {
        throw new Error("User not found.");
    }

    let hashedPassword = null;
    if (password && password.trim().length > 0) {
        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters.");
        }
        hashedPassword = await bcrypt.hash(password.trim(), 12);
    }

    await updateUserProfile(targetUserId, {
        full_name: full_name?.trim(),
        email: email?.trim(),
        mobile: (mobile || phone)?.trim(),
        account_tier,
        credit_limit,
        kyc_status,
        is_active,
        feature_permissions,
        password: hashedPassword,
    });

    return await findUserById(targetUserId);
}