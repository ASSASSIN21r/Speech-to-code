const electron = require('electron');
// const { channels } = require('../src/shared/constants');
// const {runServer} = require('./../linkers/testing')
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

const path = require('path');
// const url = require('url');
// const fs = require("fs");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    // console.log(`${__dirname}`);
    mainWindow = new BrowserWindow({
        width: 800, 
        height: 600,
        backgroundColor: "white",
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: true, // turn off remote
            preload: path.join(__dirname + "/preload.js") // use a preload script
          }
    });

    // const startUrl = process.env.ELECTRON_START_URL || url.format({
    //     pathname: path.join(__dirname, '../public/index.html'),
    //     protocol: 'file:',
    //     slashes: true,
    // });

    // and load the index.html of the app.
    mainWindow.loadURL("http://localhost:3000");
    // mainWindow.loadURL(startUrl);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('notify', (event, msg) => {
    console.log('Started Python');
    var {PythonShell} = require('python-shell');

    var options={
        scriptPath: path.join(__dirname, './../python/'),
        args:msg
    } 

    var getText = PythonShell.run('testing2.py', options, ()=>{
        console.log('Python file is closed')
    });
    
    getText.on('message', (message)=>{
        // console.log(message);
        if (message === 'if'){
            mainWindow.webContents.send('fromMain',['if():',3])
        }else if(message ==='while'){
            mainWindow.webContents.send('fromMain',['while():',6])
        }else if(message === 'print'){
            mainWindow.webContents.send('fromMain', ['print()',6])
            
        }else if(message === 'input'){
            mainWindow.webContents.send('fromMain', ['input("")',6])
            
        }else if(message === 'for loop'){
            mainWindow.webContents.send('fromMain', ['for x in  :',11])
            
        }else if(message === 'next'){
            mainWindow.webContents.send('fromMain', ['\n',1])
            
        }else if(message === 'define function'){
            mainWindow.webContents.send('fromMain', ['def function_():',13])
            
        }else if(message === 'print text'){
            mainWindow.webContents.send('fromMain', ['print("")',6])
            
        }else if(message === 'try'){
            mainWindow.webContents.send('fromMain', ['try:',4])
            
        }else if(message === 'except'){
            mainWindow.webContents.send('fromMain', ['except:',7])
            
        }
        else if(message === 'double inverted comma'){
            mainWindow.webContents.send('fromMain', ['""',1])
            
        }else if(message === 'comma'){
            mainWindow.webContents.send('fromMain', [',',2])
            
        }else if(message === 'comment'){
            mainWindow.webContents.send('fromMain', ['#',2])
            
        }else if(message === 'list'){
            mainWindow.webContents.send('fromMain', ['list_one=[]',8])
            
        }else if(message === 'point'){
            mainWindow.webContents.send('fromMain', ['.',2])
            
        }else if(message === 'dot'){
            mainWindow.webContents.send('fromMain', ['.',2])
            
        }else if(message === 'for'){
            mainWindow.webContents.send('fromMain',['for():', 4])
        }else if(message === 'else'){
            mainWindow.webContents.send('fromMain',['else:', 6])
        }else if(["Speak Anything :", "converting wait", "Limits are met", "Could not identify", "Error occured"].includes(message)){
            console.log(message)
        }else{
            const pos = message.length
            mainWindow.webContents.send('fromMain',[message, pos+1])
        }

        
    })
  });