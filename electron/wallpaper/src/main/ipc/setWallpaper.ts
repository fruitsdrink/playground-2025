import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { resolve } from 'path'
import fs from 'fs'
import { setWallpaper, getWallpaper } from 'wallpaper'
import { downloadWallpaper } from '../utils'

ipcMain.handle('setWallpaper', async (_event: IpcMainInvokeEvent, url: string) => {
  const fileName = url.split('/').pop()
  if (!fileName) return
  const savePath = resolve(__dirname, '../wallpaper')
  // 检测目录是否存在，如果不存在则创建目录
  if (!fs.existsSync(savePath)) {
    fs.mkdirSync(savePath)
  }

  const fullName = resolve(savePath, fileName)
  const currentWallpaper = await getWallpaper()
  if (currentWallpaper === fullName) {
    return
  }

  // 下载壁纸
  const isOk = await downloadWallpaper(url, fullName)
  // 设置壁纸
  if (isOk) {
    await setWallpaper(fullName, { screen: 'all', scale: 'auto' })
  }
})
