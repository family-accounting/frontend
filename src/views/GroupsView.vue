<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '@vueuse/head'
import type { IGroup } from '@/interfaces/group.interface'

useHead({
  title: 'Groups - Family Accounting',
})

const groups = ref<IGroup[]>([
  {
    id: 'g1',
    name: 'Family',
    description: 'All family members',
    members: ['u1', 'u2', 'u3'],
    avatar: {
      src: 'https://ui-avatars.com/api/?name=Family',
      alt: 'Family group avatar',
    },
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-02T12:00:00Z',
    createdBy: 'u1',
    updatedBy: 'u2',
  },
  {
    id: 'g2',
    name: 'Friends',
    description: 'Close friends group',
    members: ['u2', 'u4'],
    avatar: {
      src: 'https://ui-avatars.com/api/?name=Friends',
      alt: 'Friends group avatar',
    },
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-02-03T11:00:00Z',
    createdBy: 'u2',
    updatedBy: 'u4',
  },
  {
    id: 'g3',
    name: 'Work',
    description: 'Work colleagues',
    members: ['u1', 'u3', 'u5'],
    avatar: {
      src: 'https://ui-avatars.com/api/?name=Work',
      alt: 'Work group avatar',
    },
    createdAt: '2024-03-01T08:00:00Z',
    updatedAt: '2024-03-04T10:00:00Z',
    createdBy: 'u3',
    updatedBy: 'u1',
  },
])
</script>

<template>
  <UPageList divide>
    <template v-for="group in groups" :key="group.id">
      <UPageCard variant="ghost" :to="`/groups/${group.id}`">
        <template #body>
          <UUser :name="group.name" :description="group.description" :avatar="group.avatar" :to="`/groups/${group.id}`"
            size="xl" />
        </template>
      </UPageCard>
    </template>
  </UPageList>
</template>
