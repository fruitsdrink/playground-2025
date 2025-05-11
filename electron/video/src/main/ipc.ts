import { dialog, ipcMain } from 'electron'
import { CompressOptions, SelectFileOptions } from '../types'
import { Ffmpeg } from './ffmpeg'

ipcMain.on('compress', (event, file: CompressOptions) => {
  const ffmpeg = new Ffmpeg(event, file)
  ffmpeg.run()
})

ipcMain.handle('select-file', async (): Promise<SelectFileOptions[]> => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: 'Video', extensions: ['mp4', 'avi', 'mov', 'mkv', 'flv', 'wmv'] }]
  })
  if (canceled) {
    return []
  }
  const files = filePaths.map((filePath) => {
    const name = filePath.split('/').pop() || ''
    if (name) {
      return {
        path: filePath,
        name: name
      }
    }
    return null
  })

  return files.filter((file) => file !== null)
})
