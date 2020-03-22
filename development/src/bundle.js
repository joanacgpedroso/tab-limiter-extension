'use strict';

const maxTabsDefault = 2;

// Get the number of tabs in current window
function GetCurrentTabsNumber () {
  return browser.tabs.query({
    currentWindow: true
  })
    .then((tabs) => {
      return tabs.length
    })
}

// Compare number of tabs with max allowed
async function IsOverMaxTabsLimit () {
  const currentTabsNumber = await GetCurrentTabsNumber();
  const maxTabsAllowedNumber = await GetMaxTabsSettings();
  return (currentTabsNumber > maxTabsAllowedNumber)
}

// Delete a tab
function DeleteTab (tab) {
  return browser.tabs.remove(tab.id)
}

// Initialize settings related with max tabs
function MaxTabSettings () {
  GetMaxTabsSettings()
    .then((maxTabs) => {
      if (!maxTabs) {
        return SetMaxTabsSettings(maxTabsDefault)
      }
    });
}

// Set new max tabs in settings
function SetMaxTabsSettings (tabNumber) {
  let value = maxTabsDefault;
  if (tabNumber && tabNumber > 0) {
    value = tabNumber;
  }
  browser.storage.local.set({
    maxTabs: value
  });
}

// Get max tabs in settings
function GetMaxTabsSettings () {
  return browser.storage.local.get('maxTabs')
    .then((settingsValue) => settingsValue.maxTabs)
}

// Initialize settings
async function InitSettings () {
  await MaxTabSettings();
}

const notificationId = 'browser-notification';

function ShowNotification (title, message) {
  return browser.notifications.create(notificationId, {
    type: 'basic',
    iconUrl: browser.extension.getURL('./dist/assets/icons/tab-icon-google.svg'),
    title: title,
    message: message
  })
}

function CloseNotification () {
  return browser.notifications.clear(notificationId)
}

// Start extension on browser startup and when installed
browser.runtime.onStartup.addListener(InitExtension);
browser.runtime.onInstalled.addListener(InitExtension);

async function InitExtension () {
  await InitSettings();
}

// Limit tabs when a new tab is created
browser.tabs.onCreated.addListener(function (tabCreated) {
  TabLimiter(tabCreated);
});

async function TabLimiter (tabCreated) {
  if (await IsOverMaxTabsLimit()) {
    await DeleteTab(tabCreated);
    await ShowNotification(
      'Newly created tab was closed',
      'The newly created tab was closed because it exceeded the max number of tabs allowed per window.\nTo change this number, go to the Options page of Tab Limiter.'
    );
    setTimeout(CloseNotification, 10000);
  }
}
