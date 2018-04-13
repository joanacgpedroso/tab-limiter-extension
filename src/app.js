/* global browser */

import { InitSettings } from './settings'
import { IsOverMaxTabsLimit, DeleteTab } from './tabs'
import { ShowNotification } from './notifications'

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
      'The newly created tab was closed because it exceeded the max number of tabs allowed per window. To change this number, go to the Options page of Tab Limiter.'
    )
  }
}

async function SendMessage () {
  let tab = await browser.tabs.query({currentWindow: true, active: true})
  let tabId = tab[0].id
  return browser.tabs.sendMessage(tabId, {
    message: 'Tab created' // browser.extension.getURL('./popup/popup.html')
  })
}

// setInterval(SendMessage, 2000)
SendMessage()
