import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthService } from "@/services/auth.service";
import { useTransactionService } from "@/services/transaction.service";

export const useTransactionStore = defineStore('transaction', () => {
    const transactionService = useTransactionService();

    const transactions = ref<any[]>([]);

    const getTransactions = async () => {
        const { data } = await transactionService.getTransactions();
        console.log("🚀 ~ getTransactions ~ response:", data)
        transactions.value = data;
    }
    const createTransaction = async (dto: { amount: number, description: string, type: string }) => {
        const { data } = await transactionService.createTransaction(dto);
        console.log("🚀 ~ createTransaction ~ response:", data)
    }

    return {
        transactions,
        getTransactions,
        createTransaction
    }
});