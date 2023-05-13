/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title)
})

contextBridge.exposeInMainWorld('createWindow', {
    createDialog: (width, heigth, htmlname) => ipcRenderer.send('add-site', width, heigth, htmlname)
})

contextBridge.exposeInMainWorld('addSite', {

})

window.addEventListener('DOMContentLoaded', () => {
     const replaceText = (selector, text) => {
         const element = document.getElementById(selector)
         if (element) element.innerText = text
     }

     for (const type of ['chrome', 'node', 'electron']) {
         replaceText(`${type}-version`, process.versions[type])
     }

     // document.getElementById('button').addEventListener('click', ()=> {
     //     LaunchParser();
     // })

    // const setButton = document.getElementById('btn')
    // const titleInput = document.getElementById('title')
    // setButton.addEventListener('click', () => {
    //     const title = titleInput.value
    //     window.electronAPI.setTitle(title)
    // });

     function LaunchParser(){
         const process = require('child_process');
         const urlElement = document.getElementById("URL")
         const keyWordElement = document.getElementById("key-word")

         let url = urlElement.value;
         let keyWord = keyWordElement.value;
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

     const fs = require('fs');
     const readline = require('readline');
     const path = require('path');

     function AddElements(){
         fs.readdir(path.resolve(__dirname, "Files"), (err, files) => {
             let objects = [];
             let div = document.getElementById('files-list-container');
             div.innerHTML = "";
             for (let i = 0; i < files.length; i++){
                 if (files[i].includes('.txt') && files[i].includes('PRIS')){
                     let siteName = files[i];
                     siteName = siteName.substring(5, siteName.length - 4);
                     fs.readFile('Files/' + files[i], function(err, data) {
                         if (err) throw err;
                         // let array = data.toString().split("\n");
                         let newElement = document.createElement('div');
                         // newElement.onclick = alert('Кнопка нажата!');
                         div.appendChild(newElement);
                         newElement.className = "file";
                         let p = document.createElement('p')
                         p.className = "filename";
                         p.textContent = siteName;
                         newElement.appendChild(p);
                     });
                 }
             }
         })
     }

     AddElements();

     document.getElementById('download-links').addEventListener('click', ()=> {
         // AddElements();
     })
})

// contextBridge.exposeInMainWorld('ctrls', {
//     wctrl: (btn) => ipcRenderer.invoke('ctrls', btn)
// });
