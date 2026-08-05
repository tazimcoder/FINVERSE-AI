/**
 * ==========================================================
 * FINVERSE AI
 * Reusable Button Component
 * ==========================================================
 */

function Button({
    children,
    type = "button",
    onClick,
    disabled = false,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="
                w-full
                rounded-xl
                bg-blue-600
                px-4
                py-3
                font-semibold
                text-white
                transition
                hover:bg-blue-700
                disabled:opacity-50
                disabled:cursor-not-allowed
            "
        >
            {children}
        </button>
    );
}

export default Button;