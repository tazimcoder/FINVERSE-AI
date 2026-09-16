/**
 * ==========================================================
 * FINVERSE AI
 * Chat Service
 * ==========================================================
 */

import {

    createChat,

    getChats,

    getChat,

    renameChat,

    deleteChat,

    favoriteChat,

} from "../models/chat.model.js";

import {

    saveMessage,

    getMessages,

} from "../models/chatMessage.model.js";

/* ==========================================================
   Create Chat
========================================================== */

export async function createChatService(userId, title) {

    const chatId = await createChat(

        userId,

        title

    );

    return {

        id: chatId,

        title,

    };

}

/* ==========================================================
   Get Chats
========================================================== */

export async function getChatsService(userId) {

    return await getChats(userId);

}

/* ==========================================================
   Get Messages
========================================================== */

export async function getMessagesService(chatId) {

    return await getMessages(chatId);

}

/* ==========================================================
   Save User Message
========================================================== */

export async function saveUserMessageService(

    chatId,

    message

) {

    const chat = await getChat(chatId);

    if (!chat) {

        throw new Error("Chat not found");

    }

    await saveMessage(

        chatId,

        "user",

        message

    );

}

/* ==========================================================
   Save AI Message
========================================================== */

export async function saveAIMessageService(

    chatId,

    message

) {

    const chat = await getChat(chatId);

    if (!chat) {

        throw new Error("Chat not found");

    }

    await saveMessage(

        chatId,

        "assistant",

        message

    );

}

/* ==========================================================
   Rename Chat
========================================================== */

export async function renameChatService(

    chatId,

    userId,

    title

) {

    await renameChat(

        chatId,

        userId,

        title

    );

}

/* ==========================================================
   Delete Chat
========================================================== */

export async function deleteChatService(

    chatId,

    userId

) {

    await deleteChat(

        chatId,

        userId

    );

}

/* ==========================================================
   Favorite Chat
========================================================== */

export async function favoriteChatService(

    chatId,

    userId

) {

    await favoriteChat(

        chatId,

        userId

    );

}