/**

* ==========================================================
* FINVERSE AI
* useAdminUsers Hook
* ==========================================================
*
* Responsibility:
*
* * Manage Admin Users state
* * Load all users
* * Update user status
* * Handle loading state
* * Handle error state
* * Keep page component clean
*
* Architecture:
*
* useAdminUsers
* ```
   ↓
  ```
* adminUserService
* ```
   ↓
  ```
* adminUserApi
* ```
   ↓
  ```
* Axios
* ```
   ↓
  ```
* Backend
*
* ==========================================================
  */

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    getAdminUsersService,
    updateAdminUserStatusService,
} from "../services/adminUserService";

// ==========================================================
// Hook
// ==========================================================

function useAdminUsers() {


    // ======================================================
    // State
    // ======================================================

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [updatingUserId, setUpdatingUserId] =
        useState(null);


    // ======================================================
    // Load Users
    // ======================================================

    const loadUsers = useCallback(async () => {

        try {

            setLoading(true);

            setError("");

            const response =
                await getAdminUsersService();

            /*
             * Supported response structures:
             *
             * {
             *     success: true,
             *     data: {
             *         users: []
             *     }
             * }
             *
             * OR
             *
             * {
             *     success: true,
             *     users: []
             * }
             */

            const userList =
                response?.data?.users ||
                response?.users ||
                response?.data ||
                [];

            setUsers(
                Array.isArray(userList)
                    ? userList
                    : []
            );

        } catch (err) {

            console.error(
                "Admin Users Load Error:",
                err
            );

            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Unable to load users."
            );

        } finally {

            setLoading(false);

        }

    }, []);


    // ======================================================
    // Initial Users Load
    // ======================================================

    useEffect(() => {

        loadUsers();

    }, [loadUsers]);


    // ======================================================
    // Update User Status
    // ======================================================

    const updateUserStatus = useCallback(
        async (user) => {

            if (!user?.id) {
                return false;
            }

            const currentStatus =
                user.is_active === true ||
                user.is_active === 1 ||
                user.is_active === "1" ||
                user.is_active === "true";

            const newStatus =
                currentStatus ? 0 : 1;

            try {

                setUpdatingUserId(user.id);

                setError("");

                const response =
                    await updateAdminUserStatusService(
                        user.id,
                        newStatus
                    );

                /*
                 * Supported response structures:
                 *
                 * {
                 *     success: true,
                 *     data: updatedUser
                 * }
                 *
                 * OR
                 *
                 * {
                 *     success: true,
                 *     user: updatedUser
                 * }
                 */

                const updatedUser =
                    response?.data?.user ||
                    response?.data ||
                    response?.user ||
                    null;

                if (updatedUser?.id) {

                    setUsers((currentUsers) =>
                        currentUsers.map((item) =>
                            Number(item.id) ===
                                Number(updatedUser.id)
                                ? updatedUser
                                : item
                        )
                    );

                } else {

                    await loadUsers();

                }

                return true;

            } catch (err) {

                console.error(
                    "Admin User Status Update Error:",
                    err
                );

                setError(
                    err?.response?.data?.message ||
                    err?.message ||
                    "Unable to update user status."
                );

                return false;

            } finally {

                setUpdatingUserId(null);

            }

        },
        [loadUsers]
    );


    // ======================================================
    // Return Hook Data
    // ======================================================

    return {

        users,

        loading,

        error,

        updatingUserId,

        loadUsers,

        updateUserStatus,

    };


}

export default useAdminUsers;
