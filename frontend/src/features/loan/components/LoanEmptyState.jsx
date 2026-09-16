/**
 * ==========================================================
 * FINVERSE AI
 * Loan Empty State
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/components/LoanEmptyState.jsx
 *
 * Responsibility:
 *
 * - Display reusable empty state
 * - Support both message and description props
 * - Optional action button
 *
 * ==========================================================
 */

function LoanEmptyState({
    title = "No Loan Records Found",
    message,
    description,
    actionLabel,
    onAction
}) {

    const content =
        description ||
        message ||
        "There are no loan records available right now.";


    return (

        <div
            className="
                flex
                min-h-[260px]
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-dashed
                border-slate-300
                bg-white
                px-6
                py-10
                text-center
            "
        >

            <div
                className="
                    mb-5
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-50
                    text-blue-600
                "
            >

                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-7 w-7"
                >

                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="
                            M3 7.5
                            A2.5 2.5 0 0 1 5.5 5h13
                            A2.5 2.5 0 0 1 21 7.5v9
                            A2.5 2.5 0 0 1 18.5 19h-13
                            A2.5 2.5 0 0 1 3 16.5v-9Z
                        "
                    />

                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 9h18"
                    />

                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 14h4"
                    />

                </svg>

            </div>


            <h3
                className="
                    text-lg
                    font-bold
                    text-slate-900
                "
            >
                {title}
            </h3>


            <p
                className="
                    mt-2
                    max-w-md
                    text-sm
                    leading-6
                    text-slate-500
                "
            >
                {content}
            </p>


            {actionLabel &&
                typeof onAction === "function" && (

                    <button
                        type="button"
                        onClick={onAction}
                        className="
                            mt-6
                            rounded-xl
                            bg-blue-600
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-blue-700
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:ring-offset-2
                        "
                    >
                        {actionLabel}
                    </button>

                )}

        </div>

    );

}


export default LoanEmptyState;