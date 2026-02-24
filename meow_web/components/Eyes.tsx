"use client";

import { useEffect, useState, useRef } from "react";

type Mood = "neutral" | "happy" | "very-happy" | "angry" | "serious" | "curious" | "sleeping" | "sad" | "blink";

interface CatEyesProps {
  baseMood?: Mood;
  /** 0 = far left edge, 1 = far right edge of viewport */
  catXFraction?: number | null;
}

export default function CatEyes({ baseMood = "neutral", catXFraction = null }: CatEyesProps) {
  const [currentMood, setCurrentMood] = useState<Mood>(baseMood);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [trackingOffset, setTrackingOffset] = useState({ x: 0, y: 0 });
  const trackingRef = useRef<NodeJS.Timeout | null>(null);
  const isCatTracking = catXFraction !== null;

  // Sync prop changes to state
  useEffect(() => {
    setCurrentMood((prev) => (prev === "blink" ? prev : baseMood));
  }, [baseMood]);

  // Refs for managing timeouts
  const blinkTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const moodTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Blinking Loop
  useEffect(() => {
    const blinkLoop = () => {
      const nextBlink = Math.random() * 4000 + 2000;

      blinkTimeoutRef.current = setTimeout(() => {
        const previousMood = currentMood;
        setCurrentMood("blink");

        setTimeout(() => {
          setCurrentMood(previousMood === "blink" ? "neutral" : previousMood);

          // Occasional double blink
          if (Math.random() < 0.1) {
            setTimeout(() => {
              setCurrentMood("blink");
              setTimeout(() => setCurrentMood(previousMood === "blink" ? "neutral" : previousMood), 150);
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
  }, [currentMood]);

  // Cat-Tracking Effect — smoothly follow the cat's X position
  useEffect(() => {
    if (catXFraction === null) {
      // Cat off screen — clear tracking, let normal movement resume
      setTrackingOffset({ x: 0, y: 0 });
      return;
    }

    // Map fraction [0..1] → offset [-38..38] px (looking left/right)
    const targetX = (catXFraction - 0.5) * 76;
    // Slight down-look because the cat is at the bottom
    const targetY = 15;

    // Ease toward target every 50ms
    if (trackingRef.current) clearTimeout(trackingRef.current);
    const ease = () => {
      setTrackingOffset((prev) => ({
        x: prev.x + (targetX - prev.x) * 0.18,
        y: prev.y + (targetY - prev.y) * 0.18,
      }));
      trackingRef.current = setTimeout(ease, 50);
    };
    ease();

    return () => {
      if (trackingRef.current) clearTimeout(trackingRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catXFraction]);

  // Eye Movement Loop (idle, suppressed while cat is visible)
  useEffect(() => {
    if (currentMood === "sleeping" || currentMood === "blink") return;
    if (isCatTracking) return; // eyes are busy following the cat

    const moveLoop = () => {
      const delay = Math.random() * 2000 + 1000;

      moveTimeoutRef.current = setTimeout(() => {
        const action = Math.random();

        // Simple left-right scanning
        if (action < 0.3) {
          const direction = Math.random() > 0.5 ? 30 : -30;
          setPupilOffset({ x: direction, y: 0 });
          setTimeout(() => setPupilOffset({ x: 0, y: 0 }), 800);
        }
        // Double scan (left then right or vice versa)
        else if (action < 0.6) {
          const firstDir = Math.random() > 0.5 ? 30 : -30;
          setPupilOffset({ x: firstDir, y: 0 });
          setTimeout(() => {
            setPupilOffset({ x: -firstDir, y: 0 });
            setTimeout(() => setPupilOffset({ x: 0, y: 0 }), 500);
          }, 700);
        }
        // Up/Down look
        else if (action < 0.8) {
          const verticalDir = Math.random() > 0.5 ? 20 : -20;
          setPupilOffset({ x: 0, y: verticalDir });
          setTimeout(() => setPupilOffset({ x: 0, y: 0 }), 800);
        }

        moveLoop();
      }, delay);
    };

    moveLoop();

    return () => {
      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
    };
  }, [currentMood, isCatTracking]);

  // Mood Change Loop
  useEffect(() => {
    const moodLoop = () => {
      const delay = Math.random() * 5000 + 3000; // Change mood every 3-8 seconds

      moodTimeoutRef.current = setTimeout(() => {
        const moods: Mood[] = ["neutral", "happy", "very-happy", "angry", "serious", "curious", "sleeping", "sad"];
        const newMood = moods[Math.floor(Math.random() * moods.length)];
        setCurrentMood(newMood);

        // If sleeping, wake up after a while
        if (newMood === "sleeping") {
          setTimeout(() => setCurrentMood("neutral"), 3000);
        }

        moodLoop();
      }, delay);
    };

    moodLoop();

    return () => {
      if (moodTimeoutRef.current) clearTimeout(moodTimeoutRef.current);
    };
  }, []);

  // Merge idle offset + cat-tracking offset (cat wins when present)
  const effectiveOffset = isCatTracking
    ? trackingOffset
    : pupilOffset;

  return (
    <div className="wrapper">
      <div className="eyes-container">
        <div className={`eye left ${currentMood}`}></div>
        <div className={`eye right ${currentMood}`}></div>
      </div>
      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .eyes-container {
          display: flex;
          gap: 30px;
          justify-content: center;
          align-items: center;
          height: 100px;
        }

        .eye {
          width: 90px;
          height: 90px;
          background: var(--eye-color);
          border: 1px solid var(--eye-border);
          border-radius: 20px;
          flex-shrink: 0;
          transition:
            transform 0.12s cubic-bezier(0.22, 1, 0.36, 1),
            height 0.4s cubic-bezier(0.22, 1, 0.36, 1),
            margin-top 0.4s cubic-bezier(0.22, 1, 0.36, 1),
            border-radius 0.4s cubic-bezier(0.22, 1, 0.36, 1),
            width 0.4s cubic-bezier(0.22, 1, 0.36, 1),
            clip-path 0.4s cubic-bezier(0.22, 1, 0.36, 1),
            background-color 0.3s ease,
            border-color 0.3s ease;
          position: relative;
          overflow: hidden;
          transform: translate(${effectiveOffset.x}px, ${effectiveOffset.y}px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        /* NEUTRAL / DEFAULT - Rounded squares */
        .eye.neutral {
          border-radius: 20px;
          height: 90px;
          margin-top: 0;
        }

        /* HAPPY / JOYFUL - Curved bottom (little squint) */
        .eye.happy {
          height: 60px;
          margin-top: 15px;
          border-radius: 50% 50% 20px 20px;
        }
        .eye.happy::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50%;
          background: var(--background);
          border-radius: 50% 50% 0 0;
          transition: background-color 0.3s ease;
        }

        /* VERY HAPPY - More curved/squinted */
        .eye.very-happy {
          height: 40px;
          margin-top: 25px;
          border-radius: 50% 50% 18px 18px;
          transform: scaleX(1.1) translate(${effectiveOffset.x}px, ${effectiveOffset.y}px);
        }
        .eye.very-happy::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 60%;
          background: var(--background);
          border-radius: 50% 50% 0 0;
          transition: background-color 0.3s ease;
        }

        /* ANGRY - Slanted inward polygonal shape from reference */
        .eye.angry {
          height: 80px;
          border-radius: 8px;
          margin-top: 0;
        }
        .eye.angry.left {
          clip-path: polygon(0% 0%, 100% 40%, 100% 100%, 0% 100%);
        }
        .eye.angry.right {
          clip-path: polygon(0% 40%, 100% 0%, 100% 100%, 0% 100%);
        }

        /* SERIOUS - Tighter, narrower angry eyes from reference */
        .eye.serious {
          height: 45px;
          border-radius: 6px;
          margin-top: 15px;
        }
        .eye.serious.left {
          clip-path: polygon(0% 10%, 100% 60%, 100% 100%, 0% 100%);
        }
        .eye.serious.right {
          clip-path: polygon(0% 60%, 100% 10%, 100% 100%, 0% 100%);
        }

        /* CURIOUS / SKEPTICAL - Asymmetrical from reference */
        .eye.curious {
          height: 70px;
          border-radius: 12px;
        }
        .eye.curious.left {
          /* Flat/Neutral look */
          height: 60px;
          margin-top: 10px;
        }
        .eye.curious.right {
          /* Slanted/Skeptical look */
          clip-path: polygon(0% 10%, 100% 45%, 100% 100%, 0% 100%);
          margin-top: 0px;
        }

        /* SLEEPING - Horizontal lines */
        .eye.sleeping {
          height: 6px;
          margin-top: 43px;
          border-radius: 3px;
          width: 80px;
          transform: translate(0, 0);
          opacity: 0.7;
        }

        /* SAD / CONCERNED - Droopy eyes (swapped polygon slant) */
        .eye.sad {
          height: 75px;
          border-radius: 15px;
          margin-top: 10px;
        }
        .eye.sad.left {
          clip-path: polygon(0% 40%, 100% 10%, 100% 100%, 0% 100%);
        }
        .eye.sad.right {
          clip-path: polygon(0% 10%, 100% 40%, 100% 100%, 0% 100%);
        }

        /* BLINK */
        .eye.blink {
          height: 4px;
          margin-top: 43px;
          border-radius: 2px;
          transform: translate(0, 0);
        }
        .eye.blink::before,
        .eye.blink::after {
          display: none;
        }
      `}</style>
    </div>
  );
}
