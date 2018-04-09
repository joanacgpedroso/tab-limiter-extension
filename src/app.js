browser.tabs.onCreated.addListener(ListenForTabCreation);

function ListenForTabCreation(tabCreated) {
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