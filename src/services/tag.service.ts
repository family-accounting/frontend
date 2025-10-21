import api from '@/config/api.config';
import { ITag } from '@/interfaces/tag.interface';

export const useTagService = () => {
  const getTags = async () => {
    const response = await api.get('/tags');
    return response.data;
  };

  const getTag = async (id: ITag['id']) => {
    const response = await api.get(`/tags/${id}`);
    return response.data;
  };

  const createTag = async (
    tag: Pick<ITag, 'name' | 'icon' | 'color' | 'description'>,
  ) => {
    const response = await api.post('/tags', tag);
    return response.data;
  };

  const updateTag = async (
    id: ITag['id'],
    tag: Partial<Pick<ITag, 'name' | 'icon' | 'color' | 'description'>>,
  ) => {
    const response = await api.put(`/tags/${id}`, tag);
    return response.data;
  };

  const deleteTag = async (id: ITag['id']) => {
    const response = await api.delete(`/tags/${id}`);
    return response.data;
  };
  return { getTags, getTag, createTag, updateTag, deleteTag };
};
