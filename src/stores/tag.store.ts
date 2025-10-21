import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ITag } from '@/interfaces/tag.interface';

export const useTagStore = defineStore('tag', () => {
  const tags = ref<ITag[]>([]);

  return { tags };
});
