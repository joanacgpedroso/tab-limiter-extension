browser.tabs.onCreated.addListener(Init);

Init();

function Init() {
    try {
        GetCurrentWindowTabs()
            .then((tabs) => {
                return GetTabsNumber(tabs);
            })
            .then((tabsNumber) => {
                console.log(tabsNumber);
            })
    } catch (error) {
        console.log(error.message);
    }
}

//Get the current window tabs
function GetCurrentWindowTabs() {
    return browser.tabs.query({currentWindow: true});
}

//Get the number of current window tabs
function GetTabsNumber(tabs) {
    return tabs.length;
}