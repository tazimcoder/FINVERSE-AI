/**
 * ==========================================================
 * AI Feedback Service
 * ==========================================================
 */

import {

    saveFeedback,

} from "../models/aiFeedback.model.js";

export async function saveFeedbackService(data) {

    return await saveFeedback(

        data.message,

        data.response,

        data.feedback

    );

}