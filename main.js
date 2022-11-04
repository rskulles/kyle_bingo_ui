const {app, BrowserWindow, ipcMain, nativeTheme} = require('electron')
const path = require('path')
const https = require('https')

const createWindow = ()=>{
    const win = new BrowserWindow({
        width:900,
        height:900,
        titleBarStyle: "default",
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname,'preload.js')
        }
    })
    nativeTheme.themeSource = 'dark'
    ipcMain.handle('ping', ()=>'pong')
    ipcMain.handle('get-board-data', ()=>{
        let request =  https.get('https://imsuper.fun/board',(res)=>{
            if(res.statusCode !== 200){
                res.resume()
                return
            }
            let data = ''
            res.on('data',(chunk)=>{
                data+=chunk
            })
            res.on('close',()=>{
                let boardData= JSON.parse(data)
                win.webContents.send('update-board',boardData)
            })
        })
    })

    win.loadFile('index.html')
}

app.whenReady().then(()=>{
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
})

app.on('window-all-closed',()=>{
    if(process.platform!=='darwin') app.quit()
})

