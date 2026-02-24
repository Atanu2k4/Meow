"use client";

import { useEffect, useState, useRef } from "react";

type Activity = {
  app: string;
  title: string;
};

export default function ActivityTracker({
  onActivity,
}: {
  onActivity?: (activity: Activity) => void;
}) {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [status, setStatus] = useState<"connecting" | "connected" | "disconnected">("connecting");

  // Tracking logic refs
  const lastActiveApp = useRef<string | null>(null);
  const startTime = useRef<number>(Date.now());

  const saveDuration = () => {
    if (!lastActiveApp.current) return;

    const duration = Math.floor((Date.now() - startTime.current) / 1000);
    if (duration < 1) return;

    const saved = localStorage.getItem("meow_activity_history");
    let history = saved ? JSON.parse(saved) : [];

    const existingIdx = history.findIndex((h: any) => h.app === lastActiveApp.current);
    if (existingIdx > -1) {
      history[existingIdx].duration += duration;
    } else {
      history.push({ app: lastActiveApp.current, duration });
    }

    localStorage.setItem("meow_activity_history", JSON.stringify(history));
    startTime.current = Date.now();
  };

  useEffect(() => {
    // @ts-ignore
    if (typeof window !== "undefined" && window.electronAPI) {
      setStatus("connected");

      // @ts-ignore
      window.electronAPI.onActivity((data: Activity) => {
        // Save previous app duration
        if (data.app !== lastActiveApp.current) {
          saveDuration();
          lastActiveApp.current = data.app;
          startTime.current = Date.now();
        }

        setActivity(data);
        if (onActivity) onActivity(data);
      });
    } else {
      console.warn("Not running inside Electron");
      setStatus("disconnected");
    }

    const interval = setInterval(saveDuration, 5000);

    return () => {
      clearInterval(interval);
      saveDuration();
    };
  }, []);

  return (
    <div className="fixed right-10 top-10 w-80 pointer-events-none">
      <div className="h-[210px] p-5 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-4 animate-greeting-pop">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              status === "connected"
                ? "bg-green-400 animate-pulse"
                : "bg-red-400"
            }`} />
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.25em]">
              Activity Monitor
            </span>
          </div>
          <span className="text-[7px] text-white/20 font-mono tracking-widest uppercase">
            Electron Live
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 flex-1 justify-center">
          {activity ? (
            <div className="space-y-4">
              <div>
                <label className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-bold block mb-1">
                  Active Scope
                </label>
                <div className="text-white text-[15px] font-light tracking-tight truncate">
                  {activity.app}
                </div>
              </div>

              <div>
                <label className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-bold block mb-1">
                  Header
                </label>
                <div className="text-white/60 text-[11px] font-light italic line-clamp-2">
                  "{activity.title}"
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/5 border-t-white/40 rounded-full animate-spin" />
              <span className="text-[9px] text-white/20 uppercase tracking-[0.2em]">
                Syncing Uplink...
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/5 text-[8px] text-white/10 font-mono flex justify-between uppercase tracking-widest italic">
          <span>{status.toUpperCase()}</span>
          <span>LOCAL IPC</span>
        </div>
      </div>
    </div>
  );
}