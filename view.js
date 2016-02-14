$(function(){

    // Constants
    // TODO: set colors based on hash
    var DEBUG = true;
    // Initialize variables
    var $window = $(window);
    var $bar = $(".bar");

    // doesn't work, acquire dom dynamically
    // var $list = $("#list-container");
    // hist.init($list);

    // function doSearch(){
    //     var query = $bar.val();
    //     var url = "https://www.googleapis.com/customsearch/v1?q=" + encodeURI(query);
    //     url += "&cx=" + CX + "&key=" + API_KEY;
    //     if (DEBUG){
    //         var data = googleAPISampleJSON;
    //         console.log(data);
    //         var firstEntry = data.items[0];
    //         var message = firstEntry.snippet;
    //         hist.add(query, message);
               // change list-container to hist-list-container
    //         var $list = $("#list-container");
    //         hist.render($list);
    //     }
    //     else{
    //         $.get(url, function(data){
    //             console.log(data);
    //         });
    //     }
    // }

    // Keyboard events
    $window.keydown(function (event) {
        // Auto-focus the bar
        if (!(event.ctrlKey || event.metaKey || event.altKey)) {
            //$bar.focus();
        }
        // When the user hits ENTER, launch search
        if (event.which === 13) {
            hist.doSearch($bar.val());
        }
    });

    // Click events

    // make search when search button is clicked
    $(".search-icon").on("click", function() {
        hist.doSearch($bar.val());
    });

    // Toggle result when user click on an entry
    $("#list-container").on("click", ".entry", function() {

        $(this).next().toggleClass("result-active");
    });
    

    // Toggle history view when user click on history button
    $(".history-icon").on("click", function() {
        if (hist.histView)
            hist.unrender();
        else
            hist.render();
    });
});
