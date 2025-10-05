import { createRouter, createWebHistory } from 'vue-router'
import TheLogin from '@/views/TheLogin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/GroupLayout.vue'),
      meta: { title: 'Groups - Family Accounting' },
      children: [
        {
          path: '',
          component: () => import('../views/TheGroups.vue'),
          meta: { title: 'Groups - Family Accounting' },
        },
      ],
    },
    {
      path: '/',
      component: () => import('../views/TheGroups.vue'),
      meta: { title: 'Groups - Family Accounting' },
    },
    {
      path: '/login',
      component: () => import('../views/TheLogin.vue'),
      meta: { title: 'Login - Family Accounting' },
    },
  ],
})

// Add navigation guard to update page title
router.beforeEach((to, from, next) => {
  // Set the page title based on route meta or default
  const title = (to.meta?.title as string) || 'Family Accounting'
  document.title = title
  next()
})

export default router
