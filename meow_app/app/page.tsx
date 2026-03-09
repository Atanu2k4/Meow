"use client";

import { useState, useEffect } from "react";
import CatEyes from "../components/cateyes";
import Timer from "../components/Timer";
import HandTracker from "../components/HandTracker";
import ActivityTracker from "../components/ActivityTracker";
import ActivityHistory from "../components/ActivityHistory";
import Onboarding from "../components/Onboarding";
import MeowVoice from "../components/MeowVoice";

type Mood = "normal" | "happy" | "angry" | "surprised";

export default function Home() {
  const [mood, setMood] = useState<Mood>("normal");
  const [isWaving, setIsWaving] = useState(false);
  const [showWidgets, setShowWidgets] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("meow_onboarding_seen");
    if (hasSeen) setShowOnboarding(false);

    const savedShowWidgets = localStorage.getItem("meow_widgets_visible");
    if (savedShowWidgets !== null) setShowWidgets(savedShowWidgets === "true");
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem("meow_onboarding_seen", "true");
    setShowOnboarding(false);
  };

  const toggleWidgets = () => {
    const nextShow = !showWidgets;
    setShowWidgets(nextShow);
    localStorage.setItem("meow_widgets_visible", String(nextShow));
  };

  // 🎯 TIMER → mood
  const handleTimerStateChange = (state: "idle" | "running" | "paused") => {
    if (isWaving) return; // 👈 don't override waving

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

  // 👋 HAND WAVE → highest priority
  const handleWave = () => {
    setIsWaving(true);
    setMood("happy");

    setTimeout(() => {
      setIsWaving(false);
      setMood("normal");
    }, 2000);
  };

  // 💻 ACTIVITY → smart mood
  const handleActivity = (activity: { app: string; title: string }) => {
    if (isWaving) return; // 👈 don't override waving

    const app = activity.app.toLowerCase();
    const title = activity.title.toLowerCase();

    if (app.includes("code")) {
      setMood("happy"); // coding = good 😼
    } else if (title.includes("youtube")) {
      setMood("angry"); // distraction 😾
    } else {
      setMood("normal");
    }
  };

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#000] overflow-hidden">
      <div className="flex flex-col items-center gap-24">

        {/* 👁️ CAT + GREETING */}
        <div className="relative">
          {isWaving && (
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 z-50">
              <div className="flex flex-col items-center gap-2 animate-greeting-pop">
                <div className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  <span className="text-white font-medium tracking-[0.2em] text-sm whitespace-nowrap">
                    GREETINGS !!
                  </span>
                </div>
                <span className="text-4xl animate-wave-emoji">👋</span>
              </div>
            </div>
          )}

          <CatEyes baseMood={mood} />
        </div>

        {/* ⏱️ TIMER */}
        <Timer onStateChange={handleTimerStateChange} />

        {/* 🎙️ VOICE INTERACTION */}
        <MeowVoice
          onListeningStart={() => {
            setIsListening(true);
            setMood("surprised");
          }}
          onListeningEnd={() => {
            setIsListening(false);
            setMood("normal");
          }}
        />
      </div>

      {/* WIDGETS LAYER */}
      <div className={`transition-all duration-700 ${showWidgets ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* 👋 HAND TRACKING */}
        <HandTracker onWave={handleWave} />

        {/* 💻 ACTIVITY TRACKING (Fixed Positioned) */}
        <ActivityTracker onActivity={handleActivity} />

        {/* 📊 ACTIVITY HISTORY (Left Side) */}
        <ActivityHistory />
      </div>

      {/* UI CONTROLS */}
      <div className="fixed left-8 top-8 flex flex-col gap-4 z-50">
        {/* ⚙️ RE-ONBOARDING TRIGGER */}
        <button
          onClick={() => setShowOnboarding(true)}
          className="p-3 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md opacity-20 hover:opacity-100 hover:bg-white/10 transition-all duration-500 group flex items-center gap-2"
          title="View Onboarding"
        >
          <div className="text-[10px] text-white/40 group-hover:text-white font-mono tracking-widest uppercase px-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400/40 group-hover:bg-blue-400 transition-colors" />
            RECALL_INTERFACE
          </div>
        </button>

        {/* 🤖 AI TOGGLE BUTTON (Hide/Unhide Widgets) */}
        <button
          onClick={toggleWidgets}
          className={`p-3 rounded-full border backdrop-blur-md transition-all duration-500 group flex items-center gap-2 ${showWidgets
            ? 'bg-blue-400/10 border-blue-400/30 opacity-60 hover:opacity-100 hover:bg-blue-400/20'
            : 'bg-white/[0.03] border-white/10 opacity-40 hover:opacity-100 hover:bg-white/10'
            }`}
          title={showWidgets ? "Hide Widgets" : "Show Widgets"}
        >
          <div className="text-[10px] text-white/40 group-hover:text-white font-mono tracking-widest uppercase px-2 flex items-center gap-2">
            <div className={`relative w-2 h-2`}>
              <span className={`absolute inset-0 rounded-full ${showWidgets ? 'bg-blue-400 animate-ping opacity-75' : 'bg-white/20'}`} />
              <span className={`relative block w-2 h-2 rounded-full ${showWidgets ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]' : 'bg-white/40'}`} />
            </div>
            <span className="bg-white/10 px-1 rounded text-[8px] font-bold">AI</span>
            {showWidgets ? 'WIDGETS_ENABLED' : 'WIDGETS_HIDDEN'}
          </div>
        </button>
      </div>
    </main>

  );
}