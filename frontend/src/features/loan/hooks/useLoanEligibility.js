/**
 * ==========================================================
 * FINVERSE AI
 * Loan Eligibility Hook
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/hooks/useLoanEligibility.js
 *
 * Responsibility:
 *
 * - Manage loan eligibility API state
 * - Fetch all eligibility checks
 * - Fetch eligibility by ID
 * - Fetch eligibility by application
 * - Fetch eligibility by status
 * - Create eligibility check
 * - Update eligibility check
 * - Update eligibility status
 * - Delete eligibility check
 *
 * ==========================================================
 */

import {
    useCallback,
    useState,
} from "react";

import {
    fetchAllLoanEligibilityChecks,
    fetchLoanEligibilityCheckById,
    fetchLoanEligibilityChecksByApplicationId,
    fetchLoanEligibilityChecksByStatus,
    createNewLoanEligibilityCheck,
    updateExistingLoanEligibilityCheck,
    changeLoanEligibilityStatus,
    removeLoanEligibilityCheck,
} from "../services/loanEligibilityService";


// ==========================================================
// HOOK
// ==========================================================

function useLoanEligibility() {

    const [
        eligibilityChecks,
        setEligibilityChecks
    ] = useState([]);

    const [
        eligibilityCheck,
        setEligibilityCheck
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
    // Fetch All
    // ======================================================

    const fetchAll =
        useCallback(async () => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await fetchAllLoanEligibilityChecks();

                const normalizedData =
                    Array.isArray(data)
                        ? data
                        : [];

                setEligibilityChecks(
                    normalizedData
                );

                return normalizedData;

            }

            catch (err) {

                const message =
                    err?.message ||
                    "Failed to fetch loan eligibility checks.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    // ======================================================
    // Fetch By ID
    // ======================================================

    const fetchById =
        useCallback(async (id) => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await fetchLoanEligibilityCheckById(
                        id
                    );

                setEligibilityCheck(data);

                return data;

            }

            catch (err) {

                const message =
                    err?.message ||
                    "Failed to fetch loan eligibility check.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    // ======================================================
    // Fetch By Application
    // ======================================================

    const fetchByApplicationId =
        useCallback(async (applicationId) => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await fetchLoanEligibilityChecksByApplicationId(
                        applicationId
                    );

                const normalizedData =
                    Array.isArray(data)
                        ? data
                        : [];

                setEligibilityChecks(
                    normalizedData
                );

                return normalizedData;

            }

            catch (err) {

                const message =
                    err?.message ||
                    "Failed to fetch eligibility checks for application.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    // ======================================================
    // Fetch By Status
    // ======================================================

    const fetchByStatus =
        useCallback(async (status) => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await fetchLoanEligibilityChecksByStatus(
                        status
                    );

                const normalizedData =
                    Array.isArray(data)
                        ? data
                        : [];

                setEligibilityChecks(
                    normalizedData
                );

                return normalizedData;

            }

            catch (err) {

                const message =
                    err?.message ||
                    "Failed to fetch eligibility checks by status.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    // ======================================================
    // Create
    // ======================================================

    const createEligibilityCheck =
        useCallback(async (data) => {

            try {

                setLoading(true);
                setError(null);

                const result =
                    await createNewLoanEligibilityCheck(
                        data
                    );

                return result;

            }

            catch (err) {

                const message =
                    err?.message ||
                    "Failed to create loan eligibility check.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    // ======================================================
    // Update
    // ======================================================

    const updateEligibilityCheck =
        useCallback(async (
            id,
            data
        ) => {

            try {

                setLoading(true);
                setError(null);

                const result =
                    await updateExistingLoanEligibilityCheck(
                        id,
                        data
                    );

                return result;

            }

            catch (err) {

                const message =
                    err?.message ||
                    "Failed to update loan eligibility check.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    // ======================================================
    // Change Status
    // ======================================================

    const updateEligibilityStatus =
        useCallback(async (
            id,
            status
        ) => {

            try {

                setLoading(true);
                setError(null);

                const result =
                    await changeLoanEligibilityStatus(
                        id,
                        status
                    );

                return result;

            }

            catch (err) {

                const message =
                    err?.message ||
                    "Failed to update eligibility status.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    // ======================================================
    // Delete
    // ======================================================

    const deleteEligibilityCheck =
        useCallback(async (id) => {

            try {

                setLoading(true);
                setError(null);

                const result =
                    await removeLoanEligibilityCheck(
                        id
                    );

                setEligibilityChecks(
                    (current) =>
                        current.filter(
                            (item) =>
                                item.id !== Number(id)
                        )
                );

                setEligibilityCheck(
                    (current) =>
                        current?.id === Number(id)
                            ? null
                            : current
                );

                return result;

            }

            catch (err) {

                const message =
                    err?.message ||
                    "Failed to delete loan eligibility check.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    // ======================================================
    // Return
    // ======================================================

    return {

        eligibilityChecks,

        eligibilityCheck,

        loading,

        error,

        clearError,

        fetchAll,

        fetchById,

        fetchByApplicationId,

        fetchByStatus,

        createEligibilityCheck,

        updateEligibilityCheck,

        updateEligibilityStatus,

        deleteEligibilityCheck,

    };

}


export default useLoanEligibility;

