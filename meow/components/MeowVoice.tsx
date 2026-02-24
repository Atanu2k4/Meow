"use client";

import { useRef, useState } from "react";
import { AI_CONFIG } from "../app/ai-config";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface MeowVoiceProps {
    onListeningStart?: () => void;
    onListeningEnd?: () => void;
}

export default function MeowVoice({ onListeningStart, onListeningEnd }: MeowVoiceProps) {
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [meowReply, setMeowReply] = useState("");

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const synthesisRef = useRef<SpeechSynthesis | null>(null);

    if (typeof window !== "undefined" && !synthesisRef.current) {
        synthesisRef.current = window.speechSynthesis;
    }

    const speak = (text: string) => {
        if (!synthesisRef.current) return;
        synthesisRef.current.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = 1.4;
        utterance.rate = 1.0;
        synthesisRef.current.speak(utterance);
    };

    const processAudioWithGemini = async (audioBlob: Blob) => {
        setIsProcessing(true);
        setTranscript("Processing your voice...");

        try {
            // Force v1 stable API instead of v1beta to avoid 404 errors
            const genAI = new GoogleGenerativeAI(AI_CONFIG.apiKey);
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
            }, { apiVersion: "v1" });

            // Convert audio blob to base64
            const arrayBuffer = await audioBlob.arrayBuffer();
            const audioBase64 = Buffer.from(arrayBuffer).toString("base64");
            const mimeType = audioBlob.type || "audio/webm";

            const historyJson = localStorage.getItem("meow_activity_history") || "[]";

            const prompt = `
                ${AI_CONFIG.systemPrompt}

                The following is a base64-encoded audio clip of the user speaking to you.
                First, transcribe what they said. Then reply as Meow based on:
                - Productivity history: ${historyJson}

                Rules:
                - First line: "HEARD: [what user said]"  
                - Second line onwards: Your reply as Meow (max 2 sentences).
                - Be sassy, fun, and cat-like.
            `;

            const result = await model.generateContent([
                prompt,
                {
                    inlineData: {
                        mimeType: mimeType,
                        data: audioBase64,
                    },
                },
            ]);

            const response = result.response.text();
            console.log("MEOW RESPONSE:", response);

            // Parse out the "HEARD:" line and the actual reply
            const lines = response.split("\n").filter(l => l.trim());
            const heardLine = lines.find(l => l.includes("HEARD:"));
            const replyLines = lines.filter(l => !l.includes("HEARD:"));

            if (heardLine) {
                setTranscript(heardLine.replace("HEARD:", "").trim());
            }

            const reply = replyLines.join(" ").trim();
            setMeowReply(reply);
            speak(reply);

            // Stop listening if user asked
            if (transcript.toLowerCase().includes("stop listening") ||
                transcript.toLowerCase().includes("go to sleep")) {
                handleToggle();
            }

        } catch (error: any) {
            console.error("Gemini Audio Error:", error);
            const errMsg = "My brain is glitching. Check the API key or try again!";
            setMeowReply(errMsg);
            speak(errMsg);
        } finally {
            setIsProcessing(false);
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    audioChunksRef.current.push(e.data);
                }
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
                stream.getTracks().forEach(t => t.stop());
                await processAudioWithGemini(audioBlob);
            };

            mediaRecorder.start();
            mediaRecorderRef.current = mediaRecorder;

            setIsListening(true);
            setMeowReply("");
            setTranscript("Listening... speak now! 🎙️");
            if (onListeningStart) onListeningStart();

        } catch (err: any) {
            console.error("Mic error:", err);
            speak("I can't access your microphone. Please check your system permissions.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
        }
        setIsListening(false);
        if (onListeningEnd) onListeningEnd();
    };

    const handleToggle = () => {
        if (!AI_CONFIG.apiKey || AI_CONFIG.apiKey === "YOUR_GEMINI_API_KEY_HERE") {
            speak("Human, I don't have a brain yet! Add your API key to the config file.");
            setTranscript("Open meow/app/ai-config.ts and add your API key.");
            return;
        }

        if (isListening) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    return (
        <div className="fixed right-[180px] bottom-10 z-[60] flex flex-col items-end gap-3 transition-all duration-500">

            {/* Status Bubble */}
            {(isListening || isProcessing || meowReply) && (
                <div className="px-5 py-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-2xl shadow-2xl animate-greeting-pop min-w-[220px] max-w-[340px]">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex gap-1 h-3 items-center">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className={`w-1 rounded-full ${isProcessing ? 'bg-purple-400' : 'bg-blue-400'}`}
                                    style={{
                                        height: isListening || isProcessing ? `${4 + (i * 2)}px` : '4px',
                                        opacity: 0.5 + (i * 0.1),
                                        animation: isListening || isProcessing ? `voice-wave 0.8s ease-in-out ${i * 0.1}s infinite` : 'none',
                                    }}
                                />
                            ))}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isProcessing ? 'text-purple-400' : isListening ? 'text-blue-400' : 'text-green-400'}`}>
                            {isProcessing ? '🧠 Thinking...' : isListening ? '🎙️ Recording...' : '🐱 Meow says:'}
                        </span>
                    </div>

                    {/* Transcript / Reply */}
                    {transcript && !meowReply && (
                        <p className="text-white/70 text-[11px] italic leading-relaxed">
                            {transcript}
                        </p>
                    )}
                    {meowReply && (
                        <p className="text-white text-[12px] font-medium leading-relaxed">
                            "{meowReply}"
                        </p>
                    )}
                </div>
            )}

            {/* Mic Button */}
            <button
                onClick={handleToggle}
                disabled={isProcessing}
                className={`pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 group backdrop-blur-md shadow-2xl border ${isListening
                    ? 'bg-red-500/20 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                    : isProcessing
                        ? 'bg-purple-500/20 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
            >
                <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-400 animate-pulse shadow-[0_0_10px_rgba(239,68,68,1)]'
                    : isProcessing ? 'bg-purple-400 animate-pulse'
                        : 'bg-white/20'
                    }`} />
                <span className={`text-[11px] uppercase tracking-widest font-bold flex items-center gap-2 ${isListening ? 'text-red-400'
                    : isProcessing ? 'text-purple-400'
                        : 'text-white/40 group-hover:text-white/80'
                    }`}>
                    <svg className={`w-3.5 h-3.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    {isListening ? 'Stop & Send' : isProcessing ? 'Brain Active' : 'Talk to Meow'}
                </span>
            </button>

            <style jsx>{`
                @keyframes voice-wave {
                    0%, 100% { transform: scaleY(0.5); }
                    50% { transform: scaleY(1.5); }
                }
            `}</style>
        </div>
    );
}
