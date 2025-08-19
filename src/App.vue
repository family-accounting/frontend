<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from 'src/stores/auth.store';

const authStore = useAuthStore();

onMounted(async () => {
  // Check authentication status on app startup
  if (authStore.token) {
    try {
      await authStore.checkAuth();
    } catch (error) {
      console.error('Failed to check authentication:', error);
    }
  }
});
</script>
