import { Menu, MenuItemConstructorOptions, Tray } from 'electron'
import path from 'path'

export const createTray = (): void => {
  let iconPath =
    process.platform === 'darwin'
      ? '../../resources/trayTemplate@2x.png'
      : '../../resources/trayTemplate.png'
  iconPath = path.resolve(__dirname, iconPath)

  const tray = new Tray(iconPath)

  const menuTemplate: MenuItemConstructorOptions[] = [
    {
      label: '退出',
      role: 'quit'
    }
  ]

  const contextMenu = Menu.buildFromTemplate(menuTemplate)

  tray.setToolTip('Camera')
  tray.setContextMenu(contextMenu)
}
