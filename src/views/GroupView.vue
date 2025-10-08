<template>
  <UPage class="p-4">
      <UCard>
        <h1>Group</h1>
        <p>{{ group?.name }}</p>
        <p>{{ group?.description }}</p>
        <p>{{ group?.members }}</p>
        <p>{{ group?.avatar }}</p>
        <p>{{ group?.createdAt }}</p>
        <p>{{ group?.updatedAt }}</p>
        <p>{{ group?.createdBy }}</p>
        <p>{{ group?.updatedBy }}</p>
        <p>{{ groupId }}</p>
      </UCard>
    <div class="pt-4 overflow-y-auto">
      <RouterView />
    </div>
  </UPage>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import type { IGroup } from '@/interfaces/group.interface'
import { useGroupStore } from '@/stores/group.store'

const route = useRoute()
const groupStore = useGroupStore()
const groupId = computed(() => route.params.groupId)
const group = computed(() => groupStore.getGroupById(groupId.value as IGroup['id']))
</script>
