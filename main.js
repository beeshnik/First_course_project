// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, dialog} = require('electron')
const path = require('path')
const { contextBridge, ipcMain} = require('electron')
const {ipcRenderer} = require('electron')
const process = require('child_process')
const fs = require("fs");

function createWindow () {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    ipcMain.on('set-title', (event, title) => {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.setTitle(title)
    })

    ipcMain.on('create-window', (event, width, heigth, htmlname) => {
        if (BrowserWindow.getAllWindows().length === 1) createDialog(width, heigth, htmlname)
    });

    function getValuesArray(){
        let objects = []
        let strings = fs.readdirSync(path.resolve(__dirname, 'Files'))
        for (let i = 0; i < strings.length; i++){
            if (strings[i].includes('.txt') && strings[i].includes('PRIS')){
                const file = fs.readFileSync('Files/' + strings[i], 'utf-8')
                let array = file.toString().split("\n" || "\r")
                let link = array[0];
                link = link.substring(0, link.length - 1)
                let path = strings[i];
                let siteName = path.substring(5, path.length - 4);
                let object = {
                    objectPath: path,
                    objectName: siteName,
                    objectLink: link,
                }
                objects.push(object)
            }
        }
        return objects
    }

    ipcMain.handle('arrays', (event) => {
        // Создаёт диалог и отправляет результат в preload.js
        return getValuesArray()
    })

    mainWindow.loadFile('index.html');
    mainWindow.menuBarVisible = false;
}



function createDialog(width, heigth, gui){
    const newWindow = new BrowserWindow({
        width: width,
        height: heigth,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    newWindow.menuBarVisible = false;
    newWindow.setResizable(false)
    newWindow.setTitle("Добавление сайта")
    newWindow.setMinimizable(false);
    newWindow.maximizable = false;
    newWindow.loadFile(gui);

    ipcMain.on('add-site', (event, url) => {
        (async () => {
            await addSite(url);
        })();
        newWindow.close();
    })
}

app.whenReady().then(() => {
    createWindow()


    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

function addSite(url) {
    let adress = './Files/SavePageCode.exe'
    let dirPath = __dirname + '\\Files\\'
    let newSite = process.execFile(adress, ['-u', url, '-r', dirPath] ,  {
        // windowsHide: false
    })

    newSite.on('error', function(err){
        // outputElement.value += 'error: ' + err + '\n';
        console.log('error: ' + err + '\n');
    })

    newSite.stdout.on('data', function (data){
        // outputElement.value += data + '\n';
        console.log(data + '\n');
    })

    newSite.stderr.on('data', function (data){
        // outputElement.value += 'stderr' + data + '\n'
        console.log('stderr' + data + '\n');
    })

    newSite.on('close', function (code){
        // outputElement.value += 'command complete.'
        console.log('command complete.' + '\n');
    })
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// var getFiles = function (dir, files_){
//
//     files_ = files_ || [];
//     var files = fs.readdirSync(dir);
//     for (var i in files){
//         var name = dir + '/' + files[i];
//         if (fs.statSync(name).isDirectory()){
//             getFiles(name, files_);
//         } else {
//
//             files_.push(name);
//         }
//     }
//     return files_;
// };

//console.log(getFiles('./Files'));

// ipcMain.handle('ctrls', (e, btn) => {
//     let res = {class: btn, btn: null};
//     if (btn === 'min-btn') {
//         mainWindow.minimize();
//     } else if (btn === 'max-btn') {
//         if (!mainWindow.isMaximized()){
//             mainWindow.maximize();
//             res.btn = 'MAX';
//         } else {
//             mainWindow.unmaximize();
//             res.btn = 'UNMAX';
//         }
//     } else if (btn === 'close-btn') {
//         mainWindow.close();
//     } else if (btn === 'resize') {
//         if (mainWindow.isMaximized()) {
//             mainWindow.maximize();
//             res.btn = 'MAX';
//         } else {
//             mainWindow.unmaximize();
//             res.btn = 'UNMAX';
//         }
//     }
//     return res;
// })