/**
 * ==========================================================
 * FINVERSE AI
 * Welcome Screen
 * ==========================================================
 */

function WelcomeScreen({ onPromptClick }) {

    const prompts = [

        "Analyze my finances",
        "Create a monthly budget",
        "How can I save more money?",
        "Give me investment advice",

    ];

    return (

        <div
            className="
                h-full
                flex
                flex-col
                items-center
                justify-center
                text-center
                px-8
            "
        >

            <div className="text-7xl mb-6">
                🤖
            </div>

            <h2 className="text-4xl font-bold">
                Welcome to FINVERSE AI
            </h2>

            <p className="text-slate-500 mt-3 mb-10 max-w-xl">
                Your Personal AI Financial Advisor.
                Ask anything about your money, investments,
                savings, budgets and expenses.
            </p>

            <div className="grid gap-4 w-full max-w-2xl">

                {prompts.map((prompt, index) => (

                    <button

                        key={index}

                        onClick={() => onPromptClick(prompt)}

                        className="
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            p-5
                            text-left
                            shadow-sm
                            hover:shadow-lg
                            hover:border-blue-500
                            hover:bg-blue-50
                            transition
                        "

                    >

                        💡 {prompt}

                    </button>

                ))}

            </div>

        </div>

    );

}

export default WelcomeScreen;