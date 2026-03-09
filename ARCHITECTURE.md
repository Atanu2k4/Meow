# Meow Persistence & Privacy Architecture

Meow is designed with a **Privacy-First, Local-Only** philosophy. This document explains how we track activity across your entire computer while ensuring your data never leaves your machine.

---

## 🏗️ The Three Pillars

The Meow ecosystem consists of three components working in perfect synchronization:

1.  **The Browser Extension (Meow Tab Tracker)**: Watches what websites you visit.
2.  **The System Sidecar (Meow Tracker)**: A lightweight background process that watches what applications you use (VS Code, Spotify, etc.).
3.  **The Web Dashboard (Command Center)**: The beautiful UI where you see your stats, and the "bridge" that saves your data to your hard drive.

---

## 🔄 The Data Flow (How it connects)

### 1. Application Tracking (OS Level)
*   **The Tracker** runs as a tiny Node.js process on your computer.
    *   Every 2 seconds, it checks the "Active Window" using system APIs.
    *   It starts a local WebSocket server on `ws://localhost:5263`.
    *   Whenever you switch apps, it broadcasts the new app name and title to the Web Dashboard.

### 2. Website Tracking (Browser Level)
*   **The Extension** lives inside your browser (Brave, Chrome, etc.).
    *   It records the time spent on each domain (e.g., `github.com`).
    *   It saves this temporarily in the browser's internal storage (`chrome.storage.local`).

### 3. The Sync Bridge (The Magic)
*   When you open the **Meow Web Dashboard**:
    1.  It connects to the **System Sidecar** via the local WebSocket.
    2.  It "talks" to the **Extension** using `window.postMessage`.
    3.  Every 10 seconds, the Dashboard grabs new tab sessions from the Extension and sends them *through* the WebSocket to the Sidecar.
    4.  The Sidecar then writes them into its physical database.

---

## 🔐 Privacy & Security (Plus Points)

### 1. Zero Cloud Dependency
Most productivity trackers upload your browsing history and app usage to their servers. **Meow does not.** 
*   There is no "Login" required.
*   There are no "API Requests" sent to external servers.
*   If you unplug your internet, Meow continues to work perfectly.

### 2. Physical File Persistence
Unlike browser cache which can be cleared easily, Meow saves your history to a physical JSON file:
*   **Path:** `tracker/activity_log.json`
*   This is your personal "Activity Vault." It stays on your hard drive forever, under your control.

### 3. Minimal CPU Footprint
Because we separated the **Tracking** (Node.js) from the **Viewing** (Web UI), the "Heavy" parts (Animations, UI rendering) only happen when you are actually looking at the dashboard. In the background, only a tiny script is running.

---

## 📊 Visual Data Map

```mermaid
graph TD
    subgraph "Your Computer (Localhost)"
        Tracker["System Tracker (Node.js)"] -- "ws://localhost:5263" --> Web["Web Dashboard (Next.js)"]
        Web -- "postMessage" --> Ext["Browser Extension"]
        
        Tracker -- "Writes To" --> JSON["💾 activity_log.json"]
        
        subgraph "Data Types"
            OS["App Switching (OS)"] --> Tracker
            Tabs["Tab Switching (Browser)"] --> Ext
        end
    end
    
    JSON -.-> "Never Leaves Your Machine" .-> Cloud(("☁️ The Internet"))
    style Cloud stroke-dasharray: 5 5, fill:#f9f, color:#fff
```

---

## 🛠️ How to run it
To start the entire secure ecosystem, run this command from the project root:
```powershell
npm run dev
```

*Generated for the Meow Project - Your Privacy, Your Productivity.*
