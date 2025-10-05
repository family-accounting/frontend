<template>
  <div>
    <h1>Group</h1>
    <p>{{ group.name }}</p>
    <p>{{ group.description }}</p>
    <p>{{ group.members }}</p>
    <p>{{ group.avatar }}</p>
    <p>{{ group.createdAt }}</p>
    <p>{{ group.updatedAt }}</p>
    <p>{{ group.createdBy }}</p>
    <p>{{ group.updatedBy }}</p>
    <p>{{ id }}</p>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import type { IGroup } from '@/interfaces/group.interface'

const route = useRoute()

const group = ref<IGroup>({} as IGroup)
const id = computed(() => route.params.id)
</script>
