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
    // 获取当前屏幕
    const currentDisplay = screen.getDisplayMatching(win.getBounds())
    win.webContents.send('currentDisplayId', currentDisplay.id)
  }
})

ipcMain.on(
  'setWindowPosition',
  (
    event: IpcMainEvent,
    opt: {
      position: 'leftTop' | 'rightTop' | 'leftBottom' | 'rightBottom' | 'center'
      displayId: number
    }
  ) => {
    const win = BrowserWindow.fromWebContents(event.sender)

    if (win) {
      let currentDisplay = screen.getDisplayMatching(win.getBounds())
      win.webContents.send('currentDisplayId', currentDisplay.id)

      // 获取所有屏幕
      const displays = screen.getAllDisplays()
      const display = displays.find((d) => d.id === opt.displayId)
      let currentDisplayId = currentDisplay.id
      if (display) {
        currentDisplayId = display.id
      }

      if (currentDisplayId !== currentDisplay.id) {
        currentDisplay = displays.find((d) => d.id === currentDisplayId)!
      }

      switch (opt.position) {
        case 'leftTop':
          win.setPosition(currentDisplay.bounds.x, 0)
          break
        case 'rightTop':
          // win.setPosition(size.width - win.getSize()[0], 0)
          win.setBounds({
            x: currentDisplay.bounds.x + currentDisplay.size.width - win.getSize()[0],
            y: 0
          })
          break
        case 'leftBottom':
          win.setPosition(
            currentDisplay.bounds.x,
            currentDisplay.bounds.y + currentDisplay.size.height - win.getSize()[1]
          )
          break
        case 'rightBottom':
          win.setPosition(
            currentDisplay.bounds.x + currentDisplay.size.width - win.getSize()[0],
            currentDisplay.bounds.y + currentDisplay.size.height - win.getSize()[1]
          )
          break
        case 'center': {
          const x = Math.round(
            currentDisplay.bounds.x + currentDisplay.bounds.width / 2 - win.getSize()[0] / 2
          )
          const y = Math.round(
            currentDisplay.bounds.y + currentDisplay.bounds.height / 2 - win.getSize()[1] / 2
          )

          win.setPosition(x, y)
          break
        }
      }
    }
  }
)
