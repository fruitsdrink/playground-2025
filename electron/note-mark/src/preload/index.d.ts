declare global {
  interface Window {
    // electron: ElectronAPI
    // api: unknown
    context: {
      locale: string
    }
  }
}
