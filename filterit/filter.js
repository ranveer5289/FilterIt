//A listener is implemented here which listens for any request. In this case it is
//listening for tabs.sendMessage.
chrome.extension.onMessage.addListener(
        function(request, sender, sendResponse){

            if(request.sel_text){

                //Get the dropdown value
                var time = request.sel_text;
                main(time);
                insert_html(time);
                //send a sucess response.
                sendResponse({result:"success"});

            }
            else{
                //Snub it.
                sendResponse({});
            }

        });


//Function which will filter the reddit posts.
function filter_post(element, time_to_filter){

    //get todays date.
    var now = new Date();
    //extract the reddit posts date/time.
    var time = $(element).attr("datetime");
    //convert the above date/time to proper format.
    var time = new Date(time);

    //calculate the difference in the current time and posts' time.
    var diff = now - time;
    var time_to_filter = time_to_filter*3600*1000;

    //If difference is as required than return the parent element of the post.
    if( diff < time_to_filter  ){
        return $(element).parent().parent().parent();
    }
}

function main(time_to_filter){

    //Convert the time to integer from string.
    var time_to_filter = parseInt(time_to_filter);

    //Get all elements(posts) of the reddit page.
    var all_elements = $("p time").parent().parent().parent();
    //Get only the selected elements.
    var filtered_elements = $("p time").map(function() { return filter_post(this, time_to_filter); });

    if(filtered_elements.length != 0){
        all_elements.map(function(){ $(this).hide(); });
        filtered_elements.map(function(){ $(this).show(); });
        //Hide the AD.
        $("#siteTable_organic").hide();

    }


}


//Show a notification.
function insert_html(time){

    var message = "<div id='notify_id'>Now Showing last " + time + " hours posts </div>";
    $("body").prepend(message);
    $("#notify_id").hide().fadeIn(1700).fadeOut(1700); 

}











