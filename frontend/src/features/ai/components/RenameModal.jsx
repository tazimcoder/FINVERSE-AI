/**
 * ==========================================================
 * FINVERSE AI
 * Rename Modal
 * ==========================================================
 */

import { useEffect, useState } from "react";

function RenameModal({

    open,
    title,
    onSave,
    onClose,

}) {

    const [value, setValue] = useState("");

    useEffect(() => {

        setValue(title);

    }, [title]);

    if (!open) return null;

    return (

        <div
            className="
                fixed
                inset-0
                bg-black/40
                flex
                items-center
                justify-center
                z-50
            "
        >

            <div
                className="
                    bg-white
                    rounded-xl
                    p-6
                    w-96
                "
            >

                <h2
                    className="
                        text-xl
                        font-semibold
                        mb-4
                    "
                >

                    Rename Chat

                </h2>

                <input

                    value={value}

                    onChange={(event) =>

                        setValue(event.target.value)

                    }

                    className="
                        w-full
                        border
                        rounded-lg
                        p-3
                    "

                />

                <div
                    className="
                        flex
                        justify-end
                        gap-3
                        mt-5
                    "
                >

                    <button
                        onClick={onClose}
                    >

                        Cancel

                    </button>

                    <button

                        onClick={() => onSave(value)}

                        className="
                            bg-blue-600
                            text-white
                            px-5
                            py-2
                            rounded-lg
                        "

                    >

                        Save

                    </button>

                </div>

            </div>

        </div>

    );

}

export default RenameModal;