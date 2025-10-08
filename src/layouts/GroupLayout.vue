<script setup lang="ts">
import { version } from '../../package.json'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const isTransactionsActive = computed(() => route.name === 'TransactionsView')
const isSettingsActive = computed(() => route.name === 'SettingsView')
</script>

<template>
  <div class="flex flex-col h-svh">
    <div
      class="flex justify-between items-center gap-x-4 p-4 border-b border-b-neutral-200 dark:border-b-neutral-800"
    >
      <RouterLink to="/" class="flex items-center gap-x-2">
        <img src="/logo.svg" alt="logo" class="w-10 h-10" />
        <span class="text-xs">{{ route.meta.title }}</span>
      </RouterLink>
      <div class="flex items-center gap-x-2">
        <UColorModeButton class="cursor-pointer" />
        <span class="text-xs">Version: {{ version }}</span>
      </div>
    </div>
    <div class="flex-1">
      <RouterView />
    </div>
    <div class="flex gap-x-4 border-t border-t-neutral-200 dark:border-t-neutral-800">
      <RouterLink
        v-wave
        :class="[
          'py-2 flex-1 flex justify-center items-center',
          isTransactionsActive ? 'bg-primary text-primary-foreground' : 'bg-transparent',
        ]"
        :to="{
        name: 'TransactionsView',
        params: {
          groupId: route.params.groupId,
        },
      }"
      >
        Transactions
      </RouterLink>
      <RouterLink
        v-wave
        :class="[
          'py-2 flex-1 flex justify-center items-center',
          isSettingsActive ? 'bg-primary text-primary-foreground' : 'bg-transparent',
        ]"
        :to="{
        name: 'SettingsView',
        params: {
          groupId: route.params.groupId,
        },
      }"
      >
        Settings
      </RouterLink>
    </div>
  </div>
</template>
