import { createRouter, createWebHistory } from 'vue-router'
import TheLogin from '@/views/TheLogin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: TheLogin,
    },
  ],
})

export default router
