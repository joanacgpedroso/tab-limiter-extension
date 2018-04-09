browser.tabs.onCreated.addListener(ListenForTabCreation);


function ListenForTabCreation(tabCreated) {
    try {
        GetCurrentWindowTabs() // 01. Get open window tabs
            .then((tabs) => {
                return GetTabsNumber(tabs); // 02. Get number of tabs from window tabs
            })
            .then((tabsNumber) => {
                if( IsMaxTabs(tabsNumber) ) { // 03. Check if tabs number is maxed
                    CloseTab(tabCreated); // 03.a) if true, close tab
                }
            })
    } catch (error) {
        console.log(error.message);
    }
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
function IsMaxTabs(tabsNumber) {
    let maxTabs = 8;
    if (tabsNumber > maxTabs ) {
        return true;
    } else {
        return false;
    }
}

//Close tab
function CloseTab(tabToClose) {
    if (tabToClose) {
        browser.tabs.remove(tabToClose.id);

    }
}