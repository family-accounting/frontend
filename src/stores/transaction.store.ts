import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ITransaction } from '@/interfaces/transaction.interface';

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref<ITransaction[]>([]);

  return { transactions };
});
