// content.js

/**
 * Dispatches a mouseover event on the element to ensure controls are visible.
 * This is based on the logic provided in the earlier version, modified to remove 
 * the unused durationMs parameter.
 * @param {HTMLElement} element - The element to dispatch the event on.
 */
function simulateHover(element) {
    if (!element) {
        return;
    }

    // Dispatch the 'mouseover' event to simulate the hover start
    const mouseOverEvent = new MouseEvent('mouseover', {
        bubbles: true,
        cancelable: true,
        view: window
    });
    
    element.dispatchEvent(mouseOverEvent);
}

// --- Main execution logic (wrapped in a storage check) ---

// Check chrome.storage.local for the saved user preference.
chrome.storage.local.get('cr_injector_enabled', (data) => {
    // Check if the feature is explicitly set to false. Default is true (or undefined).
    const isEnabled = data.cr_injector_enabled !== false; 

    if (isEnabled) {
        console.log("CR Injector: Automation is ENABLED. Starting interval check.");
        
        // The core logic that checks and clicks the skip buttons
        setInterval(() => {
            // Logic for "Skip Intro"
            const skipIntro = document.querySelector('#velocity-controls-package [aria-label="Skip Intro"]');
            if (skipIntro && skipIntro.checkVisibility()) {
                console.log("CR Injector: Clicking Skip Intro.");
                skipIntro.click();
            }

            // Logic for "Skip Credits" / "Next Episode"
            const skipCredits = document.querySelector('#velocity-controls-package [aria-label="Skip Credits"]');
            if (skipCredits && skipCredits.checkVisibility()) {
                console.log("CR Injector: Detected Skip Credits/End of episode. Attempting next episode.");
                
                const container = document.querySelector("#vilosControlsContainer");
                
                // Simulate hover to ensure next episode button is visible/active
                if (container) {
                    // Call simulateHover once, not wrapped in a faulty setInterval
                    simulateHover(container);
                }

                // Click the next episode button
                const nextEpisodeButton = container ? container.querySelector('[data-testid="vilos-next_episode_button"]') : null;

                if (nextEpisodeButton) {
                    nextEpisodeButton.click();
                    console.log("CR Injector: Clicking Next Episode button.");
                }
            }
        }, 1000); // Check every 1 second
        
    } else {
        console.log("CR Injector: Automation is DISABLED by user settings.");
    }
});
