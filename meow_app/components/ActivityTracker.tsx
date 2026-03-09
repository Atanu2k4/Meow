"use client";

import { useEffect, useState } from "react";
import { useSystemTracker } from "../hooks/useSystemTracker";

export default function ActivityTracker() {
  const { currentApp, status, stats } = useSystemTracker();

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? `${hrs}h ` : ""}${mins}m ${secs}s`;
  };

  const totalTime = Object.values(stats.totals).reduce((acc, curr) => acc + curr.totalDuration, 0);

  return (
    <div className="fixed right-10 top-10 w-80 pointer-events-none">
      <div className="h-[210px] p-5 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-4 animate-greeting-pop">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${status === "connected"
                ? "bg-green-400 animate-pulse"
                : "bg-red-400"
              }`} />
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.25em]">
              Unified Monitor
            </span>
          </div>
          <span className="text-[7px] text-white/20 font-mono tracking-widest uppercase">
            LOCAL DATA SYNC
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 flex-1 justify-center">
          {currentApp ? (
            <div className="space-y-4">
              <div>
                <label className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-bold block mb-1">
                  Active Scope
                </label>
                <div className="text-white text-[15px] font-light tracking-tight truncate">
                  {currentApp.app}
                </div>
              </div>

              <div>
                <label className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-bold block mb-1">
                  Header
                </label>
                <div className="text-white/60 text-[11px] font-light italic line-clamp-2">
                  "{currentApp.title}"
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/5 border-t-white/40 rounded-full animate-spin" />
              <span className="text-[9px] text-white/20 uppercase tracking-[0.2em]">
                {status === 'connected' ? 'Waiting for Activity...' : 'Connecting to Sidecar...'}
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/5 text-[8px] text-white/10 font-mono flex justify-between uppercase tracking-widest italic">
          <span>{formatDuration(totalTime)} TODAY</span>
          <span>SECURE LOCAL</span>
        </div>
      </div>
    </div>
  );
}