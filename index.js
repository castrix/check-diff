const pathListToTree = require("path-list-to-tree");
var tree = require('text-treeview');

// const branches = prompt("branches: (e.g: <branch>...<branch>)")
// execSync(`git diff --name-status ${branches} --output=data`)

const main = (data) => {
  data = data.replace(/^(A|M|D)	(.+)/g, "$2----$1")
  const allDiff = data.split("\n")
  const treeList = pathListToTree(allDiff)
  console.log(tree(treeList))
}

var fs = require('fs');
fs.readFile(process.cwd() + "/data", function (err, data) {
  if (err)
    console.log(err)
  else
    main(data.toString())
});