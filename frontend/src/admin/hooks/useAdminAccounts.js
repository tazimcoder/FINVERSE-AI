/**
 * ==========================================================
 * FINVERSE AI
 * useAdminAccounts Hook
 * ==========================================================
 *
 * Responsibility:
 *
 * - Manage Admin Accounts state
 * - Load all accounts
 * - Update account status
 * - Handle loading state
 * - Handle error state
 * - Keep page component clean
 *
 * Architecture:
 *
 * useAdminAccounts
 *      ↓
 * adminAccountService
 *      ↓
 * adminAccountApi
 *      ↓
 * Axios
 *      ↓
 * Backend
 *
 * IMPORTANT:
 *
 * - No UI markup
 * - No direct Axios calls
 * - No authentication logic
 *
 * ==========================================================
 */

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    getAdminAccountsService,
    updateAdminAccountStatusService,
} from "../services/adminAccountService";

// ==========================================================
// Hook
// ==========================================================

function useAdminAccounts() {

    // ======================================================
    // State
    // ======================================================

    const [accounts, setAccounts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [updatingAccountId, setUpdatingAccountId] =
        useState(null);


    // ======================================================
    // Load Accounts
    // ======================================================

    const loadAccounts = useCallback(async () => {

        try {

            setLoading(true);

            setError("");

            const response =
                await getAdminAccountsService();

            /*
             * Supported response structures:
             *
             * {
             *     success: true,
             *     data: {
             *         accounts: []
             *     }
             * }
             *
             * OR
             *
             * {
             *     success: true,
             *     accounts: []
             * }
             *
             * OR
             *
             * {
             *     success: true,
             *     data: []
             * }
             */

            const accountList =
                response?.data?.accounts ||
                response?.accounts ||
                response?.data ||
                [];

            setAccounts(
                Array.isArray(accountList)
                    ? accountList
                    : []
            );

        } catch (err) {

            console.error(
                "Admin Accounts Load Error:",
                err
            );

            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Unable to load accounts."
            );

        } finally {

            setLoading(false);

        }

    }, []);


    // ======================================================
    // Initial Accounts Load
    // ======================================================

    useEffect(() => {

        loadAccounts();

    }, [loadAccounts]);


    // ======================================================
    // Update Account Status
    // ======================================================

    const updateAccountStatus = useCallback(
        async (account) => {

            if (!account?.id) {

                return false;

            }

            const currentStatus =
                account.is_active === true ||
                account.is_active === 1 ||
                account.is_active === "1" ||
                account.is_active === "true";

            const newStatus =
                currentStatus ? 0 : 1;

            try {

                setUpdatingAccountId(account.id);

                setError("");

                const response =
                    await updateAdminAccountStatusService(
                        account.id,
                        newStatus
                    );

                /*
                 * Supported response structures:
                 *
                 * {
                 *     success: true,
                 *     data: updatedAccount
                 * }
                 *
                 * OR
                 *
                 * {
                 *     success: true,
                 *     account: updatedAccount
                 * }
                 */

                const updatedAccount =
                    response?.data?.account ||
                    response?.data ||
                    response?.account ||
                    null;

                if (updatedAccount?.id) {

                    setAccounts((currentAccounts) =>
                        currentAccounts.map((item) =>
                            Number(item.id) ===
                                Number(updatedAccount.id)
                                ? updatedAccount
                                : item
                        )
                    );

                } else {

                    await loadAccounts();

                }

                return true;

            } catch (err) {

                console.error(
                    "Admin Account Status Update Error:",
                    err
                );

                setError(
                    err?.response?.data?.message ||
                    err?.message ||
                    "Unable to update account status."
                );

                return false;

            } finally {

                setUpdatingAccountId(null);

            }

        },
        [loadAccounts]
    );


    // ======================================================
    // Return Hook Data
    // ======================================================

    return {

        accounts,

        loading,

        error,

        updatingAccountId,

        loadAccounts,

        updateAccountStatus,

    };

}


// ==========================================================
// Export
// ==========================================================

export default useAdminAccounts;