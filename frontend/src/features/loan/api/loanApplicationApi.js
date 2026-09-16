import api from "../../../services/api";

import {
    LOAN_API_PATHS
} from "../constants/loanConstants";

// ==========================================================
// Get All Loan Applications
// ==========================================================

export async function getLoanApplications() {
    const response =
        await api.get(
            LOAN_API_PATHS.APPLICATIONS
        );

    return response.data;
}

// ==========================================================
// Get Loan Application By ID
// ==========================================================

export async function getLoanApplicationById(
    applicationId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.APPLICATIONS}/${applicationId}`
        );

    return response.data;

}
// ==========================================================
// Get Loan Applications By User ID
// ==========================================================
//
// Uses real API data.
//
// Query parameters are sent to backend. If your current
// backend returns all records without filtering, filtering
// is safely handled again in the service layer.
//

export async function getLoanApplicationsByUserId(
    userId
) {
    const response =
        await api.get(
            `${LOAN_API_PATHS.APPLICATIONS}/user/${userId}`
        );

    return response.data;
}


// ==========================================================
// Get Loan Applications By Status
// ==========================================================

export async function getLoanApplicationsByStatus(
    status
) {
    const response =
        await api.get(
            LOAN_API_PATHS.APPLICATIONS,
            {
                params: {
                    status
                }
            }
        );

    return response.data;
}

// ==========================================================
// Create Loan Application
// ==========================================================

export async function createLoanApplication(
    applicationData
) {
    const response =
        await api.post(
            LOAN_API_PATHS.APPLICATIONS,
            applicationData
        );

    return response.data;
}

// ==========================================================
// Update Loan Application
// ==========================================================

export async function updateLoanApplication(
    applicationId,
    applicationData
) {

    const response =
        await api.put(
            `${LOAN_API_PATHS.APPLICATIONS}/${applicationId}`,
            applicationData
        );

    return response.data;

}

// ==========================================================
// Update Loan Application Status
// ==========================================================
//
// Uses the existing update endpoint so we do not create
// a frontend dependency on an endpoint that may not exist.
//

export async function updateLoanApplicationStatus(
    applicationId,
    status
) {

    return await updateLoanApplication(
        applicationId,
        {
            status
        }
    );

}

// ==========================================================
// Delete Loan Application
// ==========================================================

export async function deleteLoanApplication(
    applicationId
) {
    const response =
        await api.delete(
            `${LOAN_API_PATHS.APPLICATIONS}/${applicationId}`
        );

    return response.data;

}