# Simple Stream Automation

A browser extension designed to enhance your streaming experience on popular platforms like Crunchyroll and Netflix by automatically handling repetitive actions, such as skipping intros, recaps, and advancing to the next episode.

## 🚀 Features

This extension provides hands-free viewing automation for the following platforms:

* **Crunchyroll:** Automatically skips the intro, "Skip Credits" button, and clicks the next episode button after the outro.

* **Netflix:** Automatically skips intros/recaps (`player-skip-intro`) and clicks the "Play Next Episode" button (`next-episode-seamless-button`).

* **Simple Control:** Uses a single, **dynamic extension popup** to toggle automation ON or OFF for each service independently.

## 💻 Installation (Developer Mode)

Since this is a custom local extension, you must load it manually in your Chromium-based browser (Chrome, Edge, Brave, etc.).

1. **Download Files:** Ensure you have all the necessary files (`manifest.json`, `options.html`, `options.js`, `content.js`, `netflix_content.js`) in a single, dedicated folder (e.g., `Simple-Stream-Automation`).

2. **Open Extensions Page:** Navigate to `chrome://extensions` in your browser.

3. **Enable Developer Mode:** Toggle the **Developer mode** switch (usually found in the top right corner) to ON.

4. **Load Unpacked:** Click the **Load unpacked** button.

5. **Select Folder:** Select the folder containing your extension files.

The extension will now be loaded and active.

## ⚙️ How to Use

The extension is controlled via the browser toolbar popup.

1. Click the **Extension Icon** (often a puzzle piece, which you can pin to your toolbar).

2. The **Simple Stream Automation** popup will appear.

3. You will see separate toggle switches for **Crunchyroll Automation** and **Netflix Automation**.

4. Toggle the switch for the service you want to enable or disable. The changes are saved immediately to your browser's local storage.

Automation will only run on the specified streaming sites when the corresponding switch is **ON**.

## 🛠️ Repository Structure

| **File Name** | **Purpose** | **Description** | 
 | ----- | ----- | ----- | 
| `manifest.json` | **Configuration** | Defines the extension's name, version, permissions (`storage`), action (`default_popup`), and sets up content script injection paths for both Crunchyroll and Netflix URLs. | 
| `options.html` | **Popup UI** | The HTML/CSS for the small popup window. Uses a dynamic structure with `data-storage-key` attributes for easy expansion to new services. | 
| `options.js` | **Popup Logic** | Handles reading and writing toggle states from `chrome.storage.local`. Uses `querySelectorAll` to dynamically manage multiple switches. | 
| `scripts/crunchyroll.js` | **Crunchyroll Logic** | Injected into the Crunchyroll player iframe. Checks the `cr_enabled` state and contains the logic to click intro/next episode buttons, including necessary hover simulation. | 
| `scripts/netflix.js` | **Netflix Logic** | Injected into the main Netflix viewing page. Checks the `netflix_enabled` state and contains the logic to click skip intro/next episode buttons. | 

## 💡 Notes on Development

* **Content Security Policy (CSP):** The options page uses inline CSS (instead of a CDN like Tailwind) to comply with Chrome's strict Manifest V3 Content Security Policy.

* **Dynamic Options:** The `options.html` and `options.js` are designed to be dynamic. To add a new service, you only need to add a new `div.row` block in `options.html` with a unique **`data-storage-key`**. No changes to `options.js` are required.
