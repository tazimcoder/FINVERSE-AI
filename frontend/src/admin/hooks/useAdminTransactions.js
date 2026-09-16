/**
 * ==========================================================
 * FINVERSE AI
 * Admin Transactions Hook
 * ==========================================================
 *
 * Responsibility:
 *
 * - Manage admin transaction state
 * - Fetch all platform transactions
 * - Fetch individual transaction
 * - Handle loading state
 * - Handle error state
 * - Provide refresh functionality
 *
 * Architecture:
 *
 * Component
 * ↓
 * Hook
 * ↓
 * Service
 * ↓
 * API
 *
 * ==========================================================
 */

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    getAdminTransactions,
    getAdminTransactionById,
} from "../services/adminTransactionService.js";

// ==========================================================
// HOOK
// ==========================================================

function useAdminTransactions() {

    // ======================================================
    // TRANSACTIONS
    // ======================================================

    const [
        transactions,
        setTransactions,
    ] = useState([]);

    // ======================================================
    // LOADING
    // ======================================================

    const [
        loading,
        setLoading,
    ] = useState(true);

    // ======================================================
    // ERROR
    // ======================================================

    const [
        error,
        setError,
    ] = useState(null);

    // ======================================================
    // FETCH ALL TRANSACTIONS
    // ======================================================

    const fetchTransactions =
        useCallback(
            async () => {

                try {

                    setLoading(true);
                    setError(null);

                    const response =
                        await getAdminTransactions();

                    /*
                     * Backend response:
                     *
                     * {
                     *   success: true,
                     *   message: "...",
                     *   data: {
                     *      transactions: [],
                     *      count: 4
                     *   }
                     * }
                     */

                    const transactionData =
                        response?.data?.transactions ??
                        response?.transactions ??
                        [];

                    setTransactions(
                        Array.isArray(transactionData)
                            ? transactionData
                            : []
                    );

                } catch (err) {

                    console.error(
                        "Admin transactions fetch error:",
                        err
                    );

                    setTransactions([]);

                    setError(
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to load transactions."
                    );

                } finally {

                    setLoading(false);

                }

            },
            []
        );

    // ======================================================
    // FETCH SINGLE TRANSACTION
    // ======================================================

    const fetchTransactionById =
        useCallback(
            async (id) => {

                if (
                    id === undefined ||
                    id === null ||
                    id === ""
                ) {

                    throw new Error(
                        "Transaction ID is required."
                    );

                }

                try {

                    setError(null);

                    const response =
                        await getAdminTransactionById(
                            id
                        );

                    /*
                     * Backend response:
                     *
                     * {
                     *   success: true,
                     *   message: "...",
                     *   data: {
                     *      id: 8,
                     *      ...
                     *   }
                     * }
                     */

                    return (
                        response?.data ??
                        response
                    );

                } catch (err) {

                    console.error(
                        "Admin transaction detail fetch error:",
                        err
                    );

                    setError(
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to load transaction."
                    );

                    throw err;

                }

            },
            []
        );

    // ======================================================
    // INITIAL FETCH
    // ======================================================

    useEffect(
        () => {

            fetchTransactions();

        },
        [
            fetchTransactions,
        ]
    );

    // ======================================================
    // REFRESH
    // ======================================================

    const refresh =
        useCallback(
            async () => {

                await fetchTransactions();

            },
            [
                fetchTransactions,
            ]
        );

    // ======================================================
    // RETURN
    // ======================================================

    return {
        transactions,
        loading,
        error,
        refresh,
        fetchTransactions,
        fetchTransactionById,
    };

}

// ==========================================================
// EXPORT
// ==========================================================

export default useAdminTransactions;