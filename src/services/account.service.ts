import api from "@/config/api.config";
import { IAccount } from "@/interfaces/account.interface";

export const useAccountService = () => {
  const getAccounts = async () => {
    const response = await api.get("/accounts");
    return response.data;
  };

  const getAccount = async (id: IAccount["id"]) => {
    const response = await api.get(`/accounts/${id}`);
    return response.data;
  };

  const createAccount = async (
    account: Pick<IAccount, "name" | "icon" | "color" | "description">,
  ) => {
    const response = await api.post("/accounts", account);
    return response.data;
  };

  const updateAccount = async (
    id: IAccount["id"],
    account: Partial<Pick<IAccount, "name" | "icon" | "color" | "description">>,
  ) => {
    const response = await api.put(`/accounts/${id}`, account);
    return response.data;
  };

  const deleteAccount = async (id: IAccount["id"]) => {
    const response = await api.delete(`/accounts/${id}`);
    return response.data;
  };
  return { getAccounts, getAccount, createAccount, updateAccount, deleteAccount };
};
