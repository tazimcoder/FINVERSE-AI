/**
 * ==========================================================
 * FINVERSE AI
 * Loan Offers Hook
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/hooks/useLoanOffers.js
 *
 * Responsibility:
 *
 * - Manage loan offer state
 * - Fetch offers
 * - Create offers
 * - Update offers
 * - Change offer status
 * - Delete offers
 *
 * ==========================================================
 */

import {
    useCallback,
    useState,
} from "react";

import {
    fetchAllLoanOffers,
    fetchLoanOfferById,
    fetchLoanOffersByApplicationId,
    fetchLoanOffersByUserId,
    fetchLoanOffersByStatus,
    createNewLoanOffer,
    updateExistingLoanOffer,
    changeLoanOfferStatus,
    removeLoanOffer,
} from "../services/loanOfferService";


// ==========================================================
// HOOK
// ==========================================================

function useLoanOffers() {

    const [
        offers,
        setOffers
    ] = useState([]);

    const [
        offer,
        setOffer
    ] = useState(null);

    const [
        loading,
        setLoading
    ] = useState(false);

    const [
        error,
        setError
    ] = useState(null);


    // ======================================================
    // Clear Error
    // ======================================================

    const clearError =
        useCallback(() => {

            setError(null);

        }, []);


    // ======================================================
    // Internal Request Helper
    // ======================================================

    const execute =
        useCallback(async (
            request,
            fallbackMessage
        ) => {

            try {

                setLoading(true);
                setError(null);

                return await request();

            }

            catch (err) {

                const message =
                    err?.message ||
                    fallbackMessage;

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    // ======================================================
    // Fetch All
    // ======================================================

    const fetchAll =
        useCallback(async () => {

            const data =
                await execute(
                    () =>
                        fetchAllLoanOffers(),
                    "Failed to fetch loan offers."
                );

            const normalizedData =
                Array.isArray(data)
                    ? data
                    : [];

            setOffers(
                normalizedData
            );

            return normalizedData;

        }, [execute]);


    // ======================================================
    // Fetch By ID
    // ======================================================

    const fetchById =
        useCallback(async (id) => {

            const data =
                await execute(
                    () =>
                        fetchLoanOfferById(
                            id
                        ),
                    "Failed to fetch loan offer."
                );

            setOffer(data);

            return data;

        }, [execute]);


    // ======================================================
    // Fetch By Application
    // ======================================================

    const fetchByApplicationId =
        useCallback(async (applicationId) => {

            const data =
                await execute(
                    () =>
                        fetchLoanOffersByApplicationId(
                            applicationId
                        ),
                    "Failed to fetch offers for application."
                );

            const normalizedData =
                Array.isArray(data)
                    ? data
                    : [];

            setOffers(
                normalizedData
            );

            return normalizedData;

        }, [execute]);


    // ======================================================
    // Fetch By User
    // ======================================================

    const fetchByUserId =
        useCallback(async (userId) => {

            const data =
                await execute(
                    () =>
                        fetchLoanOffersByUserId(
                            userId
                        ),
                    "Failed to fetch user loan offers."
                );

            const normalizedData =
                Array.isArray(data)
                    ? data
                    : [];

            setOffers(
                normalizedData
            );

            return normalizedData;

        }, [execute]);


    // ======================================================
    // Fetch By Status
    // ======================================================

    const fetchByStatus =
        useCallback(async (status) => {

            const data =
                await execute(
                    () =>
                        fetchLoanOffersByStatus(
                            status
                        ),
                    "Failed to fetch loan offers by status."
                );

            const normalizedData =
                Array.isArray(data)
                    ? data
                    : [];

            setOffers(
                normalizedData
            );

            return normalizedData;

        }, [execute]);


    // ======================================================
    // Create
    // ======================================================

    const createOffer =
        useCallback(async (data) => {

            return await execute(
                () =>
                    createNewLoanOffer(
                        data
                    ),
                "Failed to create loan offer."
            );

        }, [execute]);


    // ======================================================
    // Update
    // ======================================================

    const updateOffer =
        useCallback(async (
            id,
            data
        ) => {

            return await execute(
                () =>
                    updateExistingLoanOffer(
                        id,
                        data
                    ),
                "Failed to update loan offer."
            );

        }, [execute]);


    // ======================================================
    // Change Status
    // ======================================================

    const updateOfferStatus =
        useCallback(async (
            id,
            status
        ) => {

            return await execute(
                () =>
                    changeLoanOfferStatus(
                        id,
                        status
                    ),
                "Failed to update loan offer status."
            );

        }, [execute]);


    // ======================================================
    // Delete
    // ======================================================

    const deleteOffer =
        useCallback(async (id) => {

            const result =
                await execute(
                    () =>
                        removeLoanOffer(
                            id
                        ),
                    "Failed to delete loan offer."
                );

            setOffers(
                (current) =>
                    current.filter(
                        (item) =>
                            item.id !== Number(id)
                    )
            );

            setOffer(
                (current) =>
                    current?.id === Number(id)
                        ? null
                        : current
            );

            return result;

        }, [execute]);


    // ======================================================
    // Return
    // ======================================================

    return {

        offers,

        offer,

        loading,

        error,

        clearError,

        fetchAll,

        fetchById,

        fetchByApplicationId,

        fetchByUserId,

        fetchByStatus,

        createOffer,

        updateOffer,

        updateOfferStatus,

        deleteOffer,

    };

}


export default useLoanOffers;

