import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthService } from "@/services/auth.service";
import { LoginAuthDto, RegisterAuthDto } from "@/types/auth.dto";

export const useAuthStore = defineStore('auth', () => {
    const authService = useAuthService();
    const token = useStorage<string | null>('token', null);

    const login = async (dto: LoginAuthDto)=>{
        const response = await authService.login(dto);
        token.value = response.token;
    }
    const register = async (dto: RegisterAuthDto)=>{
        const response = await authService.register(dto);
        token.value = response.token;
    }

    return {
        token,
        login,
        register
    }
});