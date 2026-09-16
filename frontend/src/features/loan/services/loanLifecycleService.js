import {
    getLoanLifecycle,
    getLoanLifecycleHistory,
    moveLoanToNextStage,
    updateLoanLifecycleStatus
} from "../api/loanLifecycleApi.js";

export async function fetchLoanLifecycle(loanId) {
    return await getLoanLifecycle(loanId);
}

export async function fetchLoanLifecycleHistory(loanId) {
    return await getLoanLifecycleHistory(loanId);
}

export async function moveLoanToNextLifecycleStage(
    loanId,
    data
) {
    return await moveLoanToNextStage(
        loanId,
        data
    );
}

export async function changeLoanLifecycleStatus(
    loanId,
    status
) {
    return await updateLoanLifecycleStatus(
        loanId,
        status
    );
}

