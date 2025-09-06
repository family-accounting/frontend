import { useApi } from "@/composables/useApi";

export const useTransactionService = ()=>{
    const api = useApi();
    
    const getTransactions = async ()=>{
        return await api.get('/transactions');
    }
    const createTransaction = async (dto: {amount: number, description: string, type: string})=>{
        return await api.post('/transactions', dto);
    }


    return {
        getTransactions,
        createTransaction
    }


}