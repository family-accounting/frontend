import { defineStore } from "pinia";
import { ref } from "vue";
import type { IGroup } from "@/interfaces/group.interface";

export const useGroupStore = defineStore("group", () => {
  const groups = ref<IGroup[]>([
    {
      id: "1",
      name: "Family",
      icon: "person",
      color: "primary",
      description: "Family group",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: "2",
      name: "Friends",
      icon: "people",
      color: "secondary",
      description: "Friends group",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ]);

  return { groups };
});
