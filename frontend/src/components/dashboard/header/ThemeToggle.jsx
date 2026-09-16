/**
 * ==========================================================
 * FINVERSE AI
 * Executive Theme Engine Switcher (20 Modes) for User App
 * ==========================================================
 */

import { useState, useEffect } from "react";
import AdminThemeToggle, { getAdminTheme } from "../../../admin/components/theme/AdminThemeToggle";

function ThemeToggle() {
    const [themeId, setThemeId] = useState(() => {
        return localStorage.getItem("finverse_theme") || localStorage.getItem("finverse_admin_theme_mode") || "dark";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-admin-theme", themeId);
        if (themeId === "light" || themeId === "monochrome") {
            document.documentElement.classList.remove("dark");
        } else {
            document.documentElement.classList.add("dark");
        }
    }, [themeId]);

    const handleSelectTheme = (newThemeId) => {
        setThemeId(newThemeId);
        localStorage.setItem("finverse_theme", newThemeId);
        localStorage.setItem("finverse_admin_theme_mode", newThemeId);
    };

    return (
        <AdminThemeToggle
            currentThemeId={themeId}
            onSelectTheme={handleSelectTheme}
        />
    );
}

export default ThemeToggle;

