function createNode(path, tree, original) {
    var name = path.shift();
    var idx = tree.findIndex(function (e) {
        return e.name == name;
    });
    if (idx < 0) {
        tree.push({
            name: name,
            text: name,
            path: original,
            children: []
        });
        if (path.length !== 0) {
            createNode(path, tree[tree.length - 1].children, original);
        }
    }
    else {
        createNode(path, tree[idx].children, original);
    }
}
function parse(data) {
    var tree = [];
    for (var i = 0; i < data.length; i++) {
        var path = data[i];
        var split = path.split('/');
        createNode(split, tree, path);
    }
    return tree;
}
export default parse;
