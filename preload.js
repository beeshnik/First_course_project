const { contextBridge, ipcRenderer } = require('electron')
const {ipcMain} = require('electron')
const fs = require('fs')
const path = require('path')

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title)
})

contextBridge.exposeInMainWorld('createWindow', {
    createDialog: (width, heigth, htmlname) => ipcRenderer.send('create-window', width, heigth, htmlname)
})

contextBridge.exposeInMainWorld('addNewSite', {
    addSite: (url) => ipcRenderer.send('add-site', url)
})

contextBridge.exposeInMainWorld('updateFiles', {
    updateFileList: (callback) => ipcRenderer.on('updateFileList', callback)
})

contextBridge.exposeInMainWorld('test', {
    getValuesArray: () => ipcRenderer.invoke('arrays')
})
window.addEventListener('DOMContentLoaded', () => {
     const replaceText = (selector, text) => {
         const element = document.getElementById(selector)
         if (element) element.innerText = text
     }

     for (const type of ['chrome', 'node', 'electron']) {
         replaceText(`${type}-version`, process.versions[type])
     }
})

// contextBridge.exposeInMainWorld('ctrls', {
//     wctrl: (btn) => ipcRenderer.invoke('ctrls', btn)
// });
