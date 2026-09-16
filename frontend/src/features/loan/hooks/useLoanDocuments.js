import {
    useCallback,
    useEffect,
    useState
} from "react";

import {
    fetchAllLoanDocuments,
    fetchLoanDocumentById,
    fetchLoanDocumentsByLoanId,
    fetchLoanDocumentsByApplicationId,
    createNewLoanDocument,
    updateExistingLoanDocument,
    changeLoanDocumentStatus,
    removeLoanDocument
} from "../services/loanDocumentService.js";


export default function useLoanDocuments() {

    const [documents, setDocuments] =
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
                    "Failed to process loan document request."
                );

            },
            []
        );


    const loadDocuments =
        useCallback(
            async () => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await fetchAllLoanDocuments();

                    const data =
                        Array.isArray(response)
                            ? response
                            : response?.data || [];

                    setDocuments(data);

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


    const getDocument =
        useCallback(
            async (documentId) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await fetchLoanDocumentById(
                            documentId
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


    const getDocumentsByLoan =
        useCallback(
            async (loanId) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await fetchLoanDocumentsByLoanId(
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


    const getDocumentsByApplication =
        useCallback(
            async (applicationId) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await fetchLoanDocumentsByApplicationId(
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


    const createDocument =
        useCallback(
            async (data) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await createNewLoanDocument(
                            data
                        );

                    await loadDocuments();

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
                loadDocuments
            ]
        );


    const updateDocument =
        useCallback(
            async (
                documentId,
                data
            ) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await updateExistingLoanDocument(
                            documentId,
                            data
                        );

                    await loadDocuments();

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
                loadDocuments
            ]
        );


    const updateDocumentStatus =
        useCallback(
            async (
                documentId,
                status
            ) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await changeLoanDocumentStatus(
                            documentId,
                            status
                        );

                    await loadDocuments();

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
                loadDocuments
            ]
        );


    const deleteDocument =
        useCallback(
            async (documentId) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await removeLoanDocument(
                            documentId
                        );

                    setDocuments(
                        (current) =>
                            current.filter(
                                (item) =>
                                    item.id !== documentId
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

            loadDocuments();

        },
        [loadDocuments]
    );


    return {

        documents,

        loading,

        error,

        loadDocuments,

        getDocument,

        getDocumentsByLoan,

        getDocumentsByApplication,

        createDocument,

        updateDocument,

        updateDocumentStatus,

        deleteDocument

    };

}

