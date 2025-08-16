import type { RouteRecordRaw } from 'vue-router';
import { requireAuth, requireAdmin, redirectIfAuthenticated } from './guards';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },

  // Auth routes
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        component: () => import('pages/auth/LoginPage.vue'),
        beforeEnter: redirectIfAuthenticated
      }
    ]
  },

  // Main app routes (protected)
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: 'dashboard',
        component: () => import('pages/dashboard/DashboardPage.vue')
      },
      {
        path: 'accounts',
        component: () => import('pages/accounts/AccountsPage.vue')
      },
      {
        path: 'transactions',
        component: () => import('pages/transactions/TransactionsPage.vue')
      },
      {
        path: 'loans',
        component: () => import('pages/loans/LoansPage.vue')
      },
      {
        path: 'members',
        component: () => import('pages/members/MembersPage.vue'),
        beforeEnter: requireAdmin
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
