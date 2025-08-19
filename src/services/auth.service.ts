import { api } from "src/boot/axios";
import { AuthUrl } from "src/enums";
import { AuthModel } from "src/types/auth.model";

export const useAuthService = () => {
    const login = async (credentials: AuthModel) => {
        const response = await api.post(AuthUrl.LOGIN, credentials);
        return response.data;
    };

    const signup = async (credentials: AuthModel) => {
        const response = await api.post(AuthUrl.SIGNUP, credentials);
        return response.data;
    };

    const profile = async () => {
        const response = await api.get(AuthUrl.PROFILE);
        return response.data;
    };

    const refresh = async () => {
        const response = await api.post(AuthUrl.REFRESH);
        return response.data;
    };

    const logout = async () => {
        const response = await api.post(AuthUrl.LOGOUT);
        return response.data;
    };

    return { login, signup, profile, refresh, logout };
}