import {
  getTodayKey,
  getDomain,
  shouldIgnore,
  calculateDuration,
  createEmptyDay
} from "./utils.js";

const BACKEND_URL = "ws://localhost:5263";
let socket = null;

function connectBackend() {
  socket = new WebSocket(BACKEND_URL);
  socket.onopen = () => console.log("✅ Extension linked to Meow Backend");
  socket.onclose = () => {
    socket = null;
    setTimeout(connectBackend, 5000);
  };
  socket.onerror = () => {
    socket = null;
  };
}

connectBackend();

function syncToBackend(tab, duration, id) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({
      type: 'TAB_LOG',
      domain: getDomain(tab.url),
      title: tab.title,
      duration: duration,
      id: id
    }));
  }
}

let currentTab = null;
let startTime = null;

function saveSession(tab, endTime) {
  if (!tab || !startTime) return;

  const duration = calculateDuration(startTime, endTime);
  if (duration < 1) return;

  const domain = getDomain(tab.url);
  if (!domain) return;

  const today = getTodayKey();
  const id = Date.now(); // Generate ID once

  chrome.storage.local.get([today], (result) => {
    const dayData = result[today] || createEmptyDay();

    // Raw session
    dayData.sessions.push({
      id,
      title: tab.title,
      url: tab.url,
      domain,
      startTime,
      endTime,
      duration
    });

    // Aggregation
    if (!dayData.totals[domain]) {
      dayData.totals[domain] = {
        title: tab.title,
        totalDuration: 0,
        visits: 0
      };
    }

    dayData.totals[domain].totalDuration += duration;
    dayData.totals[domain].visits += 1;

    chrome.storage.local.set({ [today]: dayData });

    // 🚀 NEW: Sync directly to backend for instant reflection
    syncToBackend(tab, duration, id);
  });
}

function handleTabChange(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    const now = Date.now();

    // 1. Always try to save the PREVIOUS session first
    if (currentTab) {
      saveSession(currentTab, now);
      currentTab = null;
      startTime = null;
    }

    // 2. Now check if we should track the NEW tab
    if (shouldIgnore(tab?.url)) return;

    currentTab = tab;
    startTime = now;
  });
}

chrome.tabs.onActivated.addListener(handleTabChange);

chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    // Lost focus - save the current session
    if (currentTab) {
      saveSession(currentTab, Date.now());
      currentTab = null;
      startTime = null;
    }
  } else {
    // Gained focus - check the active tab in this window
    chrome.tabs.query({ active: true, windowId }, (tabs) => {
      if (tabs[0]) {
        handleTabChange({ tabId: tabs[0].id });
      }
    });
  }
});