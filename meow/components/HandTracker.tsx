"use client";

import { useEffect, useRef, useState } from "react";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

export default function HandTracker({
  onWave,
}: {
  onWave: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lastX, setLastX] = useState<number | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    hands.onResults((results) => {
      if (results.multiHandLandmarks.length > 0) {
        const hand = results.multiHandLandmarks[0];

        // Landmark 0 = wrist
        const wristX = hand[0].x;

        if (lastX !== null) {
          const movement = Math.abs(wristX - lastX);

          if (movement > 0.1) {
            onWave(); // 👋 trigger
          }
        }

        setLastX(wristX);
      }
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await hands.send({ image: videoRef.current! });
      },
      width: 640,
      height: 480,
    });

    camera.start();

    return () => {
      camera.stop();
    };
  }, [lastX, onWave]);

  return (
    <video
      ref={videoRef}
      className="hidden"
      playsInline
      autoPlay
    />
  );
}
