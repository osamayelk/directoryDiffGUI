const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const {ipcMain} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let compareWindow
function createWindow () {
  // Create the browser window.
mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    'min-width': 500,
    'min-height': 200,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden'
  });
  //mainWindow.webContents.openDevTools()

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
  	pathname: path.join(__dirname, 'index.html'),
  	 protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

ipcMain.on('asynchronous-message', (event, arg) => {
  if(arg[0] == 'show-comparison') {
        compareWindow = new BrowserWindow({
    width: 800,
    height: 600,
    'min-width': 500,
    'min-height': 200,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden',
    parent: mainWindow,
    modal: true,
});
    //compareWindow.webContents.openDevTools()
  compareWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'textCompare.html'),
     protocol: 'file:',
    slashes: true
  }));
    compareWindow.on('closed', function() {
      compareWindow = null; 
  });
    compareWindow.webContents.on('did-finish-load',function(){
      compareWindow.webContents.send('data',[arg[1],arg[2],arg[3]])
    });
  }
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})