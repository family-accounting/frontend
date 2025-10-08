<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useWalletStore } from '@/stores/wallet.store'
useHead({
  title: 'Groups - Family Accounting',
})

const walletStore = useWalletStore()
</script>

<template>
  <UPageList divide>
    <template v-for="wallet in walletStore.wallets" :key="wallet.id">
      <UPageCard variant="ghost" :to="`/wallets/${wallet.id}`">
        <template #body>
          <UUser
            :name="wallet.name"
            :description="wallet.description"
            :avatar="wallet.avatar"
            :color="wallet.color"
            :icon="wallet.icon"
            size="xl"
          />
        </template>
      </UPageCard>
    </template>
  </UPageList>
</template>
