import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron'

ipcMain.on(
  'setWindowSize',
  (
    event: IpcMainEvent,
    { width, height, aspectRatio }: { aspectRatio: number; width?: number; height?: number }
  ) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (!win) return
    win.setAspectRatio(aspectRatio)

    if (width) {
      win.setBounds({
        width,
        height
      })
      // win.setSize(width, height || width / aspectRatio)
    }
  }
)
