/**
 * ==========================================================
 * FINVERSE AI
 * Dashboard Hook
 * ==========================================================
 *
 * Responsibility:
 * - Dashboard data load karna
 * - Loading state manage karna
 * - Error state manage karna
 * - Dashboard reload karna
 * - API response ko safe format me normalize karna
 *
 * Flow:
 *
 * Dashboard.jsx
 *      ↓
 * useDashboard()
 *      ↓
 * dashboardService.js
 *      ↓
 * dashboardApi.js
 *      ↓
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
    getDashboardService,
} from "../services/dashboardService";

/**
 * ==========================================================
 * DEFAULT DASHBOARD STATE
 * ==========================================================
 *
 * API response empty ho,
 * API temporarily fail ho,
 * ya future me backend me new fields add ho,
 * Dashboard crash nahi karega.
 *
 * Future fields yahan easily add kar sakte ho:
 *
 * totalSavings
 * totalInvestments
 * totalLoans
 * totalWalletBalance
 * monthlyIncome
 * monthlyExpense
 * etc.
 *
 * ==========================================================
 */

const DEFAULT_DASHBOARD = {
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
    totalAccounts: 0,

    recentTransactions: [],

    // Future dashboard fields
    totalSavings: 0,
    totalInvestments: 0,
    totalLoans: 0,
    walletBalance: 0,
};

/**
 * ==========================================================
 * NORMALIZE DASHBOARD DATA
 * ==========================================================
 *
 * Backend se response kisi bhi safe structure me aaye,
 * frontend ko predictable object milega.
 *
 * ==========================================================
 */

function normalizeDashboardData(data) {
    if (!data || typeof data !== "object") {
        return {
            ...DEFAULT_DASHBOARD,
        };
    }

    return {
        ...DEFAULT_DASHBOARD,

        ...data,

        totalBalance:
            Number(data.totalBalance ?? 0),

        totalIncome:
            Number(data.totalIncome ?? 0),

        totalExpense:
            Number(data.totalExpense ?? 0),

        totalAccounts:
            Number(data.totalAccounts ?? 0),

        totalSavings:
            Number(data.totalSavings ?? 0),

        totalInvestments:
            Number(data.totalInvestments ?? 0),

        totalLoans:
            Number(data.totalLoans ?? 0),

        walletBalance:
            Number(data.walletBalance ?? 0),

        recentTransactions:
            Array.isArray(data.recentTransactions)
                ? data.recentTransactions
                : [],
    };
}

/**
 * ==========================================================
 * useDashboard
 * ==========================================================
 */

export default function useDashboard() {

    /**
     * ------------------------------------------------------
     * Dashboard State
     * ------------------------------------------------------
     */

    const [dashboard, setDashboard] = useState(
        DEFAULT_DASHBOARD
    );

    /**
     * ------------------------------------------------------
     * Loading State
     * ------------------------------------------------------
     */

    const [loading, setLoading] = useState(true);

    /**
     * ------------------------------------------------------
     * Error State
     * ------------------------------------------------------
     */

    const [error, setError] = useState(null);

    /**
     * ======================================================
     * LOAD DASHBOARD
     * ======================================================
     */

    const loadDashboard = useCallback(async () => {

        try {

            setLoading(true);

            setError(null);

            /**
             * Service backend se dashboard data
             * return karega.
             */

            const response =
                await getDashboardService();

            /**
             * ------------------------------------------------
             * Response compatibility
             * ------------------------------------------------
             *
             * Current service normally direct data return
             * karega.
             *
             * Lekin future me agar service/API response:
             *
             * {
             *     success: true,
             *     data: {...}
             * }
             *
             * return kare to bhi hook handle karega.
             */

            const dashboardData =
                response?.data &&
                    typeof response.data === "object"
                    ? response.data
                    : response;

            /**
             * ------------------------------------------------
             * Normalize
             * ------------------------------------------------
             */

            const normalizedData =
                normalizeDashboardData(
                    dashboardData
                );

            /**
             * ------------------------------------------------
             * Update State
             * ------------------------------------------------
             */

            setDashboard(normalizedData);

        }

        catch (err) {

            console.error(
                "Dashboard Hook Error:",
                err
            );

            /**
             * Backend error message
             */

            const errorMessage =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to load dashboard.";

            setError(errorMessage);

            /**
             * Safe fallback
             */

            setDashboard({
                ...DEFAULT_DASHBOARD,
            });

        }

        finally {

            setLoading(false);

        }

    }, []);

    /**
     * ======================================================
     * INITIAL LOAD
     * ======================================================
     */

    useEffect(() => {

        loadDashboard();

    }, [loadDashboard]);

    /**
     * ======================================================
     * RETURN
     * ======================================================
     *
     * Future me yahan easily add kar sakte ho:
     *
     * refreshDashboard
     * lastUpdated
     * isRefreshing
     * clearError
     * etc.
     *
     * ======================================================
     */

    return {

        dashboard,

        loading,

        error,

        reload: loadDashboard,

    };
}