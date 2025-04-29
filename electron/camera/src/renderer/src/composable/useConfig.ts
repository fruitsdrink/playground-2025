import { Ref, ref } from 'vue'

type ConfigType = {
  deviceId: string
}

const initConfig: ConfigType = {
  deviceId: ''
}

export const useConfig = (): { config: Ref<ConfigType>; updateConfig: () => void } => {
  const cache = localStorage.getItem('config')
  const data = cache ? JSON.parse(cache) : initConfig
  const config = ref<ConfigType>(data)

  const updateConfig = (): void => {
    const newConfig = { ...config.value }
    localStorage.setItem('config', JSON.stringify(newConfig))
  }
  return { config, updateConfig }
}
