/**
 * ==========================================================
 * FINVERSE AI
 * Loan Repayment Schedules Hook
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/hooks/useLoanRepaymentSchedules.js
 *
 * ==========================================================
 */

import {
    getAllLoanRepaymentSchedules,
    getLoanRepaymentScheduleById,
    getLoanRepaymentSchedulesByLoanId,
    createLoanRepaymentSchedule,
    updateLoanRepaymentSchedule,
    deleteLoanRepaymentSchedule
} from "../services/loanRepaymentScheduleService.js";

import {
    useCallback,
    useState
} from "react";


export default function useLoanRepaymentSchedules() {

    const [schedules, setSchedules] =
        useState([]);

    const [selectedSchedule, setSelectedSchedule] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState(null);


    const clearError =
        useCallback(() => {

            setError(null);

        }, []);


    const fetchLoanRepaymentSchedules =
        useCallback(async () => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await getAllLoanRepaymentSchedules();

                setSchedules(
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
                    "Failed to fetch repayment schedules.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    const fetchLoanRepaymentScheduleById =
        useCallback(async (scheduleId) => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await getLoanRepaymentScheduleById(
                        scheduleId
                    );

                setSelectedSchedule(
                    data || null
                );

                return data;

            }

            catch (err) {

                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to fetch repayment schedule.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    const fetchLoanRepaymentSchedulesByLoanId =
        useCallback(async (loanId) => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await getLoanRepaymentSchedulesByLoanId(
                        loanId
                    );

                setSchedules(
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
                    "Failed to fetch repayment schedules.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    const createRepaymentSchedule =
        useCallback(
            async (scheduleData) => {

                try {

                    setLoading(true);
                    setError(null);

                    const data =
                        await createLoanRepaymentSchedule(
                            scheduleData
                        );

                    await fetchLoanRepaymentSchedules();

                    return data;

                }

                catch (err) {

                    const message =
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to create repayment schedule.";

                    setError(message);

                    throw err;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                fetchLoanRepaymentSchedules
            ]
        );


    const updateRepaymentSchedule =
        useCallback(
            async (
                scheduleId,
                scheduleData
            ) => {

                try {

                    setLoading(true);
                    setError(null);

                    const data =
                        await updateLoanRepaymentSchedule(
                            scheduleId,
                            scheduleData
                        );

                    await fetchLoanRepaymentSchedules();

                    return data;

                }

                catch (err) {

                    const message =
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to update repayment schedule.";

                    setError(message);

                    throw err;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                fetchLoanRepaymentSchedules
            ]
        );


    const removeRepaymentSchedule =
        useCallback(
            async (scheduleId) => {

                try {

                    setLoading(true);
                    setError(null);

                    const data =
                        await deleteLoanRepaymentSchedule(
                            scheduleId
                        );

                    setSchedules(
                        (previousSchedules) =>
                            previousSchedules.filter(
                                (schedule) =>
                                    schedule.id !==
                                    Number(scheduleId)
                            )
                    );

                    if (
                        selectedSchedule?.id ===
                        Number(scheduleId)
                    ) {

                        setSelectedSchedule(
                            null
                        );

                    }

                    return data;

                }

                catch (err) {

                    const message =
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to delete repayment schedule.";

                    setError(message);

                    throw err;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                selectedSchedule
            ]
        );


    return {

        schedules,

        selectedSchedule,

        loading,

        error,

        clearError,

        fetchLoanRepaymentSchedules,

        fetchLoanRepaymentScheduleById,

        fetchLoanRepaymentSchedulesByLoanId,

        createRepaymentSchedule,

        updateRepaymentSchedule,

        removeRepaymentSchedule

    };

}