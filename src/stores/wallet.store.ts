import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IWallet } from '@/interfaces/wallet.interface'
import { fakeWallets } from '@/utils/wallet.fake'

export const useWalletStore = defineStore('wallet', () => {
  const wallets = ref<IWallet[]>([...fakeWallets])

  const getWalletById = (walletId: IWallet['id']) => {
    return wallets.value.find((wallet) => wallet.id === walletId) as IWallet
  }

  const createWallet = (wallet: IWallet) => {
    wallets.value.push(wallet)
  }

  const updateWallet = (wallet: IWallet) => {
    const index = wallets.value.findIndex((wallet) => wallet.id === wallet.id)
    wallets.value[index] = wallet
  }

  const deleteWallet = (walletId: IWallet['id']) => {
    wallets.value = wallets.value.filter((wallet) => wallet.id !== walletId)
  }

  return { wallets, getWalletById, createWallet, updateWallet, deleteWallet }
})
