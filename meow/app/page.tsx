"use client";

import { useState } from "react";
import CatEyes from "../components/cateyes";
import Timer from "../components/Timer";

export default function Home() {
  const [mood, setMood] = useState<"normal" | "happy" | "angry">("normal");

  const handleTimerStateChange = (state: "idle" | "running" | "paused") => {
    switch (state) {
      case "idle":
        setMood("normal");
        break;
      case "running":
        setMood("happy");
        break;
      case "paused":
        setMood("angry");
        break;
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#000] overflow-hidden">
      <div className="flex flex-col items-center gap-12">
        <CatEyes baseMood={mood} />
        <Timer onStateChange={handleTimerStateChange} />
      </div>
    </main>
  );
}
