import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ScreenView from '../views/ScreenView.vue'
import LoginView from '../views/LoginView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'screen',
    component: ScreenView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
