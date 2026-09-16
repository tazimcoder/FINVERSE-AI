import {
    useCallback,
    useEffect,
    useState
} from "react";

import {
    fetchAllLoanCollaterals,
    fetchLoanCollateralById,
    fetchLoanCollateralsByLoanId,
    fetchLoanCollateralsByApplicationId,
    createNewLoanCollateral,
    updateExistingLoanCollateral,
    changeLoanCollateralStatus,
    removeLoanCollateral
} from "../services/loanCollateralService.js";


export default function useLoanCollaterals() {

    const [collaterals, setCollaterals] =
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
                    "Failed to process collateral request."
                );

            },
            []
        );


    const loadCollaterals =
        useCallback(
            async () => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await fetchAllLoanCollaterals();

                    const data =
                        Array.isArray(response)
                            ? response
                            : response?.data || [];

                    setCollaterals(data);

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


    const getCollateral =
        useCallback(
            async (collateralId) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await fetchLoanCollateralById(
                            collateralId
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


    const getCollateralsByLoan =
        useCallback(
            async (loanId) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await fetchLoanCollateralsByLoanId(
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


    const getCollateralsByApplication =
        useCallback(
            async (applicationId) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await fetchLoanCollateralsByApplicationId(
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


    const createCollateral =
        useCallback(
            async (data) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await createNewLoanCollateral(
                            data
                        );

                    await loadCollaterals();

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
                loadCollaterals
            ]
        );


    const updateCollateral =
        useCallback(
            async (
                collateralId,
                data
            ) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await updateExistingLoanCollateral(
                            collateralId,
                            data
                        );

                    await loadCollaterals();

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
                loadCollaterals
            ]
        );


    const updateCollateralStatus =
        useCallback(
            async (
                collateralId,
                status
            ) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await changeLoanCollateralStatus(
                            collateralId,
                            status
                        );

                    await loadCollaterals();

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
                loadCollaterals
            ]
        );


    const deleteCollateral =
        useCallback(
            async (collateralId) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await removeLoanCollateral(
                            collateralId
                        );

                    setCollaterals(
                        (current) =>
                            current.filter(
                                (item) =>
                                    item.id !== collateralId
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

            loadCollaterals();

        },
        [loadCollaterals]
    );


    return {

        collaterals,

        loading,

        error,

        loadCollaterals,

        getCollateral,

        getCollateralsByLoan,

        getCollateralsByApplication,

        createCollateral,

        updateCollateral,

        updateCollateralStatus,

        deleteCollateral

    };

}

