"use client";

import * as React from "react";
import { Settings } from "lucide-react";
import { SettingsModal } from "./SettingsModal";

export function SettingsButton() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-6 right-6 p-3 rounded-full bg-foreground/[0.05] dark:bg-foreground/[0.05] backdrop-blur-md border border-foreground/10 shadow-lg hover:scale-110 active:scale-95 transition-all z-50 group"
                aria-label="Open settings"
            >
                <Settings className="w-5 h-5 text-foreground opacity-70 group-hover:opacity-100 transition-all group-hover:rotate-90 duration-500" />
            </button>

            <SettingsModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}
