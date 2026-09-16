/**
 * ==========================================================
 * FINVERSE AI
 * Executive Dashboard Layout
 * ==========================================================
 */

import { useState, useEffect } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import TopNavbar from "../../components/dashboard/TopNavbar";
import BackgroundFXEngine from "../../components/common/BackgroundFXEngine";

function DashboardLayout({
    children,
    hideSidebar = false,
    showTopNavbar = true,
}) {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [bgFx, setBgFx] = useState(() => {
        return localStorage.getItem("finverse_bg_animation") || "off";
    });

    useEffect(() => {
        const handleFxChange = (e) => {
            if (e?.detail) {
                setBgFx(e.detail);
            } else {
                setBgFx(localStorage.getItem("finverse_bg_animation") || "off");
            }
        };

        window.addEventListener("finverse_bg_fx_changed", handleFxChange);
        return () => window.removeEventListener("finverse_bg_fx_changed", handleFxChange);
    }, []);

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-slate-50/90 font-sans relative">
            {/* Live 60FPS Background FX Engine */}
            <BackgroundFXEngine activeFx={bgFx} />
            {/* Ambient Background Gradient Blobs */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full bg-blue-100/40 blur-[130px]" />
                <div className="absolute top-1/2 -right-40 h-[450px] w-[450px] rounded-full bg-indigo-100/30 blur-[130px]" />
            </div>

            {/* SIDEBAR (Desktop & Mobile Drawer) */}
            {!hideSidebar && (
                <Sidebar
                    mobileOpen={mobileSidebarOpen}
                    onCloseMobile={() => setMobileSidebarOpen(false)}
                />
            )}

            {/* MAIN APPLICATION AREA */}
            <div
                className={`
                    relative z-10 min-h-screen min-w-0 transition-all duration-300
                    ${hideSidebar ? "w-full" : "lg:ml-[220px]"}
                `}
            >
                {/* USER TOP NAVBAR */}
                {showTopNavbar && (
                    <TopNavbar
                        onToggleMobileSidebar={() => setMobileSidebarOpen((prev) => !prev)}
                    />
                )}

                {/* PAGE CONTENT CONTAINER */}
                <main className="w-full px-3 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-6">
                    <div className="mx-auto w-full max-w-[1800px]">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;