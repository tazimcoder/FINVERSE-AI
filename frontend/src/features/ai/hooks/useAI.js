/**
 * ==========================================================
 * FINVERSE AI
 * AI Hook
 * ==========================================================
 */

import { useEffect, useState } from "react";
import {
    sendAIMessage,
    regenerateMessage,
} from "../services/aiService";

const STORAGE_KEY = "finverse_ai_chat_history";

function useAI() {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    /* =========================================
       Load Chat History
    ========================================= */

    useEffect(() => {

        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {

            setMessages(JSON.parse(saved));

        }

    }, []);

    /* =========================================
       Save Chat History
    ========================================= */

    useEffect(() => {

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(messages)

        );

    }, [messages]);

    /* =========================================
       Send Message
    ========================================= */

    async function sendMessage(

        message,

        chatId = null,

        externalSetMessages = null

    ) {

        if (!message.trim() || loading) return;

        const updateMessages = externalSetMessages || setMessages;

        setLoading(true);

        const userMessage = {

            role: "user",

            content: message,

        };

        updateMessages(prev => [

            ...prev,

            userMessage,

        ]);

        try {

            const result = await sendAIMessage(

                message,

                chatId

            );

            updateMessages(prev => [

                ...prev,

                {

                    role: "assistant",

                    content: "",

                    summary: result.summary,

                    userMessage: message,

                },

            ]);

            let current = "";

            for (const char of result.reply) {

                current += char;

                updateMessages(prev => {

                    const updated = [...prev];

                    updated[updated.length - 1] = {

                        ...updated[updated.length - 1],

                        content: current,

                    };

                    return updated;

                });

                await new Promise(resolve =>

                    setTimeout(resolve, 8)

                );

            }

        }

        catch (error) {

            console.error(error);

            updateMessages(prev => [

                ...prev,

                {

                    role: "assistant",

                    content:
                        "❌ Something went wrong while contacting FINVERSE AI.",

                },

            ]);

        }

        finally {

            setLoading(false);

        }

    }

    /* =========================================
       Regenerate Response
    ========================================= */

    async function regenerate(chatId = null) {

        if (loading) return;

        const lastUser = [...messages]

            .reverse()

            .find(

                item => item.role === "user"

            );

        if (!lastUser) return;

        setMessages(prev => {

            const updated = [...prev];

            while (

                updated.length > 0 &&

                updated[updated.length - 1].role === "assistant"

            ) {

                updated.pop();

            }

            return updated;

        });

        try {

            setLoading(true);

            const result = await regenerateMessage(

                lastUser.content,

                chatId

            );

            setMessages(prev => [

                ...prev,

                {

                    role: "assistant",

                    content: result.reply,

                    summary: result.summary,

                    userMessage: lastUser.content,

                },

            ]);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    /* =========================================
       Clear Chat
    ========================================= */

    function clearChat() {

        localStorage.removeItem(STORAGE_KEY);

        setMessages([]);

    }

    return {

        messages,

        loading,

        sendMessage,

        regenerate,

        clearChat,

    };

}

export default useAI;