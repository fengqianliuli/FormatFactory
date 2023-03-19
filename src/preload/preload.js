const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  openDir: () => ipcRenderer.invoke('dialog:openDir'),
  startConvert: (file, dir, targetFormat) => ipcRenderer.invoke('convert:start', file, dir, targetFormat),
  onProgress: (callback) => ipcRenderer.on('convert:progress', (e, progress) => callback(progress))
})
