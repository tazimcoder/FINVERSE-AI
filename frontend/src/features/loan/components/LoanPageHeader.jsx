import { Link } from "react-router-dom";


function LoanPageHeader({
    eyebrow = "FINVERSE AI",
    title,
    description,
    actionLabel,
    actionTo,
    action,
}) {

    return (
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">

            <div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                    {eyebrow}
                </p>


                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                    {title}
                </h1>


                {description && (
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                        {description}
                    </p>
                )}

            </div>


            {(action || (actionLabel && actionTo)) && (

                <div className="flex shrink-0 items-center">

                    {action || (

                        <Link
                            to={actionTo}
                            className="
                                inline-flex
                                items-center
                                justify-center
                                rounded-xl
                                bg-blue-600
                                px-5
                                py-3
                                text-sm
                                font-bold
                                text-white
                                transition
                                hover:bg-blue-700
                            "
                        >
                            {actionLabel}
                        </Link>

                    )}

                </div>

            )}

        </div>
    );

}


export default LoanPageHeader;

