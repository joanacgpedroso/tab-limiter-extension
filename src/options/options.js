import { GetMaxTabsSettings, SetMaxTabsSettings } from './../tabs'

const form = document.querySelector('form')

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
  if (validateMaxTabsInput()) {
    const maxTabsFieldValue = form.querySelector('#maxTabs').value
    await SetMaxTabsSettings(maxTabsFieldValue)
    await UpdateFieldValues()
  }
}
