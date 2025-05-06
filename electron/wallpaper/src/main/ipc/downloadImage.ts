import { dialog, ipcMain, IpcMainInvokeEvent } from 'electron'
import { downloadWallpaper } from '../utils'

ipcMain.handle('downloadImage', async (_event: IpcMainInvokeEvent, url: string) => {
  // 模拟1秒钟延迟
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, 1000)
  })
  console.log(url)
  const fileName = url.split('/').pop()

  const res = await dialog.showSaveDialog({
    title: '下载图片',
    message: '请选择图片保存位置',
    defaultPath: fileName,
    properties: ['createDirectory']
  })
  if (!res.canceled && res.filePath) {
    await downloadWallpaper(url, res.filePath)
  }
})
