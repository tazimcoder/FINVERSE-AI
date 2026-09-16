/**
 * ==========================================================
 * FINVERSE AI
 * Chat Window
 * ==========================================================
 */

import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import WelcomeScreen from "./WelcomeScreen";
import AIThinking from "./AIThinking";


function ChatWindow({

    messages,

    loading,

    sendMessage,

    regenerate,

}) {

    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({

            behavior: "smooth",

        });

    }, [messages, loading]);

    return (

        <div
            className="
                bg-white
                rounded-xl
                shadow
                p-6
                h-[75vh]
                flex
                flex-col
            "
        >

            <div
                className="
                    flex-1
                    overflow-y-auto
                    pr-2
                "
            >

                {

                    messages.length === 0 && (

                        <WelcomeScreen

                            onPromptClick={sendMessage}

                        />

                    )

                }

                {

                    messages.map((message, index) => (

                        <MessageBubble

                            key={index}

                            message={message}

                            regenerate={() => regenerate(index)}

                        />

                    ))

                }

                {

                    loading && (

                        <AIThinking />

                    )

                }

                <div ref={bottomRef} />

            </div>

            <ChatInput

                onSend={sendMessage}

                loading={loading}

            />

        </div>

    );

}

export default ChatWindow;