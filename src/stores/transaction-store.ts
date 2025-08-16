import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import apiService from 'src/services/api';
import type { Transaction, CreateTransactionData } from 'src/types';

export const useTransactionStore = defineStore('transaction', () => {
  // State
  const transactions = ref<Transaction[]>([]);
  const totalTransactions = ref(0);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  
  // Filters
  const filters = ref({
    type: '',
    memberId: '',
    startDate: '',
    endDate: '',
    page: 1,
    limit: 20
  });

  // Getters
  const filteredTransactions = computed(() => {
    let filtered = [...transactions.value];
    
    if (filters.value.type) {
      filtered = filtered.filter(t => t.type === filters.value.type);
    }
    
    if (filters.value.memberId) {
      filtered = filtered.filter(t => t.memberId === filters.value.memberId);
    }
    
    if (filters.value.startDate) {
      filtered = filtered.filter(t => new Date(t.date) >= new Date(filters.value.startDate));
    }
    
    if (filters.value.endDate) {
      filtered = filtered.filter(t => new Date(t.date) <= new Date(filters.value.endDate));
    }
    
    return filtered;
  });

  const transactionsByType = computed(() => {
    const grouped: Record<string, Transaction[]> = {
      INCOME: [],
      EXPENSE: [],
      TRANSFER: [],
      LOAN: []
    };
    
    filteredTransactions.value.forEach(transaction => {
      grouped[transaction.type]?.push(transaction);
    });
    
    return grouped;
  });

  const totalIncome = computed(() => 
    transactionsByType.value.INCOME?.reduce((sum, t) => sum + t.amount, 0) || 0
  );

  const totalExpenses = computed(() => 
    transactionsByType.value.EXPENSE?.reduce((sum, t) => sum + t.amount, 0) || 0
  );

  const totalTransfers = computed(() => 
    transactionsByType.value.TRANSFER?.reduce((sum, t) => sum + t.amount, 0) || 0
  );

  const totalLoans = computed(() => 
    transactionsByType.value.LOAN?.reduce((sum, t) => sum + t.amount, 0) || 0
  );

  const netIncome = computed(() => totalIncome.value - totalExpenses.value);

  const getTransactionById = (id: string) => 
    transactions.value.find(transaction => transaction.id === id);

  // Actions
  const fetchTransactions = async (params?: typeof filters.value) => {
    try {
      isLoading.value = true;
      error.value = null;
      
      const queryParams = { ...filters.value, ...params };
      const response = await apiService.getTransactions(queryParams);
      
      if (response.success) {
        transactions.value = response.data.transactions;
        totalTransactions.value = response.data.total;
        
        if (params) {
          Object.assign(filters.value, params);
        }
      } else {
        error.value = response.message;
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      error.value = errorMessage || 'Failed to fetch transactions';
    } finally {
      isLoading.value = false;
    }
  };

  const createTransaction = async (data: CreateTransactionData) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await apiService.createTransaction(data);
      
      if (response.success) {
        transactions.value.unshift(response.data);
        totalTransactions.value += 1;
        return { success: true, data: response.data };
      } else {
        error.value = response.message;
        return { success: false, message: response.message };
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      error.value = errorMessage || 'Failed to create transaction';
      return { success: false, message: errorMessage };
    } finally {
      isLoading.value = false;
    }
  };

  const updateTransaction = async (id: string, data: Partial<CreateTransactionData>) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await apiService.updateTransaction(id, data);
      
      if (response.success) {
        const index = transactions.value.findIndex(t => t.id === id);
        if (index !== -1) {
          transactions.value[index] = response.data;
        }
        return { success: true, data: response.data };
      } else {
        error.value = response.message;
        return { success: false, message: response.message };
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      error.value = errorMessage || 'Failed to update transaction';
      return { success: false, message: errorMessage };
    } finally {
      isLoading.value = false;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await apiService.deleteTransaction(id);
      
      if (response.success) {
        transactions.value = transactions.value.filter(t => t.id !== id);
        totalTransactions.value -= 1;
        return { success: true };
      } else {
        error.value = response.message;
        return { success: false, message: response.message };
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      error.value = errorMessage || 'Failed to delete transaction';
      return { success: false, message: errorMessage };
    } finally {
      isLoading.value = false;
    }
  };

  const setFilters = (newFilters: Partial<typeof filters.value>) => {
    Object.assign(filters.value, newFilters);
    filters.value.page = 1; // Reset to first page when filters change
  };

  const resetFilters = () => {
    filters.value = {
      type: '',
      memberId: '',
      startDate: '',
      endDate: '',
      page: 1,
      limit: 20
    };
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    // State
    transactions,
    totalTransactions,
    isLoading,
    error,
    filters,
    
    // Getters
    filteredTransactions,
    transactionsByType,
    totalIncome,
    totalExpenses,
    totalTransfers,
    totalLoans,
    netIncome,
    getTransactionById,
    
    // Actions
    fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    setFilters,
    resetFilters,
    clearError
  };
});
