/**
 * ==========================================================
 * AI Feedback Controller
 * ==========================================================
 */

import {

    saveFeedbackService,

} from "../services/feedback.service.js";

export async function saveFeedback(req, res) {

    try {

        await saveFeedbackService(req.body);

        return res.json({

            success: true,

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

}