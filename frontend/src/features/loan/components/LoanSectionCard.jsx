function LoanSectionCard({
    title,
    description,
    action,
    children,
    className = "",
}) {

    return (
        <section
            className={`
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-sm
                ${className}
            `}
        >

            {(title || description || action) && (

                <div
                    className="
                        flex
                        flex-col
                        gap-4
                        border-b
                        border-slate-100
                        px-5
                        py-5
                        sm:flex-row
                        sm:items-start
                        sm:justify-between
                    "
                >

                    <div>

                        {title && (

                            <h2 className="text-base font-bold text-slate-900">
                                {title}
                            </h2>

                        )}


                        {description && (

                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                {description}
                            </p>

                        )}

                    </div>


                    {action && (

                        <div className="shrink-0">
                            {action}
                        </div>

                    )}

                </div>

            )}


            <div className="p-5">

                {children}

            </div>

        </section>
    );

}


export default LoanSectionCard;

