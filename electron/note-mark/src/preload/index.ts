import { contextBridge } from 'electron'

if (!process.contextIsolated) {
  throw new Error('请开启contextIsolation')
}

try {
  contextBridge.exposeInMainWorld('context', {
    // todo
  })
} catch (error) {
  console.error(error)
}
