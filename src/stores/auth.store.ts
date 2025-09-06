import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthService } from "@/services/auth.service";

export const useAuthStore = defineStore('auth', () => {
    const authService = useAuthService();
    const token = useStorage<string | null>('token', null);

    const login = async (dto:{mobile: string, password: string})=>{
        const response = await authService.login(dto);
        token.value = response.token;
    }
    const register = async (dto:{mobile: string, password: string})=>{
        const response = await authService.register(dto);
        token.value = response.token;
    }

    return {
        token,
        login,
        register
    }
});