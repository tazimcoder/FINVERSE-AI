/**
 * ==========================================================
 * FINVERSE AI
 * Chat Options
 * ==========================================================
 */

function ChatOptions({

    onRename,

    onFavorite,

    onDelete,

}) {

    return (

        <div
            className="
                absolute
                right-2
                top-10
                w-44
                bg-white
                rounded-xl
                shadow-xl
                border
                border-slate-200
                z-50
            "
        >

            <button

                onClick={onRename}

                className="
                    w-full
                    text-left
                    px-4
                    py-3
                    hover:bg-slate-100
                "

            >

                ✏ Rename

            </button>

            <button

                onClick={onFavorite}

                className="
                    w-full
                    text-left
                    px-4
                    py-3
                    hover:bg-slate-100
                "

            >

                ⭐ Favorite

            </button>

            <button

                onClick={onDelete}

                className="
                    w-full
                    text-left
                    px-4
                    py-3
                    text-red-600
                    hover:bg-red-50
                "

            >

                🗑 Delete

            </button>

        </div>

    );

}

export default ChatOptions;