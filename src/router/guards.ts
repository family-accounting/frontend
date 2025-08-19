import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from 'src/stores/auth.store';

export const requireAuth = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    // Try to check authentication if we have a token
    if (authStore.token) {
      const isAuthenticated = await authStore.checkAuth();
      if (isAuthenticated) {
        next();
        return;
      }
    }

    // Redirect to login if not authenticated
    next('/auth/login');
    return;
  }

  next();
};

export const requireRole = (requiredRole: 'ADMIN' | 'MEMBER' | 'VIEWER') => {
  return (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const authStore = useAuthStore();

    if (!authStore.isAuthenticated) {
      next('/auth/login');
      return;
    }

    if (!authStore.hasPermission(requiredRole)) {
      // Redirect to dashboard if user doesn't have required role
      next('/dashboard');
      return;
    }

    next();
  };
};

export const requireAdmin = requireRole('ADMIN');
export const requireMember = requireRole('MEMBER');
export const requireViewer = requireRole('VIEWER');

export const redirectIfAuthenticated = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore();

  if (authStore.isAuthenticated) {
    next('/dashboard');
    return;
  }

  next();
};
