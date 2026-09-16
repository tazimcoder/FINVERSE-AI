/**
 * ==========================================================
 * FINVERSE AI — Chat Window Component
 * Executive dark chat container with live pulse status & scroll behavior
 * ==========================================================
 */

import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import WelcomeScreen from "./WelcomeScreen";
import AIThinking from "./AIThinking";
import { FaRobot, FaMagic, FaShieldAlt } from "react-icons/fa";

function ChatWindow({ messages, loading, sendMessage, regenerate }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="bg-[#0F172A]/90 border border-slate-800/90 rounded-2xl p-4 sm:p-6 h-full flex flex-col justify-between shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Executive Header Bar */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80 mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg fin-ai-orb flex items-center justify-center text-white shrink-0 shadow-lg">
            <FaRobot className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-tight">FINVERSE AI Engine</h3>
              <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-md font-semibold">
                v2.5 FLASH
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Autonomous Financial Reasoning Model</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-medium">
          <FaShieldAlt className="text-emerald-400 h-3 w-3" />
          <span>Encrypted Session</span>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 font-sans">
        {messages.length === 0 ? (
          <WelcomeScreen onPromptClick={sendMessage} />
        ) : (
          messages.map((message, index) => (
            <MessageBubble
              key={index}
              message={message}
              regenerate={() => regenerate(index)}
            />
          ))
        )}

        {loading && <AIThinking />}
        <div ref={bottomRef} />
      </div>

      {/* Input Bar */}
      <div className="shrink-0 pt-2 border-t border-slate-800/60">
        <ChatInput onSend={sendMessage} loading={loading} />
      </div>
    </div>
  );
}

export default ChatWindow;