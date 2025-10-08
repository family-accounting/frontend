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

  const getAccountById = (accountId: IAccount['id']) => {
    return accounts.value.find((account) => account.id === accountId) as IAccount
  }

  const createAccount = (account: IAccount) => {
    accounts.value.push(account)
  }

  const updateAccount = (account: IAccount) => {
    const index = accounts.value.findIndex((account) => account.id === account.id)
    accounts.value[index] = account
  }

  const deleteAccount = (accountId: IAccount['id']) => {
    accounts.value = accounts.value.filter((account) => account.id !== accountId)
  }
  

  return { accounts, getAccountById, createAccount, updateAccount, deleteAccount }
})
