/**
 * ==========================================================
 * FINVERSE AI
 * Loan Collateral API
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/api/loanCollateralApi.js
 *
 * Responsibility:
 *
 * - Communicate with Loan Collateral backend APIs
 *
 * ==========================================================
 */

import api from "../../../services/api";

import {
    LOAN_API_PATHS
} from "../constants/loanConstants";


// ==========================================================
// Get All Loan Collaterals
// ==========================================================

export async function getLoanCollaterals() {

    const response =
        await api.get(
            LOAN_API_PATHS.COLLATERALS
        );

    return response.data;

}


// ==========================================================
// Get Collateral By ID
// ==========================================================

export async function getLoanCollateralById(
    collateralId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.COLLATERALS}/${collateralId}`
        );

    return response.data;

}


// ==========================================================
// Get Collaterals By Loan ID
// ==========================================================

export async function getLoanCollateralsByLoanId(
    loanId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.COLLATERALS}/loan/${loanId}`
        );

    return response.data;

}


// ==========================================================
// Create Loan Collateral
// ==========================================================

export async function createLoanCollateral(
    collateralData
) {

    const response =
        await api.post(
            LOAN_API_PATHS.COLLATERALS,
            collateralData
        );

    return response.data;

}


// ==========================================================
// Update Loan Collateral
// ==========================================================

export async function updateLoanCollateral(
    collateralId,
    collateralData
) {

    const response =
        await api.put(
            `${LOAN_API_PATHS.COLLATERALS}/${collateralId}`,
            collateralData
        );

    return response.data;

}


// ==========================================================
// Delete Loan Collateral
// ==========================================================

export async function deleteLoanCollateral(
    collateralId
) {

    const response =
        await api.delete(
            `${LOAN_API_PATHS.COLLATERALS}/${collateralId}`
        );

    return response.data;

}

