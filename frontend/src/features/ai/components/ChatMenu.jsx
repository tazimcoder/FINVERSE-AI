/**
 * ==========================================================
 * FINVERSE AI
 * Chat Menu
 * ==========================================================
 */

function ChatMenu({

    onNewChat,

}) {

    return (

        <button

            onClick={onNewChat}

            className="
                w-full
                py-3
                rounded-xl
                bg-blue-600
                text-white
                hover:bg-blue-700
                transition
            "

        >

            + New Chat

        </button>

    );

}

export default ChatMenu;