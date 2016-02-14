$(function(){

    // Constants
    // TODO: set colors based on hash
    var DEBUG = true;
    // Initialize variables
    var $window = $(window);
    var $bar = $(".bar");

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
            $bar.focus();
        }
        // When the user hits ENTER, launch search
        if (event.which === 13){
            hist.doSearch($bar.val());
        }
    });

    // Click events

    // Toggle result when user click on an entry
    $(".entry").on("click", function() {
        // before toggle: hidden
        // after  toggle: visible
        if ($("#list-container:hidden").length)
            hist.render();
        $(this).next().toggleClass("result-active");
    });

});
