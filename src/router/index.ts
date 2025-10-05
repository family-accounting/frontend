import { createRouter, createWebHistory } from 'vue-router'
import TheLogin from '@/views/TheLogin.vue'
import TheGroups from '@/views/TheGroups.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: TheGroups,
    },
    {
      path: '/login',
      component: TheLogin,
    },
  ],
})

export default router
