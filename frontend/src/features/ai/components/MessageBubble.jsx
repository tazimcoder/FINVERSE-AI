/**
 * ==========================================================
 * FINVERSE AI — Message Bubble Component
 * Executive dark chat bubble with markdown rendering & feedback controls
 * ==========================================================
 */

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaCopy, FaThumbsUp, FaThumbsDown, FaRedo, FaRobot, FaUser } from "react-icons/fa";
import FinancialSummary from "./cards/FinancialSummary";
import FinancialChart from "./FinancialChart";
import { sendFeedback } from "../services/feedbackService";

function MessageBubble({ message, regenerate }) {
  const isUser = message.role === "user";

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message.content);
    } catch (error) {
      console.error("Clipboard copy failed:", error);
    }
  }

  async function handleFeedback(type) {
    try {
      await sendFeedback({
        message: message.userMessage || "",
        response: message.content,
        feedback: type,
      });
    } catch (error) {
      console.error("Feedback error:", error);
    }
  }

  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex mb-5 message-animation ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[85%] sm:max-w-[78%] font-sans">
        {/* Header Metadata */}
        <div className={`flex items-center gap-2 mb-1.5 ${isUser ? "justify-end" : "justify-start"}`}>
          {!isUser && (
            <>
              <div className="w-7 h-7 rounded-lg fin-ai-orb flex items-center justify-center text-white shrink-0">
                <FaRobot className="h-3.5 w-3.5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">FINVERSE AI</span>
                <span className="text-[10px] text-slate-400 tabular-nums">{time}</span>
              </div>
            </>
          )}

          {isUser && (
            <>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 tabular-nums">{time}</span>
                <span className="text-xs font-bold text-cyan-400">You</span>
              </div>
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold shrink-0">
                <FaUser className="h-3 w-3" />
              </div>
            </>
          )}
        </div>

        {/* Bubble Content */}
        <div
          className={`
            rounded-2xl px-5 py-4 shadow-xl border transition-all duration-200 text-xs sm:text-sm leading-relaxed
            ${
              isUser
                ? "bg-gradient-to-r from-teal-600/90 to-cyan-600/90 text-white border-cyan-400/30 rounded-tr-none"
                : "bg-slate-900/90 text-slate-100 border-slate-800/90 rounded-tl-none backdrop-blur-md"
            }
          `}
        >
          {!isUser && message.summary && <FinancialSummary summary={message.summary} />}

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h1 className="text-lg font-bold text-white mt-3 mb-2">{children}</h1>,
              h2: ({ children }) => <h2 className="text-base font-bold text-white mt-2.5 mb-1.5">{children}</h2>,
              h3: ({ children }) => <h3 className="text-sm font-semibold text-cyan-300 mt-2 mb-1">{children}</h3>,
              p: ({ children }) => <p className="leading-relaxed mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="list-disc ml-5 space-y-1 mb-3">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal ml-5 space-y-1 mb-3">{children}</ol>,
              code: ({ children }) => (
                <code className="bg-slate-950 px-1.5 py-0.5 rounded text-cyan-300 font-mono text-[11px] border border-slate-800">
                  {children}
                </code>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-3">
                  <table className="w-full border-collapse border border-slate-800 text-xs">{children}</table>
                </div>
              ),
              th: ({ children }) => <th className="border border-slate-800 bg-slate-950 p-2 text-left font-bold text-slate-300">{children}</th>,
              td: ({ children }) => <td className="border border-slate-800 p-2 text-slate-300">{children}</td>,
            }}
          >
            {message.content}
          </ReactMarkdown>

          {!isUser && message.summary && <FinancialChart summary={message.summary} />}
        </div>

        {/* Toolbar */}
        {!isUser && (
          <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
            <button onClick={copyMessage} className="hover:text-cyan-400 transition p-1" title="Copy text">
              <FaCopy />
            </button>
            <button onClick={() => handleFeedback("like")} className="hover:text-emerald-400 transition p-1" title="Helpful">
              <FaThumbsUp />
            </button>
            <button onClick={() => handleFeedback("dislike")} className="hover:text-rose-400 transition p-1" title="Not helpful">
              <FaThumbsDown />
            </button>
            <button onClick={regenerate} className="hover:text-cyan-400 transition p-1" title="Regenerate">
              <FaRedo />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;