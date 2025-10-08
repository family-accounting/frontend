import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IAccount } from '@/interfaces/account.interface'
import type { IWallet } from '@/interfaces/wallet.interface'

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<IAccount[]>([
    {
      id: 'account-1',
      name: 'Tejarat Bank',
      description: 'Shared family expenses and savings',
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-06-01T12:00:00Z',
      color: 'blue',
      icon: 'mdi-cash-multiple',
      avatar: {
        src: 'https://ui-avatars.com/api/?name=Family',
        alt: 'Family group avatar',
      },
      createdBy: 'user-1',
      updatedBy: 'user-2'
    },
    {
      id: 'account-2',
      name: 'Mellat Bank',
      description: 'Savings for our next vacation',
      createdAt: '2024-02-15T09:30:00Z',
      updatedAt: '2024-05-20T15:45:00Z',
      color: 'green',
      icon: 'mdi-palm-tree',
      avatar: {
        src: 'https://ui-avatars.com/api/?name=Vacation',
        alt: 'Vacation group avatar',
      },
      createdBy: 'user-2',
      updatedBy: 'user-2'
    },
    {
      id: 'account-3',
      name: 'Sepah Bank',
      description: 'Allowance and rewards for the kids',
      createdAt: '2024-03-10T08:20:00Z',
      updatedAt: '2024-06-10T11:10:00Z',
      color: 'purple',
      icon: 'mdi-piggy-bank',
      avatar: {
        src: 'https://ui-avatars.com/api/?name=Family',
        alt: 'Family group avatar',
      },
      createdBy: 'user-1',
      updatedBy: 'user-1'
    }
  ])

  const getAccountById = (id: IAccount['id']) => {
    return accounts.value.find((account) => account.id === id) as IAccount
  }

  const createGroup = (group: IAccount) => {
    accounts.value.push(group)
  }

  const updateGroup = (group: IAccount) => {
    const index = accounts.value.findIndex((group) => group.id === group.id)
    accounts.value[index] = group
  }

  const deleteGroup = (id: IAccount['id']) => {
    accounts.value = accounts.value.filter((group) => group.id !== id)
  }
  

  return { accounts, getAccountById, createGroup, updateGroup, deleteGroup }
})
