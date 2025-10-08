<script setup lang="ts">
import { version } from '../../package.json'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const title = computed(() => String(route.meta.title))

const isGroupsActive = computed(() => route.name === 'GroupsView')
const isWalletsActive = computed(() => route.name === 'WalletsView')
const isAccountsActive = computed(() => route.name === 'AccountsView')
</script>

<template>
  <div class="flex flex-col h-svh">
    <GroupsLayoutHeader :title="title" :version="version" />
    <main class="flex-1">
      <RouterView />
    </main>
    <GroupsLayoutFooter :isGroupsActive="isGroupsActive" :isWalletsActive="isWalletsActive" :isAccountsActive="isAccountsActive" />
  </div>
</template>
