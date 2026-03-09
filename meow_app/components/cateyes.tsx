"use client";

import { useEffect, useState, useRef } from "react";

type Mood = "normal" | "happy" | "angry" | "sad" | "surprised" | "blink" | "squint" | "narrow" | "annoyed" | "curious" | "sleeping" | "waving";

interface CatEyesProps {
  baseMood: "normal" | "happy" | "angry" | "waving" | "surprised";
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
    // Don't interrupt a manual wave with base mood changes
    setCurrentMood((prev) => (prev === "blink" || prev === "waving" ? prev : baseMood));
    if (currentMood !== "waving") setRotation(0); // Reset rotation on mood change, unless waving
  }, [baseMood, phase, currentMood]);

  // Handle specific wave trigger from parent
  useEffect(() => {
    if (baseMood === "waving") {
      setCurrentMood("waving");
      const timer = setTimeout(() => {
        setCurrentMood(phase === "active" ? "normal" : baseMood); // Revert to normal or baseMood after waving
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [baseMood, phase]);

  // 1. Independent Blink Loop (Human-like timing)
  useEffect(() => {
    if (phase !== "active" || currentMood === "waving") return; // Pause blink loop if waving

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

  // 2. Behavioral Overhaul (Flapping moods, complex scanning, and thinking)
  useEffect(() => {
    if (phase !== "active" || currentMood === "waving") return; // Pause behavior loop if waving

    const behaviorLoop = () => {
      const delay = Math.random() * 2000 + 1000; // Faster intervals for more life

      behaviorTimeoutRef.current = setTimeout(() => {
        const action = Math.random();

        // A. Complex Eye Movements (50% chance)
        if (action < 0.45) { // Adjusted probability slightly to make room for other behaviors
          const subAction = Math.random();

          // 1. Double Scan (left then right)
          if (subAction < 0.25) {
            const firstDir = Math.random() > 0.5 ? 30 : -30;
            setPupilOffset({ x: firstDir, y: 0 });
            setTimeout(() => {
              setPupilOffset({ x: -firstDir, y: 0 });
              setTimeout(() => setPupilOffset({ x: 0, y: 0 }), 500);
            }, 700);
          }
          // 2. Wide Scan (extreme outer edges)
          else if (subAction < 0.45) {
            setPupilOffset({ x: -35, y: 5 });
            setTimeout(() => {
              setPupilOffset({ x: 35, y: -5 });
              setTimeout(() => setPupilOffset({ x: 0, y: 0 }), 800);
            }, 1000);
          }
          // 3. Upward Thinking Look
          else if (subAction < 0.65) {
            const side = Math.random() > 0.5 ? 20 : -20;
            setPupilOffset({ x: side, y: -30 });
            setTimeout(() => setPupilOffset({ x: 0, y: 0 }), 1200);
          }
          // 4. Subtle Vertical Shift (Noodling)
          else if (subAction < 0.8) {
            setPupilOffset({ x: 0, y: 20 });
            setTimeout(() => setPupilOffset({ x: 0, y: 0 }), 400);
          }
          // 5. High-Frequency Jitter (Excitement)
          else {
            const rx = (Math.random() - 0.5) * 40;
            const ry = (Math.random() - 0.5) * 20;
            setPupilOffset({ x: rx, y: ry });
            setTimeout(() => {
              setPupilOffset({ x: -rx / 2, y: -ry / 2 });
              setTimeout(() => setPupilOffset({ x: 0, y: 0 }), 200);
            }, 200);
          }
        }

        // B. Dynamic Fluctuation (Returning to normal or trying variations)
        else if (action < 0.8) {
          const variation = Math.random();

          if (baseMood === "happy") {
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
            if (variation < 0.35) {
              setCurrentMood("curious");
              setRotation(variation < 0.17 ? 15 : -15);
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
  }, [baseMood, phase, currentMood]);

  if (!isMounted) return null;

  return (
    <div
      className={`eyes-container relative transition-all duration-300 ${currentMood === "waving" ? "waving-face" : ""}`}
      style={{
        transform: currentMood === "waving" ? undefined : `rotate(${rotation}deg) translateY(${phase === "active" ? "-5px" : "0px"})`,
        animation: currentMood === "waving" ? 'wave-body 0.5s ease-in-out infinite' : (phase === "active" ? 'float-container 4s ease-in-out infinite' : 'none')
      }}
    >
      {/* Greeting Text */}
      <div
        className={`greeting ${phase === "greeting" ? "visible" : ""}`}
        style={{ opacity: phase === "greeting" ? 1 : 0 }}
      >
        Hi I'm Meow !!
      </div>

      <div className={`eye left ${currentMood === "waving" ? "happy" : currentMood} ${phase === "greeting" ? "hidden-eye" : ""}`}></div>
      <div className={`eye right ${currentMood === "waving" ? "happy" : currentMood} ${phase === "greeting" ? "hidden-eye" : ""}`}></div>

      {/* Waving Hands */}
      <div className={`hands-container ${currentMood === "waving" ? "visible" : ""}`}>
        <div className="cat-hand left-hand"></div>
        <div className="cat-hand right-hand"></div>
      </div>

      {/* Exclamation Mark for Angry Mood */}
      {phase === "active" && (
        <div className={`exclamation ${baseMood === "angry" || currentMood === "angry" ? "visible" : ""}`}>
          !
        </div>
      )}

      <style jsx>{`
        @keyframes float-container {
          0%, 100% { transform: rotate(${rotation}deg) translateY(-5px); }
          50% { transform: rotate(${rotation}deg) translateY(5px); }
        }

        @keyframes wave-body {
          0%, 100% { transform: rotate(-5deg) translateX(-5px); }
          50% { transform: rotate(5deg) translateX(5px); }
        }

        @keyframes hand-wave-left {
          0%, 100% { transform: rotate(-20deg) translateY(0); }
          50% { transform: rotate(-40deg) translateY(-15px); }
        }

        @keyframes hand-wave-right {
          0%, 100% { transform: rotate(20deg) translateY(0); }
          50% { transform: rotate(40deg) translateY(-15px); }
        }

        .hands-container {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .hands-container.visible {
          opacity: 1;
        }

        .cat-hand {
          position: absolute;
          width: 44px;
          height: 34px;
          background: white;
          border-radius: 22px 22px 14px 14px;
          bottom: -45px;
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.15);
          filter: blur(0.3px);
        }

        .left-hand {
          left: -20px;
          animation: hand-wave-left 0.5s ease-in-out infinite;
        }

        .right-hand {
          right: -20px;
          animation: hand-wave-right 0.5s ease-in-out infinite;
        }

        .eyes-container {
          display: flex;
          gap: 30px;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
          position: relative;
          height: 100px;
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

        @keyframes float {
          0%, 100% { transform: translate(${pupilOffset.x}px, ${pupilOffset.y}px); }
          50% { transform: translate(${pupilOffset.x}px, ${pupilOffset.y}px) translateY(-3px); }
        }

        .eye {
          width: 90px;
          height: 90px;
          background: white;
          border-radius: 20px;
          transition: 
            all 0.4s cubic-bezier(0.19, 1, 0.22, 1),
            clip-path 0.4s cubic-bezier(0.19, 1, 0.22, 1);
          position: relative;
          overflow: hidden;
          opacity: 1;
          transform: translate(${pupilOffset.x}px, ${pupilOffset.y}px);
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
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

        /* ANGRY: Slanted inward (Polygonal) */
        .angry { height: 80px; border-radius: 8px; }
        .angry.left {
          clip-path: polygon(0% 0%, 100% 40%, 100% 100%, 0% 100%);
        }
        .angry.right {
          clip-path: polygon(0% 40%, 100% 0%, 100% 100%, 0% 100%);
        }

        /* NARROW (Serious variant from reference) */
        .narrow { height: 45px; border-radius: 6px; margin-top: 25px; }
        .narrow.left {
          clip-path: polygon(0% 10%, 100% 60%, 100% 100%, 0% 100%);
        }
        .narrow.right {
          clip-path: polygon(0% 60%, 100% 10%, 100% 100%, 0% 100%);
        }

        /* SAD: Droopy eyes (Polygonal) */
        .sad {
          height: 75px;
          border-radius: 15px;
          margin-top: 10px;
        }
        .sad.left {
          clip-path: polygon(0% 40%, 100% 10%, 100% 100%, 0% 100%);
        }
        .sad.right {
          clip-path: polygon(0% 10%, 100% 40%, 100% 100%, 0% 100%);
        }

        /* ANNOYED: Flat top, squinting from top */
        .annoyed {
          height: 45px;
          border-radius: 4px 4px 18px 18px;
          margin-top: 22px;
        }

        /* CURIOUS: Asymmetrical skeptical look */
        .curious {
          border-radius: 12px;
        }
        .curious.left {
          height: 60px;
          margin-top: 20px;
        }
        .curious.right {
          height: 70px;
          clip-path: polygon(0% 10%, 100% 45%, 100% 100%, 0% 100%);
          margin-top: 10px;
        }

        /* SLEEPING: Just a tiny line at the bottom */
        .sleeping {
          height: 6px !important;
          margin-top: 60px;
          border-radius: 3px;
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
