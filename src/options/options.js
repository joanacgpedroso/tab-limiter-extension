import "./styles.scss"

import { ShowNotification } from '../notifications'
import { GetMaxTabsSettings, SetMaxTabsSettings } from './../tabs'

const form = document.querySelector('form')
const submitButton = form.querySelector('button[type="submit"]')

// Max Tabs Input Elements
const maxTabsInputGroup = form.querySelector('[data-input-group="maxTabs"]')
const maxTabsInput = maxTabsInputGroup.querySelector('#maxTabs')
const maxTabsErrorGroup = maxTabsInputGroup.querySelector('[data-element="error"]')
const maxTabsErrorText = maxTabsErrorGroup.querySelector('[data-error-element="text"]')

// Fill max tabs field with correct info when DM is loaded
export async function UpdateFieldValues () {
  maxTabsInput.value = await GetMaxTabsSettings()
}
document.addEventListener('DOMContentLoaded', UpdateFieldValues)


export async function SaveSettings (event) {
  event.preventDefault()
  if (validateMaxTabsInput()) {
    const maxTabsCount = maxTabsInput.value
    await SetMaxTabsSettings(maxTabsCount)
    await UpdateFieldValues()

    await ShowNotification(
      'Max Number of Tabs Updated',
      `The max number of tabs that can be opened is now ${maxTabsCount}.`
    )
  }
}
form.addEventListener('submit', SaveSettings)


// TODO: refactor this mess
// Validate the max tabs input
function validateMaxTabsInput() {
  const maxTabsCount = maxTabsInput.value

  let error = ""
  if (!isNumber(maxTabsCount)) {
    error = "Must be a number."
  } else if (maxTabsCount <= 0) {
    error = "Must be 1 or higher."
  }

  const isValid = (error === "")

  if (!isValid) {
    showError(error)
    disableFormSubmission()
  } else {
    hideError()
    enableFormSubmission()
  }

  return isValid
}
maxTabsInput.addEventListener('blur', validateMaxTabsInput)


function showError(error) {
  maxTabsInput.classList.add("input-error")

  maxTabsErrorText.innerHTML = error
  maxTabsErrorGroup.style.display = "block"
}

function hideError() {
  maxTabsInput.classList.remove("input-error")

  maxTabsErrorText.innerHTML = ""
  maxTabsErrorGroup.style.display = "none"
}

function toggleFormSubmission(shouldDisable) {
  form.dataset.valid = !shouldDisable
  submitButton.disabled = shouldDisable
}

function disableFormSubmission() {
  toggleFormSubmission(true)
}

function enableFormSubmission() {
  toggleFormSubmission(false)
}


const stepper = form.querySelector('[data-element="stepper"]')

stepper.querySelector('[data-stepper-button="decrease"').addEventListener("click", () => {
  const value = maxTabsInput.value
  if (isNumber(value) && value > 1) {
    maxTabsInput.value--
    validateMaxTabsInput()
  }
})

stepper.querySelector('[data-stepper-button="increase"').addEventListener("click", () => {
  const value = maxTabsInput.value
  if (isNumber(value)) {
    maxTabsInput.value++
    validateMaxTabsInput()
  }
})

// Check if it's composed of digits only, with the option of being a negative number
function isNumber(value) {
  return /^-?\d+$/.test(value)
}