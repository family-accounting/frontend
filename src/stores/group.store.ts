import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IGroup } from '@/interfaces/group.interface'
import { fakeGroups } from '@/utils/group.fake'

export const useGroupStore = defineStore('group', () => {
  const groups = ref<IGroup[]>([...fakeGroups])

  const getGroupById = (groupId: IGroup['id']) => {
    return groups.value.find((group) => group.id === groupId) as IGroup
  }

  const createGroup = (group: IGroup) => {
    groups.value.push(group)
  }

  const updateGroup = (group: IGroup) => {
    const index = groups.value.findIndex((group) => group.id === group.id)
    groups.value[index] = group
  }

  const deleteGroup = (groupId: IGroup['id']) => {
    groups.value = groups.value.filter((group) => group.id !== groupId)
  }

  return { groups, getGroupById, createGroup, updateGroup, deleteGroup }
})
