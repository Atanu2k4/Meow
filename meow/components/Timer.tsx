"use client";

import { useEffect, useRef, useState } from "react";

type TimerState = "idle" | "running" | "paused";

interface TimerProps {
  onStateChange?: (state: TimerState) => void;
}

export default function Timer({ onStateChange }: TimerProps) {
  const [time, setTime] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const start = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    onStateChange?.("running");
  };

  const pause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    onStateChange?.("paused");
  };

  const reset = () => {
    pause();
    setTime(0);
    onStateChange?.("idle");
  };

  const formatTime = (t: number): string => {
    const hrs = Math.floor(t / 3600);
    const mins = Math.floor((t % 3600) / 60);
    const secs = t % 60;

    return `${hrs} : ${String(mins).padStart(2, "0")} : ${String(secs).padStart(2, "0")}`;
  };

  if (!isMounted) return null;

  return (
    <div
      className="timer-container uppercase"
      style={{
        opacity: isMounted ? 1 : 0,
        transition: "opacity 1s ease 5s" // Delay until eyes are active
      }}
    >
      <h1 className="timer-display">{formatTime(time)}</h1>

      <div className="controls">
        <button onClick={start}>START</button>
        <button onClick={pause}>PAUSE</button>
        <button onClick={reset}>RESET</button>
      </div>

      <style jsx>{`
        .timer-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          margin-top: 20px;
        }

        .timer-display {
          color: white;
          font-size: 90px;
          font-weight: 200;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          letter-spacing: 2px;
          margin: 0;
          opacity: 0.9;
        }

        .controls {
          display: flex;
          gap: 15px;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .timer-container:hover .controls {
          opacity: 0.4;
        }

        button {
          background: transparent;
          border: 1px solid white;
          color: white;
          padding: 6px 18px;
          cursor: pointer;
          font-size: 10px;
          font-family: inherit;
          font-weight: bold;
          letter-spacing: 2px;
          border-radius: 2px;
          transition: all 0.2s ease;
        }

        button:hover {
          background: white;
          color: black;
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
