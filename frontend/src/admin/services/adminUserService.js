/**

* ==========================================================
* FINVERSE AI
* Admin User Service
* ==========================================================
*
* Location:
* src/admin/services/adminUserService.js
*
* Responsibility:
*
* * Admin User API communication
* * Keep API calls separate from UI
* * Provide reusable Admin User methods
*
* IMPORTANT:
*
* * No React logic
* * No UI logic
* * No business logic
* * Axios configuration stays inside api layer
*
* ==========================================================
  */

import {
    getAdminUsersApi,
    getAdminUserByIdApi,
    updateAdminUserStatusApi,
} from "../api/adminUserApi";

// ==========================================================
// GET ALL USERS
// ==========================================================

export async function getAdminUsersService() {


    const response =
        await getAdminUsersApi();

    return response.data;


}

// ==========================================================
// GET SINGLE USER
// ==========================================================

export async function getAdminUserByIdService(id) {


    const response =
        await getAdminUserByIdApi(id);

    return response.data;


}

// ==========================================================
// UPDATE USER STATUS
// ==========================================================

export async function updateAdminUserStatusService(
    id,
    isActive
) {


    const response =
        await updateAdminUserStatusApi(
            id,
            isActive
        );

    return response.data;


}
