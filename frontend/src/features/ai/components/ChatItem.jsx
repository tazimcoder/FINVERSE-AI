/**
 * ==========================================================
 * FINVERSE AI
 * Chat Item
 * ==========================================================
 */

import { useState } from "react";

import ChatOptions from "./ChatOptions";

function ChatItem({

    chat,

    active,

    onClick,

    onRename,

    onDelete,

    onFavorite,

}) {

    const [openMenu, setOpenMenu] = useState(false);

    return (

        <div className="relative mb-2">

            <button

                onClick={onClick}

                className={`
                    w-full
                    text-left
                    px-4
                    py-3
                    rounded-xl
                    transition

                    ${active

                        ? "bg-blue-600 text-white"

                        : "bg-slate-100 hover:bg-slate-200"

                    }
                `}

            >

                <div className="flex justify-between items-center">

                    <span>

                        {

                            chat.is_favorite

                                ? "⭐ "

                                : ""

                        }

                        {chat.title}

                    </span>

                    <button

                        onClick={(event) => {

                            event.stopPropagation();

                            setOpenMenu(!openMenu);

                        }}

                        className="px-2"

                    >

                        ⋮

                    </button>

                </div>

            </button>

            {

                openMenu && (

                    <ChatOptions

                        onRename={() => {

                            setOpenMenu(false);

                            onRename(chat);

                        }}

                        onDelete={() => {

                            setOpenMenu(false);

                            onDelete(chat);

                        }}

                        onFavorite={() => {

                            setOpenMenu(false);

                            onFavorite(chat);

                        }}

                    />

                )

            }

        </div>

    );

}

export default ChatItem;