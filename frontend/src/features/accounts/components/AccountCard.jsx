/**
 * ==========================================================
 * FINVERSE AI
 * Account Card
 * ==========================================================
 */

function AccountCard({

    account,

    onEdit,

    onDelete,

}) {

    return (

        <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-xl font-semibold">

                        {account.account_name}

                    </h2>

                    <p className="text-slate-500 mt-1">

                        {account.account_number}

                    </p>

                </div>

                <span
                    className="
                        bg-green-100
                        text-green-700
                        px-3
                        py-1
                        rounded-full
                        text-sm
                    "
                >
                    {account.status}
                </span>

            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">

                <div>

                    <p className="text-slate-500 text-sm">

                        Account Type

                    </p>

                    <h3 className="font-semibold mt-1">

                        {account.account_type}

                    </h3>

                </div>

                <div>

                    <p className="text-slate-500 text-sm">

                        Balance

                    </p>

                    <h3 className="text-green-600 text-xl font-bold mt-1">

                        ₹ {Number(account.balance).toLocaleString()}

                    </h3>

                </div>

            </div>

            <div className="flex gap-3 mt-6">

                <button
                    onClick={() => onEdit(account)}
                    className="
                        px-4
                        py-2
                        rounded-lg
                        bg-blue-600
                        text-white
                        hover:bg-blue-700
                    "
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(account.id)}
                    className="
                        px-4
                        py-2
                        rounded-lg
                        bg-red-600
                        text-white
                        hover:bg-red-700
                    "
                >
                    Delete
                </button>

            </div>

        </div>

    );

}

export default AccountCard;