import api from '@/config/api.config';
import { IProfile } from '@/interfaces/profile.interface';

export const useProfileService = () => {
  const getProfiles = async () => {
    const response = await api.get('/profiles');
    return response.data;
  };

  const getProfile = async (id: IProfile['id']) => {
    const response = await api.get(`/profiles/${id}`);
    return response.data;
  };

  const createProfile = async (
    profile: Pick<IProfile, 'name' | 'description'>,
  ) => {
    const response = await api.post('/profiles', profile);
    return response.data;
  };

  const updateProfile = async (
    id: IProfile['id'],
    profile: Partial<IProfile>,
  ) => {
    const response = await api.put(`/profiles/${id}`, profile);
    return response.data;
  };

  const deleteProfile = async (id: IProfile['id']) => {
    const response = await api.delete(`/profiles/${id}`);
    return response.data;
  };
  return {
    getProfiles,
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
  };
};
