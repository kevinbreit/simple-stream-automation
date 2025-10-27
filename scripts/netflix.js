// netflix_content.js (For Netflix Top-Level Page)

// Check chrome.storage.local for the saved user preference.
chrome.storage.local.get('netflix_enabled', (data) => {
    // Check if the feature is explicitly set to false. Default is true (or undefined).
    const isEnabled = data.netflix_enabled !== false; 

    if (isEnabled) {
        console.log("Netflix Automation: Script is ENABLED. Starting interval check.");
        
        // Function to click a button if visible
        const clickIfVisible = (selector, logMessage) => {
            const btn = document.querySelector(selector);
            
            // Using checkVisibility() is usually preferred for modern DOM elements
            if (btn && btn.checkVisibility()) {
                console.log(`Netflix Automation: ${logMessage}`);
                btn.click();
                return true;
            }
            return false;
        };

        // 1. Next Episode / Continue Playing
        const continuePlayingInterval = setInterval(() => {
            // Clicks the "Next Episode" or "Continue Watching" button
            clickIfVisible('[data-uia="next-episode-seamless-button"]', 'Clicking Next Episode/Continue Playing.');
        }, 500);

        // 2. Skip Intro / Skip Recap
        const skipIntroInterval = setInterval(() => {
            // Clicks the "Skip Intro" or "Skip Recap" button
            clickIfVisible('[data-uia="player-skip-intro"], .watch-video--skip-content-button', 'Clicking Skip Intro/Recap.');
        }, 500);

        // Optional: Stop intervals when the document unloads (e.g., user navigates away)
        window.addEventListener('beforeunload', () => {
            clearInterval(continuePlayingInterval);
            clearInterval(skipIntroInterval);
            console.log("Netflix Automation: Intervals cleared on navigation.");
        });
        
    } else {
        console.log("Netflix Automation: Script is DISABLED by user settings.");
    }
});
