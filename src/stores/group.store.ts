import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IGroup } from '@/interfaces/group.interface'

export const useGroupStore = defineStore('group', () => {
  const groups = ref<IGroup[]>([
    {
      id: 'group-1',
      name: 'Family',
      description: 'All family members',
      members: ['u1', 'u2', 'u3'],
      avatar: {
        src: 'https://ui-avatars.com/api/?name=Family',
        alt: 'Family group avatar',
      },
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-01-02T12:00:00Z',
      createdBy: 'user-1',
      updatedBy: 'user-2',
    },
    {
      id: 'group-2',
      name: 'Friends',
      description: 'Close friends group',
      members: ['u2', 'u4'],
      avatar: {
        src: 'https://ui-avatars.com/api/?name=Friends',
        alt: 'Friends group avatar',
      },
      createdAt: '2024-02-01T09:00:00Z',
      updatedAt: '2024-02-03T11:00:00Z',
      createdBy: 'user-2',
      updatedBy: 'user-4',
    },
    {
      id: 'group-3',
      name: 'Work',
      description: 'Work colleagues',
      members: ['u1', 'u3', 'u5'],
      avatar: {
        src: 'https://ui-avatars.com/api/?name=Work',
        alt: 'Work group avatar',
      },
      createdAt: '2024-03-01T08:00:00Z',
      updatedAt: '2024-03-04T10:00:00Z',
      createdBy: 'user-3',
      updatedBy: 'user-1',
    },
  ])

  const getGroupById = (id: IGroup['id']) => {
    return groups.value.find((group) => group.id === id) as IGroup
  }

  const createGroup = (group: IGroup) => {
    groups.value.push(group)
  }

  const updateGroup = (group: IGroup) => {
    const index = groups.value.findIndex((group) => group.id === group.id)
    groups.value[index] = group
  }

  const deleteGroup = (id: IGroup['id']) => {
    groups.value = groups.value.filter((group) => group.id !== id)
  }
  

  return { groups, getGroupById, createGroup, updateGroup, deleteGroup }
})
