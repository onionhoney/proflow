$(function(){
    // Constants
    // TODO: set colors based on hash
    // Initialize variables
    var $window = $(window);
    var $bar = $(".bar");
    var hist = Hist();
    hist.init();

    // Keyboard events
    $window.keydown(function (event) {
        // Auto-focus the bar
        // if (!(event.ctrlKey || event.metaKey || event.altKey)) {
            //$bar.focus();
        // }
        // When the user hits ENTER, launch search
        if (event.which === 13) {
            if ($bar.is(":focus")){
                hist.doSearch($bar.val());
            }
        }
    });

    // Click events

    // whenever bar gets focus
    $(".bar:text").focus(function() {
        $(this).select();
    });

    // Make search when search button is clicked
    $(".search-icon").on("click", function() {
        hist.doSearch($bar.val());
    });

    // Toggle result when user click on an entry
    $("#list-container").on("click", ".entry", function() {
        // get corresponding result
        $(this).next().toggleClass("result-active");
    });

    // Toggle history view when user click on history button
    $(".history-icon").on("click", function() {
        if (hist.histView)
            hist.unrender();
        else
            hist.render();
    });

    $("#list-container").on("click", ".icon-readmore", function() {
        var entry = $(this).parent().parent().prev().children(".entry-text").text();
        var searchURL = "https://www.google.com/#q=" + encodeURI(entry);
        console.log(searchURL);
        chrome.tabs.create({url: searchURL});
    });

    // Allow user to edit content with comment button
    $("#list-container").on("click", ".icon-comment", function() {
        // select the text field (result text)
        var $resultText = $(this).parent().prev();

        $resultText.attr('contenteditable', function(index, attr) {
            return attr === 'true' ? 'false' : 'true';
        });
        if ($resultText.is(":focus")) {
            $resultText.blur();
        }
        else {
            $resultText.focus();
        }
        $resultText.parent().parent().toggleClass("editing");
        // console.log($(this).parent().prev().html());

        var entry  = $(this).parent().parent().prev().children(".entry-text").text();
        var result = $(this).parent().prev()[0].innerHTML;
        console.log(entry, result);
        hist.add(entry, result);
    });

    $("#list-container").on("click", ".icon-remove", function(e){
       // e.preventDefault();
        var entry = $(this).prev().text();
        hist.del(entry);
        var $card = $(this).parent().parent();
        $card.slideUp("normal", function() {
            $card.remove();
        });
    });
});
