import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'GroupsLayout',
      redirect: '/groups',
      component: () => import('../layouts/GroupsLayout.vue'),
      meta: { title: 'Groups - Family Accounting' },
      children: [
        {
          path: 'groups',
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
      path: '/group',
      name: 'GroupLayout',
      redirect: '/groups',
      component: () => import('../layouts/GroupsLayout.vue'),
      children: [
        {
          path: 'group/:id',
          name: 'GroupView',
          component: () => import('@/views/GroupView.vue'),
          meta: { title: 'Group - Family Accounting' },
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
