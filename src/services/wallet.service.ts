import api from "@/config/api.config";
import { IWallet } from "@/interfaces/wallet.interface";

export const useWalletService = () => {
  const getWallets = async () => {
    const response = await api.get("/wallets");
    return response.data;
  };

  const getWallet = async (id: IWallet["id"]) => {
    const response = await api.get(`/wallets/${id}`);
    return response.data;
  };

  const createWallet = async (
    wallet: Pick<IWallet, "name" | "icon" | "color" | "description">,
  ) => {
    const response = await api.post("/wallets", wallet);
    return response.data;
  };

  const updateWallet = async (
    id: IWallet["id"],
    wallet: Partial<Pick<IWallet, "name" | "icon" | "color" | "description">>,
  ) => {
    const response = await api.put(`/wallets/${id}`, wallet);
    return response.data;
  };

  const deleteWallet = async (id: IWallet["id"]) => {
    const response = await api.delete(`/wallets/${id}`);
    return response.data;
  };
  return { getWallets, getWallet, createWallet, updateWallet, deleteWallet };
};
