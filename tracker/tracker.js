#!/usr/bin/env node

const activeWin = require("active-win");
const WebSocket = require("ws");
const express = require("express");
const cors = require("cors");
const { logSession, logTab, getStats, clearDB } = require("./database");

const PORT = 5263;
const app = express();
app.use(cors());

// REST endpoint for initial data sync
app.get("/stats", async (req, res) => {
    res.json(await getStats());
});

// Endpoint to clear data
app.post("/clear", async (req, res) => {
    await clearDB();
    res.json({ success: true });
});

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🐾 MEOW BACKEND ACTIVE`);
    console.log(`🟢 Listening on: http://127.0.0.1:${PORT}`);
    console.log(`🔗 Connect your Dashboard to this local backend.\n`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`\n⚠️  Port ${PORT} is already in use.`);
        console.log(`💡 Meow is likely already running in the background.\n`);
        process.exit(0);
    } else {
        console.error('❌ Server error:', err);
    }
});

const wss = new WebSocket.Server({ server });

let lastApp = null;
let lastTitle = null;
let startTime = Date.now();

// ═══════════════════════════════════════════════════
//  MASTER CLOCK (Timer Sync)
// ═══════════════════════════════════════════════════
const masterTimer = {
    seconds: 0,
    isPaused: true,
    mode: 'stopwatch',
    pomoDuration: 25 * 60,
    intervalId: null
};

function broadcastTimerState() {
    const state = {
        type: 'TIMER_STATE',
        data: {
            seconds: masterTimer.seconds,
            isPaused: masterTimer.isPaused,
            mode: masterTimer.mode,
            pomoDuration: masterTimer.pomoDuration
        }
    };
    broadcast(state);
}

function startMasterTimer() {
    if (!masterTimer.isPaused) return;
    masterTimer.isPaused = false;
    
    masterTimer.intervalId = setInterval(() => {
        if (masterTimer.mode === 'stopwatch') {
            masterTimer.seconds++;
        } else {
            if (masterTimer.seconds <= 0) {
                masterTimer.isPaused = true;
                clearInterval(masterTimer.intervalId);
                masterTimer.intervalId = null;
            } else {
                masterTimer.seconds--;
            }
        }
        broadcastTimerState();
    }, 1000);
    
    broadcastTimerState();
}

function stopMasterTimer() {
    if (masterTimer.isPaused) return;
    masterTimer.isPaused = true;
    if (masterTimer.intervalId) {
        clearInterval(masterTimer.intervalId);
        masterTimer.intervalId = null;
    }
    broadcastTimerState();
}

function resetMasterTimer() {
    stopMasterTimer();
    masterTimer.seconds = masterTimer.mode === 'pomodoro' ? masterTimer.pomoDuration : 0;
    broadcastTimerState();
}

function setMasterTimerMode(mode, pomoDuration) {
    stopMasterTimer();
    masterTimer.mode = mode;
    if (pomoDuration !== undefined) {
        masterTimer.pomoDuration = pomoDuration;
    }
    masterTimer.seconds = masterTimer.mode === 'pomodoro' ? masterTimer.pomoDuration : 0;
    broadcastTimerState();
}

function handleTimerAction(action) {
    if (action.type === 'TOGGLE_PLAY') {
        masterTimer.isPaused ? startMasterTimer() : stopMasterTimer();
    } else if (action.type === 'RESET') {
        resetMasterTimer();
    } else if (action.type === 'SET_MODE') {
        setMasterTimerMode(action.mode, action.pomoDuration);
    }
}

// Broadcast function to all connected clients
function broadcast(data) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

// System activity loop
setInterval(async () => {
    try {
        const win = await activeWin();
        if (!win) return;

        const currentApp = win.owner.name;
        const currentTitle = win.title;

        // If app changed, log the previous session
        if (lastApp && (currentApp !== lastApp || currentTitle !== lastTitle)) {
            console.log(`✨ Scope Change: ${currentApp} | ${currentTitle}`);
            const duration = Math.floor((Date.now() - startTime) / 1000);
            if (duration > 1) { // Only log if > 1s
                await logSession(lastApp, lastTitle, duration);
            }
            startTime = Date.now();

            // Broadcast new stats after logging a session
            broadcast({ type: 'stats', data: await getStats() });
        }

        lastApp = currentApp;
        lastTitle = currentTitle;

        // Broadcast real-time update
        broadcast({
            type: 'update',
            app: currentApp,
            title: currentTitle
        });

    } catch (err) {
        // Silently handle errors
    }
}, 500);

wss.on("connection", async (ws) => {
    console.log("🔗 Frontend connected");
    ws.send(JSON.stringify({ type: 'init', data: await getStats() }));
    // Immediately send current master timer state to newly connected website
    ws.send(JSON.stringify({
        type: 'TIMER_STATE',
        data: {
            seconds: masterTimer.seconds,
            isPaused: masterTimer.isPaused,
            mode: masterTimer.mode,
            pomoDuration: masterTimer.pomoDuration
        }
    }));

    ws.on("message", async (message) => {
        try {
            const data = JSON.parse(message);
            if (data.type === 'TAB_LOG') {
                await logTab(data.domain, data.title, data.duration, data.id);
                broadcast({ type: 'stats', data: await getStats() });
            } else if (data.type === 'CLEAR_DATA') {
                await clearDB();
                broadcast({ type: 'stats', data: await getStats() });
            } else if (data.type === 'TIMER_ACTION') {
                handleTimerAction(data.action);
            }
        } catch (e) {
            console.error("Msg error:", e);
        }
    });

    ws.on("close", () => {
        console.log("❌ Frontend disconnected");
    });
});
