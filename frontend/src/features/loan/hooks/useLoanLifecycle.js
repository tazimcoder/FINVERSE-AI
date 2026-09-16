/**
 * ==========================================================
 * FINVERSE AI
 * Loan Lifecycle Hook
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/hooks/useLoanLifecycle.js
 *
 * Responsibility:
 *
 * - Manage complete loan application lifecycle
 * - Fetch current application status
 * - Fetch lifecycle snapshot
 * - Change lifecycle status
 *
 * ==========================================================
 */

import {
    useCallback,
    useState,
} from "react";

import {
    getCurrentLoanApplicationStatus,
    getLoanLifecycleSnapshot,
    changeLoanApplicationLifecycleStatus,
} from "../services/loanLifecycleService";


// ==========================================================
// HOOK
// ==========================================================

function useLoanLifecycle(
    applicationId = null
) {

    const [
        lifecycle,
        setLifecycle
    ] = useState(null);

    const [
        currentStatus,
        setCurrentStatus
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
    // Get Current Status
    // ======================================================

    const fetchCurrentStatus =
        useCallback(async (
            id = applicationId
        ) => {

            if (!id) {

                const message =
                    "Loan application ID is required.";

                setError(message);

                throw new Error(message);

            }


            try {

                setLoading(true);
                setError(null);

                const data =
                    await getCurrentLoanApplicationStatus(
                        id
                    );

                setCurrentStatus(
                    data
                );

                return data;

            }

            catch (err) {

                const message =
                    err?.message ||
                    "Failed to fetch current loan application status.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, [applicationId]);


    // ======================================================
    // Get Complete Lifecycle Snapshot
    // ======================================================

    const fetchSnapshot =
        useCallback(async (
            id = applicationId
        ) => {

            if (!id) {

                const message =
                    "Loan application ID is required.";

                setError(message);

                throw new Error(message);

            }


            try {

                setLoading(true);
                setError(null);

                const data =
                    await getLoanLifecycleSnapshot(
                        id
                    );

                setLifecycle(
                    data
                );


                if (data?.status) {

                    setCurrentStatus({

                        applicationId:
                            id,

                        currentStatus:
                            data.status,

                    });

                }


                return data;

            }

            catch (err) {

                const message =
                    err?.message ||
                    "Failed to fetch loan lifecycle snapshot.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, [applicationId]);


    // ======================================================
    // Change Lifecycle Status
    // ======================================================

    const changeStatus =
        useCallback(async (
            id,
            newStatus,
            options = {}
        ) => {

            const targetId =
                id || applicationId;


            if (!targetId) {

                const message =
                    "Loan application ID is required.";

                setError(message);

                throw new Error(message);

            }


            try {

                setLoading(true);
                setError(null);

                const result =
                    await changeLoanApplicationLifecycleStatus(
                        targetId,
                        newStatus,
                        options
                    );


                if (
                    result &&
                    typeof result === "object"
                ) {

                    setCurrentStatus({

                        applicationId:
                            targetId,

                        currentStatus:
                            result.newStatus ||
                            result.status ||
                            newStatus,

                        ...result,

                    });

                }

                else {

                    setCurrentStatus({

                        applicationId:
                            targetId,

                        currentStatus:
                            newStatus,

                    });

                }


                return result;

            }

            catch (err) {

                const message =
                    err?.message ||
                    "Failed to change loan lifecycle status.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, [applicationId]);


    // ======================================================
    // Reset
    // ======================================================

    const reset =
        useCallback(() => {

            setLifecycle(null);

            setCurrentStatus(null);

            setError(null);

        }, []);


    // ======================================================
    // Return
    // ======================================================

    return {

        lifecycle,

        currentStatus,

        loading,

        error,

        clearError,

        fetchCurrentStatus,

        fetchSnapshot,

        changeStatus,

        reset,

    };

}


export default useLoanLifecycle;

