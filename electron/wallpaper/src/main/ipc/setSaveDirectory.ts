import { dialog, ipcMain } from 'electron'

ipcMain.handle('setSaveDirectory', async () => {
  const res = await dialog.showOpenDialog({
    title: '保存图片目录',
    message: '请选择保存图片目录',

    properties: ['createDirectory', 'openDirectory']
  })

  if (!res.canceled && res.filePaths && res.filePaths.length) {
    return res.filePaths[0]
  } else {
    return ''
  }
})
