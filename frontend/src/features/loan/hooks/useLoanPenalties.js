/**
 * ==========================================================
 * FINVERSE AI
 * Loan Penalties Hook
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/hooks/useLoanPenalties.js
 *
 * ==========================================================
 */

import {
    getAllLoanPenalties,
    getLoanPenaltyById,
    getLoanPenaltiesByLoanId,
    createLoanPenalty,
    updateLoanPenalty,
    deleteLoanPenalty
} from "../services/loanPenaltyService.js";

import {
    useCallback,
    useState
} from "react";


export default function useLoanPenalties() {

    const [penalties, setPenalties] =
        useState([]);

    const [selectedPenalty, setSelectedPenalty] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState(null);


    const clearError =
        useCallback(() => {

            setError(null);

        }, []);


    const fetchLoanPenalties =
        useCallback(async () => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await getAllLoanPenalties();

                setPenalties(
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
                    "Failed to fetch loan penalties.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    const fetchLoanPenaltyById =
        useCallback(async (penaltyId) => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await getLoanPenaltyById(
                        penaltyId
                    );

                setSelectedPenalty(
                    data || null
                );

                return data;

            }

            catch (err) {

                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to fetch loan penalty.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    const fetchLoanPenaltiesByLoanId =
        useCallback(async (loanId) => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await getLoanPenaltiesByLoanId(
                        loanId
                    );

                setPenalties(
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
                    "Failed to fetch loan penalties.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    const createPenalty =
        useCallback(
            async (penaltyData) => {

                try {

                    setLoading(true);
                    setError(null);

                    const data =
                        await createLoanPenalty(
                            penaltyData
                        );

                    await fetchLoanPenalties();

                    return data;

                }

                catch (err) {

                    const message =
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to create loan penalty.";

                    setError(message);

                    throw err;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                fetchLoanPenalties
            ]
        );


    const updatePenalty =
        useCallback(
            async (
                penaltyId,
                penaltyData
            ) => {

                try {

                    setLoading(true);
                    setError(null);

                    const data =
                        await updateLoanPenalty(
                            penaltyId,
                            penaltyData
                        );

                    await fetchLoanPenalties();

                    return data;

                }

                catch (err) {

                    const message =
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to update loan penalty.";

                    setError(message);

                    throw err;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                fetchLoanPenalties
            ]
        );


    const removeLoanPenalty =
        useCallback(
            async (penaltyId) => {

                try {

                    setLoading(true);
                    setError(null);

                    const data =
                        await deleteLoanPenalty(
                            penaltyId
                        );

                    setPenalties(
                        (previousPenalties) =>
                            previousPenalties.filter(
                                (penalty) =>
                                    penalty.id !==
                                    Number(penaltyId)
                            )
                    );

                    if (
                        selectedPenalty?.id ===
                        Number(penaltyId)
                    ) {

                        setSelectedPenalty(
                            null
                        );

                    }

                    return data;

                }

                catch (err) {

                    const message =
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to delete loan penalty.";

                    setError(message);

                    throw err;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                selectedPenalty
            ]
        );


    return {

        penalties,

        selectedPenalty,

        loading,

        error,

        clearError,

        fetchLoanPenalties,

        fetchLoanPenaltyById,

        fetchLoanPenaltiesByLoanId,

        createPenalty,

        updatePenalty,

        removeLoanPenalty

    };

}