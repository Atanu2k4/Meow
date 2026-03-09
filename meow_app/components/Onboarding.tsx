"use client";

import { useState, useEffect } from "react";

interface OnboardingProps {
    onComplete: () => void;
}

const steps = [
    {
        icon: "●",
        title: "Project Meow",
        description: "An advanced workstation companion designed to monitor and respond to your digital focus.",
    },
    {
        icon: "○",
        title: "Kinetic Link",
        description: "Local neural processing for hand-gesture recognition and proximity awareness.",
        detail: "PRIVACY_SECURED / NO_DATA_EGRESS",
    },
    {
        icon: "◌",
        title: "Focus Uplink",
        description: "Behavioral analysis based on active application states and work-cycle patterns.",
        detail: "REQUIRES_TRACKER_SUBSYSTEM",
    }
];

export default function Onboarding({ onComplete }: OnboardingProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setIsExiting(true);
            setTimeout(onComplete, 800);
        }
    };

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-1000 ${isVisible && !isExiting ? "opacity-100" : "opacity-0"}`}>

            {/* Background Texture/Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Scanning Line */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="w-full h-[1px] bg-white/20 absolute top-0 animate-scan" />
            </div>

            <div className="relative w-full max-w-2xl px-8">
                {/* Frame Corners */}
                <div className="absolute -top-12 -left-4 w-8 h-8 border-t-2 border-l-2 border-white/40" />
                <div className="absolute -top-12 -right-4 w-8 h-8 border-t-2 border-r-2 border-white/40" />
                <div className="absolute -bottom-12 -left-4 w-8 h-8 border-b-2 border-l-2 border-white/40" />
                <div className="absolute -bottom-12 -right-4 w-8 h-8 border-b-2 border-r-2 border-white/40" />

                <div className="flex flex-col gap-12">
                    {/* Header: System Status */}
                    <div className="flex justify-between items-end border-b border-white/10 pb-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-white/40 font-mono tracking-[0.3em] uppercase">Status: Initializing</span>
                            <div className="flex gap-1">
                                {steps.map((_, i) => (
                                    <div key={i} className={`h-1 transition-all duration-500 ${i <= currentStep ? "w-8 bg-white" : "w-4 bg-white/10"}`} />
                                ))}
                            </div>
                        </div>
                        <span className="text-[10px] text-white/40 font-mono tracking-widest uppercase">Step_0{currentStep + 1}</span>
                    </div>

                    {/* Main Content Area */}
                    <div key={currentStep} className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 items-start animate-fade-in-up">
                        {/* Large Icon/Symbol */}
                        <div className="aspect-square flex items-center justify-center border border-white/20 text-6xl font-light text-white bg-white/[0.02]">
                            {steps[currentStep].icon}
                        </div>

                        <div className="flex flex-col">
                            <h1 className="text-white text-5xl font-black tracking-tighter uppercase mb-4 leading-none">
                                {steps[currentStep].title}
                            </h1>
                            <p className="text-white/60 text-xl font-light leading-snug mb-8 max-w-md">
                                {steps[currentStep].description}
                            </p>

                            {steps[currentStep].detail && (
                                <div className="flex items-center gap-3">
                                    <div className="h-[1px] w-8 bg-white/20" />
                                    <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-mono">
                                        {steps[currentStep].detail}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer / Interaction */}
                    <div className="flex justify-between items-center pt-8 border-t border-white/5">
                        <div className="flex flex-col gap-1">
                            <span className="text-[8px] text-white/20 font-mono uppercase tracking-[0.5em]">System_Manifest_v1.0</span>
                            <span className="text-[8px] text-white/10 font-mono uppercase tracking-[0.5em]">Auth: Established_Secure</span>
                        </div>

                        <button
                            onClick={handleNext}
                            className="group relative px-10 py-4 bg-white hover:bg-black border border-white transition-all duration-500 active:scale-95"
                        >
                            <span className="text-black group-hover:text-white font-bold tracking-[0.3em] text-[11px] uppercase transition-colors duration-500">
                                {currentStep === steps.length - 1 ? "Initialize_System" : "Continue_Sequence"}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scan {
                    0% { top: -10%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 110%; opacity: 0; }
                }
                .animate-scan {
                    animation: scan 4s linear infinite;
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); filter: blur(10px); }
                    to { opacity: 1; transform: translateY(0); filter: blur(0px); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </div>
    );
}
