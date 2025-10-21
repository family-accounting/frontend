import api from "@/config/api.config";
import { IGroup } from "@/interfaces/group.interface";

export const useCategoryService = () => {
  const getCategories = async () => {
    const response = await api.get("/categories");
    return response.data;
  };

  const getCategory = async (id: ICategory["id"]) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  };

  const createCategory = async (
    category: Pick<ICategory, "name" | "icon" | "color" | "description">,
  ) => {
    const response = await api.post("/categories", category);
    return response.data;
  };

  const updateCategory = async (
        id: ICategory["id"],
    category: Partial<Pick<ICategory, "name" | "icon" | "color" | "description">>,
  ) => {
    const response = await api.put(`/categories/${id}`, category);
    return response.data;
  };

  const deleteCategory = async (id: ICategory["id"]) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  };
  return { getCategories, getCategory, createCategory, updateCategory, deleteCategory };
};
