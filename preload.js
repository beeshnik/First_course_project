/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */

 window.addEventListener('DOMContentLoaded', () => {
     const replaceText = (selector, text) => {
         const element = document.getElementById(selector)
         if (element) element.innerText = text
     }

     for (const type of ['chrome', 'node', 'electron']) {
         replaceText(`${type}-version`, process.versions[type])
     }

     document.getElementById('button').addEventListener('click', ()=> {
         const process = require('child_process');

         const cmd = "start start.bat";

         const outputElement = document.getElementById("output")
         outputElement.value = null;
         let child = process.spawn(cmd);

         child.on('error', function(err){
             outputElement.value += 'error: ' + err + '\n';
         })

         child.stdout.on('data', function (data){
             outputElement.value += data + '\n';
         })

         child.stderr.on('data', function (data){
             outputElement.value += 'stderr' + data + '\n'
         })

         child.on('close', function (code){
             outputElement.value += 'command complete.'
         })
     })
})

