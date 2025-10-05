import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'GroupLayout',
      component: () => import('../layouts/GroupLayout.vue'),
      meta: { title: 'Groups - Family Accounting' },
      children: [
        {
          path: '',
          name: 'GroupsView',
          component: () => import('@/views/GroupsView.vue'),
          meta: { title: 'Groups - Family Accounting' },
        },
        {
          path: 'wallets',
          name: 'WalletsView',
          component: () => import('@/views/WalletsView.vue'),
          meta: { title: 'Wallets - Family Accounting' },
        },
        {
          path: 'accounts',
          name: 'AccountsView',
          component: () => import('@/views/AccountsView.vue'),
          meta: { title: 'Accounts - Family Accounting' },
        },
      ],
    },
    {
      path: '/auth',
      component: () => import('@/layouts/AuthLayout.vue'),
      meta: { title: 'Auth - Family Accounting' },
      children: [
        {
          path: 'login',
          component: () => import('@/views/LoginView.vue'),
          meta: { title: 'Login - Family Accounting' },
        },
      ],
    },
  ],
})

export default router
