import api from "../../../services/api";

export async function getForeclosureByLoan(loanId) {
    const response = await api.get(`/loan-foreclosures/loan/${loanId}`);
    return response.data;
}

export async function processPayoff(id, loanId) {
    const response = await api.post(`/loan-foreclosures/${id}/payoff`, { loanId });
    return response.data;
}
