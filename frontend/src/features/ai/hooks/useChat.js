/**
 * ==========================================================
 * FINVERSE AI
 * Chat Hook
 * ==========================================================
 */

import { useEffect, useState } from "react";

import {

    createChatService,
    getChatsService,
    getMessagesService,
    renameChatService,
    deleteChatService,
    favoriteChatService,

} from "../services/chatService";

function useChat() {

    const [chats, setChats] = useState([]);

    const [activeChat, setActiveChat] = useState(null);

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    /* ========================================= */

    async function loadChats() {

        try {

            setLoading(true);

            const data = await getChatsService();

            setChats(data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadChats();

    }, []);

    /* ========================================= */

    async function loadMessages(chatId) {

        try {

            const data = await getMessagesService(chatId);

            setMessages(data);

        }

        catch (error) {

            console.error(error);

        }

    }

    useEffect(() => {

        if (activeChat) {

            loadMessages(activeChat.id);

        }

        else {

            setMessages([]);

        }

    }, [activeChat]);

    /* ========================================= */

    async function newChat() {

        const chat = await createChatService("New Chat");

        await loadChats();

        setActiveChat(chat);

        setMessages([]);

    }

    /* ========================================= */

    async function rename(chatId, title) {

        await renameChatService(chatId, title);

        await loadChats();

    }

    /* ========================================= */

    async function remove(chatId) {

        await deleteChatService(chatId);

        await loadChats();

        if (activeChat?.id === chatId) {

            setActiveChat(null);

            setMessages([]);

        }

    }

    /* ========================================= */

    async function favorite(chatId) {

        await favoriteChatService(chatId);

        await loadChats();

    }

    return {

        chats,

        activeChat,

        messages,

        loading,

        setMessages,

        setActiveChat,

        loadChats,

        loadMessages,

        newChat,

        rename,

        remove,

        favorite,

    };

}

export default useChat;