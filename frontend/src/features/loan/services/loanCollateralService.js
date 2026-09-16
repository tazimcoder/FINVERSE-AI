/**
 * ==========================================================
 * FINVERSE
 * Loan Collateral Service
 * ==========================================================
 */

import {
    getLoanCollaterals,
    getLoanCollateralById as apiGetById,
    getLoanCollateralsByLoanId as apiGetByLoanId,
    createLoanCollateral as apiCreateCollateral,
    updateLoanCollateral as apiUpdateCollateral,
    deleteLoanCollateral as apiDeleteCollateral
} from "../api/loanCollateralApi";

export async function fetchLoanCollaterals() {
    try {
        const response = await getLoanCollaterals();
        return response?.data ?? response ?? [];
    } catch {
        return [];
    }
}

export async function fetchLoanCollateralById(id) {
    const response = await apiGetById(id);
    return response?.data ?? response;
}

export async function fetchLoanCollateralsByLoanId(loanId) {
    const response = await apiGetByLoanId(loanId);
    return response?.data ?? response;
}

export async function fetchLoanCollateralsByApplicationId(appId) {
    const all = await fetchLoanCollaterals();
    if (!Array.isArray(all)) return [];
    return all.filter(c => String(c.application_id) === String(appId));
}

export async function addLoanCollateral(data) {
    const response = await apiCreateCollateral(data);
    return response?.data ?? response;
}

export async function editLoanCollateral(id, data) {
    const response = await apiUpdateCollateral(id, data);
    return response?.data ?? response;
}

export async function changeLoanCollateralStatus(id, status) {
    return await editLoanCollateral(id, { status });
}

export async function removeLoanCollateral(id) {
    const response = await apiDeleteCollateral(id);
    return response?.data ?? response;
}

// Aliases for Hook Imports
export {
    fetchLoanCollaterals as fetchAllLoanCollaterals,
    addLoanCollateral as createNewLoanCollateral,
    editLoanCollateral as updateExistingLoanCollateral
};
