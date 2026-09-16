import {
    useCallback,
    useEffect,
    useState
} from "react";

import {
    fetchAllLoanProducts,
    fetchActiveLoanProducts,
    fetchLoanProductById,
    createNewLoanProduct,
    updateExistingLoanProduct,
    changeLoanProductStatus,
    removeLoanProduct
} from "../services/loanProductService.js";


export default function useLoanProducts() {

    const [products, setProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState(null);


    // ======================================================
    // Error Handler
    // ======================================================

    const handleRequestError =
        useCallback(
            (error) => {

                const message =
                    error?.response?.data?.message ||
                    error?.message ||
                    "Something went wrong.";

                setError(message);

                return message;

            },
            []
        );


    // ======================================================
    // Load All Loan Products
    // ======================================================

    const loadProducts =
        useCallback(
            async () => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await fetchAllLoanProducts();

                    const data =
                        Array.isArray(response)
                            ? response
                            : response?.data || [];

                    setProducts(data);

                    return data;

                }

                catch (error) {

                    handleRequestError(error);

                    return [];

                }

                finally {

                    setLoading(false);

                }

            },
            [
                handleRequestError
            ]
        );


    // ======================================================
    // Load Active Loan Products
    // ======================================================

    const loadActiveProducts =
        useCallback(
            async () => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await fetchActiveLoanProducts();

                    const data =
                        Array.isArray(response)
                            ? response
                            : response?.data || [];

                    setProducts(data);

                    return data;

                }

                catch (error) {

                    handleRequestError(error);

                    return [];

                }

                finally {

                    setLoading(false);

                }

            },
            [
                handleRequestError
            ]
        );


    // ======================================================
    // Get Loan Product By ID
    // ======================================================

    const getProduct =
        useCallback(
            async (productId) => {

                setLoading(true);
                setError(null);

                try {

                    return await fetchLoanProductById(
                        productId
                    );

                }

                catch (error) {

                    handleRequestError(error);

                    return null;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                handleRequestError
            ]
        );


    // ======================================================
    // Create Loan Product
    // ======================================================

    const createProduct =
        useCallback(
            async (data) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await createNewLoanProduct(
                            data
                        );

                    await loadProducts();

                    return response;

                }

                catch (error) {

                    handleRequestError(error);

                    throw error;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                handleRequestError,
                loadProducts
            ]
        );


    // ======================================================
    // Update Loan Product
    // ======================================================

    const updateProduct =
        useCallback(
            async (
                productId,
                data
            ) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await updateExistingLoanProduct(
                            productId,
                            data
                        );

                    await loadProducts();

                    return response;

                }

                catch (error) {

                    handleRequestError(error);

                    throw error;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                handleRequestError,
                loadProducts
            ]
        );


    // ======================================================
    // Update Loan Product Status
    // ======================================================

    const updateProductStatus =
        useCallback(
            async (
                productId,
                status
            ) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await changeLoanProductStatus(
                            productId,
                            status
                        );

                    await loadProducts();

                    return response;

                }

                catch (error) {

                    handleRequestError(error);

                    throw error;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                handleRequestError,
                loadProducts
            ]
        );


    // ======================================================
    // Delete Loan Product
    // ======================================================

    const deleteProduct =
        useCallback(
            async (productId) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await removeLoanProduct(
                            productId
                        );

                    setProducts(
                        (currentProducts) =>
                            currentProducts.filter(
                                (product) =>
                                    product.id !== productId
                            )
                    );

                    return response;

                }

                catch (error) {

                    handleRequestError(error);

                    throw error;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                handleRequestError
            ]
        );


    // ======================================================
    // Initial Load
    // ======================================================

    useEffect(
        () => {

            loadProducts();

        },
        [
            loadProducts
        ]
    );


    // ======================================================
    // Public Hook API
    // ======================================================

    return {

        products,

        loading,

        error,

        // Canonical names
        loadProducts,
        loadActiveProducts,
        getProduct,
        createProduct,
        updateProduct,
        updateProductStatus,
        deleteProduct,

        // Compatibility aliases
        fetchLoanProducts:
            loadProducts,

        fetchAllLoanProducts:
            loadProducts,

        fetchActiveLoanProducts:
            loadActiveProducts

    };

}