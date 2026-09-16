import {
    useCallback,
    useEffect,
    useState
} from "react";

import {
    fetchAllLoanApprovals,
    fetchLoanApprovalById,
    fetchLoanApprovalsByLoanId,
    fetchLoanApprovalsByApplicationId,
    createNewLoanApproval,
    updateExistingLoanApproval,
    changeLoanApprovalStatus,
    removeLoanApproval
} from "../services/loanApprovalService.js";


export default function useLoanApprovals() {

    const [approvals, setApprovals] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState(null);


    const handleError =
        useCallback(
            (error) => {

                setError(
                    error?.response?.data?.message ||
                    error?.message ||
                    "Failed to process loan approval request."
                );

            },
            []
        );


    const loadApprovals =
        useCallback(
            async () => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await fetchAllLoanApprovals();

                    const data =
                        Array.isArray(response)
                            ? response
                            : response?.data || [];

                    setApprovals(data);

                    return data;

                }

                catch (error) {

                    handleError(error);

                    return [];

                }

                finally {

                    setLoading(false);

                }

            },
            [handleError]
        );


    const getApproval =
        useCallback(
            async (approvalId) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await fetchLoanApprovalById(
                            approvalId
                        );

                    return response?.data ?? response;

                }

                catch (error) {

                    handleError(error);

                    return null;

                }

                finally {

                    setLoading(false);

                }

            },
            [handleError]
        );


    const getApprovalsByLoan =
        useCallback(
            async (loanId) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await fetchLoanApprovalsByLoanId(
                            loanId
                        );

                    return response?.data ?? response;

                }

                catch (error) {

                    handleError(error);

                    return [];

                }

                finally {

                    setLoading(false);

                }

            },
            [handleError]
        );


    const getApprovalsByApplication =
        useCallback(
            async (applicationId) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await fetchLoanApprovalsByApplicationId(
                            applicationId
                        );

                    return response?.data ?? response;

                }

                catch (error) {

                    handleError(error);

                    return [];

                }

                finally {

                    setLoading(false);

                }

            },
            [handleError]
        );


    const createApproval =
        useCallback(
            async (data) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await createNewLoanApproval(
                            data
                        );

                    await loadApprovals();

                    return response;

                }

                catch (error) {

                    handleError(error);

                    throw error;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                handleError,
                loadApprovals
            ]
        );


    const updateApproval =
        useCallback(
            async (
                approvalId,
                data
            ) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await updateExistingLoanApproval(
                            approvalId,
                            data
                        );

                    await loadApprovals();

                    return response;

                }

                catch (error) {

                    handleError(error);

                    throw error;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                handleError,
                loadApprovals
            ]
        );


    const updateApprovalStatus =
        useCallback(
            async (
                approvalId,
                status
            ) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await changeLoanApprovalStatus(
                            approvalId,
                            status
                        );

                    await loadApprovals();

                    return response;

                }

                catch (error) {

                    handleError(error);

                    throw error;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                handleError,
                loadApprovals
            ]
        );


    const deleteApproval =
        useCallback(
            async (approvalId) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await removeLoanApproval(
                            approvalId
                        );

                    setApprovals(
                        (current) =>
                            current.filter(
                                (item) =>
                                    item.id !== approvalId
                            )
                    );

                    return response;

                }

                catch (error) {

                    handleError(error);

                    throw error;

                }

                finally {

                    setLoading(false);

                }

            },
            [handleError]
        );


    useEffect(
        () => {

            loadApprovals();

        },
        [loadApprovals]
    );


    return {

        approvals,

        loading,

        error,

        loadApprovals,

        getApproval,

        getApprovalsByLoan,

        getApprovalsByApplication,

        createApproval,

        updateApproval,

        updateApprovalStatus,

        deleteApproval

    };

}

