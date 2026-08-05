/**
 * ==========================================================
 * FINVERSE AI
 * Reusable Table Card
 * ==========================================================
 */

function TableCard({

    title,

    children,

}) {

    return (

        <div className="bg-white rounded-2xl shadow-sm p-6">

            <div className="flex items-center justify-between mb-6">

                <h2 className="text-xl font-semibold text-slate-800">

                    {title}

                </h2>

            </div>

            {children}

        </div>

    );

}

export default TableCard;