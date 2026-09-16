/**
 * ==========================================================
 * FINVERSE AI
 * AI Thinking
 * ==========================================================
 */

function AIThinking() {

    return (

        <div
            className="
                flex
                items-start
                gap-3
                mb-5
            "
        >

            <div
                className="
                    h-10
                    w-10
                    rounded-full
                    bg-blue-600
                    flex
                    items-center
                    justify-center
                    text-white
                    text-lg
                    shrink-0
                "
            >

                🤖

            </div>

            <div
                className="
                    bg-slate-100
                    rounded-2xl
                    px-5
                    py-4
                    flex
                    items-center
                    gap-2
                "
            >

                <span
                    className="
                        h-2
                        w-2
                        rounded-full
                        bg-blue-500
                        animate-bounce
                    "
                />

                <span
                    className="
                        h-2
                        w-2
                        rounded-full
                        bg-blue-500
                        animate-bounce
                        [animation-delay:150ms]
                    "
                />

                <span
                    className="
                        h-2
                        w-2
                        rounded-full
                        bg-blue-500
                        animate-bounce
                        [animation-delay:300ms]
                    "
                />

                <span
                    className="
                        text-sm
                        text-slate-500
                        ml-2
                    "
                >

                    FINVERSE AI is thinking...

                </span>

            </div>

        </div>

    );

}

export default AIThinking;