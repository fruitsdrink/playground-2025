import { ipcMain } from 'electron'
import ffmpegPath from '@ffmpeg-installer/ffmpeg'
import ffprobePath from '@ffprobe-installer/ffprobe'
import ffmpeg from 'fluent-ffmpeg'
import path from 'path'

ffmpeg.setFfmpegPath(ffmpegPath.path)
ffmpeg.setFfprobePath(ffprobePath.path)

ipcMain.on('compress', (event) => {
  // console.log(arg) // prints "ping"
  // event.reply('asynchronous-reply', 'pong')

  const sourceFile = path.resolve(__dirname, '../../SampleVideo_1280x720_1mb.mp4')
  const targetFile = path.resolve(__dirname, '../../SampleVideo_1280x720_1mb_compressed.mp4')
  ffmpeg(sourceFile)
    .videoCodec('libx264')
    .size('320x240')
    .fps(24)
    .on('error', (err) => {
      console.log('压缩出错', err)
      event.reply('compress-reply', false)
    })
    .on('end', () => {
      console.log('压缩完成')
      event.reply('compress-reply', true)
    })
    .save(targetFile)
})
