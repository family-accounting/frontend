import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import MainPage from '../layouts/MainPage.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import LoginPage from '../views/Auth/LoginPage.vue'

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
        component: () => import('@/views/Groups/ListPage.vue')
      },
      {
        path: 'groups/new',
        component: () => import('@/views/Groups/FormPage.vue')
      },
      {
        path: 'groups/:id',
        component: () => import('@/views/Groups/FormPage.vue')
      },
      {
        path: 'wallets',
        component: () => import('@/views/Wallets/WalletsPage.vue')
      },
      {
        path: 'accounts',
        component: () => import('@/views/Accounts/AccountsPage.vue')
      },
      {
        path: 'transactions',
        component: () => import('@/views/Transactions/TransactionsPage.vue')
      },
      {
        path: 'reports',
        component: () => import('@/views/Reports/ReportsPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
