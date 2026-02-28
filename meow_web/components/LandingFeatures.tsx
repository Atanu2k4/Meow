"use client";

import { motion } from "framer-motion";
import FlowingMenu from "./FlowingMenu";

const demoItems = [
    {
        link: '#',
        text: 'Smart Timer',
        image: 'https://images.unsplash.com/photo-1508921234172-b68ed335b3e6?auto=format&fit=crop&q=80&w=800',
        description: 'Optimized Pomodoro cycles that adjust to your brains peak focus windows, ensuring you stay in the flow without burnout.'
    },
    {
        link: '#',
        text: 'Focus Buddy',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
        description: 'A minimalist digital companion that monitors your activity real-time, providing subtle visual cues to help you regain concentration.'
    },
    {
        link: '#',
        text: 'Deep Analytics',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
        description: 'Comprehensive insights into your digital habits, visualizing where your time goes and identifying patterns for maximum productivity.'
    },
    {
        link: '#',
        text: 'Privacy First',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
        description: 'Built with a local-first architecture. Your browsing data and logs never touch the cloud, ensuring total sovereignty over your digital life.'
    }
];

export default function LandingFeatures() {
    return (
        <section className="py-32 px-6 relative overflow-hidden bg-background">
            {/* Decorative Label */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-[0.02] text-[15vw] font-black pointer-events-none select-none uppercase">
                Features
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-xl">
                        <h2
                            className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tighter"
                            style={{ fontFamily: "var(--font-pixel)" }}
                        >
                            CORE <br /> <span className="opacity-40">FEATURES</span>
                        </h2>
                        <p className="text-xl opacity-60 leading-relaxed">
                            Everything you need to stay focused, with a little cat-shaped motivation on the side.
                        </p>
                    </div>
                </div>

                <div className="h-[600px] relative border border-foreground/10 rounded-3xl overflow-hidden shadow-2xl">
                    <FlowingMenu
                        items={demoItems}
                        speed={20}
                        textColor="var(--foreground)"
                        bgColor="transparent"
                        marqueeBgColor="var(--foreground)"
                        marqueeTextColor="var(--background)"
                        borderColor="rgba(255,255,255,0.1)"
                    />
                </div>
            </div>
        </section>
    );
}
