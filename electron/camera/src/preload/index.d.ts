import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      quit: () => void
      drag: (opt: { x: number; y: number }) => void
      setWindowSize: (opt: { width: number; height: number; aspectRatio: number }) => void
      setResize: (cb: (width: number, height: number) => void) => void
      setWindowPosition: (
        position: 'leftTop' | 'rightTop' | 'leftBottom' | 'rightBottom' | 'center'
      ) => void
    }
  }
}
