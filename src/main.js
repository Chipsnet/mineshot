const electron = require('electron');
const app = electron.app;
const browserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on('ready', () => {
    mainWindow = new browserWindow({
        width: 700,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(`file://${__dirname}/views/index.html`)
    mainWindow.setMenu(null)
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});