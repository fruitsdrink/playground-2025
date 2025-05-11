export type CompressOptions = {
  file: VideoInfo
  size: string
  fps: number
}

export type FfmpegProgress = {
  frames: number
  currentFps: number
  currentKbps: number
  targetSize: number
  timemark: string
  percent?: number | undefined
}

export type SelectFileOptions = {
  name: string
  path: string
}

export type VideoInfo = {
  index: number
  name: string
  path: string
  progress: number
  isCompressing: boolean
  errorMsg?: string
}
