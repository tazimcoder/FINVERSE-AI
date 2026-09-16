/**
 * ==========================================================
 * FINVERSE AI
 * AI Controller
 * ==========================================================
 */

import {

    sendMessageService,

} from "../services/ai.service.js";

import {

    saveUserMessageService,

    saveAIMessageService,

} from "../services/chat.service.js";

/* ==========================================================
   Send Message
========================================================== */

export async function sendMessage(req, res) {

    try {

        const {

            message,

            chatId,

        } = req.body;

        if (!message) {

            return res.status(400).json({

                success: false,

                message: "Message is required.",

            });

        }

        /* =========================================
           Save User Message
        ========================================= */

        if (chatId) {

            await saveUserMessageService(

                chatId,

                message

            );

        }

        /* =========================================
           AI Response
        ========================================= */

        const userId = req.user?.id;

        const result = await sendMessageService(

            message,
            userId

        );

        /* =========================================
           Save AI Response
        ========================================= */

        if (chatId) {

            await saveAIMessageService(

                chatId,

                result.reply

            );

        }

        /* =========================================
           Response
        ========================================= */

        return res.status(200).json({

            success: true,

            reply: result.reply,

            summary: result.summary,

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

}