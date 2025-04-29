import { BrowserWindow, ipcMain, IpcMainEvent, screen } from 'electron'

ipcMain.on(
  'setWindowSize',
  (
    event: IpcMainEvent,
    { width, height, aspectRatio }: { aspectRatio: number; width?: number; height?: number }
  ) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (!win) return
    win.setAspectRatio(aspectRatio)

    const currentDisplay = screen.getDisplayMatching(win.getBounds())
    let x = win.getBounds().x
    if (width && currentDisplay.bounds.width + width > currentDisplay.size.width) {
      x = currentDisplay.bounds.x + currentDisplay.size.width - width
    }

    win.setBounds({
      width,
      height,
      x
    })
  }
)
