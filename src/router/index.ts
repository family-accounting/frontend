import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/app/transaction'
  },
  {
    path: '/app/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/app/transaction'
      },
      {
        path: 'transaction',
        name: 'TransactionView',
        component: () => import('@/views/transactions/TransactionListView.vue')
      },
      {
        path: 'create-transaction',
        name: 'CreateTransactionView',
        component: () => import('@/views/transactions/CreateTransactionView.vue')
      },
      {
        path: 'setting',
        name: 'SettingView',
        component: () => import('@/views/SettingView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginView',
    component: () => import('@/views/auth/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
