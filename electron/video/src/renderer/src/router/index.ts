import Home from '@renderer/views/Home.vue'
import Setting from '@renderer/views/Setting.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/setting', component: Setting, name: 'setting' }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
