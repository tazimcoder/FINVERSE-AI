/**
 * ==========================================================
 * FINVERSE AI
 * AI API
 * ==========================================================
 */

import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/ai";

export function sendMessageApi(message, chatId) {

    return axios.post(

        `${BASE_URL}/chat`,

        {

            message,
            chatId,

        }

    );

}

export function regenerateApi(message, chatId) {

    return axios.post(

        `${BASE_URL}/chat`,

        {

            message,
            chatId,

        }

    );

}