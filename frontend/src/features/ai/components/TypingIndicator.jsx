/**
 * ==========================================================
 * FINVERSE AI
 * Premium Typing Indicator
 * ==========================================================
 */

function TypingIndicator() {

    return (

        <div className="flex justify-start mb-8">

            <div className="max-w-[82%]">

                {/* ================= Header ================= */}

                <div className="flex items-center gap-3 mb-2">

                    <div
                        className="
                            w-10
                            h-10
                            rounded-full
                            bg-gradient-to-r
                            from-blue-600
                            to-cyan-500
                            flex
                            items-center
                            justify-center
                            text-white
                            font-bold
                        "
                    >
                        🤖
                    </div>

                    <div>

                        <h4 className="font-semibold">

                            FINVERSE AI

                        </h4>

                        <p className="text-xs text-slate-400">

                            Thinking...

                        </p>

                    </div>

                </div>

                {/* ================= Bubble ================= */}

                <div
                    className="
                        bg-white
                        border
                        border-slate-200
                        rounded-2xl
                        px-6
                        py-5
                        shadow-md
                    "
                >

                    <div className="flex gap-2">

                        <span
                            className="
                                w-3
                                h-3
                                rounded-full
                                bg-blue-500
                                animate-bounce
                            "
                        />

                        <span
                            className="
                                w-3
                                h-3
                                rounded-full
                                bg-blue-500
                                animate-bounce
                            "
                            style={{ animationDelay: "0.15s" }}
                        />

                        <span
                            className="
                                w-3
                                h-3
                                rounded-full
                                bg-blue-500
                                animate-bounce
                            "
                            style={{ animationDelay: "0.30s" }}
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default TypingIndicator;