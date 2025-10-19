import { defineStore } from "pinia";
import { ref } from "vue";
import type { IMember } from "@/interfaces/member.interface";

export const useMemberStore = defineStore("member", () => {
  const members = ref<IMember[]>([]);

  return { members };
});
