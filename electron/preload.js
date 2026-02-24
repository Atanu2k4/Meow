const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onActivity: (callback) =>
    ipcRenderer.on("activity", (_, data) => callback(data)),
});