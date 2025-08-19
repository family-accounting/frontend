
import { api } from "src/boot/axios";
import { LoanUrl } from "src/enums";
import type { LoanModel } from "src/types/loan.model";


export const useLoanService = () => {
    const getLoans = async () => {
        const response = await api.get(LoanUrl.GET_LOANS);
        return response.data;
    };

    const getPendingLoans = async () => {
        const response = await api.get(LoanUrl.GET_PENDING_LOANS);
        return response.data;
    };

    const getOverdueLoans = async () => {
        const response = await api.get(LoanUrl.GET_OVERDUE_LOANS);
        return response.data;
    };

    const getLoanSummary = async () => {
        const response = await api.get(LoanUrl.GET_LOAN_SUMMARY);
        return response.data;
    };

    const getLoanById = async (id: string) => {
        const response = await api.get(LoanUrl.GET_LOAN_BY_ID.replace(':id', id));
        return response.data;
    };

    const createLoan = async (loan: LoanModel) => {
        const response = await api.post(LoanUrl.CREATE_LOAN, loan);
        return response.data;
    };

    const updateLoan = async (id: string, loan: LoanModel) => {
        const response = await api.put(LoanUrl.UPDATE_LOAN.replace(':id', id), loan);
        return response.data;
    };

    return { getLoans, getPendingLoans, getOverdueLoans, getLoanSummary, getLoanById, createLoan, updateLoan };
}