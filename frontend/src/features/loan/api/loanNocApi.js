import api from "../../../services/api";

export async function getNocByLoan(loanId) {
    const response = await api.get(`/loan-nocs/loan/${loanId}`);
    return response.data;
}
