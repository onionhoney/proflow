$(function(){

    // Constants
    // TODO: set colors based on hash
    var API_KEY = "AIzaSyAe0ReD5igVVJFmDMJKHCAOU3nRHT4E2As";
    var CX = "011043985394505284497%3A04toexks_gs"; 
    var DEBUG = true;
    // Initialize variables
    var $window = $(window);
    var $bar = $(".bar");
    var $list = $("#list-container");

    function doSearch(){
        var query = $bar.val();
        var url = "https://www.googleapis.com/customsearch/v1?q=" + encodeURI(query);
        url += "&cx=" + CX + "&key=" + API_KEY;
        
        
        if (DEBUG){
            var data = googleAPISampleJSON;
            console.log(data);
            var firstEntry = data.items[0];
            var message = firstEntry.snippet;
            hist.add(query, message); 
            hist.render($list);
        }
        else{
            $.get(url, function(data){
                console.log(data);
            });
        }
    }
    // Keyboard events
   
    $window.keydown(function (event){
        // Auto-focus the bar
        if (!(event.ctrlKey || event.metaKey || event.altKey)) {
            $bar.focus();
        }
        // When the user hits ENTER, launch search
        if (event.which === 13){
            doSearch();
        }
    });

    // Click events

    // Toggle result when user click on an entry
    $(".entry").on("click", function(){
        $(".result").toggleClass("result-active");
    });

});
