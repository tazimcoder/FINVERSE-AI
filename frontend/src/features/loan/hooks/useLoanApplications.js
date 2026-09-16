import {
    useCallback,
    useEffect,
    useState
} from "react";

import {
    fetchAllLoanApplications,
    fetchLoanApplicationById,
    fetchLoanApplicationsByUserId,
    fetchLoanApplicationsByStatus,
    createNewLoanApplication,
    updateExistingLoanApplication,
    changeLoanApplicationStatus,
    removeLoanApplication
} from "../services/loanApplicationService.js";

function normalizeApplicationList(
    response
) {

    if (
        Array.isArray(response)
    ) {

        return response;

    }


    if (
        Array.isArray(
            response?.data
        )
    ) {

        return response.data;

    }


    return [];

}

export default function useLoanApplications() {

    const [applications, setApplications] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState(null);
    // ======================================================
    // Error Handler
    // ======================================================

    const handleError =
        useCallback(
            (requestError) => {

                const message =
                    requestError?.response?.data?.message ||
                    requestError?.message ||
                    "Failed to process loan application request.";


                setError(
                    message
                );


                return message;

            },
            []
        );


    // ======================================================
    // Load All Applications
    // ======================================================

    const loadApplications =
        useCallback(
            async () => {

                setLoading(true);
                setError(null);


                try {

                    const response =
                        await fetchAllLoanApplications();


                    const data =
                        normalizeApplicationList(
                            response
                        );


                    setApplications(
                        data
                    );


                    return data;

                }

                catch (requestError) {

                    handleError(
                        requestError
                    );
                    return [];

                }

                finally {

                    setLoading(
                        false
                    );

                }

            },
            [
                handleError
            ]
        );


    // ======================================================
    // Get Application By ID
    // ======================================================

    const getApplication =
        useCallback(
            async (
                applicationId
            ) => {

                setLoading(true);
                setError(null);


                try {

                    return await fetchLoanApplicationById(
                        applicationId
                    );

                }

                catch (requestError) {

                    handleError(
                        requestError
                    );


                    return null;

                }

                finally {

                    setLoading(
                        false
                    );

                }

            },
            [
                handleError
            ]
        );


    // ======================================================
    // Get Applications By User
    // ======================================================

    const getApplicationsByUser =
        useCallback(
            async (
                userId
            ) => {

                setLoading(true);
                setError(null);


                try {

                    const response =
                        await fetchLoanApplicationsByUserId(
                            userId
                        );


                    return normalizeApplicationList(
                        response
                    );

                }

                catch (requestError) {

                    handleError(
                        requestError
                    );


                    return [];

                }

                finally {

                    setLoading(
                        false
                    );

                }

            },
            [
                handleError
            ]
        );
    // ======================================================
    // Get Applications By Status
    // ======================================================

    const getApplicationsByStatus =
        useCallback(
            async (
                status
            ) => {

                setLoading(true);
                setError(null);


                try {

                    const response =
                        await fetchLoanApplicationsByStatus(
                            status
                        );


                    return normalizeApplicationList(
                        response
                    );

                }

                catch (requestError) {

                    handleError(
                        requestError
                    );


                    return [];

                }

                finally {

                    setLoading(
                        false
                    );

                }

            },
            [
                handleError
            ]
        );
    // ======================================================
    // Create Application
    // ======================================================

    const createApplication =
        useCallback(
            async (
                data
            ) => {

                setLoading(true);
                setError(null);


                try {

                    const response =
                        await createNewLoanApplication(
                            data
                        );


                    await loadApplications();


                    return response;

                }

                catch (requestError) {

                    handleError(
                        requestError
                    );


                    throw requestError;

                }

                finally {

                    setLoading(
                        false
                    );

                }

            },
            [
                handleError,
                loadApplications
            ]
        );


    // ======================================================
    // Update Application
    // ======================================================
    const updateApplication =
        useCallback(
            async (
                applicationId,
                data
            ) => {

                setLoading(true);
                setError(null);


                try {

                    const response =
                        await updateExistingLoanApplication(
                            applicationId,
                            data
                        );


                    await loadApplications();


                    return response;

                }

                catch (requestError) {

                    handleError(
                        requestError
                    );


                    throw requestError;

                }

                finally {

                    setLoading(
                        false
                    );

                }

            },
            [
                handleError,
                loadApplications
            ]
        );


    // ======================================================
    // Update Application Status
    // ======================================================

    const updateApplicationStatus =
        useCallback(
            async (
                applicationId,
                status
            ) => {
                setLoading(true);
                setError(null);


                try {

                    const response =
                        await changeLoanApplicationStatus(
                            applicationId,
                            status
                        );


                    await loadApplications();


                    return response;

                }

                catch (requestError) {

                    handleError(
                        requestError
                    );


                    throw requestError;

                }

                finally {

                    setLoading(
                        false
                    );

                }

            },
            [
                handleError,
                loadApplications
            ]
        );


    // ======================================================
    // Delete Application
    // ======================================================

    const deleteApplication =
        useCallback(
            async (
                applicationId
            ) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await removeLoanApplication(
                            applicationId
                        );


                    setApplications(
                        (
                            currentApplications
                        ) =>
                            currentApplications.filter(
                                (
                                    application
                                ) =>
                                    String(
                                        application.id
                                    ) !==
                                    String(
                                        applicationId
                                    )
                            )
                    );


                    return response;

                }

                catch (requestError) {

                    handleError(
                        requestError
                    );


                    throw requestError;

                }

                finally {

                    setLoading(
                        false
                    );

                }

            },
            [
                handleError
            ]
        );
    // ======================================================
    // Initial Real API Load
    // ======================================================

    useEffect(
        () => {

            loadApplications();

        },
        [
            loadApplications
        ]
    );


    // ======================================================
    // Public Hook API
    // ======================================================

    return {

        applications,

        loading,

        error,

        loadApplications,

        getApplication,

        getApplicationsByUser,

        getApplicationsByStatus,

        createApplication,

        updateApplication,

        updateApplicationStatus,

        deleteApplication

    };

}