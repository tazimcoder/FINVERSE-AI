/**
 * ==========================================================
 * FINVERSE AI
 * AI Assistant Page
 * ==========================================================
 */

import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";

import ChatWindow from "../components/ChatWindow";
import ChatSidebar from "../components/ChatSidebar";

import useAI from "../hooks/useAI";
import useChat from "../hooks/useChat";

function AIAssistantPage() {

    /* ================= AI ================= */

    const {

        loading,

        sendMessage,

        regenerate,

        clearChat,

    } = useAI();

    /* ================= Chat ================= */

    const {

        chats,

        activeChat,

        messages,

        setMessages,

        setActiveChat,

        newChat,

        rename,

        remove,

        favorite,

    } = useChat();

    /* ================= Send ================= */

    async function handleSend(message) {

        await sendMessage(

            message,

            activeChat?.id,

            setMessages

        );

    }

    return (

        <DashboardLayout>

            {/* ================= Header ================= */}

            <div
                className="
                    flex
                    items-center
                    justify-between
                    mb-6
                "
            >

                <div>

                    <h1 className="text-3xl font-bold">

                        🤖 FINVERSE AI

                    </h1>

                    <p className="text-slate-500">

                        Your Personal AI Financial Advisor

                    </p>

                </div>

                <button

                    onClick={clearChat}

                    className="
                        px-5
                        py-2
                        rounded-lg
                        bg-red-500
                        text-white
                        hover:bg-red-600
                        transition
                    "

                >

                    🗑 Clear Chat

                </button>

            </div>

            {/* ================= Main Layout ================= */}

            <div
                className="
                    flex
                    gap-6
                    h-[78vh]
                "
            >

                {/* Sidebar */}

                <ChatSidebar

                    chats={chats}

                    activeChat={activeChat}

                    setActiveChat={setActiveChat}

                    onNewChat={newChat}

                    rename={rename}

                    remove={remove}

                    favorite={favorite}

                />
                {/* Chat */}

                <div className="flex-1">

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