"use client";

import { useEffect, useState, useRef } from "react";

type Mood = "normal" | "happy" | "angry" | "sad" | "surprised" | "blink" | "squint" | "narrow" | "annoyed" | "curious" | "sleeping";

interface CatEyesProps {
  baseMood: "normal" | "happy" | "angry";
}

export default function CatEyes({ baseMood }: CatEyesProps) {
  const [currentMood, setCurrentMood] = useState<Mood>(baseMood);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [phase, setPhase] = useState<"initial" | "greeting" | "active">("initial");
  const [isMounted, setIsMounted] = useState(false);

  // Handle Mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Refs for managing timeouts to avoid collisions/leaks
  const blinkTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const behaviorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle Animation Sequence
  useEffect(() => {
    if (!isMounted) return;

    // 1. Show eyes for 2s (Phase: initial)
    const timer1 = setTimeout(() => {
      setPhase("greeting");
    }, 2000);

    // 2. Show greeting for 3s (Phase: greeting)
    // Total wait: 2s + 3s = 5s
    const timer2 = setTimeout(() => {
      setPhase("active");
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isMounted]);

  // Sync prop changes to state (base mood changes)
  useEffect(() => {
    if (phase !== "active") return;
    setCurrentMood((prev) => (prev === "blink" ? prev : baseMood));
    setRotation(0); // Reset rotation on mood change
  }, [baseMood, phase]);

  // 1. Independent Blink Loop (Human-like timing)
  useEffect(() => {
    if (phase !== "active") return;

    const blinkLoop = () => {
      const nextBlink = Math.random() * 4000 + 2000;

      blinkTimeoutRef.current = setTimeout(() => {
        const prevMoodBeforeBlink = currentMood;
        setCurrentMood("blink");

        setTimeout(() => {
          setCurrentMood(prevMoodBeforeBlink === "blink" ? baseMood : prevMoodBeforeBlink);

          if (Math.random() < 0.1) {
            setTimeout(() => {
              setCurrentMood("blink");
              setTimeout(() => setCurrentMood(prevMoodBeforeBlink), 150);
            }, 100);
          }

          blinkLoop();
        }, 150);
      }, nextBlink);
    };

    blinkLoop();

    return () => {
      if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current);
    };
  }, [baseMood, phase, currentMood]);

  // 2. Behavioral Overhaul (Flapping moods, curious tilts, etc.)
  useEffect(() => {
    if (phase !== "active") return;

    const behaviorLoop = () => {
      const delay = Math.random() * 3000 + 2000;

      behaviorTimeoutRef.current = setTimeout(() => {
        const action = Math.random();

        // A. Look Around (30% chance)
        if (action < 0.3) {
          const xOffset = Math.random() > 0.5 ? 20 : -20;
          const yOffset = Math.random() * 10 - 5;
          setPupilOffset({ x: xOffset, y: yOffset });
          setTimeout(() => setPupilOffset({ x: 0, y: 0 }), 800);
        }

        // B. Dynamic Fluctuation (Returning to normal or trying variations)
        else if (action < 0.7) {
          const variation = Math.random();

          if (baseMood === "happy") {
            // Sometimes go back to normal even when running (as requested)
            if (variation < 0.4) {
              setCurrentMood("normal");
              setTimeout(() => setCurrentMood("happy"), 2000);
            } else if (variation < 0.7) {
              setCurrentMood("squint");
              setTimeout(() => setCurrentMood("happy"), 1500);
            } else {
              setCurrentMood("surprised");
              setTimeout(() => setCurrentMood("happy"), 800);
            }
          }

          else if (baseMood === "normal") {
            if (variation < 0.3) {
              setCurrentMood("curious");
              setRotation(variation < 0.15 ? 12 : -12);
              setTimeout(() => { setCurrentMood("normal"); setRotation(0); }, 1500);
            } else if (variation < 0.5) {
              setCurrentMood("annoyed");
              setTimeout(() => setCurrentMood("normal"), 2000);
            } else if (variation < 0.6) {
              setCurrentMood("sleeping");
              setTimeout(() => setCurrentMood("normal"), 3000);
            }
          }

          else if (baseMood === "angry") {
            if (variation < 0.5) {
              setCurrentMood("narrow");
              setTimeout(() => setCurrentMood("angry"), 1500);
            }
          }
        }

        behaviorLoop();
      }, delay);
    };

    behaviorLoop();
    return () => {
      if (behaviorTimeoutRef.current) clearTimeout(behaviorTimeoutRef.current);
    };
  }, [baseMood, phase]);

  if (!isMounted) return null;

  return (
    <div className="eyes-container relative" style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
      {/* Greeting Text */}
      <div
        className={`greeting ${phase === "greeting" ? "visible" : ""}`}
        style={{ opacity: phase === "greeting" ? 1 : 0 }}
      >
        Hi I'm Meow !!
      </div>

      <div className={`eye left ${currentMood} ${phase === "greeting" ? "hidden-eye" : ""}`}></div>
      <div className={`eye right ${currentMood} ${phase === "greeting" ? "hidden-eye" : ""}`}></div>

      {/* Exclamation Mark for Angry Mood */}
      {phase === "active" && (
        <div className={`exclamation ${baseMood === "angry" || currentMood === "angry" ? "visible" : ""}`}>
          !
        </div>
      )}

      <style jsx>{`
        .eyes-container {
          display: flex;
          gap: 30px;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
          position: relative;
          min-height: 100px;
        }

        .greeting {
          position: absolute;
          font-family: var(--font-geist-sans), system-ui, -apple-system, sans-serif;
          font-size: 36px;
          font-weight: 300;
          color: white;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.9s cubic-bezier(0.22, 1, 0.36, 1);
          letter-spacing: -0.04em;
          white-space: nowrap;
          pointer-events: none;
        }

        .greeting.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .exclamation {
          position: absolute;
          top: -60px;
          /* Center over right eye: Center is 50%, Gap/2 is 15px, Eye/2 is 45px. Total offset = 60px */
          left: calc(50% + 60px);
          transform: translateX(-50%) rotate(10deg);
          font-size: 60px;
          font-weight: 900;
          color: white;
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          font-family: system-ui, -apple-system, sans-serif;
        }
        
        .exclamation.visible {
          opacity: 1;
          top: -90px;
          transform: translateX(-50%) rotate(15deg) scale(1.2);
        }

        .eye {
          width: 90px;
          height: 90px;
          background: white;
          border-radius: 18px;
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
          opacity: 1;
          transform: translate(${pupilOffset.x}px, ${pupilOffset.y}px) scale(1);
        }

        .hidden-eye {
          opacity: 0;
          transform: translate(0, 20px) scale(0.5);
          pointer-events: none;
        }
        
        .eye.blink {
           transform: translate(0, 0) !important;
        }

        /* NORMAL: Rounded Squares */
        .normal { border-radius: 18px; height: 90px; }

        /* HAPPY: More realistic "Squint" - Inverted U shape essentially */
        .happy {
          border-radius: 18px;
          height: 50px; /* Squashed height */
          margin-top: 20px; /* Align center */
          /* Create the arch using clip-path or border-radius */
          border-radius: 50% 50% 12px 12px; /* Arched top */
          transform: scaleX(1.1); /* Slightly wider */
        }
        
        /* Simulating the cheek pushing up for a smile */
        .happy::after {
          content: "";
          position: absolute;
          bottom: 0; 
          left: 0; 
          width: 100%; 
          height: 40%;
          background: black;
          border-radius: 50% 50% 0 0; /* Cheek curve */
        }

        /* SQUINT (Extra Happy) */
        .squint {
          border-radius: 50% 50% 12px 12px;
          height: 30px;
          margin-top: 40px;
          transform: scaleX(1.15);
        }
        .squint::after {
          content: "";
          position: absolute;
          bottom: 0; left: 0; width: 100%; height: 50%;
          background: black;
          border-radius: 50% 50% 0 0;
        }

        /* ANGRY: Slanted inward */
        .angry { height: 80px; border-radius: 12px; }
        .angry.left { transform: rotate(-15deg) translate(${pupilOffset.x}px, ${pupilOffset.y}px); }
        .angry.right { transform: rotate(15deg) translate(${pupilOffset.x}px, ${pupilOffset.y}px); }
        .angry::before {
          content: "";
          position: absolute;
          top: -20px; left: -20px; right: -20px; height: 50px;
          background: black;
          transform: rotate(10deg);
        }
        .angry.right::before { transform: rotate(-10deg); }

        /* NARROW (Suspicious Angry) */
        .narrow { height: 50px; border-radius: 8px; }
        .narrow.left { transform: rotate(-15deg) translate(${pupilOffset.x}px, ${pupilOffset.y}px); }
        .narrow.right { transform: rotate(15deg) translate(${pupilOffset.x}px, ${pupilOffset.y}px); }
        .narrow::before {
          content: "";
          position: absolute;
          top: -20px; left: -20px; right: -20px; height: 50px;
          background: black;
          transform: rotate(10deg);
        }
        .narrow.right::before { transform: rotate(-10deg); }

        /* SAD: Droopy eyes */
        .sad {
          border-radius: 40% 40% 20% 20%;
          height: 70px;
          margin-top: 10px;
        }
        .sad::after {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 30%;
          background: rgba(0,0,0,0.1);
        }

        /* ANNOYED: Flat top, squinting from top */
        .annoyed {
          height: 45px;
          border-radius: 4px 4px 18px 18px;
          margin-top: 22px;
        }

        /* CURIOUS: Slightly larger and rounder */
        .curious {
          border-radius: 35%;
          width: 95px;
          height: 95px;
        }

        /* SLEEPING: Just a tiny line at the bottom */
        .sleeping {
          height: 4px !important;
          margin-top: 60px;
          border-radius: 2px;
          width: 80px !important;
          opacity: 0.6;
        }

        /* SURPRISED: Perfect Circles */
        .surprised {
          border-radius: 50%;
          width: 100px; height: 100px;
          transform: scale(1.1);
        }

        /* BLINK */
        .blink {
          height: 4px !important;
          margin-top: 43px;
          border-radius: 2px;
          width: 90px !important;
        }
        .blink::before, .blink::after { display: none; }
      `}</style>
    </div>
  );
}
