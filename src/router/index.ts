import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

// Lazy load layouts for better code splitting
const MainPage = () => import("../layouts/MainLayout.vue");
const GroupLayout = () => import("../layouts/GroupLayout.vue");
const AuthLayout = () => import("../layouts/AuthLayout.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: MainPage,
    children: [
      {
        path: "",
        redirect: "/groups",
      },
      {
        path: "groups",
        name: "GroupsList",
        component: () => import("@/views/Groups/ListPage.vue"),
      },
      {
        path: "groups/new",
        name: "GroupsNew",
        component: () => import("@/views/Groups/FormPage.vue"),
      },
      {
        path: "groups/:id",
        name: "GroupsEdit",
        component: () => import("@/views/Groups/FormPage.vue"),
      },
      {
        path: "wallets",
        name: "WalletsList",
        component: () => import("@/views/Wallets/ListPage.vue"),
      },
      {
        path: "wallets/new",
        name: "WalletsNew",
        component: () => import("@/views/Wallets/FormPage.vue"),
      },
      {
        path: "wallets/:id",
        name: "WalletsEdit",
        component: () => import("@/views/Wallets/FormPage.vue"),
      },
      {
        path: "accounts",
        name: "AccountsList",
        component: () => import("@/views/Accounts/ListPage.vue"),
      },
      {
        path: "accounts/new",
        name: "AccountsNew",
        component: () => import("@/views/Accounts/FormPage.vue"),
      },
      {
        path: "accounts/:id",
        name: "AccountsEdit",
        component: () => import("@/views/Accounts/FormPage.vue"),
      },
      {
        path: "transactions",
        name: "TransactionsList",
        component: () => import("@/views/Transactions/ListPage.vue"),
      },
      {
        path: "transactions/new",
        name: "TransactionsNew",
        component: () => import("@/views/Transactions/FormPage.vue"),
      },
      {
        path: "transactions/:id",
        name: "TransactionsEdit",
        component: () => import("@/views/Transactions/FormPage.vue"),
      },
      {
        path: "reports",
        name: "ReportsList",
        component: () => import("@/views/Reports/ListPage.vue"),
      },
    ],
  },
  {
    path: "/group",
    name: "TheGroup",
    component: GroupLayout,
    children: [
      {
        path: ":groupId/transactions",
        name: "GroupTransactions",
        component: () => import("@/views/Group/GroupTransactions.vue"),
      },
      {
        path: ":groupId/members",
        name: "GroupUsers",
        component: () => import("@/views/Group/GroupMembers.vue"),
      },
      {
        path: ":groupId/reports",
        name: "GroupReports",
        component: () => import("@/views/Group/GroupReports.vue"),
      },
      {
        path: ":groupId/setting",
        name: "GroupSettings",
        component: () => import("@/views/Group/GroupSettings.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/Auth/LoginPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
