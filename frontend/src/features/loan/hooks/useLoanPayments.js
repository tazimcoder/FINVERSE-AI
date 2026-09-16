/**
 * ==========================================================
 * FINVERSE AI
 * Loan Payments Hook
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/hooks/useLoanPayments.js
 *
 * ==========================================================
 */

import {
    getAllLoanPayments,
    getLoanPaymentById,
    getLoanPaymentsByLoanId,
    createLoanPayment,
    updateLoanPayment,
    deleteLoanPayment
} from "../services/loanPaymentService.js";

import {
    useCallback,
    useState
} from "react";


export default function useLoanPayments() {

    const [payments, setPayments] =
        useState([]);

    const [selectedPayment, setSelectedPayment] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState(null);


    const clearError =
        useCallback(() => {

            setError(null);

        }, []);


    const fetchLoanPayments =
        useCallback(async () => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await getAllLoanPayments();

                setPayments(
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
                    "Failed to fetch loan payments.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    const fetchLoanPaymentById =
        useCallback(async (paymentId) => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await getLoanPaymentById(
                        paymentId
                    );

                setSelectedPayment(
                    data || null
                );

                return data;

            }

            catch (err) {

                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to fetch loan payment.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    const fetchLoanPaymentsByLoanId =
        useCallback(async (loanId) => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await getLoanPaymentsByLoanId(
                        loanId
                    );

                setPayments(
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
                    "Failed to fetch loan payments.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    const createPayment =
        useCallback(
            async (paymentData) => {

                try {

                    setLoading(true);
                    setError(null);

                    const data =
                        await createLoanPayment(
                            paymentData
                        );

                    await fetchLoanPayments();

                    return data;

                }

                catch (err) {

                    const message =
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to create loan payment.";

                    setError(message);

                    throw err;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                fetchLoanPayments
            ]
        );


    const updatePayment =
        useCallback(
            async (
                paymentId,
                paymentData
            ) => {

                try {

                    setLoading(true);
                    setError(null);

                    const data =
                        await updateLoanPayment(
                            paymentId,
                            paymentData
                        );

                    await fetchLoanPayments();

                    return data;

                }

                catch (err) {

                    const message =
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to update loan payment.";

                    setError(message);

                    throw err;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                fetchLoanPayments
            ]
        );


    const removeLoanPayment =
        useCallback(
            async (paymentId) => {

                try {

                    setLoading(true);
                    setError(null);

                    const data =
                        await deleteLoanPayment(
                            paymentId
                        );

                    setPayments(
                        (previousPayments) =>
                            previousPayments.filter(
                                (payment) =>
                                    payment.id !==
                                    Number(paymentId)
                            )
                    );

                    if (
                        selectedPayment?.id ===
                        Number(paymentId)
                    ) {

                        setSelectedPayment(
                            null
                        );

                    }

                    return data;

                }

                catch (err) {

                    const message =
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to delete loan payment.";

                    setError(message);

                    throw err;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                selectedPayment
            ]
        );


    return {

        payments,

        selectedPayment,

        loading,

        error,

        clearError,

        fetchLoanPayments,

        fetchLoanPaymentById,

        fetchLoanPaymentsByLoanId,

        createPayment,

        updatePayment,

        removeLoanPayment

    };

}