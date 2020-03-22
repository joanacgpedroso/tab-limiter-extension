const notificationId = 'browser-notification'

export function ShowNotification (title, message) {
  return browser.notifications.create(notificationId, {
    type: 'basic',
    iconUrl: browser.extension.getURL('./dist/assets/icons/tab-icon-google.svg'),
    title: title,
    message: message
  })
}

export function CloseNotification () {
  return browser.notifications.clear(notificationId)
}
