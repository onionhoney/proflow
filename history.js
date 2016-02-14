
var hist = {};
hist.cache = {};

hist.add = function(entry, result) {
    entry = entry.trim().split(/\s+/).join(' ')
    this.cache[entry] = result.trim();
};

hist.del = function(entry) {
    delete this.cache[entry.trim()];
};

function render($list) {
    $list.innerHTML = '';

    for (var entry in hist.cache) {

        var ul = document.createElement('ul');

        var entry_node = document.createElement("span");
        entry_node.innerHTML = entry;
        var entry_attr = document.createAttribute("class");
        entry_attr.value = "entry"
        entry_node.setAttributeNode(entry_attr);

        var result_node = document.createElement("span");
        result_node.innerHTML = hist.cache[entry];
        var result_attr = document.createAttribute("class");
        result_attr.value = "result";
        result_node.setAttributeNode(result_attr);

        ul.appendChild(entry_node);
        ul.appendChild(result_node);

        $list.appendChild(ul);
    }
}
