const form = document.querySelector("form");
const defaultMaxTabs = 5;

//Fill settings with values when loaded
document.addEventListener("DOMContentLoaded", FillWithValues)

//Save new settings when form submitted
form.addEventListener("submit", SaveSettings);

//Fill fields with correct info
function FillWithValues() {
  browser.storage.local.get()
    .then((settingsValues) => {
      //Max tabs
      let maxTabs = MaxTabs(settingsValues.maxTabs);
      form.querySelector("#maxTabs").value = maxTabs;
    })
    .catch((error) => console.error(error))
}

//Save new settings
function SaveSettings(e) {
  e.preventDefault();
  browser.storage.local.set({
    maxTabs: parseInt(document.querySelector("#maxTabs").value)
  })
  FillWithValues();
}

function MaxTabs(settingValue) {
  let maxTabs = defaultMaxTabs;
  if((settingValue) && (settingValue > 0)) {
    maxTabs = settingValue;
  }
  return maxTabs;
}