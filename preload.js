const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('bingoApi',{
    //node: ()=>process.versions.node,
    //chrome: ()=>process.versions.chrome,
    //electron: ()=>process.versions.electron,
    //ping: ()=> ipcRenderer.invoke('ping'),
    requestBoardData: ()=> ipcRenderer.invoke('get-board-data'),
    handleBoardData: (callback)=>ipcRenderer.on('update-board', callback)
})