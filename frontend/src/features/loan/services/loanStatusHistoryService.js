import {
    getAllLoanStatusHistories,
    getLoanStatusHistoryById,
    getLoanStatusHistoriesByLoanId,
    getLoanStatusHistoriesByApplicationId,
    createLoanStatusHistory,
    updateLoanStatusHistory,
    deleteLoanStatusHistory
} from "../api/loanStatusHistoryApi.js";

export async function fetchAllLoanStatusHistories() {
    return await getAllLoanStatusHistories();
}

export async function fetchLoanStatusHistoryById(id) {
    return await getLoanStatusHistoryById(id);
}

export async function fetchLoanStatusHistoriesByLoanId(loanId) {
    return await getLoanStatusHistoriesByLoanId(loanId);
}

export async function fetchLoanStatusHistoriesByApplicationId(
    applicationId
) {
    return await getLoanStatusHistoriesByApplicationId(
        applicationId
    );
}

export async function createNewLoanStatusHistory(data) {
    return await createLoanStatusHistory(data);
}

export async function updateExistingLoanStatusHistory(id, data) {
    return await updateLoanStatusHistory(id, data);
}

export async function removeLoanStatusHistory(id) {
    return await deleteLoanStatusHistory(id);
}

