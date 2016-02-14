var API_KEY = "AIzaSyAe0ReD5igVVJFmDMJKHCAOU3nRHT4E2As";
var CX = "011043985394505284497%3A04toexks_gs"; 


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





var hist = {};
hist.cache = {};

hist.add = function(entry, result) {
    entry = entry.trim().split(/\s+/).join(' ');
    this.cache[entry] = result.trim();
};

hist.del = function(entry) {
    entry = entry.trim().split(/\s+/).join(' ');
    delete this.cache[entry];
};

hist.render = function($list) {
    $list.innerHTML = '';

    entries = Object.keys(this.cache);
    entries.sort();
    entries.forEach(function (entry) {

        var ul = document.createElement('li');

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
