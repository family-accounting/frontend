<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { version } from '../../package.json'

const route = useRoute()
const title = computed(() => String(route.meta.title))
const groupId = computed(() => route.params.groupId as string)
const isTransactionsActive = computed(() => route.name === 'TransactionsView')
const isSettingsActive = computed(() => route.name === 'SettingsView')
</script>

<template>
  <div class="flex flex-col h-svh">
    <GroupLayoutHeader :title="title" :version="version" />
    <main class="flex-1">
      <RouterView />
    </main>
    <GroupLayoutFooter :isTransactionsActive="isTransactionsActive" :isSettingsActive="isSettingsActive" :groupId="groupId" />
  </div>
</template>
