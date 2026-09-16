/**
 * ==========================================================
 * FINVERSE AI — Chat Session History Sidebar
 * Executive dark session list with search, rename, and delete modal
 * ==========================================================
 */

import React, { useMemo, useState } from "react";
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
    return (chats || []).filter((chat) =>
      (chat.title || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [chats, search]);

  return (
    <>
      <div className="w-full h-full bg-[#0F172A]/90 border border-slate-800/90 rounded-2xl p-4 flex flex-col justify-between shadow-xl backdrop-blur-xl">
        <div className="space-y-4 flex-1 flex flex-col min-h-0">
          <ChatMenu onNewChat={onNewChat} />

          <div className="shrink-0">
            <ChatSearch value={search} onChange={setSearch} />
          </div>

          {/* Session Items List */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-1.5 font-sans">
            {filteredChats.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">No chat sessions found</p>
            ) : (
              filteredChats.map((chat) => (
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
            )}
          </div>
        </div>
      </div>

      <RenameModal
        open={renameChat !== null}
        title={renameChat?.title || ""}
        onClose={() => setRenameChat(null)}
        onSave={async (title) => {
          await rename(renameChat.id, title);
          setRenameChat(null);
        }}
      />

      <DeleteModal
        open={deleteChat !== null}
        onClose={() => setDeleteChat(null)}
        onDelete={async () => {
          await remove(deleteChat.id);
          setDeleteChat(null);
        }}
      />
    </>
  );
}

export default ChatSidebar;