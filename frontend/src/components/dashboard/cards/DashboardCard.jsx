/**
 * ==========================================================
 * Reusable Dashboard Card
 * ==========================================================
 */

function DashboardCard({

    title,

    amount,

    color,

}) {

    return (

        <div
            className={`
                rounded-2xl
                bg-white
                p-6
                shadow-sm
                border-l-4
                ${color}
            `}
        >

            <p className="text-sm text-slate-500">

                {title}

            </p>

            <h2 className="mt-3 text-3xl font-bold">

                {amount}

            </h2>

        </div>

    );

}

export default DashboardCard;