/**
 * ==========================================================
 * FINVERSE AI
 * Chat Controller
 * ==========================================================
 */

import {
    createChatService,
    getChatsService,
    getMessagesService,
    renameChatService,
    deleteChatService,
    favoriteChatService,
} from "../services/chat.service.js";

/* ==========================================================
   Get User ID
========================================================== */

const getUserId = (req) => {
    if (!req.user?.id) {
        throw new Error("User not authenticated");
    }
    return req.user.id;
};

/* ==========================================================
   Create Chat
========================================================== */

export async function createChat(req, res) {

    try {

        const userId = getUserId(req);

        const {
            title = "New Chat",
        } = req.body;

        const chat = await createChatService(
            userId,
            title
        );

        return res.status(201).json({
            success: true,
            chat,
        });

    }

    catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

}

/* ==========================================================
   Get Chats
========================================================== */

export async function getChats(req, res) {

    try {

        const chats = await getChatsService(
            getUserId(req)
        );

        return res.json({
            success: true,
            chats,
        });

    }

    catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

}

/* ==========================================================
   Get Messages
========================================================== */

export async function getMessages(req, res) {

    try {

        const messages = await getMessagesService(
            req.params.id
        );

        return res.json({
            success: true,
            messages,
        });

    }

    catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

}

/* ==========================================================
   Rename Chat
========================================================== */

export async function renameChat(req, res) {

    try {

        await renameChatService(
            req.params.id,
            getUserId(req),
            req.body.title
        );

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

/* ==========================================================
   Delete Chat
========================================================== */

export async function deleteChat(req, res) {

    try {

        await deleteChatService(
            req.params.id,
            getUserId(req)
        );

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

/* ==========================================================
   Favorite Chat
========================================================== */

export async function favoriteChat(req, res) {

    try {

        await favoriteChatService(
            req.params.id,
            getUserId(req)
        );

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