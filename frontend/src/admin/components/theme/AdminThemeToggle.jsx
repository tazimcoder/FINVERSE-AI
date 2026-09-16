/**
 * ==========================================================
 * FINVERSE AI
 * Next-Level Executive Admin Multi-Theme Engine (20 Modes)
 * ==========================================================
 * Location: src/admin/components/theme/AdminThemeToggle.jsx
 * Responsibility:
 * - 20 Distinct Premium Theme & Display Modes across Dark, Light, Neon, Luxury, & Minimalist categories
 * - Sets data-admin-theme on document.documentElement for complete portal adaptation
 * - Header Quick Multi-Theme Pill Switcher & Searchable Categorized Dropdown Menu
 * - Color Swatch Previews & Gradients for every theme mode
 * - Persistent localStorage theme state
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { FaPalette, FaCheck, FaSun, FaMoon, FaChevronDown, FaSearch, FaTimes, FaMagic } from "react-icons/fa";
import { FX_ANIMATIONS, FX_CATEGORIES } from "../../../components/common/BackgroundFXEngine";

export const ADMIN_THEMES = [
    {
        id: "dark",
        name: "Executive Dark",
        subtitle: "Night Slate (Default)",
        category: "DARK",
        icon: "🌙",
        bgClass: "bg-slate-900 text-slate-100",
        headerClass: "bg-slate-950/90 border-slate-800 text-slate-100",
        sidebarClass: "bg-slate-950 border-slate-800 text-slate-300",
        cardClass: "bg-slate-950 border-slate-800 text-slate-100",
        badgeBg: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        accentColor: "#3b82f6",
        swatch: ["#020617", "#0f172a", "#3b82f6"],
        previewGradient: "from-slate-950 via-slate-900 to-slate-800"
    },
    {
        id: "light",
        name: "Clean Light",
        subtitle: "Executive Day Mode",
        category: "LIGHT",
        icon: "☀️",
        bgClass: "bg-slate-100 text-slate-900",
        headerClass: "bg-white/95 border-slate-200 text-slate-900 shadow-xs",
        sidebarClass: "bg-white border-slate-200 text-slate-800",
        cardClass: "bg-white border-slate-200 text-slate-900 shadow-xs",
        badgeBg: "bg-blue-100 text-blue-700 border-blue-200",
        accentColor: "#2563eb",
        swatch: ["#f8fafc", "#ffffff", "#2563eb"],
        previewGradient: "from-slate-100 via-white to-slate-200"
    },
    {
        id: "midnight",
        name: "Midnight Navy",
        subtitle: "Deep Ocean Obsidian",
        category: "DARK",
        icon: "🌌",
        bgClass: "bg-[rgb(10,14,35)] text-indigo-100",
        headerClass: "bg-[rgb(7,10,26)]/90 border-indigo-900/60 text-indigo-100",
        sidebarClass: "bg-[rgb(7,10,26)] border-indigo-900/60 text-indigo-300",
        cardClass: "bg-[rgb(14,20,48)] border-indigo-900/50 text-indigo-100",
        badgeBg: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
        accentColor: "#6366f1",
        swatch: ["#070a1a", "#0e1430", "#6366f1"],
        previewGradient: "from-indigo-950 via-slate-950 to-blue-950"
    },
    {
        id: "cyberpunk",
        name: "Cyberpunk Neon",
        subtitle: "Futuristic Violet & Cyan",
        category: "NEON",
        icon: "⚡",
        bgClass: "bg-[rgb(18,8,28)] text-purple-100",
        headerClass: "bg-[rgb(14,5,22)]/90 border-fuchsia-900/60 text-purple-100",
        sidebarClass: "bg-[rgb(14,5,22)] border-fuchsia-900/60 text-fuchsia-300",
        cardClass: "bg-[rgb(28,12,42)] border-fuchsia-800/40 text-purple-100",
        badgeBg: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30",
        accentColor: "#d946ef",
        swatch: ["#0e0516", "#1c0c2a", "#d946ef"],
        previewGradient: "from-purple-950 via-fuchsia-950 to-pink-950"
    },
    {
        id: "emerald",
        name: "Emerald Mint",
        subtitle: "Bio-Fintech Forest",
        category: "DARK",
        icon: "🌿",
        bgClass: "bg-[rgb(8,36,22)] text-emerald-100",
        headerClass: "bg-[rgb(4,20,13)]/90 border-emerald-900/60 text-emerald-100",
        sidebarClass: "bg-[rgb(4,20,13)] border-emerald-900/60 text-emerald-300",
        cardClass: "bg-[rgb(12,48,30)] border-emerald-800/40 text-emerald-100",
        badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        accentColor: "#10b981",
        swatch: ["#04140d", "#0c301e", "#10b981"],
        previewGradient: "from-emerald-950 via-teal-950 to-green-950"
    },
    {
        id: "solarized",
        name: "Solarized Gold",
        subtitle: "Warm Amber Sepia Tones",
        category: "LUXURY",
        icon: "🌅",
        bgClass: "bg-[rgb(36,24,8)] text-amber-100",
        headerClass: "bg-[rgb(20,13,4)]/90 border-amber-900/60 text-amber-100",
        sidebarClass: "bg-[rgb(20,13,4)] border-amber-900/60 text-amber-300",
        cardClass: "bg-[rgb(48,32,10)] border-amber-800/40 text-amber-100",
        badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        accentColor: "#f59e0b",
        swatch: ["#140d04", "#30200a", "#f59e0b"],
        previewGradient: "from-amber-950 via-orange-950 to-yellow-950"
    },
    {
        id: "oled",
        name: "High Contrast OLED",
        subtitle: "Pure Pitch Black #000000",
        category: "DARK",
        icon: "🕶️",
        bgClass: "bg-black text-white",
        headerClass: "bg-black/95 border-zinc-800 text-white",
        sidebarClass: "bg-black border-zinc-800 text-zinc-300",
        cardClass: "bg-zinc-950 border-zinc-800 text-white",
        badgeBg: "bg-white/10 text-white border-white/20",
        accentColor: "#ffffff",
        swatch: ["#000000", "#09090b", "#ffffff"],
        previewGradient: "from-black via-zinc-950 to-black"
    },
    {
        id: "royal",
        name: "Royal Amethyst",
        subtitle: "Regal Imperial Purple",
        category: "LUXURY",
        icon: "👑",
        bgClass: "bg-[rgb(25,10,40)] text-purple-100",
        headerClass: "bg-[rgb(15,5,26)]/90 border-purple-900/60 text-purple-100",
        sidebarClass: "bg-[rgb(15,5,26)] border-purple-900/60 text-purple-300",
        cardClass: "bg-[rgb(37,14,59)] border-purple-800/40 text-purple-100",
        badgeBg: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        accentColor: "#a855f7",
        swatch: ["#0f051a", "#250e3b", "#a855f7"],
        previewGradient: "from-purple-950 via-indigo-950 to-violet-950"
    },
    {
        id: "sunset",
        name: "Sunset Crimson",
        subtitle: "Burgundy & Coral Tones",
        category: "DARK",
        icon: "🌇",
        bgClass: "bg-[rgb(40,10,18)] text-rose-100",
        headerClass: "bg-[rgb(26,4,10)]/90 border-rose-900/60 text-rose-100",
        sidebarClass: "bg-[rgb(26,4,10)] border-rose-900/60 text-rose-300",
        cardClass: "bg-[rgb(59,14,27)] border-rose-800/40 text-rose-100",
        badgeBg: "bg-rose-500/20 text-rose-300 border-rose-500/30",
        accentColor: "#f43f5e",
        swatch: ["#1a040a", "#3b0e1b", "#f43f5e"],
        previewGradient: "from-rose-950 via-red-950 to-pink-950"
    },
    {
        id: "frost",
        name: "Nordic Frost",
        subtitle: "Arctic Cyan & Glacier",
        category: "DARK",
        icon: "❄️",
        bgClass: "bg-[rgb(11,25,44)] text-sky-100",
        headerClass: "bg-[rgb(5,13,24)]/90 border-sky-900/60 text-sky-100",
        sidebarClass: "bg-[rgb(5,13,24)] border-sky-900/60 text-sky-300",
        cardClass: "bg-[rgb(30,62,98)] border-sky-800/40 text-sky-100",
        badgeBg: "bg-sky-500/20 text-sky-300 border-sky-500/30",
        accentColor: "#38bdf8",
        swatch: ["#050d18", "#1e3e62", "#38bdf8"],
        previewGradient: "from-sky-950 via-cyan-950 to-blue-950"
    },
    {
        id: "matrix",
        name: "Matrix Terminal",
        subtitle: "Phosphor Green Terminal",
        category: "NEON",
        icon: "💻",
        bgClass: "bg-[rgb(3,10,4)] text-emerald-400",
        headerClass: "bg-[rgb(1,5,2)]/90 border-emerald-900/60 text-emerald-400",
        sidebarClass: "bg-[rgb(1,5,2)] border-emerald-900/60 text-emerald-400",
        cardClass: "bg-[rgb(7,23,10)] border-emerald-800/40 text-emerald-300",
        badgeBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        accentColor: "#34d399",
        swatch: ["#010502", "#07170a", "#34d399"],
        previewGradient: "from-black via-emerald-950 to-green-950"
    },
    {
        id: "rosegold",
        name: "Rose Gold Luxury",
        subtitle: "Quartz Pink & Elegance",
        category: "LUXURY",
        icon: "🌸",
        bgClass: "bg-[rgb(38,20,26)] text-pink-100",
        headerClass: "bg-[rgb(25,12,17)]/90 border-pink-900/60 text-pink-100",
        sidebarClass: "bg-[rgb(25,12,17)] border-pink-900/60 text-pink-300",
        cardClass: "bg-[rgb(56,30,39)] border-pink-800/40 text-pink-100",
        badgeBg: "bg-pink-500/20 text-pink-300 border-pink-500/30",
        accentColor: "#ec4899",
        swatch: ["#190c11", "#381e27", "#ec4899"],
        previewGradient: "from-pink-950 via-rose-950 to-slate-950"
    },
    {
        id: "synthwave",
        name: "Synthwave 80s",
        subtitle: "Sunset Magenta & Cyan Glow",
        category: "NEON",
        icon: "🌆",
        bgClass: "bg-[rgb(24,11,40)] text-pink-100",
        headerClass: "bg-[rgb(15,6,26)]/90 border-pink-800/60 text-pink-100",
        sidebarClass: "bg-[rgb(15,6,26)] border-pink-800/60 text-pink-300",
        cardClass: "bg-[rgb(38,15,60)] border-pink-700/50 text-pink-100",
        badgeBg: "bg-pink-500/20 text-pink-300 border-pink-500/30",
        accentColor: "#f43f5e",
        swatch: ["#0f061a", "#260f3c", "#f43f5e"],
        previewGradient: "from-fuchsia-950 via-purple-950 to-rose-950"
    },
    {
        id: "titanium",
        name: "Titanium Steel",
        subtitle: "Industrial Slate Metallic",
        category: "DARK",
        icon: "⚙️",
        bgClass: "bg-[rgb(22,27,34)] text-gray-100",
        headerClass: "bg-[rgb(13,17,23)]/90 border-gray-700/60 text-gray-100",
        sidebarClass: "bg-[rgb(13,17,23)] border-gray-700/60 text-gray-300",
        cardClass: "bg-[rgb(33,38,45)] border-gray-700/50 text-gray-100",
        badgeBg: "bg-gray-500/20 text-gray-300 border-gray-500/30",
        accentColor: "#9ca3af",
        swatch: ["#0d1117", "#21262d", "#9ca3af"],
        previewGradient: "from-slate-900 via-zinc-900 to-gray-800"
    },
    {
        id: "coffee",
        name: "Mocha Espresso",
        subtitle: "Rich Warm Cocoa & Cream",
        category: "LUXURY",
        icon: "☕",
        bgClass: "bg-[rgb(32,21,16)] text-amber-100",
        headerClass: "bg-[rgb(20,13,9)]/90 border-amber-900/60 text-amber-100",
        sidebarClass: "bg-[rgb(20,13,9)] border-amber-900/60 text-amber-300",
        cardClass: "bg-[rgb(48,31,24)] border-amber-800/40 text-amber-100",
        badgeBg: "bg-amber-600/20 text-amber-300 border-amber-600/30",
        accentColor: "#d97706",
        swatch: ["#140d09", "#301f18", "#d97706"],
        previewGradient: "from-amber-950 via-orange-950 to-stone-900"
    },
    {
        id: "cobalt",
        name: "Deep Cobalt Blue",
        subtitle: "Ultra Rich Sapphire Glow",
        category: "DARK",
        icon: "🔷",
        bgClass: "bg-[rgb(8,20,48)] text-blue-100",
        headerClass: "bg-[rgb(4,11,28)]/90 border-blue-900/60 text-blue-100",
        sidebarClass: "bg-[rgb(4,11,28)] border-blue-900/60 text-blue-300",
        cardClass: "bg-[rgb(12,30,70)] border-blue-800/50 text-blue-100",
        badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        accentColor: "#3b82f6",
        swatch: ["#040b1c", "#0c1e46", "#3b82f6"],
        previewGradient: "from-blue-950 via-indigo-950 to-slate-950"
    },
    {
        id: "champagne",
        name: "Champagne Onyx",
        subtitle: "Luxury Gold & Pitch Black",
        category: "LUXURY",
        icon: "✨",
        bgClass: "bg-[rgb(18,16,12)] text-amber-100",
        headerClass: "bg-black/95 border-amber-500/30 text-amber-100",
        sidebarClass: "bg-black border-amber-500/20 text-amber-200",
        cardClass: "bg-[rgb(28,24,18)] border-amber-500/30 text-amber-100",
        badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
        accentColor: "#fbbf24",
        swatch: ["#000000", "#1c1812", "#fbbf24"],
        previewGradient: "from-black via-amber-950 to-black"
    },
    {
        id: "glass",
        name: "Glassmorphism Ice",
        subtitle: "Frosted Translucent Teal",
        category: "NEON",
        icon: "🧊",
        bgClass: "bg-[rgb(10,30,36)] text-teal-100",
        headerClass: "bg-[rgb(5,18,22)]/90 border-teal-800/60 text-teal-100",
        sidebarClass: "bg-[rgb(5,18,22)] border-teal-800/60 text-teal-300",
        cardClass: "bg-[rgb(16,46,55)] border-teal-700/40 text-teal-100",
        badgeBg: "bg-teal-500/20 text-teal-300 border-teal-500/30",
        accentColor: "#2dd4bf",
        swatch: ["#051216", "#102e37", "#2dd4bf"],
        previewGradient: "from-teal-950 via-cyan-950 to-slate-950"
    },
    {
        id: "bloodmoon",
        name: "Blood Moon Red",
        subtitle: "Crimson Night & Charcoal",
        category: "DARK",
        icon: "🩸",
        bgClass: "bg-[rgb(30,10,12)] text-red-100",
        headerClass: "bg-[rgb(18,5,7)]/90 border-red-900/60 text-red-100",
        sidebarClass: "bg-[rgb(18,5,7)] border-red-900/60 text-red-300",
        cardClass: "bg-[rgb(45,14,18)] border-red-800/40 text-red-100",
        badgeBg: "bg-red-500/20 text-red-300 border-red-500/30",
        accentColor: "#ef4444",
        swatch: ["#120507", "#2d0e12", "#ef4444"],
        previewGradient: "from-red-950 via-rose-950 to-neutral-950"
    },
    {
        id: "monochrome",
        name: "Monochrome Pro",
        subtitle: "Minimalist Pure Greyscale",
        category: "LIGHT",
        icon: "🎨",
        bgClass: "bg-slate-200 text-slate-900",
        headerClass: "bg-white border-slate-300 text-slate-900",
        sidebarClass: "bg-slate-100 border-slate-300 text-slate-800",
        cardClass: "bg-white border-slate-300 text-slate-900 shadow-sm",
        badgeBg: "bg-slate-800 text-white border-slate-900",
        accentColor: "#0f172a",
        swatch: ["#e2e8f0", "#ffffff", "#0f172a"],
        previewGradient: "from-slate-300 via-slate-100 to-white"
    }
];

export function getAdminTheme(themeId) {
    return ADMIN_THEMES.find((t) => t.id === themeId) || ADMIN_THEMES[0];
}

export default function AdminThemeToggle({ currentThemeId, onSelectTheme }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [activeFx, setActiveFx] = useState(() => {
        return localStorage.getItem("finverse_bg_animation") || "particles";
    });
    const dropdownRef = useRef(null);

    const activeTheme = getAdminTheme(currentThemeId);

    // Sync theme to root element data attribute
    useEffect(() => {
        document.documentElement.setAttribute("data-admin-theme", currentThemeId);
    }, [currentThemeId]);

    // Sync active FX from custom events
    useEffect(() => {
        const handleFxChange = (e) => {
            if (e?.detail) {
                setActiveFx(e.detail);
            }
        };
        window.addEventListener("finverse_bg_fx_changed", handleFxChange);
        return () => window.removeEventListener("finverse_bg_fx_changed", handleFxChange);
    }, []);

    // Select FX and broadcast changes
    const handleSelectFx = (fxId) => {
        setActiveFx(fxId);
        localStorage.setItem("finverse_bg_animation", fxId);
        window.dispatchEvent(new CustomEvent("finverse_bg_fx_changed", { detail: fxId }));
    };

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Fast quick toggle between Light and Dark on icon click
    const handleQuickLightDarkToggle = (e) => {
        e.stopPropagation();
        const nextTheme = currentThemeId === "light" || currentThemeId === "monochrome" ? "dark" : "light";
        onSelectTheme(nextTheme);
    };

    // Filter themes by search & category
    const filteredThemes = useMemo(() => {
        return ADMIN_THEMES.filter((t) => {
            const matchesCat = selectedCategory === "ALL" || t.category === selectedCategory;
            const matchesSearch =
                t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCat && matchesSearch;
        });
    }, [searchTerm, selectedCategory]);

    const [fxSubCategory, setFxSubCategory] = useState("ALL FX");

    // Filter FX animations by search and sub-category
    const filteredFxAnimations = useMemo(() => {
        return FX_ANIMATIONS.filter((fx) => {
            const matchesCat = fxSubCategory === "ALL FX" || fx.category === fxSubCategory;
            const matchesSearch =
                fx.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                fx.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                fx.category.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCat && matchesSearch;
        });
    }, [searchTerm, fxSubCategory]);

    return (
        <div className="relative inline-block font-sans z-50" ref={dropdownRef}>
            {/* MULTI-THEME NAV BUTTON */}
            <div className={`flex items-center gap-1.5 rounded-xl border p-1 shadow-sm transition ${
                currentThemeId === "light" || currentThemeId === "monochrome"
                    ? "border-slate-300 bg-white"
                    : "border-slate-800 bg-slate-900/90"
            }`}>
                {/* Direct Light/Dark Quick Switcher Icon Button */}
                <button
                    onClick={handleQuickLightDarkToggle}
                    type="button"
                    className={`flex h-7 w-7 items-center justify-center rounded-lg transition cursor-pointer ${
                        currentThemeId === "light" || currentThemeId === "monochrome"
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                    }`}
                    title={currentThemeId === "light" || currentThemeId === "monochrome" ? "Switch to Dark Mode" : "Switch to Light Mode"}
                >
                    {currentThemeId === "light" || currentThemeId === "monochrome" ? (
                        <FaSun className="h-3.5 w-3.5 text-amber-600" />
                    ) : (
                        <FaMoon className="h-3.5 w-3.5 text-blue-400" />
                    )}
                </button>

                {/* Dropdown Opener for All 20 Theme Modes */}
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    type="button"
                    className={`flex items-center gap-2 px-2 py-1 text-xs font-bold transition cursor-pointer ${
                        currentThemeId === "light" || currentThemeId === "monochrome"
                            ? "text-slate-800 hover:text-slate-950"
                            : "text-slate-200 hover:text-white"
                    }`}
                    title="Choose Theme Mode"
                >
                    {/* Live Color Swatch Dot */}
                    <span
                        className="h-2.5 w-2.5 rounded-full ring-2 ring-white/20 shadow-xs shrink-0"
                        style={{ backgroundColor: activeTheme?.accentColor || "#3b82f6" }}
                    />
                    <span className="text-sm">{activeTheme?.icon || "🌙"}</span>
                    <span className="text-[11px] font-black tracking-wide whitespace-nowrap">{activeTheme?.name || "Executive Dark"}</span>
                    <FaChevronDown className={`h-2.5 w-2.5 transition-transform ${
                        currentThemeId === "light" || currentThemeId === "monochrome" ? "text-slate-600" : "text-slate-400"
                    } ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
            </div>

            {/* MULTI-THEME SEARCHABLE DROPDOWN MENU (20 MODES) */}
            {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-800 bg-slate-950/95 p-3 shadow-2xl backdrop-blur-2xl z-50 animate-scale-pop text-slate-100 ring-1 ring-white/10 space-y-2.5">
                    
                    {/* Header Banner */}
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                        <div className="flex items-center gap-2">
                            <FaPalette className="text-blue-400 text-xs" />
                            <span className="text-[11px] font-black uppercase tracking-wider text-slate-200">
                                Executive Theme Engine
                            </span>
                        </div>
                        <span className="text-[9px] font-black bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/30 flex items-center gap-1">
                            <FaMagic className="text-[8px]" /> 20 MODES
                        </span>
                    </div>

                    {/* Search & Filter Category Pills */}
                    <div className="space-y-2">
                        {/* Search Input */}
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-500" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search 20 themes..."
                                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-1.5 pl-8 pr-7 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                                >
                                    <FaTimes className="h-3 w-3" />
                                </button>
                            )}
                        </div>

                        {/* Category Pills */}
                        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[9px] font-extrabold scrollbar-none">
                            {["ALL", "DARK", "LIGHT", "NEON", "LUXURY", "✨ 50+ ANIMATIONS"].map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-2 py-1 rounded-lg border transition shrink-0 cursor-pointer ${
                                        selectedCategory === cat || (cat === "✨ 50+ ANIMATIONS" && selectedCategory === "✨ ANIMATIONS")
                                            ? "bg-purple-600 text-white border-purple-500 shadow-xs"
                                            : cat.includes("ANIMATIONS")
                                                ? "bg-purple-900/60 text-purple-200 border-purple-700/60 hover:bg-purple-800 hover:text-white"
                                                : "bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* FX Sub-Category Pills (Visible when FX is selected) */}
                        {(selectedCategory === "✨ ANIMATIONS" || selectedCategory === "✨ 50+ ANIMATIONS") && (
                            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[8px] font-bold scrollbar-none border-t border-slate-800/80 pt-1.5">
                                {FX_CATEGORIES.map((fxCat) => (
                                    <button
                                        key={fxCat}
                                        type="button"
                                        onClick={() => setFxSubCategory(fxCat)}
                                        className={`px-1.5 py-0.5 rounded-md border transition shrink-0 cursor-pointer ${
                                            fxSubCategory === fxCat
                                                ? "bg-indigo-600 text-white border-indigo-400 font-black"
                                                : "bg-slate-900/90 text-slate-400 border-slate-800 hover:text-white"
                                        }`}
                                    >
                                        {fxCat}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Themes or Animations Scroll List */}
                    <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
                        {selectedCategory === "✨ ANIMATIONS" || selectedCategory === "✨ 50+ ANIMATIONS" ? (
                            filteredFxAnimations.length === 0 ? (
                                <p className="text-center py-6 text-xs text-slate-500 font-medium">
                                    No matching animation found.
                                </p>
                            ) : (
                                filteredFxAnimations.map((fx) => {
                                    const isSelected = fx.id === activeFx;
                                    return (
                                        <button
                                            key={fx.id}
                                            type="button"
                                            onClick={() => {
                                                handleSelectFx(fx.id);
                                                setDropdownOpen(false);
                                            }}
                                            className={`w-full flex items-center justify-between rounded-xl p-2.5 text-left text-xs transition cursor-pointer ${
                                                isSelected
                                                    ? "bg-purple-600/25 border border-purple-500/50 text-white font-bold shadow-xs"
                                                    : "hover:bg-slate-900/90 text-slate-300 hover:text-white"
                                            }`}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <span className="text-base shrink-0">{fx.icon}</span>
                                                <div>
                                                    <div className="flex items-center gap-1.5">
                                                        <p className="font-bold text-xs leading-tight">{fx.name}</p>
                                                        <span className="text-[8px] font-black px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800/40 uppercase">
                                                            {fx.category}
                                                        </span>
                                                    </div>
                                                    <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                                                        {fx.desc}
                                                    </p>
                                                </div>
                                            </div>

                                            {isSelected && (
                                                <FaCheck className="h-3.5 w-3.5 text-purple-400 shrink-0 ml-2" />
                                            )}
                                        </button>
                                    );
                                })
                            )
                        ) : filteredThemes.length === 0 ? (
                            <p className="text-center py-6 text-xs text-slate-500 font-medium">
                                No matching theme found.
                            </p>
                        ) : (
                            filteredThemes.map((theme) => {
                                const isSelected = theme.id === currentThemeId;
                                return (
                                    <button
                                        key={theme.id}
                                        type="button"
                                        onClick={() => {
                                            onSelectTheme(theme.id);
                                            setDropdownOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between rounded-xl p-2.5 text-left text-xs transition cursor-pointer ${
                                            isSelected
                                                ? "bg-blue-600/20 border border-blue-500/40 text-white font-bold shadow-xs"
                                                : "hover:bg-slate-900/90 text-slate-300 hover:text-white"
                                        }`}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <span className="text-base shrink-0">{theme.icon}</span>
                                            <div>
                                                <div className="flex items-center gap-1.5">
                                                    <p className="font-bold text-xs leading-tight">{theme.name}</p>
                                                    <span className="text-[8px] font-black px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 uppercase">
                                                        {theme.category}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                                                    {theme.subtitle}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            {/* Color Swatch Dots */}
                                            <div className="flex items-center -space-x-1">
                                                {theme.swatch.map((color, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="h-2.5 w-2.5 rounded-full border border-slate-950"
                                                        style={{ backgroundColor: color }}
                                                    />
                                                ))}
                                            </div>

                                            {isSelected && (
                                                <FaCheck className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                                            )}
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
