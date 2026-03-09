"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, History } from "lucide-react";
import { useSystemTracker } from "@/hooks/useSystemTracker";

export default function TabActivityTracker() {
  const { logTabActivity, stats, status } = useSystemTracker();
  const [extensionInstalled, setExtensionInstalled] = useState(false);

  // Fetch data from extension
  useEffect(() => {
    const requestData = () => {
      window.postMessage({ type: "MEOW_GET_DATA" }, "*");
    };

    // Request immediately and then every 10 seconds to sync new sessions
    requestData();
    const interval = setInterval(requestData, 10000);

    const handler = (event: MessageEvent) => {
      if (event.data.type === "MEOW_DATA_RESPONSE") {
        setExtensionInstalled(true);
        const sessions = event.data.payload.sessions || [];

        // Batch log all sessions for today
        sessions.forEach((s: any) => {
          logTabActivity(s.domain, s.title, s.duration, s.id);
        });
      }
    };

    window.addEventListener("message", handler);

    return () => {
      window.removeEventListener("message", handler);
      clearInterval(interval);
    };
  }, [logTabActivity]);

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Filter for tabs in the unified stats
  const recentTabs = stats.sessions
    .filter(s => s.type === 'tab')
    .slice(-5)
    .reverse();

  const tabTotals = Object.entries(stats.totals)
    .filter(([key]) => key.includes('.')) // Simple heuristic for domains
    .sort((a, b) => b[1].totalDuration - a[1].totalDuration);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-24 right-8 w-72 bg-foreground/[0.04] border border-foreground/[0.15] backdrop-blur-xl rounded-[2rem] p-6 flex flex-col gap-6 z-50 shadow-2xl"
    >
      {/* Tracker Status Indicator */}
      <div className="flex items-center justify-between">
        <span className="text-[9px] uppercase tracking-widest font-bold opacity-30">
          {status === 'connected' ? '🟢 Local Sync active' : '🔴 Sync offline'}
        </span>
      </div>

      {!extensionInstalled && (
        <div className="text-xs text-center opacity-50">
          Install Meow Extension to enable tracking
        </div>
      )}

      {/* Recent Sessions */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <History size={14} />
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
            Recent Tabs
          </h2>
        </div>

        <div className="flex flex-col gap-2 max-h-40 overflow-y-auto" data-lenis-prevent>
          {recentTabs.map((session, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-foreground/5"
            >
              <div className="flex justify-between text-xs opacity-50">
                <span>{session.domain}</span>
                <span>{formatDuration(session.duration)}</span>
              </div>
              <div className="text-xs font-bold truncate">
                {session.title}
              </div>
            </div>
          ))}
          {recentTabs.length === 0 && (
            <div className="text-[10px] opacity-20 text-center py-4">No data tracked yet</div>
          )}
        </div>
      </div>

      <div className="h-[1px] bg-foreground/10" />

      {/* Aggregated Totals */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock size={14} />
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
            Website Usage
          </h2>
        </div>

        <div className="flex flex-col gap-2 max-h-40 overflow-y-auto" data-lenis-prevent>
          {tabTotals.map(([domain, data]) => (
            <div
              key={domain}
              className="p-3 rounded-xl bg-foreground/5 flex justify-between text-xs"
            >
              <span className="truncate">{domain}</span>
              <span className="font-bold">
                {formatDuration(data.totalDuration)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}