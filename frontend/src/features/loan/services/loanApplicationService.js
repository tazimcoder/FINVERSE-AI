import {
    getLoanApplications,
    getLoanApplicationById,
    getLoanApplicationsByUserId,
    getLoanApplicationsByStatus,
    createLoanApplication,
    updateLoanApplication,
    updateLoanApplicationStatus,
    deleteLoanApplication
} from "../api/loanApplicationApi.js";

// ==========================================================
// Response Data Extractor
// ==========================================================

function extractData(
    response
) {

    if (
        response === null ||
        response === undefined
    ) {

        return response;

    }


    return response?.data ??
        response;

}

// ==========================================================
// Get All Applications
// ==========================================================

export async function fetchAllLoanApplications() {

    const response =
        await getLoanApplications();

    return extractData(
        response
    );

}

// ==========================================================
// Compatibility Alias
// ==========================================================

export const fetchLoanApplications =
    fetchAllLoanApplications;
// ==========================================================
// Get Application By ID
// ==========================================================

export async function fetchLoanApplicationById(
    applicationId
) {

    if (
        applicationId === undefined ||
        applicationId === null ||
        applicationId === ""
    ) {

        throw new Error(
            "Loan application ID is required."
        );

    }


    const response =
        await getLoanApplicationById(
            applicationId
        );


    return extractData(
        response
    );

}

// ==========================================================
// Get Applications By User
// ==========================================================

export async function fetchLoanApplicationsByUserId(
    userId
) {

    if (
        userId === undefined ||
        userId === null ||
        userId === ""
    ) {

        throw new Error(
            "User ID is required."
        );

    }


    const response =
        await getLoanApplicationsByUserId(
            userId
        );
    const data =
        extractData(
            response
        );


    // ======================================================
    // Safety Filter
    // ======================================================
    //
    // Keeps frontend compatible even if backend currently
    // returns all applications instead of filtering.
    //

    if (
        Array.isArray(data)
    ) {

        return data.filter(
            (application) =>
                String(
                    application.user_id
                ) === String(
                    userId
                )
        );

    }


    return data;

}

// ==========================================================
// Get Applications By Status
// ==========================================================

export async function fetchLoanApplicationsByStatus(
    status
) {

    if (!status) {

        throw new Error(
            "Application status is required."
        );

    }


    const response =
        await getLoanApplicationsByStatus(
            status
        );


    const data =
        extractData(
            response
        );
    // ======================================================
    // Safety Filter
    // ======================================================

    if (
        Array.isArray(data)
    ) {

        const normalizedStatus =
            String(
                status
            )
                .trim()
                .toUpperCase();


        return data.filter(
            (application) =>
                String(
                    application.status ||
                    application.application_status ||
                    ""
                )
                    .trim()
                    .toUpperCase() ===
                normalizedStatus
        );

    }


    return data;

}

// ==========================================================
// Create New Loan Application
// ==========================================================

export async function createNewLoanApplication(
    applicationData
) {
    if (
        !applicationData ||
        typeof applicationData !== "object"
    ) {

        throw new Error(
            "Loan application data is required."
        );

    }


    const response =
        await createLoanApplication(
            applicationData
        );


    return extractData(
        response
    );
}

// ==========================================================
// Compatibility Alias
// ==========================================================

export const addLoanApplication =
    createNewLoanApplication;

// ==========================================================
// Update Loan Application
// ==========================================================

export async function updateExistingLoanApplication(
    applicationId,
    applicationData
) {

    if (
        applicationId === undefined ||
        applicationId === null ||
        applicationId === ""
    ) {

        throw new Error(
            "Loan application ID is required."
        );

    }


    if (
        !applicationData ||
        typeof applicationData !== "object"
    ) {

        throw new Error(
            "Loan application data is required."
        );

    }


    const response =
        await updateLoanApplication(
            applicationId,
            applicationData
        );


    return extractData(
        response
    );

}
// ==========================================================
// Compatibility Alias
// ==========================================================

export const editLoanApplication =
    updateExistingLoanApplication;

// ==========================================================
// Update Loan Application Status
// ==========================================================

export async function changeLoanApplicationStatus(
    applicationId,
    status
) {

    if (
        applicationId === undefined ||
        applicationId === null ||
        applicationId === ""
    ) {

        throw new Error(
            "Loan application ID is required."
        );

    }


    if (!status) {

        throw new Error(
            "Application status is required."
        );

    }


    const response =
        await updateLoanApplicationStatus(
            applicationId,
            String(
                status
            )
                .trim()
                .toUpperCase()
        );


    return extractData(
        response
    );

}
// ==========================================================
// Delete Loan Application
// ==========================================================

export async function removeLoanApplication(
    applicationId
) {

    if (
        applicationId === undefined ||
        applicationId === null ||
        applicationId === ""
    ) {

        throw new Error(
            "Loan application ID is required."
        );

    }


    const response =
        await deleteLoanApplication(
            applicationId
        );


    return extractData(
        response
    );

}