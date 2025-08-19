export interface TransactionModel {
    id: string;
    type: 'INCOME' | 'EXPENSE' | 'TRANSFER' | 'LOAN';
    amount: number;
    currency: string;
    fromAccountId?: string;
    toAccountId?: string;
    memberId: string;
    date: string;
    description: string;
    category?: string;
    createdAt: string;
    updatedAt: string;
}
export interface CreateTransactionData {
    type: 'INCOME' | 'EXPENSE' | 'TRANSFER' | 'LOAN';
    amount: number;
    currency: string;
    fromAccountId?: string;
    toAccountId?: string;
    memberId: string;
    date: string;
    description: string;
    category?: string;
}
