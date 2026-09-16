import api from "../../../services/api";

export async function getKfsByApplication(applicationId) {
    const response = await api.get(`/loan-kfs/application/${applicationId}`);
    return response.data;
}

export async function acceptKfsOffer(id) {
    const response = await api.patch(`/loan-kfs/${id}/accept`);
    return response.data;
}
