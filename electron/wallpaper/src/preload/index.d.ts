import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      setWallpaper: (url: string) => Promise<void>
      downloadImage: (url: string) => Promise<void>
    }
  }
}
