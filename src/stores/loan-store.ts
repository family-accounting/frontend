import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import apiService from 'src/services/api';
import type { Loan, CreateLoanData } from 'src/types';

export const useLoanStore = defineStore('loan', () => {
  // State
  const loans = ref<Loan[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const givenLoans = computed(() => 
    loans.value.filter(loan => loan.type === 'GIVEN')
  );

  const receivedLoans = computed(() => 
    loans.value.filter(loan => loan.type === 'RECEIVED')
  );

  const pendingLoans = computed(() => 
    loans.value.filter(loan => !loan.isRepaid)
  );

  const repaidLoans = computed(() => 
    loans.value.filter(loan => loan.isRepaid)
  );

  const totalGivenLoans = computed(() => 
    givenLoans.value.reduce((sum, loan) => sum + loan.amount, 0)
  );

  const totalReceivedLoans = computed(() => 
    receivedLoans.value.reduce((sum, loan) => sum + loan.amount, 0)
  );

  const totalPendingGiven = computed(() => 
    pendingLoans.value
      .filter(loan => loan.type === 'GIVEN')
      .reduce((sum, loan) => sum + (loan.amount - loan.repaidAmount), 0)
  );

  const totalPendingReceived = computed(() => 
    pendingLoans.value
      .filter(loan => loan.type === 'RECEIVED')
      .reduce((sum, loan) => sum + (loan.amount - loan.repaidAmount), 0)
  );

  const netLoanPosition = computed(() => 
    totalPendingGiven.value - totalPendingReceived.value
  );

  const getLoanById = (id: string) => 
    loans.value.find(loan => loan.id === id);

  const getLoansByMember = (memberId: string) => ({
    given: givenLoans.value.filter(loan => loan.fromMemberId === memberId),
    received: receivedLoans.value.filter(loan => loan.toMemberId === memberId)
  });

  // Actions
  const fetchLoans = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await apiService.getLoans();
      
      if (response.success) {
        loans.value = response.data;
      } else {
        error.value = response.message;
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      error.value = errorMessage || 'Failed to fetch loans';
    } finally {
      isLoading.value = false;
    }
  };

  const createLoan = async (data: CreateLoanData) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await apiService.createLoan(data);
      
      if (response.success) {
        loans.value.push(response.data);
        return { success: true, data: response.data };
      } else {
        error.value = response.message;
        return { success: false, message: response.message };
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      error.value = errorMessage || 'Failed to create loan';
      return { success: false, message: errorMessage };
    } finally {
      isLoading.value = false;
    }
  };

  const updateLoan = async (id: string, data: Partial<CreateLoanData>) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await apiService.updateLoan(id, data);
      
      if (response.success) {
        const index = loans.value.findIndex(l => l.id === id);
        if (index !== -1) {
          loans.value[index] = response.data;
        }
        return { success: true, data: response.data };
      } else {
        error.value = response.message;
        return { success: false, message: response.message };
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      error.value = errorMessage || 'Failed to update loan';
      return { success: false, message: errorMessage };
    } finally {
      isLoading.value = false;
    }
  };

  const deleteLoan = async (id: string) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await apiService.deleteLoan(id);
      
      if (response.success) {
        loans.value = loans.value.filter(l => l.id !== id);
        return { success: true };
      } else {
        error.value = response.message;
        return { success: false, message: response.message };
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      error.value = errorMessage || 'Failed to delete loan';
      return { success: false, message: errorMessage };
    } finally {
      isLoading.value = false;
    }
  };

  const markLoanRepaid = async (id: string, repaidAmount: number) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await apiService.markLoanRepaid(id, repaidAmount);
      
      if (response.success) {
        const index = loans.value.findIndex(l => l.id === id);
        if (index !== -1) {
          loans.value[index] = response.data;
        }
        return { success: true, data: response.data };
      } else {
        error.value = response.message;
        return { success: false, message: response.message };
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      error.value = errorMessage || 'Failed to mark loan as repaid';
      return { success: false, message: errorMessage };
    } finally {
      isLoading.value = false;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    // State
    loans,
    isLoading,
    error,
    
    // Getters
    givenLoans,
    receivedLoans,
    pendingLoans,
    repaidLoans,
    totalGivenLoans,
    totalReceivedLoans,
    totalPendingGiven,
    totalPendingReceived,
    netLoanPosition,
    getLoanById,
    getLoansByMember,
    
    // Actions
    fetchLoans,
    createLoan,
    updateLoan,
    deleteLoan,
    markLoanRepaid,
    clearError
  };
});
