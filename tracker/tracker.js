const activeWin = require("active-win");
const WebSocket = require("ws");

const PORT = 3001;
const wss = new WebSocket.Server({ port: PORT, host: '0.0.0.0' });

console.log(`🟢 Tracker running on ws://localhost:${PORT}`);

wss.on("connection", (ws) => {
    console.log("🔗 Frontend connected");

    const interval = setInterval(async () => {
        try {
            const win = await activeWin();

            if (!win) return;

            ws.send(
                JSON.stringify({
                    app: win.owner.name,
                    title: win.title,
                })
            );
        } catch (err) {
            console.error("Error:", err);
        }
    }, 2000);

    ws.on("close", () => {
        console.log("❌ Frontend disconnected");
        clearInterval(interval);
    });
});
