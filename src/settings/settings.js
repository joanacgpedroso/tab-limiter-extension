/* global browser */

const
    defaultMaxTabs = 5,
    form = document.querySelector("form");
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
function SaveSettings(event) {
    event.preventDefault();
    browser.storage.local.set({
        maxTabs: parseInt(document.querySelector("#maxTabs").value) || defaultMaxTabs
    })
    FillWithValues();
}

function MaxTabs(settingValue) {
    let
        biggerThanZero = 0,
        maxTabs = defaultMaxTabs;
    if (settingValue && settingValue > biggerThanZero) {
        maxTabs = settingValue;
    }

    return maxTabs;
}