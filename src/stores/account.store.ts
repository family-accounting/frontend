import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IAccount } from '@/interfaces/account.interface'
import { fakeAccounts } from '@/utils/account.fake'

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<IAccount[]>([...fakeAccounts])

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
