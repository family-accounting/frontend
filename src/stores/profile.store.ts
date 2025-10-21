import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IProfile } from '@/interfaces/profile.interface';

export const useProfileStore = defineStore('profile', () => {
  const profiles = ref<IProfile[]>([]);

  return { profiles };
});
