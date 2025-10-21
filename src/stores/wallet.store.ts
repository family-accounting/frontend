import { defineStore } from "pinia";
import { ref } from "vue";
import type { IWallet } from "@/interfaces/wallet.interface";

export const useWalletStore = defineStore("wallet", () => {
  const wallets = ref<IWallet[]>([]);

  return { wallets };
});
