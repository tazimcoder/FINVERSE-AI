import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaBell, FaCheckCircle, FaCreditCard, FaShieldAlt, FaInfoCircle, FaCheckDouble, FaSync } from "react-icons/fa";
import { getUserNotifications, markNotificationsRead } from "../../../features/loan/api/userFeaturesApi";

export default function NotificationBell() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const popoverRef = useRef(null);

    const loadRealtimeNotifications = useCallback(async () => {
        try {
            const res = await getUserNotifications();
            if (res.success && res.data) {
                setNotifications(res.data.notifications || []);
                setUnreadCount(res.data.unreadCount || 0);
            }
        } catch (err) {
            console.error("Failed to load user-specific notifications:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadRealtimeNotifications();
        // Polling interval every 30 seconds for real-time live account notification updates
        const interval = setInterval(loadRealtimeNotifications, 30000);
        return () => clearInterval(interval);
    }, [loadRealtimeNotifications]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popoverRef.current && !popoverRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleMarkAllRead = async () => {
        try {
            await markNotificationsRead();
            setNotifications((prev) => prev.map((n) => ({ ...n, is_read: 1 })));
            setUnreadCount(0);
        } catch (err) {
            console.error("Failed to mark notifications read:", err);
        }
    };

    const handleMarkSingleRead = async (id) => {
        try {
            await markNotificationsRead(id);
            setNotifications((prev) =>
                prev.map((n) => (n.id === id ? { ...n, is_read: 1 } : n))
            );
            setUnreadCount((prev) => Math.max(0, prev - 1));
        } catch (err) {
            console.error("Failed to mark notification read:", err);
        }
    };

    const getNotificationStyle = (type) => {
        switch (type) {
            case "PAYMENT":
            case "LOAN":
                return {
                    icon: FaCheckCircle,
                    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
                };
            case "EMI":
                return {
                    icon: FaCreditCard,
                    color: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
                };
            case "KYC":
                return {
                    icon: FaShieldAlt,
                    color: "bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400",
                };
            default:
                return {
                    icon: FaInfoCircle,
                    color: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
                };
        }
    };

    return (
        <div className="relative" ref={popoverRef}>
            <button
                onClick={() => {
                    setIsOpen((prev) => !prev);
                    if (!isOpen) loadRealtimeNotifications();
                }}
                className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                title="Account Notifications"
            >
                <FaBell className="h-4 w-4" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-xs animate-pulse">
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* Real-time Notification Popover Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl z-50 overflow-hidden animate-scale-pop">
                    <div className="flex items-center justify-between p-3.5 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">Account Alerts</span>
                            {unreadCount > 0 && (
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-full">
                                    {unreadCount} Unread
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={loadRealtimeNotifications}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded transition"
                                title="Refresh Notifications"
                            >
                                <FaSync className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
                            </button>
                            {unreadCount > 0 && (
                                <button
                                    onClick={handleMarkAllRead}
                                    className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                    <FaCheckDouble className="w-3 h-3" /> Mark all read
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                        {loading && notifications.length === 0 ? (
                            <div className="py-8 text-center text-xs text-slate-400 animate-pulse">
                                Syncing account notifications...
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="py-8 text-center text-xs text-slate-400">
                                No active account notifications.
                            </div>
                        ) : (
                            notifications.map((item) => {
                                const style = getNotificationStyle(item.type);
                                const Icon = style.icon;
                                const isUnread = !item.is_read;

                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => isUnread && handleMarkSingleRead(item.id)}
                                        className={`p-3 rounded-xl flex items-start gap-3 transition-colors cursor-pointer ${
                                            isUnread
                                                ? "bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100/50 dark:border-blue-900/40"
                                                : "bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                        }`}
                                    >
                                        <div className={`p-2 rounded-lg shrink-0 ${style.color}`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-slate-900 dark:text-white truncate flex items-center gap-1.5">
                                                    {item.title}
                                                    {isUnread && (
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                                                    )}
                                                </span>
                                                <span className="text-[10px] text-slate-400 font-mono">
                                                    {new Date(item.created_at).toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-snug">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                            Real-Time User Account Activity
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}