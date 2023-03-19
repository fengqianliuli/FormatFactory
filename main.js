const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const Ffmpeg = require('fluent-ffmpeg')

let win = null

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './src/preload/preload.js')
    }
  })

  win.loadURL('http://localhost:5173')

  win.webContents.openDevTools()
}

const handleFileOpen = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: '选择要转换的文件',
    buttonLabel: '选择',
    filters: [
      { name : '所有文件', extensions: ['*'] },
      { name: '视频', extensions: ['mp4', 'avi', 'mkv'] }
    ],
    properties: ['openFile']
  })
  if (canceled) {
    return
  } else {
    return filePaths[0]
  }
}

const handleDirOpen = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: '选择转换后文件保存的目标文件夹',
    buttonLabel: '选择',
    properties: ['openDirectory']
  })
  if (canceled) {
    return
  } else {
    return filePaths[0]
  }
}

const handleConvert = async (e, file, dir, targetFormat) => {
  Ffmpeg(file)
    .format(targetFormat)
    .on('progress', (progress) => {
      win.webContents.send('convert:progress', progress.percent)
    })
    .on('end', () => {
      win.webContents.send('convert:progress', 100.0)
    })
    .save(dir + '/' + path.basename(file, path.extname(file)) + '.' + targetFormat)
}

app.whenReady().then(() => {
  ipcMain.handle('dialog:openFile', handleFileOpen)
  ipcMain.handle('dialog:openDir', handleDirOpen)
  ipcMain.handle('convert:start', handleConvert)
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})