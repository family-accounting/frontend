<template>
  <div>
    <h1>Login</h1>

    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input filled v-model="loginForm.mobile" label="Your mobile *" hint="Mobile" lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']" />

      <q-input filled type="password" v-model="loginForm.password" label="Your password *" lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type your password']" />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
      <div class="">
        <q-btn label="Register" type="button" color="primary" flat class="q-ml-sm" to="/auth/register" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { LoginAuthDto } from 'src/common/types/auth.dto';
import { useAuthStore } from 'src/stores/auth-store';

const authStore = useAuthStore();

const loginForm = ref<LoginAuthDto>({} as LoginAuthDto);

const onSubmit = async () => {
  try {
    const { data } = await authStore.login(loginForm.value as LoginAuthDto);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const onReset = () => {
  loginForm.value = {} as LoginAuthDto;
};
</script>
