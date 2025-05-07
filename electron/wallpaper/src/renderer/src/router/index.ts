import { createWebHistory, createRouter } from 'vue-router'

import Home from '@renderer/views/home.vue'
import Setting from '@renderer/views/setting.vue'

const routes = [
  { path: '/:any(.*)*', component: Home, name: 'home' },
  { path: '/setting', component: Setting, name: 'setting' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
