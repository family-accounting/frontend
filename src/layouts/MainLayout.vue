<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-center">
          <q-icon name="account_balance_wallet" class="q-mr-sm" />
          Family Finance
        </q-toolbar-title>

        <div class="row items-center q-gutter-sm">
          <!-- Theme toggle -->
          <q-btn
            flat
            dense
            round
            :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
            @click="$q.dark.toggle()"
            aria-label="Toggle theme"
          />
          
          <!-- User menu -->
          <q-btn flat dense round icon="account_circle" aria-label="User menu">
            <q-menu>
              <q-list style="min-width: 200px">
                <q-item>
                  <q-item-section>
                    <q-item-label>{{ user?.name }}</q-item-label>
                    <q-item-label caption>{{ user?.email }}</q-item-label>
                    <q-item-label caption>
                      <q-chip size="sm" :color="getRoleColor(user?.role)" text-color="white">
                        {{ user?.role }}
                      </q-chip>
                    </q-item-label>
                  </q-item-section>
                </q-item>
                
                <q-separator />
                
                <q-item clickable v-close-popup @click="logout">
                  <q-item-section avatar>
                    <q-icon name="logout" />
                  </q-item-section>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Navigation</q-item-label>

        <q-item
          v-for="link in navigationLinks"
          :key="link.title"
          :to="link.to"
          clickable
          v-ripple
          :active="$route.path === link.to"
          active-class="bg-primary text-white"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>{{ link.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Bottom navigation for mobile -->
    <q-footer elevated class="bg-white text-primary">
      <q-tabs
        v-model="activeTab"
        class="text-primary"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab
          v-for="tab in bottomTabs"
          :key="tab.name"
          :name="tab.name"
          :icon="tab.icon"
          :label="tab.label"
          :to="tab.to"
          @click="activeTab = tab.name"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from 'src/stores/auth.store';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const route = useRoute();
const authStore = useAuthStore();

const leftDrawerOpen = ref(false);
const activeTab = ref('dashboard');

const user = computed(() => authStore.user);

const navigationLinks = computed(() => [
  {
    title: 'Dashboard',
    icon: 'dashboard',
    to: '/dashboard'
  },
  {
    title: 'Accounts',
    icon: 'account_balance',
    to: '/accounts'
  },
  {
    title: 'Transactions',
    icon: 'receipt_long',
    to: '/transactions'
  },
  {
    title: 'Loans',
    icon: 'credit_card',
    to: '/loans'
  },
  ...(authStore.isAdmin ? [{
    title: 'Members',
    icon: 'people',
    to: '/members'
  }] : [])
]);

const bottomTabs = computed(() => [
  {
    name: 'dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
    to: '/dashboard'
  },
  {
    name: 'accounts',
    icon: 'account_balance',
    label: 'Accounts',
    to: '/accounts'
  },
  {
    name: 'transactions',
    icon: 'receipt_long',
    label: 'Transactions',
    to: '/transactions'
  },
  {
    name: 'loans',
    icon: 'credit_card',
    label: 'Loans',
    to: '/loans'
  },
  ...(authStore.isAdmin ? [{
    name: 'members',
    icon: 'people',
    label: 'Members',
    to: '/members'
  }] : [])
]);

const getRoleColor = (role?: string) => {
  switch (role) {
    case 'ADMIN': return 'red';
    case 'MEMBER': return 'blue';
    case 'VIEWER': return 'green';
    default: return 'grey';
  }
};

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const logout = () => {
  authStore.logout();
};

// Set active tab based on current route
onMounted(() => {
  const currentPath = route.path;
  const tab = bottomTabs.value.find(tab => tab.to === currentPath);
  if (tab) {
    activeTab.value = tab.name;
  }
});

// Watch for route changes to update active tab
watch(() => route.path, (newPath) => {
  const tab = bottomTabs.value.find(tab => tab.to === newPath);
  if (tab) {
    activeTab.value = tab.name;
  }
});
</script>

<style scoped>
.q-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

.q-tabs {
  height: 60px;
}

.q-tab {
  min-height: 60px;
}
</style>

