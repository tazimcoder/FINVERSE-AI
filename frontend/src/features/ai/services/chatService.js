/**
 * ==========================================================
 * FINVERSE AI
 * Chat Service
 * ==========================================================
 */

import {

    createChat,
    getChats,
    getMessages,
    renameChat,
    deleteChat,
    favoriteChat,

} from "../api/chatApi";

/* ========================================= */

export async function createChatService(title) {

    const response = await createChat(title);

    return response.data.chat;

}

/* ========================================= */

export async function getChatsService() {

    const response = await getChats();

    return response.data.chats;

}

/* ========================================= */

export async function getMessagesService(chatId) {

    const response = await getMessages(chatId);

    return response.data.messages;

}

/* ========================================= */

export async function renameChatService(

    chatId,
    title

) {

    await renameChat(chatId, title);

}

/* ========================================= */

export async function deleteChatService(chatId) {

    await deleteChat(chatId);

}

/* ========================================= */

export async function favoriteChatService(chatId) {

    await favoriteChat(chatId);

}