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

         LaunchParser();
     })

     function LaunchParser(){
         const process = require('child_process');
         const urlElement = document.getElementById("URL")
         const keyWordElement = document.getElementById("key-word")

         let url = urlElement.innerText;
         let keyWord = keyWordElement.innerText;
         let cmd = "start PowerIsPower.exe" + " " + url + " " + keyWord;

         //const outputElement = document.getElementById("button")
         //outputElement.value = null;
         let child = process.exec(cmd);

         child.on('error', function(err){
             // outputElement.value += 'error: ' + err + '\n';
             console.log('error: ' + err + '\n');
         })

         child.stdout.on('data', function (data){
             // outputElement.value += data + '\n';
             console.log(data + '\n');
         })

         child.stderr.on('data', function (data){
             // outputElement.value += 'stderr' + data + '\n'
             console.log('stderr' + data + '\n');
         })

         child.on('close', function (code){
             // outputElement.value += 'command complete.'
             console.log('command complete.' + '\n');
         })
     }
})

