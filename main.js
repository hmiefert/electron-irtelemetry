const { app, BrowserWindow } = require('electron');
const path = require("path")

const createWindow = () => {
  const win = new BrowserWindow({
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