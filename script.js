try
{
  var tab = browser.tabs.getCurrent().then(function(tab) {
    console.log(1, tab);
  });
  // console.log("Script: ", tab);
}
catch (error)
{
  console.log("Error: ", error.message);
}