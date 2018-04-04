window.addEventListener("load", UpdateTabCounter);

//Update the number on top of the icon in the browser's toolbar
function UpdateTabCounter() {
    GetCurrentWindowTabs()
        .then((tabs) => {
            let TabsNumber = GetTabsNumber(tabs);
            SetBadgeText(String(TabsNumber));
        })
}

//Get the current window tabs
function GetCurrentWindowTabs() {
    return browser.tabs.query({ currentWindow: true });
}

//Get the number of current window tabs
function GetTabsNumber(tabs) {
    return tabs.length;
}

//Set the string on top of the icon in the browser's toolbar
function SetBadgeText(textForBadge) {
    return browser.browserAction.setBadgeText({ text: textForBadge });
}