import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import apiService from 'src/services/api';
import type { Member, CreateMemberData } from 'src/types';

export const useMemberStore = defineStore('member', () => {
  // State
  const members = ref<Member[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const adminMembers = computed(() => 
    members.value.filter(member => member.role === 'ADMIN')
  );

  const regularMembers = computed(() => 
    members.value.filter(member => member.role === 'MEMBER')
  );

  const viewerMembers = computed(() => 
    members.value.filter(member => member.role === 'VIEWER')
  );

  const totalMembers = computed(() => members.value.length);

  const getMemberById = (id: string) => 
    members.value.find(member => member.id === id);

  const getMemberByName = (name: string) => 
    members.value.find(member => member.name.toLowerCase().includes(name.toLowerCase()));

  const totalFamilyBalance = computed(() => 
    members.value.reduce((sum, member) => sum + member.totalBalance, 0)
  );

  // Actions
  const fetchMembers = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await apiService.getMembers();
      
      if (response.success) {
        members.value = response.data;
      } else {
        error.value = response.message;
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      error.value = errorMessage || 'Failed to fetch members';
    } finally {
      isLoading.value = false;
    }
  };

  const createMember = async (data: CreateMemberData) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await apiService.createMember(data);
      
      if (response.success) {
        members.value.push(response.data);
        return { success: true, data: response.data };
      } else {
        error.value = response.message;
        return { success: false, message: response.message };
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      error.value = errorMessage || 'Failed to create member';
      return { success: false, message: errorMessage };
    } finally {
      isLoading.value = false;
    }
  };

  const updateMember = async (id: string, data: Partial<CreateMemberData>) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await apiService.updateMember(id, data);
      
      if (response.success) {
        const index = members.value.findIndex(m => m.id === id);
        if (index !== -1) {
          members.value[index] = response.data;
        }
        return { success: true, data: response.data };
      } else {
        error.value = response.message;
        return { success: false, message: response.message };
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      error.value = errorMessage || 'Failed to update member';
      return { success: false, message: errorMessage };
    } finally {
      isLoading.value = false;
    }
  };

  const deleteMember = async (id: string) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await apiService.deleteMember(id);
      
      if (response.success) {
        members.value = members.value.filter(m => m.id !== id);
        return { success: true };
      } else {
        error.value = response.message;
        return { success: false, message: response.message };
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      error.value = errorMessage || 'Failed to delete member';
      return { success: false, message: errorMessage };
    } finally {
      isLoading.value = false;
    }
  };

  const updateMemberBalance = (id: string, newBalance: number) => {
    const member = members.value.find(m => m.id === id);
    if (member) {
      member.totalBalance = newBalance;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    // State
    members,
    isLoading,
    error,
    
    // Getters
    adminMembers,
    regularMembers,
    viewerMembers,
    totalMembers,
    getMemberById,
    getMemberByName,
    totalFamilyBalance,
    
    // Actions
    fetchMembers,
    createMember,
    updateMember,
    deleteMember,
    updateMemberBalance,
    clearError
  };
});
