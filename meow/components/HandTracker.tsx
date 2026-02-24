"use client";

import { useEffect, useRef, useState } from "react";

interface HandTrackerProps {
  onWave: () => void;
  isGreeting?: boolean;
}

export default function HandTracker({ onWave, isGreeting }: HandTrackerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDetected, setIsDetected] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const waveCount = useRef(0);
  const lastWristX = useRef<number | null>(null);
  const lastWaveTime = useRef<number>(0);

  useEffect(() => {
    if (isCameraOff) {
      setIsDetected(false);
      return;
    }

    let hands: any = null;
    let cameraStream: MediaStream | null = null;
    let animationId: number = 0;
    let isMounted = true;

    async function setupTracking() {
      // @ts-ignore
      const { Hands } = await import("@mediapipe/hands");

      const handsInstance = new (Hands as any)({
        locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      handsInstance.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      const ctx = canvasRef.current?.getContext("2d");

      handsInstance.onResults((results: any) => {
        if (!isMounted || !ctx || !canvasRef.current) return;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
          setIsDetected(true);
          const landmarks = results.multiHandLandmarks[0];

          ctx.strokeStyle = "white";
          ctx.lineWidth = 4;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.shadowBlur = 15;
          ctx.shadowColor = "rgba(255, 255, 255, 0.5)";

          const connections = [
            [0, 1, 2, 3, 4], [0, 5, 6, 7, 8], [0, 9, 10, 11, 12],
            [0, 13, 14, 15, 16], [0, 17, 18, 19, 20], [5, 9, 13, 17, 0]
          ];

          connections.forEach(path => {
            ctx.beginPath();
            path.forEach((idx, i) => {
              const x = landmarks[idx].x * canvasRef.current!.width;
              const y = landmarks[idx].y * canvasRef.current!.height;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            });
            ctx.stroke();
          });

          ctx.fillStyle = "white";
          landmarks.forEach((p: any) => {
            ctx.beginPath();
            ctx.arc(p.x * canvasRef.current!.width, p.y * canvasRef.current!.height, 3, 0, Math.PI * 2);
            ctx.fill();
          });

          const wristX = landmarks[0].x;
          const now = Date.now();
          if (lastWristX.current !== null) {
            const deltaX = wristX - lastWristX.current;
            if (Math.abs(deltaX) > 0.05 && now - lastWaveTime.current > 100) {
              waveCount.current += 1;
              lastWaveTime.current = now;
              if (waveCount.current > 3) {
                onWave();
                waveCount.current = 0;
              }
            }
          }
          lastWristX.current = wristX;
        } else {
          setIsDetected(false);
          waveCount.current = 0;
        }
      });

      hands = handsInstance;

      try {
        cameraStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
          audio: false
        });

        if (videoRef.current && isMounted) {
          videoRef.current.srcObject = cameraStream;
          videoRef.current.play();

          const processFrame = async () => {
            if (isMounted && videoRef.current && hands) {
              if (videoRef.current.readyState >= 2) {
                await hands.send({ image: videoRef.current });
              }
              animationId = requestAnimationFrame(processFrame);
            }
          };
          processFrame();
        }
      } catch (err) {
        console.error("Camera access denied:", err);
        setCameraError(true);
      }
    }

    setupTracking();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationId);
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
      if (hands) {
        hands.close();
      }
    };
  }, [onWave, isCameraOff]);

  return (
    <div className="fixed right-10 bottom-10 w-80 flex flex-col items-end gap-3 z-50">
      <video ref={videoRef} className="hidden" playsInline autoPlay />

      <button
        onClick={() => setIsCameraOff(!isCameraOff)}
        className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all group backdrop-blur-md"
      >
        <div className={`w-1.5 h-1.5 rounded-full ${isCameraOff ? 'bg-red-500' : 'bg-green-500'} animate-pulse`} />
        <span className="text-[10px] text-white/50 group-hover:text-white/80 uppercase tracking-widest font-medium">
          {isCameraOff ? 'Turn Camera On' : 'Turn Camera Off'}
        </span>
      </button>

      <div className={`transition-all duration-500 pointer-events-none ${(isDetected || cameraError) && !isCameraOff ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
        <div className="h-[210px] w-full p-5 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col items-center justify-center animate-greeting-pop">
          {cameraError ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="text-white/70 text-xs font-semibold tracking-wide">
                CAMERA ACCESS NEEDED
              </div>
              <div className="text-white/30 text-[10px] mt-2">
                Enable camera permissions to use hand tracking
              </div>
            </div>
          ) : (
            <>
              <canvas
                ref={canvasRef}
                width={240}
                height={160}
                className="rounded-xl scale-x-[-1]"
              />

              <div className="text-[9px] text-white/40 uppercase tracking-[0.25em] mt-3 font-bold">
                Tracking Active
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

