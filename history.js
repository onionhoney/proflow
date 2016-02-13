
var hist = {};
hist.cache = {};

hist.add = function(entry, result) {
    entry = entry.trim().split(/\s+/).join(' ')
    this.cache[entry] = result.trim();
};

hist.del = function(entry) {
    delete this.cache[entry.trim()];
};

function render() {
    var list = document.getElementById('list-container');

    hist.forEach(function renderEntry(entry) {
        var ul = document.createElement('ul');
        var entry_node = document.createTextNode(entry);
        // ul.innerHTML = entry;
        ul.appendChild(entry_node);

        list.appendChild(ul);
    });
}
