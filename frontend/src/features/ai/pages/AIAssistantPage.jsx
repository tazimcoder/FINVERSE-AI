/**
 * ==========================================================
 * FINVERSE AI — AI Financial Intelligence Hub (PART 3)
 * Executive 3-Column Autonomous AI Financial Workspace
 * Left: History | Center: Conversation | Right: Live Financial Context
 * ==========================================================
 */

import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import ChatWindow from "../components/ChatWindow";
import ChatSidebar from "../components/ChatSidebar";
import AIContextSidebar from "../components/AIContextSidebar";
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
      {/* Executive Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="ai" size="sm" dot>
              GEMINI 2.5 FLASH ENGINE
            </Badge>
            <span className="text-xs text-slate-400 font-medium">• Autonomous Financial Intelligence</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <FaRobot className="text-cyan-400 shrink-0" />
            <span>AI Financial Intelligence Hub</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium max-w-2xl">
            Query real-time loan eligibility, debt restructuring, tax deductions, and cash flow yield strategies.
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

      {/* 3-Column AI Workspace */}
      <div className="flex flex-col lg:flex-row gap-5 h-[calc(100vh-220px)] min-h-[580px]">
        {/* Left Column: Chat Sessions History */}
        <div className="w-full lg:w-64 xl:w-72 shrink-0 h-48 lg:h-full">
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

        {/* Center Column: Executive Chat Workspace */}
        <div className="flex-1 min-w-0 h-full">
          <ChatWindow
            messages={messages}
            loading={loading}
            sendMessage={handleSend}
            regenerate={regenerate}
          />
        </div>

        {/* Right Column: Live Financial Context Panel */}
        <div className="hidden xl:block xl:w-80 shrink-0 h-full">
          <AIContextSidebar onQuickPrompt={handleSend} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AIAssistantPage;