import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      setWallpaper: (url: string, path: string) => Promise<void>
      downloadImage: (url: string, path: string) => Promise<void>
      setSaveDirectory: () => Promise<string>
    }
  }
}
