const { app, BrowserWindow } = require('electron')
const path = require('path')

// creation d'une fenetre
function createWindow(){
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        minWidth: 1024,
        minHeight: 640,
        closable: true,
        darkTheme: true,
        // frame: false,
        icon: path.join(__dirname, './ico.ico'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
            devTools: true,
            preload: path.join(__dirname,"preload.js")
        }
    })
    win.loadFile("index.html")
    // win.loadURL("https://www.google.com")
    win.webContents.openDevTools()
}
//  quand electron est pret

app.whenReady().then(()=> {
    createWindow()

    app.on('activate',() => {
        if(BrowserWindow.getAllWindows().length === 0){
            createWindow()
        }
    })
}) 
// gestion de la fermeture des fenetres

app.on('window-all-closed', () => {
    if (process.plateform !== 'darwin') {
        app.quit()
    }
})
