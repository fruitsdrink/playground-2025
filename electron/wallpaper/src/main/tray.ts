import { is } from '@electron-toolkit/utils'
import { Menu, Tray } from 'electron'
import path from 'path'

export const createTray = (): void => {
  const tray = new Tray(
    path.resolve(
      __dirname,
      process.platform === 'darwin'
        ? '../../resources/trayTemplate@2x.png'
        : '../../resources/trayTemplate.png'
    )
  )

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      role: 'quit'
    }
  ])

  if (is.dev) {
    tray.on(
      'click',
      (event: Electron.KeyboardEvent, bounds: Electron.Rectangle, position: Electron.Point) => {
        console.log('tray click')
        console.log(event)
        console.log(bounds)
        console.log(position)
        tray.popUpContextMenu(contextMenu)
      }
    )
  }
  tray.setToolTip('桌面壁纸')
  tray.setContextMenu(contextMenu)
}
