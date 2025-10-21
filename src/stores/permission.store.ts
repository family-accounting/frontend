import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IPermission } from '@/interfaces/permission.interface';

export const usePermissionStore = defineStore('permission', () => {
  const permissions = ref<IPermission[]>([]);

  return { permissions };
});
