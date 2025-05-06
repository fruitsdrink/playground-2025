import { useConfigStore } from '@renderer/store'

export const useWallpaper = (): {
  setWallpaper: () => void
} => {
  const { config } = useConfigStore()
  const setWallpaper = async (): Promise<void> => {
    await window.api.setWallpaper(config.url)
  }

  return { setWallpaper }
}
