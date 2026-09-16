/**
 * ==========================================================
 * FINVERSE AI
 * Loan Guarantors Hook
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/hooks/useLoanGuarantors.js
 *
 * ==========================================================
 */

import {
    useCallback,
    useState,
} from "react";

import {
    fetchAllLoanGuarantors,
    fetchLoanGuarantorById,
    fetchLoanGuarantorsByApplicationId,
    fetchLoanGuarantorsByUserId,
    fetchLoanGuarantorsByStatus,
    fetchLoanGuarantorsByVerificationStatus,
    fetchLoanGuarantorsByConsentStatus,
    createNewLoanGuarantor,
    updateExistingLoanGuarantor,
    changeLoanGuarantorStatus,
    changeLoanGuarantorVerificationStatus,
    changeLoanGuarantorConsentStatus,
    removeLoanGuarantor,
} from "../services/loanGuarantorService";


// ==========================================================
// HOOK
// ==========================================================

function useLoanGuarantors() {

    const [
        guarantors,
        setGuarantors
    ] = useState([]);

    const [
        guarantor,
        setGuarantor
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
                        fetchAllLoanGuarantors(),
                    "Failed to fetch loan guarantors."
                );

            const normalizedData =
                Array.isArray(data)
                    ? data
                    : [];

            setGuarantors(
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
                        fetchLoanGuarantorById(
                            id
                        ),
                    "Failed to fetch loan guarantor."
                );

            setGuarantor(data);

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
                        fetchLoanGuarantorsByApplicationId(
                            applicationId
                        ),
                    "Failed to fetch guarantors for application."
                );

            const normalizedData =
                Array.isArray(data)
                    ? data
                    : [];

            setGuarantors(
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
                        fetchLoanGuarantorsByUserId(
                            userId
                        ),
                    "Failed to fetch user guarantors."
                );

            const normalizedData =
                Array.isArray(data)
                    ? data
                    : [];

            setGuarantors(
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
                        fetchLoanGuarantorsByStatus(
                            status
                        ),
                    "Failed to fetch guarantors by status."
                );

            const normalizedData =
                Array.isArray(data)
                    ? data
                    : [];

            setGuarantors(
                normalizedData
            );

            return normalizedData;

        }, [execute]);


    // ======================================================
    // Fetch By Verification Status
    // ======================================================

    const fetchByVerificationStatus =
        useCallback(async (status) => {

            const data =
                await execute(
                    () =>
                        fetchLoanGuarantorsByVerificationStatus(
                            status
                        ),
                    "Failed to fetch guarantors by verification status."
                );

            const normalizedData =
                Array.isArray(data)
                    ? data
                    : [];

            setGuarantors(
                normalizedData
            );

            return normalizedData;

        }, [execute]);


    // ======================================================
    // Fetch By Consent Status
    // ======================================================

    const fetchByConsentStatus =
        useCallback(async (status) => {

            const data =
                await execute(
                    () =>
                        fetchLoanGuarantorsByConsentStatus(
                            status
                        ),
                    "Failed to fetch guarantors by consent status."
                );

            const normalizedData =
                Array.isArray(data)
                    ? data
                    : [];

            setGuarantors(
                normalizedData
            );

            return normalizedData;

        }, [execute]);


    // ======================================================
    // Create
    // ======================================================

    const createGuarantor =
        useCallback(async (data) => {

            return await execute(
                () =>
                    createNewLoanGuarantor(
                        data
                    ),
                "Failed to create loan guarantor."
            );

        }, [execute]);


    // ======================================================
    // Update
    // ======================================================

    const updateGuarantor =
        useCallback(async (
            id,
            data
        ) => {

            return await execute(
                () =>
                    updateExistingLoanGuarantor(
                        id,
                        data
                    ),
                "Failed to update loan guarantor."
            );

        }, [execute]);


    // ======================================================
    // Change Guarantor Status
    // ======================================================

    const updateGuarantorStatus =
        useCallback(async (
            id,
            status
        ) => {

            return await execute(
                () =>
                    changeLoanGuarantorStatus(
                        id,
                        status
                    ),
                "Failed to update guarantor status."
            );

        }, [execute]);


    // ======================================================
    // Change Verification Status
    // ======================================================

    const updateVerificationStatus =
        useCallback(async (
            id,
            status
        ) => {

            return await execute(
                () =>
                    changeLoanGuarantorVerificationStatus(
                        id,
                        status
                    ),
                "Failed to update guarantor verification status."
            );

        }, [execute]);


    // ======================================================
    // Change Consent Status
    // ======================================================

    const updateConsentStatus =
        useCallback(async (
            id,
            status,
            consentAt
        ) => {

            return await execute(
                () =>
                    changeLoanGuarantorConsentStatus(
                        id,
                        status,
                        consentAt
                    ),
                "Failed to update guarantor consent status."
            );

        }, [execute]);


    // ======================================================
    // Delete
    // ======================================================

    const deleteGuarantor =
        useCallback(async (id) => {

            const result =
                await execute(
                    () =>
                        removeLoanGuarantor(
                            id
                        ),
                    "Failed to delete loan guarantor."
                );

            setGuarantors(
                (current) =>
                    current.filter(
                        (item) =>
                            item.id !== Number(id)
                    )
            );

            setGuarantor(
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

        guarantors,

        guarantor,

        loading,

        error,

        clearError,

        fetchAll,

        fetchById,

        fetchByApplicationId,

        fetchByUserId,

        fetchByStatus,

        fetchByVerificationStatus,

        fetchByConsentStatus,

        createGuarantor,

        updateGuarantor,

        updateGuarantorStatus,

        updateVerificationStatus,

        updateConsentStatus,

        deleteGuarantor,

    };

}


export default useLoanGuarantors;

