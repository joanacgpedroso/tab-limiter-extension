/* global browser */

import { InitSettings } from './settings'
import { IsOverMaxTabsLimit, DeleteTab } from './tabs'
import { ShowNotification, CloseNotification } from './notifications'

// Start extension on browser startup and when installed
browser.runtime.onStartup.addListener(InitExtension)
browser.runtime.onInstalled.addListener(InitExtension)

async function InitExtension () {
  await InitSettings()
}

// Limit tabs when a new tab is created
browser.tabs.onCreated.addListener(function (tabCreated) {
  TabLimiter(tabCreated)
})

async function TabLimiter (tabCreated) {
  if (await IsOverMaxTabsLimit()) {
    await DeleteTab(tabCreated)
    await ShowNotification(
      'Newly created tab was closed',
      'The newly created tab was closed because it exceeded the max number of tabs allowed per window.\nTo change this number, go to the Options page of Tab Limiter.'
    )
    setTimeout(CloseNotification, 10000)
  }
}
