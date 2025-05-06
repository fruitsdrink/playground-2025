import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
// 全局加载Element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 按需加载Element的ElLoading需要手动加载样式
// import 'element-plus/theme-chalk/el-loading.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import router from '@renderer/router'

const app = createApp(App)
//全局加载Element
app.use(router).use(pinia).use(ElementPlus)
// app.use(router)

app.mount('#app')
