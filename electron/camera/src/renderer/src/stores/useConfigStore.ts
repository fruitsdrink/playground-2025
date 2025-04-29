import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore(
  'config',
  () => {
    const config = ref({
      deviceId: '',
      rounded: false,
      width: 500,
      height: 281,
      position: 'center' as 'leftTop' | 'rightTop' | 'leftBottom' | 'rightBottom' | 'center',
      displayId: 0
    })

    return {
      config
    }
  },
  {
    persist: true
  }
)
