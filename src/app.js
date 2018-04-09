browser.tabs.onCreated.addListener(function(tabCreated) {
    let action = "Creation";
    ListenForTabCreation(tabCreated, action);
});

function ListenForTabCreation(tabCreated, action) {
    console.log(action);
    try {
        GetCurrentWindowTabs() // 01. Get open window tabs
            .then((tabs) => {
                // console.log("01: ", tabs)
                return GetTabsNumber(tabs); // 02. Get number of tabs from window tabs
            })
            .then((tabsNumber) => {
                // console.log("02. ", tabsNumber);
                browser.storage.local.get("maxTabs") // 03. Check if tabs number is maxed
                    .then((object) => {
                        // console.log("IsMaxTabs: ", object)
                        if (tabsNumber > object.maxTabs ) {
                            // console.log("IsMaxTabs: true")
                            CloseTab(tabCreated); // 03.a) if true, close tab
                            ShowDialog();
                        }
                    })
            })
    } catch (error) { console.error(error); }
};

//Get the current window tabs
function GetCurrentWindowTabs() {
    return browser.tabs.query({currentWindow: true});
}

//Get the number of current window tabs
function GetTabsNumber(tabs) {
    return tabs.length;
}

//Check if number of tabs is maxed or not
function IsTabsMaxed(tabsNumber) {
    GetMaxTabsSetting()
        .then((object) => {
            // console.log("IsMaxTabs: ", object)
            if (tabsNumber > object.maxTabs ) {
                // console.log("IsMaxTabs: true")
                return true;
            } else {
                // console.log("IsMaxTabs: false")
                return false;
            }
        })
}

//Close tab
function CloseTab(tabToClose) {
    if (tabToClose) {
        browser.tabs.remove(tabToClose.id);
        console.log("Tab closed: ", tabToClose.id)
    }
}

browser.runtime.onStartup.addListener(Init);
browser.runtime.onInstalled.addListener(Init);

function Init() {
    console.log("Initialize extension")
    browser.storage.local.get()
        .then((settingsValues) => {
            //Max tabs
            console.log("Max tabs: ", settingsValues.maxTabs);
            if (!settingsValues.maxTabs) {
                browser.storage.local.set({
                    maxTabs: 5
                })
            }
        })
        .catch((error) => console.error(error))
    console.log("Initialization complete")
}

function ShowDialog() {
    return browser.notifications.create({
        type: 'basic',
        title: 'Newly created tab was closed',
        message: 'The newly created tab was closed because it exceeded the max number of tabs allowed per window. To change this number, go to the Options page of Tab Limiter.'
    })
}