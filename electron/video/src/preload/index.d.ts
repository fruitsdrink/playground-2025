import { CompressOptions, SelectFileOptions, VideoInfo } from '../types'
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      compress: (file: CompressOptions) => void
      registerOnCompressError: (
        cb: (arg: { file: VideoInfo; error: { message: string } }) => void
      ) => void
      registerOnCompressProgress: (cb: (arg: { file: VideoInfo; percent: number }) => void) => void
      registerOnCompressEnd: (cb: (arg: { file: VideoInfo }) => void) => void
      selectFile: () => Promise<[SelectFileOptions]>
    }
  }
}
