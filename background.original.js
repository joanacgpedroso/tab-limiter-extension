
//Update tab counter when:
//1. browser is first loaded 
window.addEventListener("load", Teste);
//2. tab is created
browser.tabs.onCreated.addListener(Teste);
//3. tab is closed
browser.tabs.onRemoved.addListener(Teste);
//4. tab is updated
browser.tabs.onActivated.addListener(Teste);


// setInterval(UpdateTabCounterS, 500)

function Teste(arg) {
  console.log(arg);
}

function Init() {
  try {
      GetCurrentWindowTabs()
          .then((tabs) => {
              return tabs.length;
          })
          .then((tabsNumber) => {
              return UpdateTabCounter(tabsNumber);
          })
  } catch (error) {
      console.log(error.message);
  }
}
function Init() {
  try {
      GetCurrentWindowTabs()
          .then((tabs) => {
              return tabs.length;
          })
          .then((tabsNumber) => {
              return UpdateTabCounter(tabsNumber);
          })
  } catch (error) {
      console.log(error.message);
  }
}

function TabCreation() {
    try {
      console.log(browser.tabs.onActivated);
console.log(browser.tabs.onCreated);
console.log(browser.tabs.onRemoved);
        GetCurrentWindowTabs()
            .then((tabs) => {
                return tabs.length;
            })
            .then((tabsNumber) => {
                return UpdateTabCounter(tabsNumber);
            })
    } catch (error) {
        console.log(error.message);
    }
}

function TabRemoval() {
    try {
        GetCurrentWindowTabs()
            .then((tabs) => {
                return tabs.length;
            })
            .then((tabsNumber) => {
                tabsNumber--;
                return UpdateTabCounter(tabsNumber);
            })
    } catch (error) {
        console.log(error.message);
    }
}

function WhenTabIsClosed() {
    try {
        GetCurrentWindowTabs()
            .then((tabs) => {
                let TabsNumber = GetTabsNumber(tabs);
                TabsNumber--;
                SetBadgeText(String(TabsNumber));
            })
    } catch (error) {
        console.log(error.message);
    }
}

//Get the number of current window tabs
function GetCurrentTabsNumber() {
    GetCurrentWindowTabs()
        .then((tabs) => {
            return tabs.length;
        })
}

//Update the number on top of the icon in the browser's toolbar
function UpdateTabCounter(tabsNumber) {
    SetBadgeText(String(tabsNumber));
}
//Update the number on top of the icon in the browser's toolbar
function UpdateTabCounterS() {
    try {
        GetCurrentWindowTabs()
            .then((tabs) => {
                let TabsNumber = GetTabsNumber(tabs);
                SetBadgeText(String(TabsNumber));
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

//Get the string on top of the icon in the browser's toolbar
function GetBadgeText() {
    return browser.browserAction.getBadgeText({});
}
//Set the string on top of the icon in the browser's toolbar
function SetBadgeText(textForBadge) {
    return browser.browserAction.setBadgeText({ text: textForBadge });
}