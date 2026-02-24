"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-[32px] p-8 shadow-2xl z-[101]"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-foreground/5 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-8">
                            {/* Theme Setting */}
                            <section>
                                <h3 className="text-xs uppercase tracking-[0.2em] font-bold opacity-40 mb-4 px-1">Appearance</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { id: 'light', icon: Sun, label: 'Light' },
                                        { id: 'dark', icon: Moon, label: 'Dark' },
                                        { id: 'system', icon: Monitor, label: 'System' }
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setTheme(item.id)}
                                            className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${theme === item.id
                                                    ? 'bg-foreground text-background border-foreground shadow-lg'
                                                    : 'bg-foreground/5 border-transparent hover:bg-foreground/10'
                                                }`}
                                        >
                                            <item.icon className="w-5 h-5" />
                                            <span className="text-xs font-bold uppercase tracking-wider">{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </section>

                            {/* Info Section */}
                            <section className="pt-4 border-t border-foreground/5">
                                <div className="flex flex-col gap-2 opacity-30 text-[10px] uppercase font-bold tracking-widest text-center">
                                    <span>Meow v1.0.0</span>
                                    <span>Designed for focus</span>
                                </div>
                            </section>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
