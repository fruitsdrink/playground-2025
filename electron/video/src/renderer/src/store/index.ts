import { defineStore } from 'pinia'
import { VideoInfo } from 'src/types'
import { ref } from 'vue'

export const useStore = defineStore('config', () => {
  const config = ref({
    sizes: ['1920x1080', '1280x720', '1024x768', '800x600', '640x480', '480x320'],
    size: '1920x1080',
    frames: [60, 30, 24],
    frame: 60,
    files: [] as VideoInfo[]
  })

  return {
    config
  }
})
