const { app, BrowserWindow, Tray, Menu, shell, session } = require("electron");
const path = require("path");
const activeWin = require("active-win");
const { logSession, logTab, getStats } = require("../tracker/database");

let tray = null;
let win = null;
let lastApp = null;
let lastTitle = null;
let startTime = Date.now();

// High-efficiency activity tracking (No UI needed)
function startTracking() {
  setInterval(async () => {
    try {
      const current = await activeWin();
      if (!current) return;

      const currentApp = current.owner?.name || "Unknown";
      const currentTitle = current.title || "No Title";

      if (lastApp && (currentApp !== lastApp || currentTitle !== lastTitle)) {
        const duration = Math.floor((Date.now() - startTime) / 1000);
        if (duration > 1) {
          logSession(lastApp, lastTitle, duration);
        }
        startTime = Date.now();
      }
      lastApp = currentApp;
      lastTitle = currentTitle;
    } catch (err) {
      console.error("Tracking Error:", err);
    }
  }, 2000);
}

function createTray() {
  const iconPath = path.join(__dirname, "Meow_logo.png");
  tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    { label: '🐾 Meow is Tracking...', enabled: false },
    { type: 'separator' },
    {
      label: 'Open Dashboard',
      click: () => shell.openExternal("https://hi-meow.vercel.app/main")
    },
    {
      label: 'View Local Stats',
      click: () => {
        if (!win) {
          win = new BrowserWindow({ width: 400, height: 600, show: false });
          win.on('closed', () => win = null);
        }
        win.loadURL("http://localhost:5263/stats");
        win.show();
      }
    },
    { type: 'separator' },
    { label: 'Quit Meow', click: () => app.quit() }
  ]);

  tray.setToolTip('Meow Productivity');
  tray.setContextMenu(contextMenu);
}

app.whenReady().then(() => {
  createTray();
  startTracking();

  // On Windows, the app continues to run in the tray even if no windows are open
  if (process.platform === 'darwin') app.dock.hide();
});

app.on("window-all-closed", (e) => {
  e.preventDefault(); // Keep app running in tray
});