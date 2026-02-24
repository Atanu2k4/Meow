"use client";

import { useEffect, useState } from "react";

type HistoryItem = {
    app: string;
    duration: number; // in seconds
};

export default function ActivityHistory() {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        const loadHistory = () => {
            const saved = localStorage.getItem("meow_activity_history");
            if (saved) {
                setHistory(JSON.parse(saved));
            }
        };

        loadHistory();
        // Refresh every 5 seconds to show updated durations
        const interval = setInterval(loadHistory, 5000);
        return () => clearInterval(interval);
    }, []);

    const formatDuration = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs > 0 ? `${hrs}h ` : ""}${mins}m ${secs}s`;
    };

    return (
        <div className="fixed left-10 top-1/2 -translate-y-1/2 w-[320px] h-[440px] pointer-events-none">
            <div className="h-full p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-6 animate-greeting-pop">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                        <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.25em]">
                            Session Analytics
                        </span>
                    </div>
                    <span className="text-[8px] text-white/20 font-mono tracking-widest uppercase">LOG_ARCHIVE</span>
                </div>

                {/* Scrollable History List */}
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {history.length > 0 ? (
                        <div className="space-y-4">
                            {history
                                .sort((a, b) => b.duration - a.duration)
                                .map((item, idx) => (
                                    <div key={idx} className="group border-b border-white/[0.02] pb-3 last:border-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-white/80 text-[13px] font-medium truncate max-w-[180px]">
                                                {item.app}
                                            </span>
                                            <span className="text-blue-400/80 font-mono text-[10px] mt-1">
                                                {formatDuration(item.duration)}
                                            </span>
                                        </div>
                                        <div className="w-full bg-white/5 h-[2px] rounded-full overflow-hidden mt-2">
                                            <div
                                                className="bg-blue-400 h-full transition-all duration-1000"
                                                style={{ width: `${Math.min((item.duration / 3600) * 100, 100)}%` }} // Percent of 1 hour for bar
                                            />
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center gap-3 opacity-20">
                            <div className="text-[32px]">📜</div>
                            <span className="text-[9px] uppercase tracking-widest text-center">No cached session data found</span>
                        </div>
                    )}
                </div>

                {/* Total Time Footer */}
                <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center text-[9px] text-white/20 uppercase tracking-widest font-mono italic">
                    <span>Total Focus</span>
                    <span className="text-white/40">
                        {formatDuration(history.reduce((acc, curr) => acc + curr.duration, 0))}
                    </span>
                </div>
            </div>
        </div>
    );
}
