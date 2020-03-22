export const maxTabsDefault = 5

// Initialize settings
export async function InitSettings () {
  await MaxTabSettings()
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
