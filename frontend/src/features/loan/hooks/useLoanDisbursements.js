import {
    useCallback,
    useEffect,
    useState
} from "react";

import {
    fetchAllLoanDisbursements,
    fetchLoanDisbursementById,
    fetchLoanDisbursementsByLoanId,
    createNewLoanDisbursement,
    updateExistingLoanDisbursement,
    changeLoanDisbursementStatus,
    removeLoanDisbursement
} from "../services/loanDisbursementService.js";


export default function useLoanDisbursements() {

    const [disbursements, setDisbursements] =
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
                    "Failed to process disbursement request."
                );

            },
            []
        );


    const loadDisbursements =
        useCallback(
            async () => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await fetchAllLoanDisbursements();

                    const data =
                        Array.isArray(response)
                            ? response
                            : response?.data || [];

                    setDisbursements(data);

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


    const getDisbursement =
        useCallback(
            async (disbursementId) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await fetchLoanDisbursementById(
                            disbursementId
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


    const getDisbursementsByLoan =
        useCallback(
            async (loanId) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await fetchLoanDisbursementsByLoanId(
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


    const createDisbursement =
        useCallback(
            async (data) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await createNewLoanDisbursement(
                            data
                        );

                    await loadDisbursements();

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
                loadDisbursements
            ]
        );


    const updateDisbursement =
        useCallback(
            async (
                disbursementId,
                data
            ) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await updateExistingLoanDisbursement(
                            disbursementId,
                            data
                        );

                    await loadDisbursements();

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
                loadDisbursements
            ]
        );


    const updateDisbursementStatus =
        useCallback(
            async (
                disbursementId,
                status
            ) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await changeLoanDisbursementStatus(
                            disbursementId,
                            status
                        );

                    await loadDisbursements();

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
                loadDisbursements
            ]
        );


    const deleteDisbursement =
        useCallback(
            async (disbursementId) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await removeLoanDisbursement(
                            disbursementId
                        );

                    setDisbursements(
                        (current) =>
                            current.filter(
                                (item) =>
                                    item.id !== disbursementId
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

            loadDisbursements();

        },
        [loadDisbursements]
    );


    return {

        disbursements,

        loading,

        error,

        loadDisbursements,

        getDisbursement,

        getDisbursementsByLoan,

        createDisbursement,

        updateDisbursement,

        updateDisbursementStatus,

        deleteDisbursement

    };

}

