import { IpcMainEvent } from 'electron'
import ffmpegPath from '@ffmpeg-installer/ffmpeg'
import ffprobePath from '@ffprobe-installer/ffprobe'
import ffmpeg from 'fluent-ffmpeg'
import path from 'path'
import { CompressOptions, FfmpegProgress } from '../types'

ffmpeg.setFfmpegPath(ffmpegPath.path)
ffmpeg.setFfprobePath(ffprobePath.path)

export class Ffmpeg {
  private ffmpeg: ffmpeg.FfmpegCommand
  constructor(
    private readonly event: IpcMainEvent,
    private readonly options: CompressOptions
  ) {
    this.ffmpeg = ffmpeg(options.file.path)
      .size(options.size)
      .fps(options.fps)
      .on('progress', this.onProgress.bind(this))
      .on('error', this.onError.bind(this))
      .on('end', this.onEnd.bind(this))
  }

  private onError(err: Error): void {
    console.log(`压缩出错 ${this.options.file.name}`, err)
    this.event.reply('compress-error', {
      file: this.options.file,
      error: {
        message: err.message
      }
    })
  }

  private onProgress(progress: FfmpegProgress): void {
    console.log(`压缩进度 ${this.options.file.name}`, progress.percent)
    this.event.reply('compress-progress', {
      file: this.options.file,
      percent: progress.percent
    })
  }

  private onEnd(): void {
    console.log('压缩完成: ', this.options.file.name)
    this.event.reply('compress-end', {
      file: this.options.file
    })
  }

  run(): void {
    // const name = this.options.file.name.split('.').shift()
    // const ext = this.options.file.path.split('.').pop()
    const info = path.parse(this.options.file.name)
    const targetFile = path.resolve(__dirname, `../../${info.name}_compressed${info.ext}`)
    this.ffmpeg.save(targetFile)
  }
}
