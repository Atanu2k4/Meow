"use client";

import { useState, useEffect, useCallback } from "react";

export interface ActivityData {
    app?: string;
    domain?: string;
    title: string;
    timestamp: string;
    duration: number;
    type: 'app' | 'tab';
}

export interface ActivityStats {
    sessions: ActivityData[];
    totals: Record<string, { totalDuration: number; visits: number }>;
}

export function useSystemTracker() {
    const [status, setStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
    const [currentApp, setCurrentApp] = useState<{ app: string; title: string } | null>(null);
    const [stats, setStats] = useState<ActivityStats>({ sessions: [], totals: {} });
    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        // Use 127.0.0.1 instead of localhost for better compatibility on hosted sites
        const socket = new WebSocket('ws://127.0.0.1:5263');

        socket.onopen = () => {
            setStatus('connected');
            console.log("✅ Connected to Meow System Tracker");
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === 'init' || data.type === 'stats') {
                setStats(data.data);
            } else if (data.type === 'update') {
                setCurrentApp({ app: data.app, title: data.title });
            }
        };

        socket.onerror = () => {
            setStatus('error');
        };

        socket.onclose = () => {
            setStatus('connecting');
            // Reconnect logic
            setTimeout(() => {
                // This will trigger the effect again
            }, 3000);
        };

        setWs(socket);

        return () => {
            socket.close();
        };
    }, []);

    const logTabActivity = useCallback((domain: string, title: string, duration: number, id?: number) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
                type: 'TAB_LOG',
                domain,
                title,
                duration,
                id
            }));
        }
    }, [ws]);

    return { status, currentApp, stats, logTabActivity };
}
