/**
 * ==========================================================
 * FINVERSE AI
 * Chat Sidebar
 * ==========================================================
 */

import { useMemo, useState } from "react";

import ChatItem from "./ChatItem";
import ChatMenu from "./ChatMenu";
import ChatSearch from "./ChatSearch";
import RenameModal from "./RenameModal";
import DeleteModal from "./DeleteModal";

function ChatSidebar({

    chats,
    activeChat,
    setActiveChat,
    onNewChat,

    rename,
    remove,
    favorite,

}) {

    const [search, setSearch] = useState("");

    const [renameChat, setRenameChat] = useState(null);

    const [deleteChat, setDeleteChat] = useState(null);

    const filteredChats = useMemo(() => {

        return chats.filter(chat =>

            chat.title
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    }, [chats, search]);

    return (

        <>

            <div
                className="
                    w-80
                    bg-white
                    rounded-xl
                    shadow
                    p-5
                    flex
                    flex-col
                "
            >

                <ChatMenu
                    onNewChat={onNewChat}
                />

                <div className="mt-5">

                    <ChatSearch
                        value={search}
                        onChange={setSearch}
                    />

                </div>

                <div
                    className="
                        mt-5
                        flex-1
                        overflow-y-auto
                    "
                >

                    {

                        filteredChats.map(chat => (

                            <ChatItem

                                key={chat.id}

                                chat={chat}

                                active={activeChat?.id === chat.id}

                                onClick={() => setActiveChat(chat)}

                                onRename={() => setRenameChat(chat)}

                                onDelete={() => setDeleteChat(chat)}

                                onFavorite={async () => {

                                    await favorite(chat.id);

                                }}

                            />

                        ))

                    }

                </div>

            </div>

            <RenameModal

                open={renameChat !== null}

                title={renameChat?.title || ""}

                onClose={() => setRenameChat(null)}

                onSave={async (title) => {

                    await rename(
                        renameChat.id,
                        title
                    );

                    setRenameChat(null);

                }}

            />

            <DeleteModal

                open={deleteChat !== null}

                onClose={() => setDeleteChat(null)}

                onDelete={async () => {

                    await remove(
                        deleteChat.id
                    );

                    setDeleteChat(null);

                }}

            />

        </>

    );

}

export default ChatSidebar;