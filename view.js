$(function(){
    // Constants
    // TODO: set colors based on hash
    var DEBUG = true;
    // Initialize variables
    var $window = $(window);
    var $bar = $(".bar");

<<<<<<< HEAD
    // doesn't work, has to acquire dom dynamically
    // var $list = $("#list-container");
    // hist.init($list);


=======
>>>>>>> 2a0dbb71246ecb891e1ffe8c7faf9089e204c794
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

    // Make search when search button is clicked
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
