import {
  app,
  BrowserWindow,
  ipcMain,
  IpcMainEvent,
  Menu,
  MenuItemConstructorOptions,
  screen
} from 'electron'

ipcMain.on('quit', () => {
  const template: MenuItemConstructorOptions[] = [
    {
      label: '退出',
      click: () => {
        app.quit()
      }
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  menu.popup()
})

ipcMain.on('drag', (event, opt) => {
  const { x, y } = opt
  const win = BrowserWindow.fromWebContents(event.sender)
  if (win) {
    const [winX, winY] = win.getPosition()
    win.setPosition(winX + x, winY + y)
  }
})

ipcMain.on(
  'setWindowPosition',
  (
    event: IpcMainEvent,
    position: 'leftTop' | 'rightTop' | 'leftBottom' | 'rightBottom' | 'center'
  ) => {
    const win = BrowserWindow.fromWebContents(event.sender)

    if (win) {
      // 获取当前窗口的显示器

      const { size } = screen.getDisplayMatching(win.getBounds())
      switch (position) {
        case 'leftTop':
          win.setPosition(0, 0)
          break
        case 'rightTop':
          // win.setPosition(size.width - win.getSize()[0], 0)
          win.setBounds({
            x: size.width - win.getSize()[0],
            y: 0
          })
          break
        case 'leftBottom':
          win.setPosition(0, size.height - win.getSize()[1])
          break
        case 'rightBottom':
          win.setPosition(size.width - win.getSize()[0], size.height - win.getSize()[1])
          break
        case 'center': {
          // 计算窗口的位置，使其居中
          const x = Math.round((size.width - win.getSize()[0]) / 2)
          const y = Math.round((size.height - win.getSize()[1]) / 2)

          win.setPosition(x, y)
          break
        }
      }
    }
  }
)
