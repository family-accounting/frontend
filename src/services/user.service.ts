import api from '@/config/api.config';
import { IUser } from '@/interfaces/user.interface';

export const useUserService = () => {
  const getUsers = async () => {
    const response = await api.get('/users');
    return response.data;
  };

  const getUser = async (id: IUser['id']) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  };

  const createUser = async (
    user: Pick<IUser, 'username' | 'email' | 'icon' | 'color' | 'description'>,
  ) => {
    const response = await api.post('/users', user);
    return response.data;
  };

  const updateUser = async (
    id: IUser['id'],
    user: Partial<Pick<IUser, 'username' | 'email' | 'icon' | 'color' | 'description'>>,
  ) => {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  };

    const deleteUser = async (id: IUser['id']) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  };
  return { getUsers, getUser, createUser, updateUser, deleteUser };
};
