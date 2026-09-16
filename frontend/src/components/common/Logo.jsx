/**
 * ==========================================================
 * FINVERSE AI
 * Executive World-Class Financial OS Logo Component
 * High-End Vector Emblem featuring Financial Growth + AI Spark
 * ==========================================================
 */
import { Link } from "react-router-dom";

function Logo({ light = false, showText = true, size = "md" }) {
    const textColor = light ? "text-white" : "text-slate-900 dark:text-white";
    const subTextColor = light ? "text-cyan-400" : "text-blue-600 dark:text-cyan-400";

    const dimensions = {
        sm: { icon: 32, text: "text-lg", sub: "text-[8px]" },
        md: { icon: 40, text: "text-xl", sub: "text-[9px]" },
        lg: { icon: 48, text: "text-2xl", sub: "text-[10px]" },
    }[size] || { icon: 40, text: "text-xl", sub: "text-[9px]" };

    return (
        <Link to="/" className="flex items-center gap-3 select-none group cursor-pointer">
            {/* Finverse AI Glowing Vector Emblem */}
            <div className="relative flex items-center justify-center shrink-0">
                {/* Background Glow Effect */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 opacity-50 blur-sm group-hover:opacity-80 transition duration-300 group-hover:scale-105" />

                <svg
                    width={dimensions.icon}
                    height={dimensions.icon}
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative shrink-0 group-hover:scale-105 transition-transform duration-300 rounded-2xl shadow-xl shadow-blue-500/20"
                >
                    <defs>
                        {/* Outer Tile Gradient */}
                        <linearGradient id="finTileGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#0F172A" />
                            <stop offset="50%" stopColor="#1E293B" />
                            <stop offset="100%" stopColor="#0B1329" />
                        </linearGradient>

                        {/* Financial Growth Ribbon Gradient */}
                        <linearGradient id="finRibbonGrad" x1="6" y1="42" x2="42" y2="6" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#2563EB" />
                            <stop offset="40%" stopColor="#3B82F6" />
                            <stop offset="75%" stopColor="#06B6D4" />
                            <stop offset="100%" stopColor="#10B981" />
                        </linearGradient>

                        {/* AI Spark Star Gradient */}
                        <linearGradient id="aiSparkGrad" x1="28" y1="6" x2="44" y2="22" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#F59E0B" />
                            <stop offset="50%" stopColor="#EC4899" />
                            <stop offset="100%" stopColor="#8B5CF6" />
                        </linearGradient>

                        {/* Inner Metallic Border */}
                        <linearGradient id="finBorderGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#818CF8" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#34D399" stopOpacity="0.6" />
                        </linearGradient>
                    </defs>

                    {/* Container Base Tile with Rounded Hex-Squircle */}
                    <rect
                        width="48"
                        height="48"
                        rx="14"
                        fill="url(#finTileGrad)"
                        stroke="url(#finBorderGrad)"
                        strokeWidth="1.5"
                    />

                    {/* Subtle Background Geometric Grid Lines */}
                    <path
                        d="M10 24H38M24 10V38"
                        stroke="#334155"
                        strokeWidth="0.75"
                        strokeDasharray="2 3"
                        opacity="0.4"
                    />

                    {/* Dynamic Upward Financial 'F' + Exponential Curve Ribbon */}
                    <path
                        d="M12 36L20 28M20 28C22 26 24 24 27 24H36M20 28V36M12 18H28C32 18 34 16 34 12V10"
                        stroke="url(#finRibbonGrad)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Arrow Head / Financial Surge Pointer */}
                    <path
                        d="M29 36L37 28L33 24"
                        stroke="url(#finRibbonGrad)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* AI Spark Icon (Glowing 4-point star at top right) */}
                    <path
                        d="M37 8C37 11.5 39.5 14 43 14C39.5 14 37 16.5 37 20C37 16.5 34.5 14 31 14C34.5 14 37 11.5 37 8Z"
                        fill="url(#aiSparkGrad)"
                    />

                    {/* Golden Coin Spark Dot */}
                    <circle cx="14" cy="14" r="2.5" fill="#F59E0B" />
                </svg>
            </div>

            {/* Typography */}
            {showText && (
                <div>
                    <div className="flex items-center gap-1.5">
                        <h1 className={`${dimensions.text} font-black tracking-tight ${textColor} leading-none flex items-center gap-1.5`}>
                            FINVERSE
                            <span className="text-[10px] font-extrabold text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded-md border border-cyan-500/40 shadow-xs tracking-wider">
                                AI
                            </span>
                        </h1>
                    </div>

                    <p className={`${dimensions.sub} font-bold uppercase tracking-[0.2em] ${subTextColor} mt-1`}>
                        Financial Intelligence OS
                    </p>
                </div>
            )}
        </Link>
    );
}

export default Logo;