import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IGroup } from '@/interfaces/group.interface';

export const useGroupStore = defineStore('group', () => {
  const groups = ref<IGroup[]>([
    {
      id: '1',
      name: 'Family',
      icon: 'person',
      color: 'primary',
      description: 'Family group',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      members: [],
      transactions: [],
    },
    {
      id: '2',
      name: 'Friends',
      icon: 'people',
      color: 'secondary',
      description: 'Friends group',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      members: [],
      transactions: [],
    },
    {
      id: '3',
      name: 'Work',
      icon: 'home',
      color: 'tertiary',
      description: 'Work group',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      members: [],
      transactions: [],
    },
    {
      id: '4',
      name: 'Other',
      icon: 'fastFood',
      color: 'success',
      description: 'Other group',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      members: [],
      transactions: [],
    },
    {
      id: '5',
      name: 'Travel',
      icon: 'airplane',
      color: 'warning',
      description: 'Travel group',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      members: [],
      transactions: [],
    },
    {
      id: '6',
      name: 'Health',
      icon: 'heart',
      color: 'danger',
      description: 'Health group',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      members: [],
      transactions: [],
    },
  ]);

  return { groups };
});
