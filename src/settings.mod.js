/* global browser */

// Initialize settings
export function InitSettings () {
  return MaxTabSettings()
    .then()
}

// Initialize settings related with max tabs
export function MaxTabSettings () {
  return GetMaxTabsSettings()
    .then((maxTabs) => {
      if (!maxTabs) {
        return SetMaxTabsSettings(5)
      }
    })
}

// Set new max tabs in settings
export function SetMaxTabsSettings (tabNumber) {
  return browser.storage.local.set({
    maxTabs: tabNumber
  })
}

// Get max tabs in settings
export function GetMaxTabsSettings () {
  return browser.storage.local.get('maxTabs')
}
