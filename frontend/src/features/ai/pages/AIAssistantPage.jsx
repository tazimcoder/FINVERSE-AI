/**
 * ==========================================================
 * FINVERSE AI — AI Financial Intelligence Hub
 * Executive AI Financial Assistant powered by Gemini API
 * ==========================================================
 */

import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import ChatWindow from "../components/ChatWindow";
import ChatSidebar from "../components/ChatSidebar";
import useAI from "../hooks/useAI";
import useChat from "../hooks/useChat";
import Button from "../../../components/ui/Button/Button";
import Badge from "../../../components/ui/Badge/Badge";
import { FaRobot, FaTrash, FaMagic } from "react-icons/fa";

function AIAssistantPage() {
    const { loading, sendMessage, regenerate, clearChat } = useAI();
    const { chats, activeChat, messages, setMessages, setActiveChat, newChat, rename, remove, favorite } = useChat();

    async function handleSend(message) {
        await sendMessage(message, activeChat?.id, setMessages);
    }

    return (
        <DashboardLayout showTopNavbar>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Badge variant="ai" size="sm" dot>
                            GEMINI 2.5 FLASH ENGINE
                        </Badge>
                        <span className="text-xs text-slate-400 font-medium">• Autonomous Advisory</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                        <FaRobot className="text-cyan-400 shrink-0" />
                        <span>AI Financial Intelligence Hub</span>
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium max-w-2xl">
                        Ask questions about loan eligibility, cash flow optimization, EMI repayment strategies, and tax savings.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={clearChat}
                        icon={<FaTrash className="h-3 w-3" />}
                    >
                        Clear Session
                    </Button>
                </div>
            </div>

            {/* Main AI Chat Workspace */}
            <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-230px)] min-h-[550px]">
                {/* Chat Session Sidebar */}
                <div className="w-full lg:w-72 shrink-0">
                    <ChatSidebar
                        chats={chats}
                        activeChat={activeChat}
                        setActiveChat={setActiveChat}
                        onNewChat={newChat}
                        rename={rename}
                        remove={remove}
                        favorite={favorite}
                    />
                </div>

                {/* Main Chat Window */}
                <div className="flex-1 min-w-0 h-full">
                    <ChatWindow
                        messages={messages}
                        loading={loading}
                        sendMessage={handleSend}
                        regenerate={regenerate}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
}

export default AIAssistantPage;