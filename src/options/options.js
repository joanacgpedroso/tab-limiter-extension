import showNotification from "../notifications.js"
import { getMaxTabsSettings, setMaxTabsSettings } from "../tabs.js"
import isNumber from "../utils/number.js"
import "./options.scss"

const form = document.querySelector("form")
const submitButton = form.querySelector('button[type="submit"]')

// Max Tabs Input Elements
const maxTabsInputGroup = form.querySelector('[data-input-group="maxTabs"]')
const maxTabsInput = maxTabsInputGroup.querySelector("#maxTabs")  
const maxTabsErrorGroup = maxTabsInputGroup.querySelector('[data-element="error"]')
const maxTabsErrorText = maxTabsErrorGroup.querySelector('[data-error-element="text"]')

// Fill max tabs field with correct info when DOM is loaded
async function updateFieldValues () {
  maxTabsInput.value = await getMaxTabsSettings()
}

document.addEventListener("DOMContentLoaded", updateFieldValues)

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

const errorInputCssClass = "input-error"

function setMaxTabsInputError(error) {
  maxTabsInput.classList.add(errorInputCssClass)

  maxTabsErrorText.textContent = error
  maxTabsErrorGroup.style.display = "block"
  disableFormSubmission()
}

function setMaxTabsInputSuccess() {
  maxTabsInput.classList.remove(errorInputCssClass)

  maxTabsErrorText.textContent = ""
  maxTabsErrorGroup.style.display = "none"
  enableFormSubmission()
}

// Validate the max tabs input
function validateMaxTabsInput() {
  const maxTabsCount = maxTabsInput.value

  if (!isNumber(maxTabsCount)) {
    setMaxTabsInputError("Must be a number.")
  } else if (maxTabsCount <= 0) {
    setMaxTabsInputError("Must be 1 or higher.")
  } else {
    setMaxTabsInputSuccess()
  }
}

maxTabsInput.addEventListener("blur", validateMaxTabsInput)

function isFormValid() {
  validateMaxTabsInput()

  return form.dataset.valid
}

async function saveSettings(event) {
  event.preventDefault()

  if (isFormValid()) {
    const maxTabsCount = maxTabsInput.value

    await setMaxTabsSettings(maxTabsCount)
    await updateFieldValues()

    await showNotification(
      "Max Number of Tabs Updated",
      `The max number of tabs that can now be opened is ${maxTabsCount}.`
    )
  }
}

form.addEventListener("submit", saveSettings)

function getMaxTabsInputValue() {
  return maxTabsInput.value
}

function setMaxTabsInputValue(newValue) {
  maxTabsInput.value = newValue
}

const stepper = form.querySelector('[data-element="stepper"]')

stepper.querySelector('[data-stepper-button="decrease"').addEventListener("click", () => {
  const value = getMaxTabsInputValue()
  
  if (isNumber(value) && value > 1) {
    setMaxTabsInputValue(Number(value) - 1)
    validateMaxTabsInput()
  }
})

stepper.querySelector('[data-stepper-button="increase"').addEventListener("click", () => {
  const value = getMaxTabsInputValue()

  if (isNumber(value)) {
    setMaxTabsInputValue(Number(value) + 1)
    validateMaxTabsInput()
  }
})
