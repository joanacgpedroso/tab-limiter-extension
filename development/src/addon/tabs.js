import { GetMaxTabsSettings } from './settings'

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
  const currentTabsNumber = await GetCurrentTabsNumber()
  const maxTabsAllowedNumber = await GetMaxTabsSettings()
  return (currentTabsNumber > maxTabsAllowedNumber)
}

// Delete a tab
export function DeleteTab (tab) {
  return browser.tabs.remove(tab.id)
}