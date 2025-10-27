import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IAccount } from '../interfaces/account.interface';

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<IAccount[]>([
    {
      id: '1',
      name: 'Bank Tejarat',
      icon: 'fastFood',
      color: 'primary',
      description: 'Bank account',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: '2',
      name: 'Bank Sepah',
      icon: 'wallet',
      color: 'secondary',
      description: 'Cash account',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: '3',
      name: 'Bank Pasargad',
      icon: 'cash',
      color: 'secondary',
      description: 'Cash account',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: '4',
      name: 'Bank Mellat',
      icon: 'cash',
      color: 'secondary',
      description: 'Cash account',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: '5',
      name: 'Bank Post',
      icon: 'wallet',
      color: 'secondary',
      description: 'Cash account',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },

  ]);

  return { accounts };
});
