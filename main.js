// Modules to control application life and create native browser window
const {session, dialog, app, Menu, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const fs = require('fs');
const os = require('os')
const { default: installExtension, REDUX_DEVTOOLS } = require('electron-devtools-installer');

function createWindow (title = '') {

  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  mainWindow.loadFile('./web/new-app.html')

  mainWindow.webContents.openDevTools()
  mainWindow.setTitle(title);


  return mainWindow;
}

function createAddTypeBoxWindow() {
  BrowserWindow.getFocusedWindow().webContents.send('create:typeBox');
}

const mainMenuTemplate = [
  { label: '' },
  {
    label: "File",
    submenu: [
      {
        label: 'Open',
        click() {
          const browserWindow = createWindow('richy rich');

          // should validate contents to check that it is
          // json and that it matches diagram schema

          browserWindow.webContents.on('did-finish-load', () => {
            const contents = JSON.stringify({
              name: 'Command Pattern',
            });

            browserWindow.webContents.send('create:diagram', contents)
          })
        }
      }
    ]
  },
  {
    label: 'Diagram',
    submenu: [
      {
        label: 'Add Type Box',
        click(menuItem, browserItem, event) {
          createAddTypeBoxWindow();
        },
      },
      {
        label: 'Add Connector',
        submenu: [
          {
            label: 'Horizontal',
            click() {
              BrowserWindow.getFocusedWindow().webContents.send('create:horizontal-connector');
            }
          },
        ],
      }
    ]
  }
];


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  const menu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(menu);

  createWindow();

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
