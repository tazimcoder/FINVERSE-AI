function LoanLoadingState({
    message = "Loading loan information..."
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
                border-slate-200
                bg-white
                p-8
                text-center
                shadow-sm
            "
        >

            <div
                className="
                    h-10
                    w-10
                    animate-spin
                    rounded-full
                    border-4
                    border-blue-600
                    border-t-transparent
                "
            />


            <p className="mt-4 text-sm font-medium text-slate-500">
                {message}
            </p>

        </div>
    );

}


export default LoanLoadingState;

