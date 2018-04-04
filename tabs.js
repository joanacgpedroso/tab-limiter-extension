//Run listTabs() when DOM has finished loading
document.addEventListener("DOMContentLoaded", listTabs);

//Get the current window tabs
function getCurrentWindowTabs() {
  return browser.tabs.query({currentWindow: true});
}

//
function listTabs() {
  getCurrentWindowTabs()
    .then((tabs) => {
      let tabsNumberContainer = document.querySelector("#tabs-number");
      tabsNumberContainer.innerHTML += tabs.length;
    });
}