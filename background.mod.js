
//Update tab counter when:
//1. browser is first loaded 
window.addEventListener("load", Teste);
//2. tab is created
browser.tabs.onCreated.addListener(Teste);
//3. tab is closed
browser.tabs.onRemoved.addListener(Teste);
//4. tab is updated
browser.tabs.onActivated.addListener(Teste);

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