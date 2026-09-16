/**
 * ==========================================================
 * FINVERSE AI — Executive Application Layout Shell
 * World-class fintech application layout container
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
    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
        return localStorage.getItem("finverse_sidebar_collapsed") === "true";
    });

    const [bgFx, setBgFx] = useState(() => {
        return localStorage.getItem("finverse_bg_animation") || "off";
    });

    const toggleSidebarCollapse = () => {
        setSidebarCollapsed((prev) => {
            const next = !prev;
            localStorage.setItem("finverse_sidebar_collapsed", String(next));
            return next;
        });
    };

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

    const contentMargin = hideSidebar
        ? "w-full"
        : sidebarCollapsed
        ? "lg:ml-[72px]"
        : "lg:ml-[240px]";

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-[#090D16] text-slate-100 font-sans relative selection:bg-emerald-500/30 selection:text-emerald-300">
            {/* Background FX Engine */}
            <BackgroundFXEngine activeFx={bgFx} />

            {/* Subtle Ambient Glow Blobs */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-emerald-600/5 blur-[140px]" />
                <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[140px]" />
                <div className="absolute -bottom-40 left-1/3 h-[500px] w-[500px] rounded-full bg-purple-600/5 blur-[140px]" />
            </div>

            {/* SIDEBAR (Desktop & Mobile Drawer) */}
            {!hideSidebar && (
                <Sidebar
                    mobileOpen={mobileSidebarOpen}
                    onCloseMobile={() => setMobileSidebarOpen(false)}
                    isCollapsed={sidebarCollapsed}
                    onToggleCollapse={toggleSidebarCollapse}
                />
            )}

            {/* MAIN APPLICATION AREA */}
            <div
                className={`
                    relative z-10 min-h-screen min-w-0 transition-all duration-300 ease-in-out
                    ${contentMargin}
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
                    <div className="mx-auto w-full max-w-[1800px] animate-fade-in-up">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;