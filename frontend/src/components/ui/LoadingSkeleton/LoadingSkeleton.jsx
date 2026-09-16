/**
 * ==========================================================
 * FINVERSE AI — LoadingSkeleton Primitive
 * Shimmer placeholders for loading states
 * ==========================================================
 */
import React from "react";

export function Skeleton({ className = "", height = "h-4", width = "w-full", rounded = "rounded-lg" }) {
    return <div className={`bg-slate-800/80 animate-shimmer ${height} ${width} ${rounded} ${className}`} />;
}

export function MetricCardSkeleton() {
    return (
        <div className="p-5 rounded-2xl bg-[#0F172A]/90 border border-slate-800/90 shadow-xl space-y-3">
            <div className="flex justify-between items-center">
                <Skeleton width="w-24" height="h-3.5" />
                <Skeleton width="w-8" height="h-8" rounded="rounded-xl" />
            </div>
            <Skeleton width="w-36" height="h-8" />
            <Skeleton width="w-20" height="h-3" />
        </div>
    );
}

export function TableRowSkeleton({ columns = 4 }) {
    return (
        <tr className="border-b border-slate-800/60">
            {Array.from({ length: columns }).map((_, idx) => (
                <td key={idx} className="p-4">
                    <Skeleton width={idx === 0 ? "w-32" : "w-20"} height="h-4" />
                </td>
            ))}
        </tr>
    );
}

export default Skeleton;
