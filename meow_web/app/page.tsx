"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import CatEyes from "@/components/Eyes";
import Timer from "@/components/Timer";
import { SettingsButton } from "@/components/SettingsButton";
// import WalkingCat from "@/components/WalkingCat";

type TimerState = "idle" | "running" | "paused";
type TimerMode = "countup" | "countdown";

export default function Home() {
  const [timerState, setTimerState] = useState<TimerState>("idle");
  const [mode, setMode] = useState<TimerMode>("countup");
  const [catXFraction, setCatXFraction] = useState<number | null>(null);

  const getMoodFromState = (state: TimerState) => {
    switch (state) {
      case "running": return "serious";
      case "paused": return "sleeping";
      default: return "neutral";
    }
  };

  const handleCatPosition = useCallback((xFrac: number) => {
    setCatXFraction(xFrac);
  }, []);

  const handleTimerComplete = useCallback(() => {
    // Session complete logic
    alert("Focus session complete! Take a break. 🐱");
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background text-foreground overflow-hidden transition-colors duration-500">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-foreground/[0.03] blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-foreground/[0.03] blur-[120px] animate-pulse [animation-delay:2s]" />
      </div>

      <SettingsButton />

      <main className="relative z-10 flex flex-col items-center justify-center -translate-y-8 w-full max-w-4xl px-6">
        <div className="flex flex-col items-center gap-16 w-full">
          <div className="flex flex-col items-center gap-6">
            <div className="px-4 py-1.5 rounded-full bg-foreground/[0.05] border border-foreground/[0.1] backdrop-blur-sm shadow-sm transition-all hover:bg-foreground/[0.08]">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">
                {timerState === "idle" ? "Ready to focus" : timerState === "running" ? "Deep Work" : "Resting"}
              </span>
            </div>

            <div className="transition-all duration-700 hover:scale-105 active:scale-95 cursor-pointer">
              <CatEyes
                baseMood={getMoodFromState(timerState)}
                catXFraction={catXFraction}
              />
            </div>
          </div>

          <Timer
            mode={mode}
            onModeChange={setMode}
            onStateChange={setTimerState}
            onComplete={handleTimerComplete}
          />
        </div>
      </main>

      <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="mode-toggle-wrapper px-1 py-1">
            <div className="mode-toggle relative flex w-[260px] h-[40px] bg-foreground/[0.03] border border-foreground/[0.08] backdrop-blur-md rounded-full">
              <motion.div
                className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-foreground rounded-full shadow-lg"
                animate={{ x: mode === "countup" ? 0 : "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <button
                className={`flex-1 relative z-10 text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 ${mode === "countup" ? "text-background" : "text-foreground opacity-50 hover:opacity-100"}`}
                onClick={() => setMode("countup")}
              >
                Count Up
              </button>
              <button
                className={`flex-1 relative z-10 text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 ${mode === "countdown" ? "text-background" : "text-foreground opacity-50 hover:opacity-100"}`}
                onClick={() => setMode("countdown")}
              >
                Count Down
              </button>
            </div>
          </div>

          <span className="text-[9px] tracking-[0.4em] uppercase font-bold opacity-20 pointer-events-none text-center">
            Meow Focus Companion
          </span>
        </div>
      </footer>

      {/* Walking cat lives at the bottom of the screen */}
      {/* <WalkingCat onPositionChange={handleCatPosition} /> */}

      <style jsx global>{`
        @keyframes bg-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .animate-pulse {
          animation: bg-pulse 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
