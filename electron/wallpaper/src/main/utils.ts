import { dialog } from 'electron'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
import fetch from 'node-fetch'

export async function downloadWallpaper(url: string, fileName: string): Promise<boolean> {
  const streamPipeline = promisify(pipeline)

  const response = await fetch(url)

  if (!response.ok) {
    dialog.showErrorBox('温馨提示', '下载壁纸失败了!')
    return false
  }

  await streamPipeline(response.body!, createWriteStream(fileName))
  return true
}
