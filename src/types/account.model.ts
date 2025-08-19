export interface AccountModel {
    id: string;
    name: string;
    type: 'CASH' | 'BANK';
    currency: string;
    balance: number;
    memberId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateAccountData {
    name: string;
    type: 'CASH' | 'BANK';
    currency: string;
    memberId?: string;
}