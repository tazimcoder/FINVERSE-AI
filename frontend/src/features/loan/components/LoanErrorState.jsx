function LoanErrorState({
    message = "Unable to load loan information.",
    onRetry,
    retryLabel = "Try Again",
}) {

    return (
        <div
            className="
                flex
                min-h-[280px]
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-red-200
                bg-red-50
                p-8
                text-center
            "
        >

            <div
                className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-red-100
                    text-xl
                    font-bold
                    text-red-600
                "
            >
                !
            </div>


            <h2 className="mt-4 text-lg font-bold text-slate-900">
                Something went wrong
            </h2>


            <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                {message}
            </p>


            {typeof onRetry === "function" && (

                <button
                    type="button"
                    onClick={onRetry}
                    className="
                        mt-5
                        rounded-xl
                        bg-slate-900
                        px-5
                        py-3
                        text-sm
                        font-bold
                        text-white
                        transition
                        hover:bg-slate-800
                    "
                >
                    {retryLabel}
                </button>

            )}

        </div>
    );

}


export default LoanErrorState;

