/**
 * ==========================================================
 * FINVERSE AI
 * Reusable Card Component
 * ----------------------------------------------------------
 * Responsibility:
 * - Reusable container for forms and content
 * ==========================================================
 */

function Card({ children }) {
    return (
        <div
            className="
                w-full
                rounded-2xl
                bg-white
                p-8
                shadow-xl
                border
                border-slate-200
            "
        >
            {children}
        </div>
    );
}

export default Card;