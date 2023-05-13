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

    ipcMain.on('add-site', (event, width, heigth, htmlname) => {
        if (BrowserWindow.getAllWindows().length === 1) createDialog(width, heigth, htmlname)
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

    mainWindow.loadFile('index.html');
    mainWindow.menuBarVisible = false;

    // - Не работает :(
    // - А должно?

    // app.on(mainWindow.closed, function (){
    //     app.quit();
    // })
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