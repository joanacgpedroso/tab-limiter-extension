/* global browser */
const maxTabsDefault = 5

// Get the number of tabs in current window
async function getCurrentTabsOpenedNumber() {
  const tabs = await browser.tabs.query({
    currentWindow: true
  })

  return tabs.length
}

// Delete a tab
function closeTab(tab) {
  return browser.tabs.remove(tab.id)
}

// Set new max tabs in settings
function setMaxTabsSettings(newMax = undefined) {
  let maxTabs = maxTabsDefault

  if (newMax && newMax > 0) {
    maxTabs = newMax
  }

  browser.storage.local.set({
    // eslint-disable-next-line object-shorthand
    "maxTabs": maxTabs
  })

  return maxTabs
}

// Get max tabs in settings
async function getMaxTabsSettings() {
  const settings = await browser.storage.local.get("maxTabs")

  return settings.maxTabs
}

// Compare number of tabs with max allowed
async function isOverMaxTabsLimit() {
  const currentTabsNumber = await getCurrentTabsOpenedNumber()
  const maxTabsAllowedNumber = await getMaxTabsSettings()

  return currentTabsNumber > maxTabsAllowedNumber
}

// Initialize settings related with max tabs
async function initializeSettings() {
  let maxTabs = await getMaxTabsSettings()

  if (!maxTabs) {
    maxTabs = setMaxTabsSettings()
  }

  return maxTabs
}

export { closeTab, isOverMaxTabsLimit, initializeSettings, getMaxTabsSettings, setMaxTabsSettings }

