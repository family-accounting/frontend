export interface LoanModel {
    id: string;
    type: 'GIVEN' | 'RECEIVED';
    amount: number;
    currency: string;
    fromMemberId: string;
    toMemberId: string;
    description: string;
    date: string;
    isRepaid: boolean;
    repaidAmount: number;
    createdAt: string;
    updatedAt: string;
}
export interface CreateLoanData {
    type: 'GIVEN' | 'RECEIVED';
    amount: number;
    currency: string;
    fromMemberId: string;
    toMemberId: string;
    description: string;
    date: string;
}