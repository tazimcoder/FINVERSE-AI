/**
 * ==========================================================
 * FINVERSE AI
 * Premium Message Bubble
 * ==========================================================
 */

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {

    FaCopy,

    FaThumbsUp,

    FaThumbsDown,

    FaRedo,

} from "react-icons/fa";

import FinancialSummary from "./cards/FinancialSummary";
import FinancialChart from "./FinancialChart";
import { sendFeedback, } from "../services/feedbackService";


function MessageBubble({ message, regenerate, }) {

    const isUser = message.role === "user";

    async function copyMessage() {

        try {

            await navigator.clipboard.writeText(message.content);

        }

        catch (error) {

            console.error(error);

        }

    }

    async function handleFeedback(type) {

        try {

            await sendFeedback({

                message: message.userMessage || "",

                response: message.content,

                feedback: type,

            });

            console.log("Feedback Saved");

        }

        catch (error) {

            console.error(error);

        }

    }

    const time = new Date().toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit",

    });

    return (

        <div
            className={`
        flex
        mb-8
        message-animation
        ${isUser ? "justify-end" : "justify-start"}
    `}
        >

            <div className="max-w-[82%]">

                {/* ================= Header ================= */}

                <div

                    className={`

                        flex

                        items-center

                        gap-3

                        mb-2

                        ${isUser

                            ? "justify-end"

                            : ""

                        }

                    `}

                >

                    {

                        !isUser && (

                            <>

                                <div

                                    className="

                                        w-10

                                        h-10

                                        rounded-full

                                        bg-gradient-to-r

                                        from-blue-600

                                        to-cyan-500

                                        flex

                                        items-center

                                        justify-center

                                        text-white

                                        font-bold

                                    "

                                >

                                    🤖

                                </div>

                                <div>

                                    <h4 className="font-semibold">

                                        FINVERSE AI

                                    </h4>

                                    <p className="text-xs text-slate-400">

                                        {time}

                                    </p>

                                </div>

                            </>

                        )

                    }

                    {

                        isUser && (

                            <>

                                <div className="text-right">

                                    <h4 className="font-semibold">

                                        You

                                    </h4>

                                    <p className="text-xs text-slate-400">

                                        {time}

                                    </p>

                                </div>

                                <div

                                    className="

                                        w-10

                                        h-10

                                        rounded-full

                                        bg-blue-600

                                        text-white

                                        flex

                                        items-center

                                        justify-center

                                        font-bold

                                    "

                                >

                                    U

                                </div>

                            </>

                        )

                    }

                </div>

                {/* ================= Bubble ================= */}

                <div

                    className={`

                        rounded-2xl

                        px-6

                        py-5

                        shadow-xl

                        border

                        transition-all

                        duration-300

                       hover:scale-[1.01]
                        hover:shadow-2xl

                        ${isUser

                            ? "bg-blue-600 text-white border-blue-600"

                            : "bg-white/90 backdrop-blur-md text-slate-800 border-slate-200"

                        }

                    `}

                >

                    {
                        !isUser && message.summary && (

                            <FinancialSummary

                                summary={message.summary}

                            />

                        )
                    }

                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ children }) => (
                                <h1 className="text-2xl font-bold mt-4 mb-3">
                                    {children}
                                </h1>
                            ),

                            h2: ({ children }) => (
                                <h2 className="text-xl font-semibold mt-4 mb-2">
                                    {children}
                                </h2>
                            ),

                            p: ({ children }) => (
                                <p className="leading-7 mb-3">
                                    {children}
                                </p>
                            ),

                            ul: ({ children }) => (
                                <ul className="list-disc ml-6 space-y-2 mb-4">
                                    {children}
                                </ul>
                            ),

                            ol: ({ children }) => (
                                <ol className="list-decimal ml-6 space-y-2 mb-4">
                                    {children}
                                </ol>
                            ),

                            code: ({ children }) => (
                                <code className="bg-slate-100 px-2 py-1 rounded text-sm">
                                    {children}
                                </code>
                            ),

                            table: ({ children }) => (
                                <table className="w-full border mt-4 mb-4">
                                    {children}
                                </table>
                            ),

                            th: ({ children }) => (
                                <th className="border bg-slate-100 p-2 text-left">
                                    {children}
                                </th>
                            ),

                            td: ({ children }) => (
                                <td className="border p-2">
                                    {children}
                                </td>
                            ),
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>

                    {

                        !isUser &&

                        message.summary && (

                            <FinancialChart

                                summary={message.summary}

                            />

                        )

                    }

                </div>

                {/* ================= Toolbar ================= */}

                {

                    !isUser && (

                        <div

                            className="

                                flex

                                items-center

                                gap-4

                                mt-3

                                text-slate-500

                            "

                        >

                            <button

                                onClick={copyMessage}

                                className="hover:text-blue-600 transition"

                                title="Copy"

                            >

                                <FaCopy />

                            </button>

                            <button

                                onClick={() => handleFeedback("like")}

                                className="hover:text-green-600 transition"

                                title="Like"

                            >

                                <FaThumbsUp />

                            </button>

                            <button

                                onClick={() => handleFeedback("dislike")}

                                className="hover:text-red-600 transition"

                                title="Dislike"

                            >

                                <FaThumbsDown />

                            </button>

                            <button

                                onClick={regenerate}

                                className="hover:text-blue-600 transition"

                                title="Generate New Response"

                            >

                                <FaRedo />

                            </button>

                        </div>

                    )

                }

            </div>

        </div>

    );

}

export default MessageBubble;