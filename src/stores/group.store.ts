import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IGroup } from '@/interfaces/group.interface'

export const useGroupStore = defineStore('group', () => {
  const groups = ref<IGroup[]>([])

  return { groups }
})
