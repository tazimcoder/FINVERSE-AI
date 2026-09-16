/**
 * ==========================================================
 * FINVERSE AI
 * AI Service
 * ==========================================================
 */

import {

    sendMessageApi,

    regenerateApi,

} from "../api/aiApi";

export async function sendAIMessage(message, chatId) {

    const response = await sendMessageApi(

        message,
        chatId

    );

    return response.data;

}

export async function regenerateMessage(message, chatId) {

    const response = await regenerateApi(

        message,
        chatId

    );

    return response.data;

}