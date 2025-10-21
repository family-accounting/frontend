import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IUser } from '@/interfaces/user.interface';

export const useUserStore = defineStore('user', () => {
  const users = ref<IUser[]>([]);

  return { users };
});
