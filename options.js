document.addEventListener('DOMContentLoaded', initializeOptions);

// Global status message element (kept for cleanup, but functionality removed)
const statusMessage = document.getElementById('status');
const TOGGLE_SELECTOR = 'input[data-storage-key]';

/**
 * Saves the state of a specific toggle to chrome.storage.local.
 * @param {HTMLElement} toggle - The checkbox input element.
 */
function saveState(toggle) {
    const isEnabled = toggle.checked;
    const storageKey = toggle.dataset.storageKey;
    const serviceName = toggle.dataset.serviceName || 'Service'; // Fallback name
    
    if (!storageKey) {
        console.error("Toggle element is missing data-storage-key.");
        return;
    }

    // Save to local storage
    chrome.storage.local.set({ [storageKey]: isEnabled }, () => {
        // Logging the save action to the console for debugging, but no UI update
        console.log(`${serviceName} automation set to: ${isEnabled}`);
    });
}

/**
 * Restores the state of all toggle switches when the page loads.
 */
function restoreOptions(toggles) {
    // 1. Collect all storage keys used by the toggles
    const keysToFetch = Array.from(toggles).map(toggle => toggle.dataset.storageKey).filter(key => key);

    if (keysToFetch.length === 0) {
        console.warn("No toggles found with data-storage-key.");
        // We'll leave the status message for this specific warning, but skip the normal logging.
        statusMessage.textContent = 'No services configured.';
        return;
    }

    // 2. Read all keys from local storage
    chrome.storage.local.get(keysToFetch, (data) => {
        
        // 3. Iterate over the toggles and set their checked state
        toggles.forEach(toggle => {
            const storageKey = toggle.dataset.storageKey;
            
            // Default to true if no value is found (or undefined).
            // This ensures automation is ON by default.
            const isEnabled = data[storageKey] !== false; 
            
            toggle.checked = isEnabled;
        });
        
        // Removed: Initial status display and timeout clearing the status.
    });
}

/**
 * Initializes listeners and restores state for all dynamic toggles.
 */
function initializeOptions() {
    // Find all toggle inputs using the dynamic selector
    const toggles = document.querySelectorAll(TOGGLE_SELECTOR);

    // 1. Set up event listeners iteratively
    toggles.forEach(toggle => {
        // Use an anonymous function to call saveState with the element itself
        toggle.addEventListener('change', () => {
            saveState(toggle);
        });
    });

    // 2. Restore the previous state for all toggles
    restoreOptions(toggles);
}
