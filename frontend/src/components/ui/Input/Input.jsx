/**
 * ==========================================================
 * FINVERSE AI
 * Reusable Input Component
 * ==========================================================
 */

function Input({

    label,

    type = "text",

    placeholder,

    value,

    onChange,

    error,

    required = false

}) {

    return (

        <div className="flex flex-col gap-2">

            {label && (

                <label className="text-sm font-semibold text-slate-700">

                    {label}

                    {required && (

                        <span className="ml-1 text-red-500">

                            *

                        </span>

                    )}

                </label>

            )}

            <input

                type={type}

                placeholder={placeholder}

                value={value}

                onChange={onChange}

                className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    px-4
                    py-3
                    outline-none
                    transition
                    focus:border-blue-600
                "

            />

            {error && (

                <p className="text-sm text-red-500">

                    {error}

                </p>

            )}

        </div>

    );

}

export default Input;