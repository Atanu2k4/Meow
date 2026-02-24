"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TimerState = "idle" | "running" | "paused";

interface TimerProps {
  onStateChange?: (state: TimerState) => void;
}

export default function Timer({ onStateChange }: TimerProps) {
  const [time, setTime] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);
  const [timerState, setTimerState] = useState<TimerState>("idle");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const start = () => {
    if (intervalRef.current) return;

    setTimerState("running");
    onStateChange?.("running");

    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
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
    setTime(0);
    // Auto-start after a tiny delay for the "restart" feel
    setTimeout(() => start(), 100);
  };

  const reset = () => {
    pause();
    setTime(0);
    setTimerState("idle");
    onStateChange?.("idle");
  };

  const formatTime = (t: number) => {
    const hrs = Math.floor(t / 3600);
    const mins = Math.floor((t % 3600) / 60);
    const secs = t % 60;

    return {
      h: hrs,
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
      transition={{ duration: 1, delay: 0.5 }}
      className="timer-container"
    >
      {/* Digital Display */}
      <div className="display-wrapper">
        <span className="digit">{formatted.h}</span>
        <span className="separator">:</span>
        <span className="digit">{formatted.m}</span>
        <span className="separator">:</span>
        <span className="digit">{formatted.s}</span>
      </div>

      {/* Controls */}
      <div className="controls-layer">
        <AnimatePresence mode="wait">
          {timerState !== "running" ? (
            <motion.button
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,1)", color: "#000" }}
              whileTap={{ scale: 0.95 }}
              onClick={start}
              className="control-btn primary"
            >
              START
            </motion.button>
          ) : (
            <motion.button
              key="pause"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,1)", color: "#000" }}
              whileTap={{ scale: 0.95 }}
              onClick={pause}
              className="control-btn"
            >
              PAUSE
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05, opacity: 1 }}
          whileTap={{ scale: 0.95 }}
          onClick={restart}
          className="control-btn secondary"
        >
          RESTART
        </motion.button>
      </div>

      <style jsx>{`
        .timer-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          margin-top: -20px;
          padding: 40px;
          border-radius: 40px;
          background: radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%);
        }

        .display-wrapper {
          display: flex;
          align-items: center;
          gap: 20px;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          color: white;
          font-weight: 200;
          font-size: 80px;
          line-height: 1;
          letter-spacing: -2px;
          text-shadow: 0 0 40px rgba(255,255,255,0.1);
        }

        .digit {
          min-width: 1.2ch;
          text-align: center;
        }

        .separator {
          opacity: 0.3;
          margin-top: -5px;
          font-size: 0.8em;
          animation: pulse 2s infinite ease-in-out;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.4; }
        }

        .controls-layer {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .control-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.6);
          padding: 12px 32px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 3px;
          border-radius: 100px;
          cursor: pointer;
          backdrop-blur: 10px;
          transition: border-color 0.3s ease, color 0.3s ease;
        }

        .control-btn.primary {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
          color: white;
        }

        .control-btn:hover {
          border-color: rgba(255,255,255,0.5);
        }

        .control-btn.secondary {
          font-size: 9px;
          opacity: 0.4;
        }
      `}</style>
    </motion.div>
  );
}
