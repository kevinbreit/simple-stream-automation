document.addEventListener('DOMContentLoaded', () => {
    
    // --- Dark Mode Detection (Automatic) ---

    // Function to check the system's color scheme preference and apply the class
    function applySystemTheme(e) {
        // e.matches is true if dark mode is preferred, or check window.matchMedia if called directly
        const prefersDark = e && e.matches !== undefined ? e.matches : window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (prefersDark) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    // 1. Apply theme immediately on load
    applySystemTheme();

    // 2. Set up listener for system preference changes (e.g., user switches system theme)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applySystemTheme);


    // --- Automation Toggle Logic (Dynamic) ---

    // Function to save the state of any automation toggle
    function saveState(event) {
        const toggle = event.target;
        const key = toggle.getAttribute('data-storage-key');
        const isEnabled = toggle.checked;

        // Ensure we only save keys that exist
        if (key) {
            chrome.storage.local.set({ [key]: isEnabled });
        }
    }

    // Function to restore the state of all automation toggles when the page loads
    function restoreOptions() {
        // Select all checkboxes that have a data-storage-key attribute (the automation toggles)
        const automationToggles = document.querySelectorAll('input[type="checkbox"][data-storage-key]');
        
        // Collect all storage keys we need to fetch
        const keysToFetch = Array.from(automationToggles).map(toggle => toggle.getAttribute('data-storage-key'));

        chrome.storage.local.get(keysToFetch, (data) => {
            automationToggles.forEach(toggle => {
                const key = toggle.getAttribute('data-storage-key');
                // Default to true if no value is found (allowing automation to be on by default)
                const isEnabled = data[key] !== false; 
                toggle.checked = isEnabled;
            });
        });
    }

    // 3. Attach listeners to the automation toggles
    const automationToggles = document.querySelectorAll('input[type="checkbox"][data-storage-key]');
    automationToggles.forEach(toggle => {
        toggle.addEventListener('change', saveState);
    });

    // 4. Restore automation states on page load
    restoreOptions();
});
