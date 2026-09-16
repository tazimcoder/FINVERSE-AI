/**
 * ==========================================================
 * FINVERSE
 * KFS Controller
 * ==========================================================
 */

import * as kfsService from "../services/loanKfsService.js";

export async function getKfsByApplication(req, res) {
    try {
        const { applicationId } = req.params;
        let kfs = await kfsService.fetchKfsByApplication(applicationId);
        if (!kfs) {
            kfs = await kfsService.generateKfsForApplication({
                application_id: applicationId,
                amount: req.query.amount || 100000,
                rate: req.query.rate || 12.5,
                tenure: req.query.tenure || 12
            });
        }
        return res.status(200).json({ success: true, data: kfs });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export async function generateKfs(req, res) {
    try {
        const kfs = await kfsService.generateKfsForApplication(req.body);
        return res.status(201).json({ success: true, data: kfs });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export async function acceptKfsOffer(req, res) {
    try {
        const { id } = req.params;
        const updated = await kfsService.acceptKfs(id);
        return res.status(200).json({ success: true, data: updated });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
