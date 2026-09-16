import api from "../../../services/api";

export async function getAgreementByApplication(applicationId) {
    const response = await api.get(`/loan-agreements/application/${applicationId}`);
    return response.data;
}

export async function acceptAgreement(id) {
    const response = await api.patch(`/loan-agreements/${id}/accept`);
    return response.data;
}
