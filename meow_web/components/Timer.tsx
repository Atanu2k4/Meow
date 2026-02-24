"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TimerState = "idle" | "running" | "paused";
type TimerMode = "countup" | "countdown";

interface TimerProps {
    mode: TimerMode;
    onModeChange: (mode: TimerMode) => void;
    onStateChange?: (state: TimerState) => void;
    onComplete?: () => void;
}

// Larger Minimal SVG Icons
const PlayIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
    </svg>
);

const PauseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="4" width="3" height="16" fill="currentColor" />
        <rect x="15" y="4" width="3" height="16" fill="currentColor" />
    </svg>
);

const RestartIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
    </svg>
);

export default function Timer({
    mode,
    onModeChange,
    onStateChange,
    onComplete
}: TimerProps) {
    const [time, setTime] = useState<number>(0);
    const [isMounted, setIsMounted] = useState(false);
    const [timerState, setTimerState] = useState<TimerState>("idle");
    const [duration, setDuration] = useState<number>(1500); // Default 25m
    const [customMinutes, setCustomMinutes] = useState<string>("25");
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Sync time when mode changes
    useEffect(() => {
        if (timerState === "idle") {
            if (mode === "countup") {
                setTime(0);
            } else {
                setTime(duration);
            }
        }
    }, [mode, duration, timerState]);

    // Clear interval on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const start = () => {
        if (timerState === "running") return;

        // If countdown and at 0, reset to duration or don't start
        if (mode === "countdown" && time === 0) {
            if (duration > 0) {
                setTime(duration);
            } else {
                return;
            }
        }

        setTimerState("running");
        onStateChange?.("running");

        intervalRef.current = setInterval(() => {
            setTime((prev) => {
                if (mode === "countup") {
                    return prev + 1;
                } else {
                    if (prev <= 1) {
                        // Timer finished
                        if (intervalRef.current) {
                            clearInterval(intervalRef.current);
                            intervalRef.current = null;
                        }
                        setTimerState("idle");
                        onStateChange?.("idle");
                        onComplete?.();
                        return 0;
                    }
                    return prev - 1;
                }
            });
        }, 1000);
    };

    const pause = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setTimerState("paused");
        onStateChange?.("paused");
    };

    const restart = () => {
        pause();
        if (mode === "countup") {
            setTime(0);
        } else {
            setTime(duration);
        }
        setTimerState("idle");
        onStateChange?.("idle");
    };

    const setCountdownDuration = (mins: number) => {
        pause();
        const secs = mins * 60;
        setDuration(secs);
        setTime(secs);
        if (mode !== "countdown") onModeChange("countdown");
    };

    const handleCustomSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const mins = parseInt(customMinutes);
        if (!isNaN(mins) && mins > 0) {
            setCountdownDuration(mins);
        }
    };

    const formatTime = (t: number) => {
        const hrs = Math.floor(t / 3600);
        const mins = Math.floor((t % 3600) / 60);
        const secs = t % 60;

        return {
            h: hrs > 0 ? String(hrs) : null,
            m: String(mins).padStart(2, "0"),
            s: String(secs).padStart(2, "0")
        };
    };

    const formatted = formatTime(time);

    if (!isMounted) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="timer-container"
        >
            <div className="settings-layer">
                <AnimatePresence mode="wait">
                    {mode === "countdown" && (
                        <motion.div
                            key="countdown-settings"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="duration-presets-wrapper"
                        >
                            <div className="duration-presets">
                                {[25, 45, 60].map((m) => (
                                    <button
                                        key={m}
                                        className={`preset-btn ${duration === m * 60 ? "selected" : ""}`}
                                        onClick={() => setCountdownDuration(m)}
                                    >
                                        {m}m
                                    </button>
                                ))}
                                <form onSubmit={handleCustomSubmit} className="custom-input-form">
                                    <div className="custom-input-wrapper">
                                        <input
                                            type="text"
                                            value={customMinutes}
                                            onChange={(e) => setCustomMinutes(e.target.value)}
                                            placeholder="Min"
                                            className="custom-input"
                                        />
                                        <button type="submit" className="custom-submit-btn">Set</button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="display-wrapper">
                {formatted.h && (
                    <>
                        <span className="digit">{formatted.h}</span>
                        <span className="separator">:</span>
                    </>
                )}
                <span className="digit">{formatted.m}</span>
                <span className="separator">:</span>
                <span className="digit">{formatted.s}</span>
            </div>

            <div className="controls-layer">
                <AnimatePresence mode="wait">
                    {timerState !== "running" ? (
                        <motion.button
                            key="play-btn"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={start}
                            className="icon-btn"
                            aria-label="Start"
                        >
                            <PlayIcon />
                        </motion.button>
                    ) : (
                        <motion.button
                            key="pause-btn"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={pause}
                            className="icon-btn active"
                            aria-label="Pause"
                        >
                            <PauseIcon />
                        </motion.button>
                    )}
                </AnimatePresence>

                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05, rotate: -30 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={restart}
                    className="icon-btn secondary"
                    aria-label="Restart"
                >
                    <RestartIcon />
                </motion.button>
            </div>

            <style jsx>{`
        .timer-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 60px;
          user-select: none;
          max-width: 600px;
          width: 100%;
        }

        .settings-layer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          width: 100%;
        }

        .mode-toggle-wrapper {
            padding: 2px;
            background: rgba(var(--foreground-rgb), 0.03);
            border-radius: 40px;
            border: 1px solid rgba(var(--foreground-rgb), 0.08);
            backdrop-filter: blur(8px);
        }

        .mode-toggle {
          display: flex;
          position: relative;
          width: 280px;
          height: 44px;
        }

        .mode-indicator {
            position: absolute;
            top: 2px;
            left: 2px;
            width: calc(50% - 2px);
            height: calc(100% - 4px);
            background: var(--foreground);
            border-radius: 38px;
            z-index: 0;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .mode-btn {
          flex: 1;
          border-radius: 38px;
          border: none;
          background: transparent;
          color: var(--foreground);
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .mode-btn.active {
          color: var(--background);
        }

        .mode-btn:not(.active) {
            opacity: 0.6;
        }
        
        .mode-btn:not(.active):hover {
            opacity: 1;
        }

        .duration-presets-wrapper {
            overflow: hidden;
            width: 100%;
        }

        .duration-presets {
          display: flex;
          gap: 12px;
          align-items: center;
          justify-content: center;
          padding: 4px 0;
        }

        .preset-btn {
          padding: 8px 16px;
          border-radius: 12px;
          border: 1px solid rgba(var(--foreground-rgb), 0.1);
          background: rgba(var(--foreground-rgb), 0.02);
          color: var(--foreground);
          font-family: 'Pixelify Sans', var(--font-pixel);
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .preset-btn:hover {
          background: rgba(var(--foreground-rgb), 0.05);
          border-color: rgba(var(--foreground-rgb), 0.3);
          transform: translateY(-2px);
        }

        .preset-btn.selected {
          border-color: var(--foreground);
          background: var(--foreground);
          color: var(--background);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .custom-input-form {
          display: flex;
          align-items: center;
          margin-left: 8px;
        }

        .custom-input-wrapper {
            display: flex;
            align-items: center;
            background: rgba(var(--foreground-rgb), 0.03);
            border: 1px solid rgba(var(--foreground-rgb), 0.1);
            border-radius: 12px;
            padding: 2px;
            transition: all 0.2s ease;
        }

        .custom-input-wrapper:focus-within {
            border-color: var(--foreground);
            background: transparent;
            box-shadow: 0 0 0 2px rgba(var(--foreground-rgb), 0.05);
        }

        .custom-input {
          width: 50px;
          padding: 6px 8px;
          border: none;
          background: transparent;
          color: var(--foreground);
          font-family: 'Pixelify Sans', var(--font-pixel);
          font-size: 15px;
          text-align: center;
          outline: none;
        }

        .custom-submit-btn {
          padding: 6px 12px;
          border-radius: 9px;
          border: none;
          background: var(--foreground);
          color: var(--background);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .custom-submit-btn:hover {
          filter: brightness(1.2);
        }

        .display-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Pixelify Sans', var(--font-pixel);
          color: var(--foreground);
          font-weight: 500;
          font-size: clamp(60px, 15vw, 130px);
          line-height: 1;
          letter-spacing: -2px;
          transition: color 0.3s ease;
          pointer-events: none;
          user-select: none;
          margin: 10px 0;
        }

        .digit {
          min-width: 1.1ch;
          text-align: center;
          font-variant-numeric: tabular-nums;
        }

        .separator {
          opacity: 0.3;
          margin-top: -4px;
        }

        .controls-layer {
          display: flex;
          gap: 32px;
          align-items: center;
          justify-content: center;
          min-height: 80px;
        }

        .icon-btn {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: 2px solid var(--foreground);
          background: var(--foreground);
          color: var(--background);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .icon-btn.secondary {
          background: transparent;
          color: var(--foreground);
          opacity: 0.4;
          border: 1px solid rgba(var(--foreground-rgb), 0.2);
          box-shadow: none;
          width: 60px;
          height: 60px;
        }

        .icon-btn.secondary:hover {
          opacity: 1;
          background: rgba(var(--foreground-rgb), 0.05);
          border-color: var(--foreground);
        }

        .icon-btn:not(.secondary):hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
          filter: brightness(1.1);
        }

        .icon-btn:active {
            transform: translateY(0);
        }

        @media (max-width: 640px) {
          .timer-container {
            gap: 40px;
          }
          .controls-layer {
            gap: 20px;
          }
          .icon-btn {
            width: 60px;
            height: 60px;
          }
          .icon-btn.secondary {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
        </motion.div>
    );
}
