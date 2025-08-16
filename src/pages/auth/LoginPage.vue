<template>
  <q-page class="flex flex-center bg-grey-1">
    <div class="column items-center q-pa-lg">
      <div class="text-center q-mb-xl">
        <q-icon name="account_balance_wallet" size="80px" color="primary" />
        <h4 class="q-mt-md q-mb-xs text-weight-bold">Family Finance</h4>
        <p class="text-grey-6">Sign in to your account</p>
      </div>

      <q-card class="login-card q-pa-lg" style="width: 400px; max-width: 90vw;">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            v-model="form.email"
            type="email"
            label="Email"
            outlined
            :rules="[val => !!val || 'Email is required', val => isValidEmail(val) || 'Invalid email format']"
            :disable="isLoading"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>

          <q-input
            v-model="form.password"
            type="password"
            label="Password"
            outlined
            :rules="[val => !!val || 'Password is required', val => val.length >= 6 || 'Password must be at least 6 characters']"
            :disable="isLoading"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>

          <div class="q-mt-lg">
            <q-btn
              type="submit"
              color="primary"
              size="lg"
              class="full-width"
              :loading="isLoading"
              :disable="isLoading"
            >
              {{ isLoading ? 'Signing in...' : 'Sign In' }}
            </q-btn>
          </div>
        </q-form>

        <!-- Error message -->
        <div v-if="error" class="q-mt-md text-center">
          <q-banner class="bg-negative text-white">
            {{ error }}
          </q-banner>
        </div>

        <!-- Demo credentials -->
        <div class="q-mt-lg text-center">
          <q-separator class="q-mb-md" />
          <p class="text-caption text-grey-6 q-mb-sm">Demo Credentials:</p>
          <div class="text-caption text-grey-7">
            <div>Admin: admin@family.com / admin123</div>
            <div>Member: member@family.com / member123</div>
            <div>Viewer: viewer@family.com / viewer123</div>
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useAuthStore } from 'stores/auth-store';
import { showNotification } from 'src/utils';

const authStore = useAuthStore();

const form = reactive({
  email: '',
  password: ''
});

const isLoading = ref(false);
const error = ref('');

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const onSubmit = async () => {
  try {
    isLoading.value = true;
    error.value = '';
    
    const result = await authStore.login({
      email: form.email,
      password: form.password
    });
    
    if (!result.success) {
      error.value = result.message || 'Login failed';
      showNotification(error.value, 'negative');
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    error.value = errorMessage || 'An unexpected error occurred';
   showNotification(error.value, 'negative');
  } finally {
    isLoading.value = false;
  }
};



</script>

<style scoped>
.login-card {
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}
</style>
