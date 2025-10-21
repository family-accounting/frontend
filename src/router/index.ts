import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/groups',
      },
      {
        path: 'groups',
        name: 'GroupsList',
        component: () => import('@/views/Groups/ListPage.vue'),
      },
      {
        path: 'groups/new',
        name: 'GroupsNew',
        component: () => import('@/views/Groups/FormPage.vue'),
      },
      {
        path: 'groups/:id',
        name: 'GroupsEdit',
        component: () => import('@/views/Groups/FormPage.vue'),
      },
      {
        path: 'accounts',
        name: 'AccountsList',
        component: () => import('@/views/Accounts/ListPage.vue'),
      },
      {
        path: 'accounts/new',
        name: 'AccountsNew',
        component: () => import('@/views/Accounts/FormPage.vue'),
      },
      {
        path: 'accounts/:id',
        name: 'AccountsEdit',
        component: () => import('@/views/Accounts/FormPage.vue'),
      },
      {
        path: 'reports',
        name: 'ReportsList',
        component: () => import('@/views/Reports/ListPage.vue'),
      },
    ],
  },
  {
    path: '/group',
    name: 'TheGroup',
    component: () => import('@/layouts/GroupLayout.vue'),
    children: [
      {
        path: ':groupId/transactions',
        name: 'GroupTransactions',
        component: () => import('@/views/Group/GroupTransactions.vue'),
      },
      {
        path: ':groupId/members',
        name: 'GroupUsers',
        component: () => import('@/views/Group/GroupMembers.vue'),
      },
      {
        path: ':groupId/reports',
        name: 'GroupReports',
        component: () => import('@/views/Group/GroupReports.vue'),
      },
      {
        path: ':groupId/setting',
        name: 'GroupSettings',
        component: () => import('@/views/Group/GroupSettings.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/Auth/LoginPage.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
