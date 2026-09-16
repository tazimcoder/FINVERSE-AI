/**

* ==========================================================
* FINVERSE AI
* Admin User API
* ==========================================================
*
* Responsibility:
*
* * Admin User API endpoints
* * Communicate with FINVERSE AI backend
* * Keep endpoint definitions separate from services
*
* IMPORTANT:
*
* * No React logic
* * No UI logic
* * No business logic
* * Authentication token is attached by Axios interceptor
*
* Backend Base URL:
*
* /api/v1
*
* Admin User Endpoints:
*
* GET   /admin/users
* GET   /admin/users/:id
* PATCH /admin/users/:id/status
*
* ==========================================================
  */

import api from "../../services/api";

// ==========================================================
// GET ALL ADMIN USERS
// ==========================================================
//
// Backend:
// GET /api/v1/admin/users
//
// ==========================================================

export const getAdminUsersApi = () => {
    return api.get("/admin/users");
};

// ==========================================================
// GET SINGLE ADMIN USER
// ==========================================================
//
// Backend:
// GET /api/v1/admin/users/:id
//
// ==========================================================

export const getAdminUserByIdApi = (id) => {
    return api.get(`/admin/users/${id}`);
};

// ==========================================================
// UPDATE USER STATUS
// ==========================================================
//
// Backend:
// PATCH /api/v1/admin/users/:id/status
//
// Body:
//
// {
//     "is_active": 1
// }
//
// or
//
// {
//     "is_active": 0
// }
//
// ==========================================================

export const updateAdminUserStatusApi = (id, isActive) => {
    return api.patch(
        `/admin/users/${id}/status`,
        {
            is_active: isActive,
        }
    );
};

export const updateAdminProfileApi = (data) => {
    return api.patch("/admin/profile", data);
};

export const updateAdminUserRoleApi = (id, role) => {
    return api.patch(`/admin/users/${id}/role`, { role });
};

export const updateUserProfileByAdminApi = (id, data) => {
    return api.patch(`/admin/users/${id}/profile`, data);
};

// ==========================================================
// EXPORT
// ==========================================================

export default {
    getAdminUsersApi,
    getAdminUserByIdApi,
    updateAdminUserStatusApi,
    updateAdminProfileApi,
    updateAdminUserRoleApi,
    updateUserProfileByAdminApi,
};


