import { api } from '../boot/axios';
import type { LoginAuthDto, RegisterAuthDto } from 'src/common/types/auth.dto';

export const useAuthService = () => {
  const login = async (loginForm: LoginAuthDto) => {
    return await api.post('/auth/login', loginForm);
  };
  const register = async (registerForm: RegisterAuthDto) => {
    return await api.post('/auth/register', registerForm);
  };

  return {
    login,
    register,
  };
};
