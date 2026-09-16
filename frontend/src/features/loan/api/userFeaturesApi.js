/**
 * ==========================================================
 * FINVERSE AI
 * User Features API Helper
 * ==========================================================
 */

import api from "../../../services/api";

export async function getUserKyc() {
    const res = await api.get("/user/kyc");
    return res.data;
}

export async function getUserCibil() {
    const res = await api.get("/user/cibil");
    return res.data;
}

export async function getUserEmis() {
    const res = await api.get("/user/emis");
    return res.data;
}

export async function payUserEmi(emiId, transactionRef) {
    const res = await api.post("/user/emis/pay", { emiId, transactionRef });
    return res.data;
}

export async function uploadDocumentOcr(docType, docName, ocrData) {
    const res = await api.post("/user/documents/ocr", { docType, docName, ocrData });
    return res.data;
}

export async function getUserDocuments() {
    const res = await api.get("/user/documents");
    return res.data;
}

export async function getUserNotifications() {
    const res = await api.get("/user/notifications");
    return res.data;
}

export async function markNotificationsRead(notificationId) {
    const res = await api.patch("/user/notifications/read", { notificationId });
    return res.data;
}
