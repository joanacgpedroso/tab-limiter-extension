/* global browser */
export let maxTabsDefault = 5

// Get the number of tabs in current window
export function GetCurrentTabsNumber () {
  return browser.tabs.query({
    currentWindow: true
  })
    .then((tabs) => {
      return tabs.length
    })
}

// Compare number of tabs with max allowed
export async function IsOverMaxTabsLimit () {
  let currentTabsNumber = await GetCurrentTabsNumber()
  let maxTabsAllowedNumber = await GetMaxTabsSettings()
  return (currentTabsNumber > maxTabsAllowedNumber)
}

// Delete a tab
export function DeleteTab (tab) {
  return browser.tabs.remove(tab.id)
}

// Initialize settings related with max tabs
export function MaxTabSettings () {
  GetMaxTabsSettings()
    .then((maxTabs) => {
      if (!maxTabs) {
        return SetMaxTabsSettings(maxTabsDefault)
      }
    })
}

// Set new max tabs in settings
export function SetMaxTabsSettings (tabNumber) {
  let value = maxTabsDefault
  if (tabNumber && tabNumber > 0) {
    value = tabNumber
  }
  browser.storage.local.set({
    maxTabs: value
  })
}

// Get max tabs in settings
export function GetMaxTabsSettings () {
  return browser.storage.local.get('maxTabs')
    .then((settingsValue) => settingsValue.maxTabs)
}
