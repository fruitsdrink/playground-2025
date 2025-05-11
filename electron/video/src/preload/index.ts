import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { CompressOptions, SelectFileOptions, VideoInfo } from '../types'

// Custom APIs for renderer
const api = {
  compress: (file: CompressOptions) => {
    ipcRenderer.send('compress', file)
  },
  registerOnCompressError: (
    callback: (arg: { file: VideoInfo; error: { message: string } }) => void
  ) => {
    ipcRenderer.on('compress-error', (_event, arg) => {
      callback(arg)
    })
  },
  registerOnCompressProgress: (callback: (arg: { file: VideoInfo; percent: number }) => void) => {
    ipcRenderer.on('compress-progress', (_event, arg) => {
      callback(arg)
    })
  },
  registerOnCompressEnd: (callback: (arg: { file: VideoInfo }) => void) => {
    ipcRenderer.on('compress-end', (_event, arg) => {
      callback(arg)
    })
  },
  selectFile: async (): Promise<[SelectFileOptions]> => {
    return await ipcRenderer.invoke('select-file')
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
