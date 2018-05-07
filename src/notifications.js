/* global browser */

export function ShowNotification (title, message) {
  return browser.notifications.create({
    type: 'basic',
    iconUrl: browser.extension.getURL('./dist/assets/icons/tab-icon-google.svg'),
    title: title,
    message: message
  })
}
