/**
 * ==========================================================
 * FINVERSE AI
 * Logo Component
 * ==========================================================
 */
import { APP_CONFIG } from "../../config";
function Logo() {
    return (
        <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                F
            </div>

            <div>
                <h1 className="text-xl font-bold text-slate-900">
                    {APP_CONFIG.appName}
                </h1>

                <p className="text-xs text-slate-500">
                    Global Financial Operating System
                </p>
            </div>
        </div>
    );
}

export default Logo;