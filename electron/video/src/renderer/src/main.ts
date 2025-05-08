import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/main.css'

import { createApp } from 'vue'
import { router } from '@renderer/router'

import { createPinia } from 'pinia'
const pinia = createPinia()

import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(pinia)

app.mount('#app')
