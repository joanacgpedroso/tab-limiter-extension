/* global browser */

import { InitSettings, GetMaxTabsSettings } from './settings.mod'

// Start extension on browser startup and when installed
browser.runtime.onStartup.addListener(InitExtension)
browser.runtime.onInstalled.addListener(InitExtension)

function InitExtension () {
  InitSettings()
  console.log('Extension initialized')
}

browser.tabs.onCreated.addListener(function (tabCreated) {
  TabLimiter()
})

function TabLimiter () {
  console.log('teste')

  Promise.all([GetCurrentTabsNumber, GetMaxTabsSettings])
    .then((tabsNumber, maxTabsAllowed) => {
      console.log('Number of max tabs: ', maxTabsAllowed)
      console.log('Number of opened tabs: ', tabsNumber)
    })
}

function GetCurrentTabsNumber () {
  return browser.tabs.query({
    currentWindow: true
  })
    .then((tabs) => {
      return tabs.length
    })
}
