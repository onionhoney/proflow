
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


var hist = {};
hist.cache = {};

hist.add = function(entry, result) {
    // entry = entry.trim().split(/\s+/).join(' ');
    this.cache[format(entry)] = result.trim();
};

hist.del = function(entry) {
    // entry = entry.trim().split(/\s+/).join(' ');
    delete this.cache[format(entry)];
};

/**
 * render history into $list
 *
 * first clear all entries in the node given,
 * then append child to node in alphabetical order
 */
function render($list) {
    $list.innerHTML = '';

    entries = Object.keys(hist.cache);
    entries.sort();
    entries.forEach(function (entry) {

        var ul = document.createElement('ul');

        var entry_node = document.createElement("span");
        entry_node.innerHTML = entry;
        var entry_attr = document.createAttribute("class");
        entry_attr.value = "entry";
        entry_node.setAttributeNode(entry_attr);

        var result_node = document.createElement("span");
        result_node.innerHTML = hist.cache[entry];
        var result_attr = document.createAttribute("class");
        result_attr.value = "result";
        result_node.setAttributeNode(result_attr);

        ul.appendChild(entry_node);
        ul.appendChild(result_node);

        $list.appendChild(ul);
    });
}
