/**
 * ==========================================================
 * Dashboard Sidebar
 * ==========================================================
 */

function Sidebar() {

    return (

        <aside
            className="
                w-64
                min-h-screen
                bg-slate-900
                text-white
                p-6
                flex
                flex-col
                shrink-0
            "
        >

            <h1 className="text-2xl font-bold mb-10">

                FINVERSE AI

            </h1>

            <nav className="space-y-4 flex-1">

                <button className="block w-full text-left hover:text-blue-400 transition">
                    Dashboard
                </button>

                <button className="block w-full text-left hover:text-blue-400 transition">
                    Wallet
                </button>

                <button className="block w-full text-left hover:text-blue-400 transition">
                    🏦 Accounts
                </button>

                <button className="block w-full text-left hover:text-blue-400 transition">
                    📈 Investments
                </button>

                <button className="block w-full text-left hover:text-blue-400 transition">
                    💰Transactions
                </button>

                <button className="block w-full text-left hover:text-blue-400 transition">
                    🤖 AI Assistant
                </button>

                <button className="block w-full text-left hover:text-blue-400 transition">
                    ⚙ Settings
                </button>

            </nav>

        </aside>

    );

}

export default Sidebar;

