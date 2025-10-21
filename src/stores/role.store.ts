import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IRole } from '@/interfaces/role.interface';

export const useRoleStore = defineStore('role', () => {
  const roles = ref<IRole[]>([]);

  return { roles };
});
