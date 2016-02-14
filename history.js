/**
 * ****** HELPER FUNCTION ******
 *
 * format the search string to make each
 * word is capitalized
 *
 * make sure the string stored in cache is in
 * uniform format
 */
function format(string) {
    trim_split = string.trim().split(/\s+/);
    return trim_split.map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}


// GOOGLE API
var API_KEY = "AIzaSyAe0ReD5igVVJFmDMJKHCAOU3nRHT4E2As";
var API_CX = "011043985394505284497%3A04toexks_gs";
var API_BASEURL = "https://www.googleapis.com/customsearch/v1?q=";
var DEBUG = true;


/**************************
 *                        *
 *     HISTORY OBJECT     *
 *                        *
 **************************/

var hist = {};
hist.cache = {};

hist.add = function(entry, result) {
    this.cache[format(entry)] = result.trim();
};

hist.del = function(entry) {
    delete this.cache[format(entry)];
};


/**
 * returns corresponding query result
 *
 * background handling of query,
 * not intended as public hist interface
 */
hist.search = function(query) {
    query = format(query);
    var result;

    if (query in hist.cache) {
        // cached result
        result = hist.cache[query];
    }
    else {
        // new search and cache result
        if (DEBUG) {
            // debug mode
            var data = googleAPISampleJSON;
            console.log(data);
            // var firstEntry = data.items[0];
            // result is in the first entry
            result = data.items[0].snippet;
        }
        else {
            // normal search
            var url = API_BASEURL + encodeURI(query) + "&cx=" + API_CX + "&key=" + API_KEY;
            $.get(url, function(data) {
                console.log(data);
                // result is in the first entry
                result = data.items[0].snippet;
            });
        }

        // cache result
        hist.add(query, result);
    }

    return result;
};


/**
 * render history into $list
 *
 * first clear all entries in the node given,
 * then append child to node in alphabetical order
 */
hist.render = function($list) {
    $list.innerHTML = '';

    entries = Object.keys(hist.cache);
    entries.sort();
    entries.forEach(function (entry) {

        var ul = document.createElement('ul');

        var entry_node = document.createElement("div");
        entry_node.innerHTML = entry;
        var entry_attr = document.createAttribute("class");
        entry_attr.value = "entry";
        entry_node.setAttributeNode(entry_attr);

        var result_node = document.createElement("div");
        result_node.innerHTML = hist.cache[entry];
        var result_attr = document.createAttribute("class");
        result_attr.value = "result";
        result_node.setAttributeNode(result_attr);

        ul.appendChild(entry_node);
        ul.appendChild(result_node);

        $list.appendChild(ul);
    });
};


/**
 * do search and present in history view
 */
hist.doSearch = function(query) {
    query = format(query);
    hist.search(query);

    var $list = $("#list-container");

    // TODO: try make it happen only when history button is clicked
    hist.render($list);
};
