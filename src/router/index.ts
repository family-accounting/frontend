import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import MainPage from '../layouts/MainPage.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import LoginPage from '../views/LoginPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/groups'
  },
  {
    path: '/auth/',
    component: AuthLayout,
    children: [
      {
        path: '/auth/login',
        component: LoginPage,
      }
    ]
  },
  {
    path: '/tabs/',
    component: MainPage,
    children: [
      {
        path: '',
        redirect: '/tabs/groups'
      },
      {
        path: 'groups',
        component: () => import('@/views/GroupsPage.vue')
      },
      {
        path: 'wallets',
        component: () => import('@/views/WalletsPage.vue')
      },
      {
        path: 'accounts',
        component: () => import('@/views/AccountsPage.vue')
      },
      {
        path: 'transactions',
        component: () => import('@/views/TransactionsPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
