import { createRouter, createWebHistory } from 'vue-router'
import TheLogin from '@/views/TheLogin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
        component: () => import('../views/TheGroups.vue')
    },
    {
      path: '/login',
      component: () => import('../views/TheLogin.vue')
    },
  ],
})

export default router
