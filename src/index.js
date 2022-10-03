import pathListToTree from './pathListToTree.js';
import tree from 'text-treeview';
import fs from 'fs';

// const branches = prompt("branches: (e.g: <branch>...<branch>)")
// execSync(`git diff --name-status ${branches} --output=data`)

const treeToList = (tree, parent = []) => {
  return tree.map(item => {
    const changeMode = item.path.split("----")[1] || ""
    return `<li><span class="${item.children.length ? 'caret' : ''} ${changeMode}">${item.name}</span>
    ${item.children.length ? `<ul class="nested">${treeToList(item.children)}</ul>` : ''}
    </li>
    `
  }).join("")
}

const writeHtml = (data) => {
  fs.writeFileSync(process.cwd() + '/output/treeview.html',
    `
    <!DOCTYPE html>
    <html>
    <head>
    <title>Page Title</title>
    <link rel="stylesheet" href="treeview.css">
    <script>
    function docReady(fn) {
      // see if DOM is already available
      if (document.readyState === "complete" || document.readyState === "interactive") {
          // call on next available tick
          setTimeout(fn, 1);
      } else {
          document.addEventListener("DOMContentLoaded", fn);
      }
    }
    function loadToggle() {
      var toggler = document.getElementsByClassName("caret");
      var i;
      for (i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", function() {
          this.parentElement.querySelector(".nested").classList.toggle("active");
          this.classList.toggle("caret-down");
        });
      }
    }
    docReady(loadToggle)
    </script>
    </head>
    <body>
    <ul id="myUL">
    ${treeToList(data)}
    </ul>
    </body>
    </html>
    `
  )
}

const main = (data) => {
  data = data.replace(/^(A|M|D)	(.+)/gm, "$2----$1")
  const allDiff = data.split("\n")
  const treeList = pathListToTree(allDiff)
  writeHtml(treeList)
  fs.writeFileSync(process.cwd() + '/output/output.json', JSON.stringify(treeList));
  fs.writeFileSync(process.cwd() + '/output/output', tree(treeList));
}

fs.readFile(process.cwd() + "/data", function (err, data) {
  if (err)
    console.log(err)
  else
    main(data.toString())
});