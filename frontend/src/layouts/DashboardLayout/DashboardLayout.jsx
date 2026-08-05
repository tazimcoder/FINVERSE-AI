/**
 * ==========================================================
 * Dashboard Layout
 * ==========================================================
 */

import Sidebar from "../../components/dashboard/Sidebar";
import TopNavbar from "../../components/dashboard/TopNavbar";

function DashboardLayout({ children }) {

    return (

        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1 flex flex-col">

                <TopNavbar />

                <main className="p-8">

                    {children}

                </main>

            </div>

        </div>

    );

}

export default DashboardLayout;