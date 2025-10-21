import api from '@/config/api.config';
import { IPermission } from '@/interfaces/permission.interface';

export const usePermissionService = () => {
  const getPermissions = async () => {
    const response = await api.get('/permissions');
    return response.data;
  };

  const getPermission = async (id: IPermission['id']) => {
    const response = await api.get(`/permissions/${id}`);
    return response.data;
  };

  const createPermission = async (
    permission: Pick<IPermission, 'name' | 'description'>,
  ) => {
    const response = await api.post('/permissions', permission);
    return response.data;
  };

  const updatePermission = async (
    id: IPermission['id'],
    permission: Partial<Pick<IPermission, 'name' | 'description'>>,
  ) => {
    const response = await api.put(`/permissions/${id}`, permission);
    return response.data;
  };

  const deletePermission = async (id: IPermission['id']) => {
    const response = await api.delete(`/permissions/${id}`);
    return response.data;
  };
  return {
    getPermissions,
    getPermission,
    createPermission,
    updatePermission,
    deletePermission,
  };
};
