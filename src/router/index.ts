import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import MainPage from '../layouts/MainPage.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import LoginPage from '../views/Auth/LoginPage.vue'
import GroupsListPage from '../views/Groups/ListPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/groups'
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: LoginPage
      }
    ]
  },
  {
    path: '/tabs',
    component: MainPage,
    children: [
      {
        path: '',
        redirect: '/tabs/groups'
      },

      // -------------------
      // GROUPS
      // -------------------
      {
        path: 'groups',
        name: 'GroupsList',
        component: () => import('@/views/Groups/ListPage.vue')
      },
      {
        path: 'groups/new',
        name: 'GroupsNew',
        component: () => import('@/views/Groups/FormPage.vue')
      },
      {
        path: 'groups/:id',
        name: 'GroupsEdit',
        component: () => import('@/views/Groups/FormPage.vue')
      },

      // -------------------
      // WALLETS
      // -------------------
      {
        path: 'wallets',
        name: 'WalletsList',
        component: () => import('@/views/Wallets/ListPage.vue')
      },
      {
        path: 'wallets/new',
        name: 'WalletsNew',
        component: () => import('@/views/Wallets/FormPage.vue')
      },
      {
        path: 'wallets/:id',
        name: 'WalletsEdit',
        component: () => import('@/views/Wallets/FormPage.vue')
      },

      // -------------------
      // ACCOUNTS
      // -------------------
      {
        path: 'accounts',
        name: 'AccountsList',
        component: () => import('@/views/Accounts/ListPage.vue')
      },
      {
        path: 'accounts/new',
        name: 'AccountsNew',
        component: () => import('@/views/Accounts/FormPage.vue')
      },
      {
        path: 'accounts/:id',
        name: 'AccountsEdit',
        component: () => import('@/views/Accounts/FormPage.vue')
      },

      // -------------------
      // TRANSACTIONS
      // -------------------
      {
        path: 'transactions',
        name: 'TransactionsList',
        component: () => import('@/views/Transactions/ListPage.vue')
      },
      {
        path: 'transactions/new',
        name: 'TransactionsNew',
        component: () => import('@/views/Transactions/FormPage.vue')
      },
      {
        path: 'transactions/:id',
        name: 'TransactionsEdit',
        component: () => import('@/views/Transactions/FormPage.vue')
      },

      // -------------------
      // REPORTS
      // -------------------
      {
        path: 'reports',
        name: 'ReportsList',
        component: () => import('@/views/Reports/ListPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
