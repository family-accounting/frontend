<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '@vueuse/head'
import type { IWallet } from '@/interfaces/wallet.interface'

useHead({
  title: 'Groups - Family Accounting',
})

const wallets = ref<IWallet[]>([
  {
    id: '1',
    name: 'Family Wallet',
    description: 'Shared family expenses and savings',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-06-01T12:00:00Z',
    color: 'blue',
    icon: 'mdi-cash-multiple',
    avatar: {
      src: 'https://ui-avatars.com/api/?name=Family',
      alt: 'Family group avatar',
    },
    createdBy: 'u1',
    updatedBy: 'u2'
  },
  {
    id: '2',
    name: 'Vacation Wallet',
    description: 'Savings for our next vacation',
    createdAt: '2024-02-15T09:30:00Z',
    updatedAt: '2024-05-20T15:45:00Z',
    color: 'green',
    icon: 'mdi-palm-tree',
    avatar: {
      src: 'https://ui-avatars.com/api/?name=Vacation',
      alt: 'Vacation group avatar',
    },
    createdBy: 'u2',
    updatedBy: 'u2'
  },
  {
    id: '3',
    name: 'Kids Wallet',
    description: 'Allowance and rewards for the kids',
    createdAt: '2024-03-10T08:20:00Z',
    updatedAt: '2024-06-10T11:10:00Z',
    color: 'purple',
    icon: 'mdi-piggy-bank',
    avatar: {
      src: 'https://ui-avatars.com/api/?name=Family',
      alt: 'Family group avatar',
    },
    createdBy: 'u1',
    updatedBy: 'u1'
  }
])
</script>

<template>
  <UPageList divide>
    <template v-for="wallet in wallets" :key="wallet.id">
      <UPageCard variant="ghost" :to="`/wallets/${wallet.id}`">
        <template #body>
          <UUser :name="wallet.name" :description="wallet.description" :avatar="wallet.avatar" :color="wallet.color" :icon="wallet.icon"
            size="xl" />
        </template>
      </UPageCard>
    </template>
  </UPageList>
</template>
