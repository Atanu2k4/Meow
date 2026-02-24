const { app, BrowserWindow, session } = require("electron");
const path = require("path");
const activeWin = require("active-win");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1250,
    height: 875,
    backgroundColor: "#000",
    icon: path.join(__dirname, "Meow_logo.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Handle permissions
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    const allowedPermissions = ["audioCapture", "media", "audio"];
    if (allowedPermissions.includes(permission)) {
      callback(true); // Automatically allow in dev
    } else {
      callback(false);
    }
  });

  win.loadURL("http://localhost:3000");
}

function trackActivity() {
  setInterval(async () => {
    try {
      const current = await activeWin();

      console.log("ACTIVE WINDOW:", current); // 👈 ADD THIS

      if (win && win.webContents && current) {
        win.webContents.send("activity", {
          app: current.owner?.name || "Unknown",
          title: current.title || "No Title",
        });
      }
    } catch (err) {
      console.error("ACTIVE WIN ERROR:", err);
    }
  }, 2000);
}

app.whenReady().then(() => {
  createWindow();
  trackActivity();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});