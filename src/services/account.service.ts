import { api } from "src/boot/axios";
import { AccountUrl } from "src/enums";
import type { AccountModel } from "src/types/account.model";

export const useAccountService = () => {
    const getAccounts = async () => {
        const response = await api.get(AccountUrl.GET_ACCOUNTS);
        return response.data;
    };

    const getAccountsByCurrency = async (currency: string) => {
        const response = await api.get(AccountUrl.GET_ACCOUNTS_BY_CURRENCY.replace(':currency', currency));
        return response.data;
    };

    const createAccount = async (account: AccountModel) => {
        const response = await api.post(AccountUrl.CREATE_ACCOUNT, account);
        return response.data;
    };

    const updateAccount = async (id: string, account: AccountModel  ) => {
        const response = await api.put(AccountUrl.UPDATE_ACCOUNT.replace(':id', id), account);
        return response.data;
    };

    const getAccountBalance = async (currency: string) => {
        const response = await api.get(AccountUrl.GET_ACCOUNT_BALANCE.replace(':currency', currency));
        return response.data;
    };

    const deleteAccount = async (id: string) => {
        const response = await api.delete(AccountUrl.DELETE_ACCOUNT.replace(':id', id));
        return response.data;
    };

    return { getAccounts, createAccount, updateAccount, getAccountsByCurrency, getAccountBalance, deleteAccount };
}