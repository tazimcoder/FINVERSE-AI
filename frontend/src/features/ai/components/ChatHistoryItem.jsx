/**
 * ==========================================================
 * FINVERSE AI
 * Chat History Item
 * ==========================================================
 */

import {

    FaCommentDots,

    FaStar,

} from "react-icons/fa";

function ChatHistoryItem({

    chat,

    active,

    onClick,

}) {

    return (

        <button

            onClick={onClick}

            className={`
                w-full
                mb-2
                rounded-xl
                p-4
                transition
                text-left
                border

                ${active
                    ? "bg-blue-50 border-blue-500"
                    : "bg-white border-transparent hover:bg-slate-50"}
            `}

        >

            <div className="flex justify-between items-center">

                <div className="flex items-center gap-3">

                    <FaCommentDots
                        className="text-blue-500"
                    />

                    <span
                        className="
                            truncate
                            font-medium
                        "
                    >

                        {chat.title}

                    </span>

                </div>

                {

                    Boolean(chat.is_favorite) && (

                        <FaStar
                            className="text-yellow-500"
                        />

                    )

                }

            </div>

        </button>

    );

}

export default ChatHistoryItem;