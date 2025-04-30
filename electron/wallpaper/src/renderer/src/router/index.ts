import { createWebHistory, createRouter } from 'vue-router'

import Home from '@renderer/views/home.vue'
import Setting from '@renderer/views/setting.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/setting', component: Setting }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
