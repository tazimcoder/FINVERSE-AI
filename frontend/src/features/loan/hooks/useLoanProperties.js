/**
 * ==========================================================
 * FINVERSE AI
 * Loan Properties Hook
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/hooks/useLoanProperties.js
 *
 * ==========================================================
 */

import {
    getAllLoanProperties,
    getLoanPropertyById,
    getLoanPropertiesByApplicationId,
    createLoanProperty,
    updateLoanProperty,
    deleteLoanProperty
} from "../services/loanPropertyService.js";

import {
    useCallback,
    useState
} from "react";


export default function useLoanProperties() {

    const [properties, setProperties] =
        useState([]);

    const [selectedProperty, setSelectedProperty] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState(null);


    const clearError =
        useCallback(() => {

            setError(null);

        }, []);


    const fetchLoanProperties =
        useCallback(async () => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await getAllLoanProperties();

                setProperties(
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
                    "Failed to fetch loan properties.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    const fetchLoanPropertyById =
        useCallback(async (propertyId) => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await getLoanPropertyById(
                        propertyId
                    );

                setSelectedProperty(
                    data || null
                );

                return data;

            }

            catch (err) {

                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to fetch loan property.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    const fetchLoanPropertiesByApplicationId =
        useCallback(async (applicationId) => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await getLoanPropertiesByApplicationId(
                        applicationId
                    );

                setProperties(
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
                    "Failed to fetch loan properties.";

                setError(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        }, []);


    const createProperty =
        useCallback(
            async (propertyData) => {

                try {

                    setLoading(true);
                    setError(null);

                    const data =
                        await createLoanProperty(
                            propertyData
                        );

                    await fetchLoanProperties();

                    return data;

                }

                catch (err) {

                    const message =
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to create loan property.";

                    setError(message);

                    throw err;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                fetchLoanProperties
            ]
        );


    const updateProperty =
        useCallback(
            async (
                propertyId,
                propertyData
            ) => {

                try {

                    setLoading(true);
                    setError(null);

                    const data =
                        await updateLoanProperty(
                            propertyId,
                            propertyData
                        );

                    await fetchLoanProperties();

                    return data;

                }

                catch (err) {

                    const message =
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to update loan property.";

                    setError(message);

                    throw err;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                fetchLoanProperties
            ]
        );


    const removeLoanProperty =
        useCallback(
            async (propertyId) => {

                try {

                    setLoading(true);
                    setError(null);

                    const data =
                        await deleteLoanProperty(
                            propertyId
                        );

                    setProperties(
                        (previousProperties) =>
                            previousProperties.filter(
                                (property) =>
                                    property.id !==
                                    Number(propertyId)
                            )
                    );

                    if (
                        selectedProperty?.id ===
                        Number(propertyId)
                    ) {

                        setSelectedProperty(
                            null
                        );

                    }

                    return data;

                }

                catch (err) {

                    const message =
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to delete loan property.";

                    setError(message);

                    throw err;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                selectedProperty
            ]
        );


    return {

        properties,

        selectedProperty,

        loading,

        error,

        clearError,

        fetchLoanProperties,

        fetchLoanPropertyById,

        fetchLoanPropertiesByApplicationId,

        createProperty,

        updateProperty,

        removeLoanProperty

    };

}