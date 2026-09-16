/**
 * ==========================================================
 * FINVERSE AI
 * Chat Search
 * ==========================================================
 */

function ChatSearch({

    value,

    onChange,

}) {

    return (

        <input

            type="text"

            placeholder="Search chats..."

            value={value}

            onChange={(event) =>

                onChange(event.target.value)

            }

            className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-slate-200
                outline-none
                focus:ring-2
                focus:ring-blue-500
            "

        />

    );

}

export default ChatSearch;