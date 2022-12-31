const { app, BrowserWindow } = require('electron');
const path = require("path")

// squirrel startup for desktop icon
if (require('electron-squirrel-startup')) app.quit();

const createWindow = () => {
  const win = new BrowserWindow({
    icon: path.join(__dirname, 'images', 'ir_tele.ico'),

    width: 600,
    height: 1200,
    
    // frame: false,
    // transparent: true,
    // alwaysOnTop: true,    
    
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
    },
  });

  win.loadFile('./web/index.html');
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});