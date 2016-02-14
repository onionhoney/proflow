/*
 * ****** HELPER FUNCTION ******
 */

/**
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

var Hist = function() {
    this.histView = true;
    this.cache = {};

    this.init = function() {
        var localCache = this.cache;
        var localThis = this;
        chrome.storage.sync.get("hist_cache", function(data){
            for (var item in data.hist_cache) {
                var entry = item, result = data.hist_cache[item];
                localCache[entry] = result;
            }
            console.log("Copied to cache as " , localCache);
            localThis.render();
        });
    };

    this.saveChanges = function() {
        var localCache = this.cache;
        chrome.storage.sync.set({'hist_cache': localCache}, function(){
            console.log('Successfully saved item ', localCache);
        });
    };

    this.add = function(entry, result) {
        this.cache[format(entry)] = result.trim();
        this.saveChanges();
    };

    this.del = function(entry) {
        delete this.cache[format(entry)];
        this.saveChanges();
    };

    this.unrender = function() {
        var list = document.getElementById("list-container");
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
        this.histView = false;
    };

    /**
     * render history into list
     *
     * first clear all entries in the node given,
     * then append child to node in alphabetical order
     */
    this.render = function() {
        this.unrender();
        var list = document.getElementById("list-container");
        var entries = Object.keys(this.cache);
        entries.sort();
        entries.forEach(function (query) {
            var hist_div = gen_node(query, this.cache[query]);
            list.appendChild(hist_div);
        });
        this.histView = true;
    };

    /**
     * returns corresponding query result
     *
     * background handling of query,
     * not intended as public hist interface
     */
    this.search = function(query, callback) {
        query = format(query);
        var result;

        if (query in this.cache) {
            // cached result
            result = this.cache[query];
            callback(query, result);
        }
        else {
            // new search and cache result
            if (DEBUG) {
                // debug mode
                var data = googleAPISampleJSON;
                // console.log(data);
                // var firstEntry = data.items[0];
                // result is in the first entry
                result = data.items[0].snippet;
                console.log(result);
                this.add(query, result);
                callback(query, result);
            }
            else {
                // normal search
                var url = API_BASEURL + encodeURI(query) + "&cx=" + API_CX + "&key=" + API_KEY;
                $.get(url, function(data) {
                    // console.log(data);
                    // result is in the first entry
                    result = data.items[0].snippet;
                    console.log(result);
                    this.add(query, result);
                    callback(query, result);
                });
            }
        }
    };

    /**
     * callback function passed into search
     */
    this.processResult = function(query, result) {
        // destroy history view
        this.unrender();
        // present current result
        var node = gen_node(query, result);
        $(node).find(".result").toggleClass("result-active");
        var list = document.getElementById("list-container");
        list.appendChild(node);
        this.histView = false;
    };

    /**
     * do search and hide history view and present current search result
     */
    this.doSearch = function(query) {
        query = format(query);
        this.search(query, this.processResult);
    };

    /**
     * create node from entry and result
     */
    this.gen_node = function(entry, result) {
        var node = document.createElement("div");
        node.classList.add("card");

        // entry
        var entry_node = document.createElement("div");
        entry_node.classList.add("entry");
        entry_node.innerHTML = entry;

        // result
        var result_node = document.createElement("div");
        result_node.classList.add("result");

        var result_text = document.createElement("div");
        result_text.innerHTML = this.cache[entry];
        // for 'readmore' and 'comment' button
        var minimenu_node = document.createElement("div");
        minimenu_node.classList.add("minimenu");
        minimenu_node.innerHTML =
            '<span class="icon-readmore"><i class="fa fa-share" ></i> </span>' +
            '<span class="icon-comment "><i class="fa fa-comment"></i></span>' +
            '';

        result_node.appendChild(result_text);
        result_node.appendChild(minimenu_node);

        node.appendChild(entry_node);
        node.appendChild(result_node);

        return node;
    };

    return this;
};
