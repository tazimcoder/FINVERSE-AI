/**
 * ==========================================================
 * Main Layout
 * Used for public pages
 * ==========================================================
 */

function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-100">
            {children}
        </div>
    );
}

export default MainLayout;