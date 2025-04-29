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
  setWindowPosition: (opt: {
    position: 'leftTop' | 'rightTop' | 'leftBottom' | 'rightBottom' | 'center'
    displayId: number
  }) => {
    ipcRenderer.send('setWindowPosition', opt)
  },
  currentDisplayId: (cb: (id: number) => void) => {
    ipcRenderer.on('currentDisplayId', (_event, id) => {
      cb(id)
    })
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
