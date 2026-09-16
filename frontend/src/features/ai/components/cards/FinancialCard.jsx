/**
 * ==========================================================
 * FINVERSE AI
 * Financial Card
 * ==========================================================
 */

function FinancialCard({

    icon,

    title,

    value,

    color = "blue",

}) {

    return (

        <div
            className={`
                rounded-2xl
                p-5
                shadow-lg
                border
                bg-white
                transition
                hover:scale-[1.02]
                hover:shadow-2xl
            `}
        >

            <div className="text-3xl">

                {icon}

            </div>

            <h4
                className="
                    mt-4
                    text-slate-500
                    text-sm
                "
            >

                {title}

            </h4>

            <h2
                className={`
                    text-3xl
                    font-bold
                    mt-2

                    ${color === "green"

                        ? "text-green-600"

                        : color === "red"

                            ? "text-red-600"

                            : "text-blue-600"

                    }

                `}
            >

                {value}

            </h2>

        </div>

    );

}

export default FinancialCard;