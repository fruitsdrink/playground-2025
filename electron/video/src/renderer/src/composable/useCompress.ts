import { VideoInfo } from 'src/types'
import { computed, Ref } from 'vue'
import { useStore } from '@renderer/store'

export const useCompress = (): { isCompressing: Ref<boolean>; compress: () => void } => {
  const { config } = useStore()

  const isCompressing = computed(() => {
    return config.files.some((file) => file.isCompressing)
  })

  window.api.registerOnCompressError((arg: { file: VideoInfo; error: { message: string } }) => {
    const file = config.files.find((item) => item.index === arg.file.index)
    if (file) {
      file.errorMsg = arg.error.message
      // 替换原file
      config.files.splice(config.files.indexOf(file), 1, file)
      // 重新赋值
      config.files = [...config.files]
    }
  })

  window.api.registerOnCompressProgress((arg: { file: VideoInfo; percent: number }) => {
    console.log(`压缩进度 ${arg.file.index} ${arg.file.name}`, arg.percent)
    const file = config.files.find((item) => item.index === arg.file.index)
    if (file) {
      file.isCompressing = true
      file.progress = arg.percent
      // 替换原file
      config.files.splice(config.files.indexOf(file), 1, file)
      // 重新赋值
      config.files = [...config.files]
    }
  })

  window.api.registerOnCompressEnd((arg: { file: VideoInfo }) => {
    const file = config.files.find((item) => item.index === arg.file.index)
    if (file) {
      file.progress = 100
      file.isCompressing = false
      // 替换原file
      config.files.splice(config.files.indexOf(file), 1, file)
      // 重新赋值
      config.files = [...config.files]
    }
  })

  const compress = (): void => {
    const files = config.files.map((file) => {
      return {
        file: { ...file },
        size: config.size,
        fps: config.frame
      }
    })
    for (const file of files) {
      window.api.compress(file)
    }
  }

  return {
    isCompressing,
    compress
  }
}
