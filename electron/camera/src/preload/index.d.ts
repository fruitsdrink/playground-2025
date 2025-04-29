import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      quit: () => void
      drag: (opt: { x: number; y: number }) => void
      setWindowSize: (opt: { width: number; height: number; aspectRatio: number }) => void
      setResize: (cb: (width: number, height: number) => void) => void
      setWindowPosition: (opt: {
        position: 'leftTop' | 'rightTop' | 'leftBottom' | 'rightBottom' | 'center'
        displayId: number
      }) => void
      currentDisplayId: (cb: (id: number) => void) => void
    }
  }
}
