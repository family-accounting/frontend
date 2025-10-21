import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IAccount } from '../interfaces/account.interface';

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<IAccount[]>([]);

  return { accounts };
});
