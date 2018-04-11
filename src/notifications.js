/* global browser */

export function ShowNotification (title, message) {
  return browser.notifications.create({
    type: 'basic',
    title: title,
    message: message
  })
}
