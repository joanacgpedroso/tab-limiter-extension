/* global browser */
const notificationId = 'browser-notification'

export function ShowNotification (title, message, autoClose = true) {
  browser.notifications.create(notificationId, {
    type: 'basic',
    iconUrl: browser.extension.getURL('./dist/assets/icons/tab-icon-google.svg'),
    title: title,
    message: message
  })

  if (autoClose) {
    setTimeout(CloseNotification, 10000)
  }
}

export function CloseNotification () {
  return browser.notifications.clear(notificationId)
}
