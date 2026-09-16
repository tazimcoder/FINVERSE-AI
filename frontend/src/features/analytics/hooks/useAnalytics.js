/**
 * ==========================================================
 * FINVERSE AI
 * Analytics Hook
 * ==========================================================
 */

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    getAnalyticsService,
} from "../services/analyticsService";


const DEFAULT_ANALYTICS = {

    incomeVsExpense: {

        income: 0,

        expense: 0,

    },

    expenseByCategory: [],

    monthlyTrend: [],

};


export default function useAnalytics() {

    const [analytics, setAnalytics] = useState(
        DEFAULT_ANALYTICS
    );

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    /* ==========================================================
       LOAD ANALYTICS
    ========================================================== */

    const loadAnalytics = useCallback(
        async () => {

            try {

                setLoading(true);

                setError(null);


                const response =
                    await getAnalyticsService();


                setAnalytics(
                    response?.data || DEFAULT_ANALYTICS
                );

            }

            catch (error) {

                console.error(
                    "Analytics Load Error:",
                    error
                );


                setError(
                    error?.message ||
                    "Unable to load analytics."
                );


                setAnalytics(
                    DEFAULT_ANALYTICS
                );

            }

            finally {

                setLoading(false);

            }

        },
        []
    );


    /* ==========================================================
       INITIAL LOAD
    ========================================================== */

    useEffect(() => {

        loadAnalytics();

    }, [loadAnalytics]);


    /* ==========================================================
       RETURN
    ========================================================== */

    return {

        analytics,

        loading,

        error,

        reload: loadAnalytics,

    };

}