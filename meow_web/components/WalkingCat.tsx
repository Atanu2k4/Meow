"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface WalkingCatProps {
    /** Called each frame with the cat's X position in viewport-fraction [0..1] */
    onPositionChange?: (xFraction: number) => void;
}

const CAT_WALK_DURATION_MS = 22000; // how long it takes to cross the screen

export default function WalkingCat({ onPositionChange }: WalkingCatProps) {
    const [catX, setCatX] = useState(-180);          // pixel position from left
    const [direction, setDirection] = useState<"right" | "left">("right");
    const [isWalking, setIsWalking] = useState(true);
    const [tailWag, setTailWag] = useState(0);
    const [legPhase, setLegPhase] = useState(0);
    const animFrameRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number | null>(null);
    const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
    const CAT_WIDTH = 160;

    const tick = useCallback(
        (timestamp: number) => {
            if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
            const delta = timestamp - lastTimeRef.current;
            lastTimeRef.current = timestamp;

            const speed = (screenWidth + CAT_WIDTH * 2) / CAT_WALK_DURATION_MS; // px per ms

            setCatX((prev) => {
                let next = prev + (direction === "right" ? speed * delta : -speed * delta);

                // Notify parent of fractional position
                const frac = (next + CAT_WIDTH / 2) / (screenWidth + CAT_WIDTH);
                onPositionChange?.(Math.max(0, Math.min(1, frac)));

                // Turn around at edges
                if (next > screenWidth + CAT_WIDTH / 2) {
                    setDirection("left");
                    setIsWalking(false);
                    // Brief pause before heading back
                    pauseTimerRef.current = setTimeout(() => setIsWalking(true), 800);
                    return screenWidth + CAT_WIDTH / 2;
                }
                if (next < -CAT_WIDTH / 2) {
                    setDirection("right");
                    setIsWalking(false);
                    pauseTimerRef.current = setTimeout(() => setIsWalking(true), 800);
                    return -CAT_WIDTH / 2;
                }

                return next;
            });

            setTailWag((t) => t + delta * 0.004);
            setLegPhase((l) => l + delta * 0.006);

            animFrameRef.current = requestAnimationFrame(tick);
        },
        [direction, onPositionChange, screenWidth]
    );

    useEffect(() => {
        if (isWalking) {
            lastTimeRef.current = null;
            animFrameRef.current = requestAnimationFrame(tick);
        } else {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        }
        return () => {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, [isWalking, tick]);

    useEffect(() => {
        return () => {
            if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
        };
    }, []);

    // Leg animation values (sine-based alternating legs)
    const legA = Math.sin(legPhase) * 14;           // front legs
    const legB = Math.sin(legPhase + Math.PI) * 14; // back legs
    const tailAngle = Math.sin(tailWag) * 35;

    // Body bob
    const bodyBob = isWalking ? Math.abs(Math.sin(legPhase)) * 3 : 0;

    const flipX = direction === "left" ? "scaleX(-1)" : "scaleX(1)";

    return (
        <>
            {/* ----- Walking Cat ----- */}
            <div
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: catX,
                    zIndex: 50,
                    transform: flipX,
                    transformOrigin: "center bottom",
                    willChange: "transform, left",
                }}
            >
                {/* Small rug / mat under cat */}
                <div
                    style={{
                        position: "absolute",
                        bottom: -2,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 120,
                        height: 18,
                        background:
                            "repeating-linear-gradient(90deg, #111 0px, #111 12px, #444 12px, #444 24px, #888 24px, #888 36px, #444 36px, #444 48px)",
                        borderRadius: "5px 5px 0 0",
                        boxShadow: "0 -2px 8px rgba(0,0,0,0.6)",
                        opacity: 0.9,
                    }}
                />

                {/* Cat SVG */}
                <svg
                    width="160"
                    height="130"
                    viewBox="0 0 160 130"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ display: "block", transform: `translateY(${bodyBob}px)` }}
                >
                    {/* ===== TAIL ===== */}
                    <g
                        style={{
                            transformOrigin: "42px 85px",
                            transform: `rotate(${tailAngle}deg)`,
                            transition: "transform 0.05s linear",
                        }}
                    >
                        <path
                            d="M42 85 Q18 60 22 40 Q24 30 34 35"
                            stroke="#ccc"
                            strokeWidth="9"
                            strokeLinecap="round"
                            fill="none"
                        />
                        {/* Tail tip */}
                        <circle cx="34" cy="35" r="8" fill="white" />
                    </g>

                    {/* ===== BACK LEGS ===== */}
                    <g style={{ transform: `translateY(${legB}px)` }}>
                        {/* Back left leg */}
                        <rect x="52" y="98" width="14" height="28" rx="6" fill="#bbb" />
                        <ellipse cx="59" cy="126" rx="10" ry="6" fill="#999" />
                    </g>
                    <g style={{ transform: `translateY(${-legB}px)` }}>
                        {/* Back right leg */}
                        <rect x="70" y="98" width="14" height="28" rx="6" fill="#aaa" />
                        <ellipse cx="77" cy="126" rx="10" ry="6" fill="#999" />
                    </g>

                    {/* ===== BODY ===== */}
                    <ellipse cx="80" cy="88" rx="42" ry="30" fill="#d4d4d4" />
                    {/* Belly patch */}
                    <ellipse cx="85" cy="94" rx="22" ry="16" fill="white" opacity="0.6" />
                    {/* Stripe markings */}
                    <path d="M60 75 Q65 70 70 75" stroke="#888" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M62 82 Q68 77 74 82" stroke="#888" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M90 72 Q96 68 100 73" stroke="#888" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                    {/* ===== FRONT LEGS ===== */}
                    <g style={{ transform: `translateY(${legA}px)` }}>
                        {/* Front left */}
                        <rect x="95" y="100" width="14" height="26" rx="6" fill="#d4d4d4" />
                        <ellipse cx="102" cy="126" rx="10" ry="6" fill="#aaa" />
                    </g>
                    <g style={{ transform: `translateY(${-legA}px)` }}>
                        {/* Front right */}
                        <rect x="112" y="100" width="14" height="26" rx="6" fill="#bbb" />
                        <ellipse cx="119" cy="126" rx="10" ry="6" fill="#999" />
                    </g>

                    {/* ===== HEAD ===== */}
                    <ellipse cx="115" cy="65" rx="30" ry="28" fill="#d4d4d4" />
                    {/* Head stripe */}
                    <path d="M108 48 Q115 43 122 48" stroke="#888" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M104 55 Q108 51 114 54" stroke="#888" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    <path d="M116 54 Q122 51 126 55" stroke="#888" strokeWidth="1.8" strokeLinecap="round" fill="none" />

                    {/* ===== EARS ===== */}
                    {/* Left ear */}
                    <polygon points="92,50 100,28 108,50" fill="#d4d4d4" />
                    <polygon points="95,49 100,33 106,49" fill="#bbb" opacity="0.8" />
                    {/* Right ear */}
                    <polygon points="120,48 128,26 136,48" fill="#d4d4d4" />
                    <polygon points="122,47 128,30 134,47" fill="#bbb" opacity="0.8" />

                    {/* ===== FACE ===== */}
                    {/* Eyes */}
                    <ellipse cx="108" cy="66" rx="6" ry="6.5" fill="#111" />
                    <ellipse cx="122" cy="66" rx="6" ry="6.5" fill="#111" />
                    {/* Eye shine */}
                    <circle cx="110" cy="64" r="2" fill="white" />
                    <circle cx="124" cy="64" r="2" fill="white" />
                    {/* Iris */}
                    <ellipse cx="108" cy="67" rx="2.5" ry="4" fill="#555" />
                    <ellipse cx="122" cy="67" rx="2.5" ry="4" fill="#555" />
                    {/* Pupil slit */}
                    <ellipse cx="108" cy="67" rx="1" ry="3.5" fill="#000" />
                    <ellipse cx="122" cy="67" rx="1" ry="3.5" fill="#000" />

                    {/* Nose */}
                    <polygon points="115,74 112,77 118,77" fill="#888" />
                    {/* Mouth */}
                    <path d="M112 77 Q115 80 118 77" stroke="#555" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    {/* Whiskers */}
                    <line x1="88" y1="71" x2="107" y2="73" stroke="white" strokeWidth="1" opacity="0.7" />
                    <line x1="88" y1="75" x2="107" y2="75" stroke="white" strokeWidth="1" opacity="0.7" />
                    <line x1="88" y1="79" x2="107" y2="77" stroke="white" strokeWidth="1" opacity="0.7" />
                    <line x1="123" y1="73" x2="144" y2="71" stroke="white" strokeWidth="1" opacity="0.7" />
                    <line x1="123" y1="75" x2="144" y2="75" stroke="white" strokeWidth="1" opacity="0.7" />
                    <line x1="123" y1="77" x2="144" y2="79" stroke="white" strokeWidth="1" opacity="0.7" />
                </svg>
            </div>

            {/* Paw-print trail (decorative) */}
            <style>{`
        @keyframes pawFade {
          0%   { opacity: 0.5; transform: scale(1); }
          100% { opacity: 0;   transform: scale(0.7); }
        }
      `}</style>
        </>
    );
}
