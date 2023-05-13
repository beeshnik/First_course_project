// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const { contextBridge, ipcMain} = require('electron')
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

    // const menu = Menu.buildFromTemplate([
    //     {
    //         label: "Файл",
    //         submenu: [
    //             {
    //                 click: () => mainWindow.webContents.send('update-counter', 1),
    //                 label: 'Increment'
    //             },
    //             {
    //                 click: () => mainWindow.webContents.send('update-counter', -1),
    //                 label: 'Decrement'
    //             }
    //         ]
    //     }
    // ])

    // Menu.setApplicationMenu(menu)

    mainWindow.loadFile('index.html')
    mainWindow.menuBarVisible = false;
}

function createDialog(width, heigth){
    const newWindow = new BrowserWindow({
        width: width,
        height: heigth,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

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