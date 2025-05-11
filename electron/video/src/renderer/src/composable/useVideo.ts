import { useStore } from '@renderer/store'
import { ElMessageBox } from 'element-plus'
import { VideoInfo } from 'src/types'

export const useVideo = (): {
  selectFiles: () => Promise<void>
  removeFile: (index: number) => Promise<void>
  removeAll: () => Promise<void>
} => {
  const { config } = useStore()

  const selectFiles = async (): Promise<void> => {
    const files = await window.api.selectFile()
    if (files) {
      const selectFiles = files.map((file, index) => {
        return {
          index,
          name: file.name,
          path: file.path,
          progress: 0,
          isCompressing: false
        }
      })
      const pushFiles: VideoInfo[] = []
      for (const file of selectFiles) {
        if (!config.files.find((item) => item.path === file.path)) {
          pushFiles.push(file)
        }
      }
      const allFiles = [...config.files, ...pushFiles]
      allFiles.map((item, index) => {
        item.index = index
      })
      config.files = allFiles
    }
  }

  const removeFile = async (index: number): Promise<void> => {
    // await ElMessageBox.confirm('确定删除吗？', '提示')
    config.files.splice(index, 1)
  }

  const removeAll = async (): Promise<void> => {
    await ElMessageBox.confirm('确定全部删除吗？', '提示')
    config.files = []
  }

  return { selectFiles, removeFile, removeAll }
}
