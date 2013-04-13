//By default page action icon is hidden so make it is visible we use the below logic.
function displayPageAction(tab_id, changeInfo, tab){
    //We only want to match the urls which satisfy the below condition and only after the
    //complete page load.
    if(tab.url.indexOf("reddit.com") > -1 && tab.url.indexOf("/comments/") == -1 && changeInfo.status=='complete'){
        //Show the icon
        chrome.pageAction.show(tab_id);
    }
};
chrome.tabs.onUpdated.addListener(displayPageAction);
