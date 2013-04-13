//Function to send the selected value from dropdown.
function send_selected_value(){

    //get value as text
    var x = $('#options option:selected').text();
    var message = {sel_text: x};

    //query the current selected tab and get the tab_id.
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tabId = tabs[0].id;
        //To interact with the content script you should use tabs.sendMessage(read
        //extensions.txt) for more details. We are passing the value selected from the
        //dropdown to the content script using this API because they work in different
        //environments or isolated environments.
        chrome.tabs.sendMessage(tabId, message, function(response){
            if(response.result == "success"){
                //Get the popup displayed .
                var popup = chrome.extension.getViews({type: "popup"});
                popup[0].close();

            }
        });

    });

}

//Execute the function after page load.
$(document).ready(function(){
    $('#options').change(send_selected_value);

});

