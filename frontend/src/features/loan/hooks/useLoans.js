import {
    useCallback,
    useEffect,
    useState
} from "react";

import {
    fetchAllLoans,
    fetchLoanById,
    fetchLoansByUserId,
    fetchLoansByApplicationId,
    fetchLoansByStatus,
    createNewLoan,
    updateExistingLoan,
    changeLoanStatus,
    removeLoan
} from "../services/loanService.js";


export default function useLoans() {

    const [loans, setLoans] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState(null);


    const handleError =
        useCallback(
            (error) => {

                const message =
                    error?.response?.data?.message ||
                    error?.message ||
                    "Failed to process loan request.";

                setError(message);

                return message;

            },
            []
        );


    // ======================================================
    // Load All Loans
    // ======================================================

    const loadLoans =
        useCallback(
            async () => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await fetchAllLoans();

                    const data =
                        Array.isArray(response)
                            ? response
                            : response?.data || [];

                    setLoans(data);

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
            [
                handleError
            ]
        );


    // ======================================================
    // Get Loan By ID
    // ======================================================

    const getLoan =
        useCallback(
            async (loanId) => {

                setLoading(true);
                setError(null);

                try {

                    return await fetchLoanById(
                        loanId
                    );

                }

                catch (error) {

                    handleError(error);

                    return null;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                handleError
            ]
        );


    // ======================================================
    // Get Loans By User
    // ======================================================

    const getLoansByUser =
        useCallback(
            async (userId) => {

                setLoading(true);
                setError(null);

                try {

                    return await fetchLoansByUserId(
                        userId
                    );

                }

                catch (error) {

                    handleError(error);

                    return [];

                }

                finally {

                    setLoading(false);

                }

            },
            [
                handleError
            ]
        );


    // ======================================================
    // Get Loans By Application
    // ======================================================

    const getLoansByApplication =
        useCallback(
            async (applicationId) => {

                setLoading(true);
                setError(null);

                try {

                    return await fetchLoansByApplicationId(
                        applicationId
                    );

                }

                catch (error) {

                    handleError(error);

                    return [];

                }

                finally {

                    setLoading(false);

                }

            },
            [
                handleError
            ]
        );


    // ======================================================
    // Get Loans By Status
    // ======================================================

    const getLoansByStatus =
        useCallback(
            async (status) => {

                setLoading(true);
                setError(null);

                try {

                    return await fetchLoansByStatus(
                        status
                    );

                }

                catch (error) {

                    handleError(error);

                    return [];

                }

                finally {

                    setLoading(false);

                }

            },
            [
                handleError
            ]
        );


    // ======================================================
    // Create Loan
    // ======================================================

    const createLoan =
        useCallback(
            async (data) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await createNewLoan(
                            data
                        );

                    await loadLoans();

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
                loadLoans
            ]
        );


    // ======================================================
    // Update Loan
    // ======================================================

    const updateLoan =
        useCallback(
            async (
                loanId,
                data
            ) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await updateExistingLoan(
                            loanId,
                            data
                        );

                    await loadLoans();

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
                loadLoans
            ]
        );


    // ======================================================
    // Update Loan Status
    // ======================================================

    const updateStatus =
        useCallback(
            async (
                loanId,
                status
            ) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await changeLoanStatus(
                            loanId,
                            status
                        );

                    await loadLoans();

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
                loadLoans
            ]
        );


    // ======================================================
    // Delete Loan
    // ======================================================

    const deleteLoan =
        useCallback(
            async (loanId) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await removeLoan(
                            loanId
                        );

                    setLoans(
                        (currentLoans) =>
                            currentLoans.filter(
                                (loan) =>
                                    loan.id !== loanId
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
            [
                handleError
            ]
        );


    // ======================================================
    // Initial Load
    // ======================================================

    useEffect(
        () => {

            loadLoans();

        },
        [
            loadLoans
        ]
    );


    // ======================================================
    // Public Hook API
    // ======================================================

    return {

        loans,

        loading,

        error,

        // Canonical names
        loadLoans,
        getLoan,
        getLoansByUser,
        getLoansByApplication,
        getLoansByStatus,
        createLoan,
        updateLoan,
        updateStatus,
        deleteLoan,

        // Compatibility alias
        // Required by existing LoanPage and older consumers.
        fetchLoans:
            loadLoans

    };

}