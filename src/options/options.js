import { GetMaxTabsSettings, SetMaxTabsSettings } from './../tabs'

let form = document.querySelector('form')

// Fill field with correct info when dom is loaded
document.addEventListener('DOMContentLoaded', UpdateFieldValues)

// Save new settings when form submitted
form.addEventListener('submit', SaveSettings)

// Fill form with correct info
export async function UpdateFieldValues () {
  form.querySelector('#maxTabs').value = await GetMaxTabsSettings()
}

export async function SaveSettings (event) {
  event.preventDefault()
  let maxTabsFieldValue = form.querySelector('#maxTabs').value
  await SetMaxTabsSettings(maxTabsFieldValue)
  await UpdateFieldValues()
}
