/* global browser */
const notificationId = "tab-limiter-notification"
const notificationDurationMilliseconds = 3000

function closeNotification() {
  return browser.notifications.clear(notificationId)
}

export default function showNotification(title, message, autoClose = true) {
  browser.notifications.create(notificationId, {
    type: "basic",
    iconUrl: browser.runtime.getURL("./dist/assets/icons/tabler-icons-folders-off.svg"),
    title,
    message
  })

  if (autoClose) {
    setTimeout(closeNotification, notificationDurationMilliseconds)
  }
}
