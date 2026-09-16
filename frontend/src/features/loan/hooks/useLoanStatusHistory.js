/**
 * ==========================================================
 * FINVERSE AI
 * Loan Status History Hook
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/hooks/useLoanStatusHistory.js
 *
 * ==========================================================
 */

import {
    getAllLoanStatusHistory,
    getLoanStatusHistoryById,
    getLoanStatusHistoryByLoanId,
    createLoanStatusHistory
} from "../services/loanStatusHistoryService.js";

import {
    useCallback,
    useState
} from "react";


export default function useLoanStatusHistory() {

    const [statusHistory, setStatusHistory] =
        useState([]);

    const [selectedStatusHistory, setSelectedStatusHistory] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState(null);


    const clearError =
        useCallback(() => {

            setError(null);

        }, []);


    const fetchLoanStatusHistory =
        useCallback(async () => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await getAllLoanStatusHistory();

                setStatusHistory(
                    Array.isArray(data)
                        ? data
                        : []
                );

                return data;

            }

            catch (err) {

                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to fetch loan status history.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    const fetchLoanStatusHistoryById =
        useCallback(async (historyId) => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await getLoanStatusHistoryById(
                        historyId
                    );

                setSelectedStatusHistory(
                    data || null
                );

                return data;

            }

            catch (err) {

                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to fetch loan status history.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    const fetchLoanStatusHistoryByLoanId =
        useCallback(async (loanId) => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await getLoanStatusHistoryByLoanId(
                        loanId
                    );

                setStatusHistory(
                    Array.isArray(data)
                        ? data
                        : []
                );

                return data;

            }

            catch (err) {

                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to fetch loan status history.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    const createStatusHistory =
        useCallback(
            async (historyData) => {

                try {

                    setLoading(true);
                    setError(null);

                    const data =
                        await createLoanStatusHistory(
                            historyData
                        );

                    await fetchLoanStatusHistory();

                    return data;

                }

                catch (err) {

                    const message =
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to create loan status history.";

                    setError(message);

                    throw err;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                fetchLoanStatusHistory
            ]
        );


    return {

        statusHistory,

        selectedStatusHistory,

        loading,

        error,

        clearError,

        fetchLoanStatusHistory,

        fetchLoanStatusHistoryById,

        fetchLoanStatusHistoryByLoanId,

        createStatusHistory

    };

}

