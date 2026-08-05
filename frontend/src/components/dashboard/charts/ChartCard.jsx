/**
 * ==========================================================
 * FINVERSE AI
 * Reusable Chart Card
 * ==========================================================
 */

function ChartCard({

    title,

    children,

}) {

    return (

        <div
            className="
                bg-white
                rounded-2xl
                shadow-sm
                border
                border-slate-200
                p-6
            "
        >

            <h2
                className="
                    text-lg
                    font-semibold
                    text-slate-800
                    mb-5
                "
            >
                {title}
            </h2>

            {children}

        </div>

    );

}

export default ChartCard;