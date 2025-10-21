import api from '@/config/api.config';
import { IGroup } from '@/interfaces/group.interface';

export const useRoleService = () => {
  const getGroups = async () => {
    const response = await api.get('/groups');
    return response.data;
  };

  const getGroup = async (id: IGroup['id']) => {
    const response = await api.get(`/groups/${id}`);
    return response.data;
  };

  const createGroup = async (
    group: Pick<IGroup, 'name' | 'icon' | 'color' | 'description'>,
  ) => {
    const response = await api.post('/groups', group);
    return response.data;
  };

  const updateGroup = async (
    id: IGroup['id'],
    group: Partial<Pick<IGroup, 'name' | 'icon' | 'color' | 'description'>>,
  ) => {
    const response = await api.put(`/groups/${id}`, group);
    return response.data;
  };

  const deleteGroup = async (id: IGroup['id']) => {
    const response = await api.delete(`/groups/${id}`);
    return response.data;
  };
  return { getGroups, getGroup, createGroup, updateGroup, deleteGroup };
};
