import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  setWallpaper: async (url: string, path: string): Promise<void> => {
    await ipcRenderer.invoke('setWallpaper', url, path)
  },
  downloadImage: async (url: string, path: string): Promise<void> => {
    // alert(url)
    return await ipcRenderer.invoke('downloadImage', url, path)
  },
  setSaveDirectory: async (): Promise<string> => {
    return await ipcRenderer.invoke('setSaveDirectory')
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
