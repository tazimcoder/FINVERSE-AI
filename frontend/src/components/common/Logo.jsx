/**
 * ==========================================================
 * FINVERSE
 * Executive Corporate Logo Component
 * Custom SVG Vector Emblem inspired by top global financial institutions
 * ==========================================================
 */
import { Link } from "react-router-dom";

function Logo({ light = false }) {
    const textColor = light ? "text-white" : "text-slate-900";
    const subTextColor = light ? "text-blue-400" : "text-blue-600";

    return (
        <Link to="/" className="flex items-center gap-3 select-none group cursor-pointer">
            {/* Executive Corporate Vector Emblem */}
            <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-md shadow-blue-600/20 rounded-xl"
            >
                <defs>
                    <linearGradient id="logoBgGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#1E40AF" />
                        <stop offset="50%" stopColor="#2563EB" />
                        <stop offset="100%" stopColor="#4F46E5" />
                    </linearGradient>
                    <linearGradient id="logoAccentGrad" x1="18" y1="18" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#38BDF8" />
                        <stop offset="100%" stopColor="#818CF8" />
                    </linearGradient>
                </defs>

                {/* Base Curved Shield Container */}
                <rect width="40" height="40" rx="12" fill="url(#logoBgGrad)" />

                {/* Vector Ribbon 'F' */}
                <path
                    d="M12 11H26.5C27.6 11 28.5 11.9 28.5 13V14.5C28.5 15.6 27.6 16.5 26.5 16.5H17.5V18.5H24C25.1 18.5 26 19.4 26 20.5V22C26 23.1 25.1 24 24 24H17.5V28.5C17.5 29.6 16.6 30.5 15.5 30.5H14C12.9 30.5 12 29.6 12 28.5V11Z"
                    fill="white"
                />

                {/* Dynamic Financial Arrow Accent */}
                <path
                    d="M21 26.5L29 18.5M29 18.5H24M29 18.5V23.5"
                    stroke="url(#logoAccentGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            {/* Typography */}
            <div>
                <div className="flex items-center gap-1.5">
                    <h1 className={`text-xl font-black tracking-tight ${textColor}`}>
                        FINVERSE
                    </h1>
                </div>

                <p className={`text-[9px] font-bold uppercase tracking-widest ${subTextColor} mt-0.5`}>
                    Global Financial OS
                </p>
            </div>
        </Link>
    );
}

export default Logo;