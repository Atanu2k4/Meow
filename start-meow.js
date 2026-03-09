#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🐾 Starting Meow Local Setup...');

try {
    // 1. Check if node_modules exists in tracker
    const trackerDir = path.join(__dirname, 'tracker');
    if (!fs.existsSync(path.join(trackerDir, 'node_modules'))) {
        console.log('📦 Installing tracker dependencies...');
        execSync('npm install', { cwd: trackerDir, stdio: 'inherit' });
    }

    // 2. Start the tracker
    console.log('🚀 Launching Meow System Tracker...');
    require(path.join(trackerDir, 'tracker.js'));

} catch (error) {
    console.error('❌ Failed to start Meow:', error.message);
}
