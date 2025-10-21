import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ICategory } from '@/interfaces/category.interface';

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<ICategory[]>([]);

  return { categories };
});
