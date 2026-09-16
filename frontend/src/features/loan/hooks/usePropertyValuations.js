/**
 * ==========================================================
 * FINVERSE AI
 * Property Valuations Hook
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/hooks/usePropertyValuations.js
 *
 * ==========================================================
 */

import {
    getAllPropertyValuations,
    getPropertyValuationById,
    getPropertyValuationsByPropertyId,
    createPropertyValuation,
    updatePropertyValuation,
    deletePropertyValuation
} from "../services/propertyValuationService.js";

import {
    useCallback,
    useState
} from "react";


export default function usePropertyValuations() {

    const [valuations, setValuations] =
        useState([]);

    const [selectedValuation, setSelectedValuation] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState(null);


    const clearError =
        useCallback(() => {

            setError(null);

        }, []);


    const fetchPropertyValuations =
        useCallback(async () => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await getAllPropertyValuations();

                setValuations(
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
                    "Failed to fetch property valuations.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    const fetchPropertyValuationById =
        useCallback(async (valuationId) => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await getPropertyValuationById(
                        valuationId
                    );

                setSelectedValuation(
                    data || null
                );

                return data;

            }

            catch (err) {

                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to fetch property valuation.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    const fetchPropertyValuationsByPropertyId =
        useCallback(async (propertyId) => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await getPropertyValuationsByPropertyId(
                        propertyId
                    );

                setValuations(
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
                    "Failed to fetch property valuations.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    const createValuation =
        useCallback(
            async (valuationData) => {

                try {

                    setLoading(true);
                    setError(null);

                    const data =
                        await createPropertyValuation(
                            valuationData
                        );

                    await fetchPropertyValuations();

                    return data;

                }

                catch (err) {

                    const message =
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to create property valuation.";

                    setError(message);

                    throw err;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                fetchPropertyValuations
            ]
        );


    const updateValuation =
        useCallback(
            async (
                valuationId,
                valuationData
            ) => {

                try {

                    setLoading(true);
                    setError(null);

                    const data =
                        await updatePropertyValuation(
                            valuationId,
                            valuationData
                        );

                    await fetchPropertyValuations();

                    return data;

                }

                catch (err) {

                    const message =
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to update property valuation.";

                    setError(message);

                    throw err;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                fetchPropertyValuations
            ]
        );


    const removePropertyValuation =
        useCallback(
            async (valuationId) => {

                try {

                    setLoading(true);
                    setError(null);

                    const data =
                        await deletePropertyValuation(
                            valuationId
                        );

                    setValuations(
                        (previousValuations) =>
                            previousValuations.filter(
                                (valuation) =>
                                    valuation.id !==
                                    Number(
                                        valuationId
                                    )
                            )
                    );

                    if (
                        selectedValuation?.id ===
                        Number(valuationId)
                    ) {

                        setSelectedValuation(
                            null
                        );

                    }

                    return data;

                }

                catch (err) {

                    const message =
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to delete property valuation.";

                    setError(message);

                    throw err;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                selectedValuation
            ]
        );


    return {

        valuations,

        selectedValuation,

        loading,

        error,

        clearError,

        fetchPropertyValuations,

        fetchPropertyValuationById,

        fetchPropertyValuationsByPropertyId,

        createValuation,

        updateValuation,

        removePropertyValuation

    };

}

