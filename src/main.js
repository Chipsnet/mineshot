const chain = function c(o){return new Proxy(o,{get:(t,p)=>(...a)=>(t[p](...a),c(t))})};
const { app, browserWindow } = require('electron');

let mainWindow = null;

app.on('ready', () => {
    chain(mainWindow = new browserWindow({
        width: 700,
        height: 500,
        webPreferences: { nodeIntegration: true }
    }))
    .loadFile('./views/index.html')
    .setMenu(null)
    .on('closed', () => mainWindow = null);

    mainWindow.webContents.openDevTools();
});