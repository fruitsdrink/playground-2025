import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  quit: () => {
    ipcRenderer.send('quit')
  },
  drag: (opt: { x: number; y: number }) => {
    ipcRenderer.send('drag', opt)
  },
  setWindowSize: (opt: { width: number; height: number; aspectRatio: number }) => {
    ipcRenderer.send('setWindowSize', opt)
  },
  setResize: (cb: (width: number, height: number) => void) => {
    ipcRenderer.on('resize', (_event, { width, height }) => {
      cb(width, height)
    })
  },
  setWindowPosition: (
    position: 'leftTop' | 'rightTop' | 'leftBottom' | 'rightBottom' | 'center'
  ) => {
    ipcRenderer.send('setWindowPosition', position)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
