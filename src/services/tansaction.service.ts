import api from '@/config/api.config';
import { ITransaction } from '@/interfaces/transaction.interface';

export const useTransactionService = () => {
  const getTransactions = async () => {
    const response = await api.get('/transactions');
    return response.data;
  };

  const getTransaction = async (id: ITransaction['id']) => {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  };

  const createTransaction = async (
    transaction: Pick<ITransaction, 'name' | 'icon' | 'description'>,
  ) => {
    const response = await api.post('/transactions', transaction);
    return response.data;
  };

  const updateTransaction = async (
    id: ITransaction['id'],
    transaction: Partial<ITransaction>,
  ) => {
    const response = await api.put(`/transactions/${id}`, transaction);
    return response.data;
  };

  const deleteTransaction = async (id: ITransaction['id']) => {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  };
  return {
    getTransactions,
    getTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
};
