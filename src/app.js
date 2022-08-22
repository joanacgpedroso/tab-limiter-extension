/* global browser */

import showNotification from "./notifications.js"
import { closeTab, initializeSettings, isOverMaxTabsLimit } from "./tabs.js"

async function initExtension () {
  await initializeSettings()
}

// Start extension on browser startup and when installed
browser.runtime.onStartup.addListener(initExtension)
browser.runtime.onInstalled.addListener(initExtension)

async function limitTabsIfMaxReached (tabCreated) {
  if (await isOverMaxTabsLimit()) {
    await closeTab(tabCreated)
    await showNotification(
      "Newly created tab was closed",
      "The newly created tab was closed because it exceeded the max number of tabs allowed per window."
    )
  }
}

// Limit tabs when a new tab is created
browser.tabs.onCreated.addListener((tabCreated) => {
  limitTabsIfMaxReached(tabCreated)
})
