import { useApi } from "@/composables/useApi";
import { LoginAuthDto, RegisterAuthDto } from "@/types/auth.dto";

export const useAuthService = ()=>{
    const api = useApi();
    
    const login = async (dto: LoginAuthDto)=>{
        const response = await api.post('/auth/login', dto);
        return response.data;
    }
    const register = async (dto: RegisterAuthDto)=>{
        const response = await api.post('/auth/register', dto);
        return response.data;
    }


    return {
        login,
        register
    }


}