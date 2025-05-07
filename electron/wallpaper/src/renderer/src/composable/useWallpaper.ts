import { useConfigStore } from '@renderer/store'

export const useWallpaper = (): {
  setWallpaper: () => Promise<void>
  setSaveDirectory: () => Promise<void>
} => {
  const { config } = useConfigStore()
  const setWallpaper = async (): Promise<void> => {
    await window.api.setWallpaper(config.url, config.saveDirectory)
  }

  const setSaveDirectory = async (): Promise<void> => {
    const saveDirectory = await window.api.setSaveDirectory()
    if (saveDirectory) {
      config.saveDirectory = saveDirectory
    }
  }
  return { setWallpaper, setSaveDirectory }
}
