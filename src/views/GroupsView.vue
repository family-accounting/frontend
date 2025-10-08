<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useGroupStore } from '@/stores/group.store'
useHead({
  title: 'Groups - Family Accounting',
})

const groupStore = useGroupStore()
</script>

<template>
  <UPageList divide>
    <template v-for="group in groupStore.groups" :key="group.id">
      <UPageCard variant="ghost" :to="`/groups/${group.id}`">
        <template #body>
          <UUser :name="group.name" :description="group.description" :avatar="group.avatar" :to="`/groups/${group.id}`"
            size="xl" />
        </template>
      </UPageCard>
    </template>
  </UPageList>
</template>
