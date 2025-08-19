import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useAccountService } from 'src/services/account.service';
import type { AccountModel, CreateAccountData } from 'src/types/account.model';

export const useAccountStore = defineStore('account', () => {
  // State
  const accounts = ref<AccountModel[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const accountService = useAccountService();

  // Getters
  const totalBalance = computed(() =>
    accounts.value.reduce((sum, account) => sum + account.balance, 0)
  );

  const accountsByType = computed(() => ({
    cash: accounts.value.filter(acc => acc.type === 'CASH'),
    bank: accounts.value.filter(acc => acc.type === 'BANK')
  }));

  const accountsByCurrency = computed(() => {
    const grouped: Record<string, AccountModel[]> = {};
    accounts.value.forEach(account => {
      if (!grouped[account.currency]) {
        grouped[account.currency] = [];
      }
      grouped[account.currency]?.push(account);
    });
    return grouped;
  });

  const getAccountById = (id: string) =>
    accounts.value.find(account => account.id === id);

  // Actions
  const fetchAccounts = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await accountService.getAccounts();

      if (response.success) {
        accounts.value = response.data;
      } else {
        error.value = response.message;
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      error.value = errorMessage || 'Failed to fetch accounts';
    } finally {
      isLoading.value = false;
    }
  };

  const createAccount = async (data: AccountModel) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await accountService.createAccount(data);

      if (response.success) {
        accounts.value.push(response.data);
        return { success: true, data: response.data };
      } else {
        error.value = response.message;
        return { success: false, message: response.message };
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      error.value = errorMessage || 'Failed to create account';
      return { success: false, message: errorMessage };
    } finally {
      isLoading.value = false;
    }
  };

    const updateAccount = async (id: string, data: Partial<AccountModel>) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await accountService.updateAccount(id, data);

      if (response.success) {
        const index = accounts.value.findIndex(acc => acc.id === id);
        if (index !== -1) {
          accounts.value[index] = response.data;
        }
        return { success: true, data: response.data };
      } else {
        error.value = response.message;
        return { success: false, message: response.message };
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      error.value = errorMessage || 'Failed to update account';
      return { success: false, message: errorMessage };
    } finally {
      isLoading.value = false;
    }
  };

  const deleteAccount = async (id: string) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await accountService.deleteAccount(id);

      if (response.success) {
        accounts.value = accounts.value.filter(acc => acc.id !== id);
        return { success: true };
      } else {
        error.value = response.message;
        return { success: false, message: response.message };
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      error.value = errorMessage || 'Failed to delete account';
      return { success: false, message: errorMessage };
    } finally {
      isLoading.value = false;
    }
  };

  const updateAccountBalance = (id: string, newBalance: number) => {
    const account = accounts.value.find(acc => acc.id === id);
    if (account) {
      account.balance = newBalance;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    // State
    accounts,
    isLoading,
    error,

    // Getters
    totalBalance,
    accountsByType,
    accountsByCurrency,
    getAccountById,

    // Actions
    fetchAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
    updateAccountBalance,
    clearError
  };
});
