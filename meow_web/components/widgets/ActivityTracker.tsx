"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Clock, History, Trash2 } from "lucide-react";

import { useSystemTracker } from "@/hooks/useSystemTracker";

export default function ActivityTracker() {
    const { currentApp, stats, clearData } = useSystemTracker();
    const [totalFocusToday, setTotalFocusToday] = useState(0);

    // Calculate total app focus from stats
    const totalAppTime = Object.values(stats.totals).reduce((acc, curr) => acc + curr.totalDuration, 0);

    const handleClear = () => {
        if (confirm("Are you sure you want to clear all local activity history? This cannot be undone.")) {
            clearData();
        }
    };

    useEffect(() => {
        const loadStats = () => {
            // Keep legacy task time for now
            const tasksString = localStorage.getItem("meow-tasks");
            if (tasksString) {
                try {
                    const tasks = JSON.parse(tasksString);
                    const total = tasks.reduce((acc: number, task: any) => acc + (task.focusTime || 0), 0);
                    setTotalFocusToday(total);
                } catch (e) {
                    console.error(e);
                }
            }
        };

        loadStats();
    }, []);

    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        if (hrs > 0) return `${hrs}h ${mins}m`;
        return `${mins}m`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed bottom-24 left-8 w-64 bg-foreground/[0.04] border border-foreground/[0.15] backdrop-blur-xl rounded-[2rem] p-6 flex flex-col gap-4 z-50 group transition-all shadow-2xl shadow-black/10 hover:border-foreground/30"
        >
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-foreground/5">
                        <Activity size={14} className="opacity-50" />
                    </div>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">System Activity</h2>
                </div>
                <button
                    onClick={handleClear}
                    className="p-1 px-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500/50 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                    title="Clear All History"
                >
                    <Trash2 size={12} />
                </button>
            </div>

            {/* Current App Info */}
            {currentApp && (
                <div className="p-3 rounded-2xl bg-foreground/5 border border-foreground/10">
                    <div className="text-[9px] uppercase tracking-widest font-bold opacity-30 mb-1">Focusing on</div>
                    <div className="text-xs font-bold truncate">{currentApp.app}</div>
                    <div className="text-[10px] opacity-40 truncate">{currentApp.title}</div>
                </div>
            )}

            <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-30">Total Screen Time</span>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black tabular-nums">{formatTime(totalAppTime)}</span>
                </div>
            </div>

            <div className="h-[1px] w-full bg-foreground/5" />

            {/* Show top 3 apps */}
            <div className="flex flex-col gap-2">
                {Object.entries(stats.totals)
                    .filter(([key]) => !key.includes('.')) // Hide domains here
                    .sort((a, b) => b[1].totalDuration - a[1].totalDuration)
                    .slice(0, 3)
                    .map(([app, data]) => (
                        <div key={app} className="flex justify-between items-center text-[10px]">
                            <span className="opacity-50 truncate max-w-[100px]">{app}</span>
                            <span className="font-bold">{formatTime(data.totalDuration)}</span>
                        </div>
                    ))
                }
            </div>
        </motion.div>
    );
}
