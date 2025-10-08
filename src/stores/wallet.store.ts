import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IWallet } from '@/interfaces/wallet.interface'

export const useWalletStore = defineStore('wallet', () => {
  const wallets = ref<IWallet[]>([
    {
      id: 'wallet-1',
      name: 'Family Wallet',
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
      id: 'wallet-2',
      name: 'Vacation Wallet',
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
      id: 'wallet-3',
      name: 'Kids Wallet',
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

  const getWalletById = (id: IWallet['id']) => {
    return wallets.value.find((wallet) => wallet.id === id) as IWallet
  }

  const createWallet = (wallet: IWallet) => {
    wallets.value.push(wallet)
  }

  const updateWallet = (wallet: IWallet) => {
    const index = wallets.value.findIndex((wallet) => wallet.id === wallet.id)
    wallets.value[index] = wallet
  }

  const deleteWallet = (id: IWallet['id']) => {
    wallets.value = wallets.value.filter((wallet) => wallet.id !== id)
  }
  

  return { wallets, getWalletById, createWallet, updateWallet, deleteWallet }
})
