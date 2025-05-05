import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'

const http = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000
})

http.interceptors.request.use(
  function (config) {
    ElLoading.service({ fullscreen: true })
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    ElMessage({
      message: error.response.data.message ?? 'error',
      type: 'error',
      duration: 3000,
      grouping: true
    })
    return Promise.reject(error)
  }
)

export { http }
