import { defineStore, acceptHMRUpdate } from 'pinia';
import { useAuthService } from 'src/services/auth-service';

export const useAuthStore = defineStore('auth', () => {
  const { login, register } = useAuthService();

  return {
    login,
    register,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
