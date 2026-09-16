/**
 * ==========================================================
 * FINVERSE AI
 * Loan Verification Checks Hook
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/hooks/useLoanVerificationChecks.js
 *
 * ==========================================================
 */

import {
    getAllLoanVerificationChecks,
    getLoanVerificationCheckById,
    getLoanVerificationChecksByApplicationId,
    createLoanVerificationCheck,
    updateLoanVerificationCheck,
    deleteLoanVerificationCheck
} from "../services/loanVerificationCheckService.js";

import {
    useCallback,
    useState
} from "react";


export default function useLoanVerificationChecks() {

    const [verificationChecks, setVerificationChecks] =
        useState([]);

    const [selectedVerificationCheck, setSelectedVerificationCheck] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState(null);


    const clearError =
        useCallback(() => {

            setError(null);

        }, []);


    const fetchLoanVerificationChecks =
        useCallback(async () => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await getAllLoanVerificationChecks();

                setVerificationChecks(
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
                    "Failed to fetch loan verification checks.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    const fetchLoanVerificationCheckById =
        useCallback(async (verificationCheckId) => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await getLoanVerificationCheckById(
                        verificationCheckId
                    );

                setSelectedVerificationCheck(
                    data || null
                );

                return data;

            }

            catch (err) {

                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to fetch loan verification check.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    const fetchLoanVerificationChecksByApplicationId =
        useCallback(async (applicationId) => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await getLoanVerificationChecksByApplicationId(
                        applicationId
                    );

                setVerificationChecks(
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
                    "Failed to fetch loan verification checks.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    const createVerificationCheck =
        useCallback(
            async (verificationCheckData) => {

                try {

                    setLoading(true);
                    setError(null);

                    const data =
                        await createLoanVerificationCheck(
                            verificationCheckData
                        );

                    await fetchLoanVerificationChecks();

                    return data;

                }

                catch (err) {

                    const message =
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to create loan verification check.";

                    setError(message);

                    throw err;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                fetchLoanVerificationChecks
            ]
        );


    const updateVerificationCheck =
        useCallback(
            async (
                verificationCheckId,
                verificationCheckData
            ) => {

                try {

                    setLoading(true);
                    setError(null);

                    const data =
                        await updateLoanVerificationCheck(
                            verificationCheckId,
                            verificationCheckData
                        );

                    await fetchLoanVerificationChecks();

                    return data;

                }

                catch (err) {

                    const message =
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to update loan verification check.";

                    setError(message);

                    throw err;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                fetchLoanVerificationChecks
            ]
        );


    const removeLoanVerificationCheck =
        useCallback(
            async (verificationCheckId) => {

                try {

                    setLoading(true);
                    setError(null);

                    const data =
                        await deleteLoanVerificationCheck(
                            verificationCheckId
                        );

                    setVerificationChecks(
                        (previousChecks) =>
                            previousChecks.filter(
                                (verificationCheck) =>
                                    verificationCheck.id !==
                                    Number(
                                        verificationCheckId
                                    )
                            )
                    );

                    if (
                        selectedVerificationCheck?.id ===
                        Number(
                            verificationCheckId
                        )
                    ) {

                        setSelectedVerificationCheck(
                            null
                        );

                    }

                    return data;

                }

                catch (err) {

                    const message =
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to delete loan verification check.";

                    setError(message);

                    throw err;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                selectedVerificationCheck
            ]
        );


    return {

        verificationChecks,

        selectedVerificationCheck,

        loading,

        error,

        clearError,

        fetchLoanVerificationChecks,

        fetchLoanVerificationCheckById,

        fetchLoanVerificationChecksByApplicationId,

        createVerificationCheck,

        updateVerificationCheck,

        removeLoanVerificationCheck

    };

}

