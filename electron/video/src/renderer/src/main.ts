import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

import './assets/main.css'

import { createApp } from 'vue'
import { router } from '@renderer/router'

import { createPinia } from 'pinia'
const pinia = createPinia()

import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn
})
app.use(router)
app.use(pinia)

app.mount('#app')
