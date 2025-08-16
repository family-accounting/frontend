import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import apiService from 'src/services/api';
import type { User, LoginCredentials } from 'src/types';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  
  // State
  const token = ref<string | null>(localStorage.getItem('auth_token'));
  const user = ref<User | null>(null);
  const isLoading = ref(false);

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value);
  const userRole = computed(() => user.value?.role || null);
  const isAdmin = computed(() => user.value?.role === 'ADMIN');
  const isMember = computed(() => user.value?.role === 'MEMBER');
  const isViewer = computed(() => user.value?.role === 'VIEWER');

  // Actions
  const setToken = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem('auth_token', newToken);
  };

  const setUser = (newUser: User) => {
    user.value = newUser;
  };

const login = async (credentials: LoginCredentials) => {
  try {
    isLoading.value = true;
    const response = await apiService.login(credentials);
    console.log("🚀 ~ login ~ response:", response)
    
    if (response.success) {
      setToken(response.data.token);
      setUser(response.data.user);
      void router.push('/dashboard'); // ✅ از void استفاده شد
      return { success: true };
    } else {
      return { success: false, message: response.message };
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { 
      success: false, 
      message: errorMessage || 'Login failed' 
    };
  } finally {
    isLoading.value = false;
  }
};

const logout = () => {
  token.value = null;
  user.value = null;
  localStorage.removeItem('auth_token');
  void router.push('/auth/login');
};

  const checkAuth = async () => {
    if (!token.value) return false;
    
    try {
      const response = await apiService.getProfile();
      if (response.success) {
        setUser(response.data);
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Auth check error:', errorMessage);
      logout();
      return false;
    }
  };

  const hasPermission = (requiredRole: 'ADMIN' | 'MEMBER' | 'VIEWER') => {
    if (!user.value) return false;
    
    const roleHierarchy = {
      'ADMIN': 3,
      'MEMBER': 2,
      'VIEWER': 1
    };
    
    return roleHierarchy[user.value.role] >= roleHierarchy[requiredRole];
  };

  return {
    // State
    token,
    user,
    isLoading,
    
    // Getters
    isAuthenticated,
    userRole,
    isAdmin,
    isMember,
    isViewer,
    
    // Actions
    login,
    logout,
    checkAuth,
    hasPermission,
    setToken,
    setUser
  };
});
